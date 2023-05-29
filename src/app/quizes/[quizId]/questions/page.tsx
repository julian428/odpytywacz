import Question from "@/components/edit-questions/question";
import QuestionList from "@/components/edit-questions/questionList";
import Container from "@/components/ui/container";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: { quizId: string };
  searchParams: { q?: string };
}

async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id,
      },
      select: {
        contributors: true,
        Owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return quiz;
  } catch (error) {
    return null;
  }
}

export default async function page({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Zaloguj się aby dostać się na tą strone.");

  const quiz = await getQuiz(params.quizId);
  if (!quiz) notFound();
  if (
    quiz.Owner.id !== session.user?.id &&
    !quiz.contributors.includes(session.user?.id || "")
  )
    throw new Error("Nie masz dostępu do tej strony.");

  return (
    <article className="flex flex-col-reverse gap-8 lg:gap-0 lg:flex-row justify-evenly items-end p-4">
      <Question
        quizId={params.quizId}
        questionId={searchParams.q}
      />
      <Suspense
        fallback={
          <section className="flex flex-col items-end gap-4 w-full lg:w-fit">
            <header className="lg:flex lg:flex-col lg:items-end hidden">
              <div className="bg-white opacity-50 animate-pulse w-96 h-16 mb-2 rounded-2xl" />
              <div className="bg-white opacity-10 animate-pulse w-24 h-4 rounded-2xl" />
            </header>
            <Container className="w-full lg:w-[1000px] h-96 max-h-full animate-pulse lg:h-[650px] p-4" />
          </section>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <QuestionList qid={params.quizId} />
      </Suspense>
      <footer className="lg:absolute lg:bottom-4 flex gap-4">
        {quiz.Owner.id === session.user?.id && (
          <Link
            className="btn px-4 btn-sm"
            href={`/quizes/${params.quizId}/edit`}
          >
            wróć
          </Link>
        )}
        <Link
          className="btn btn-sm px-4"
          href={`/quizes/${params.quizId}/ocr`}
        >
          foto
        </Link>
      </footer>
    </article>
  );
}
