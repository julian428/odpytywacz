import Question from "@/components/edit-questions/question";
import QuestionList from "@/components/edit-questions/questionList";
import Button from "@/components/ui/button";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

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
        Questions: true,
        contributors: true,
        Owner: {
          select: {
            id: true,
            name: true,
          },
        },
        title: true,
      },
    });

    return quiz;
  } catch (error) {}
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
        questions={quiz.Questions}
      />
      <QuestionList
        owner={quiz.Owner.name}
        title={quiz.title}
        questions={quiz.Questions}
        qid={params.quizId}
      />
      <footer className="lg:absolute lg:bottom-4 flex gap-4">
        {quiz.Owner.id === session.user?.id && (
          <Link href={`/quizes/${params.quizId}/edit`}>
            <Button className="px-8">wróć</Button>
          </Link>
        )}
        <Link href={`/quizes/${params.quizId}/ocr`}>
          <Button className="px-8">foto</Button>
        </Link>
      </footer>
    </article>
  );
}
