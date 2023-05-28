import Link from "next/link";
import SecureApprove from "../ui/modals/secureApprove";
import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Container from "../ui/container";
import QuestionLink from "./questions/questionLink";
import { revalidatePath } from "next/cache";

interface Props {
  qid: string;
}

async function getQuizInfo(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            Questions: true,
          },
        },
        title: true,
      },
    });

    if (!quiz) return null;
    return {
      questionsCount: quiz._count.Questions,
      title: quiz.title,
    };
  } catch (error) {
    return null;
  }
}

export default async function Questions({ qid }: Props) {
  const quizInfo = await getQuizInfo(qid);
  if (!quizInfo) redirect("/dashboard");

  const deleteQuiz = async (data: FormData) => {
    "use server";

    const keyword = data.get("keyword") as string | null;
    const wanted = data.get("wanted") as string | null;

    if (!keyword) return;
    if (wanted && keyword !== wanted) return;

    try {
      await prisma.quiz.delete({ where: { id: qid } });

      revalidatePath(`/quizes/${qid}/edit`);
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <aside className="flex flex-col gap-4 items-center">
      <SecureApprove
        id="delete-modal"
        action={deleteQuiz}
        keyword={quizInfo.title}
      />
      <Link
        className="btn btn-ghost"
        href={`/quizes/${qid}/questions`}
      >
        dodaj pytanie
      </Link>
      <Container className="w-full p-4 h-[485px] max-w-[500px] flex flex-wrap content-start gap-x-4 gap-y-4 justify-start overflow-y-auto">
        {[...new Array(quizInfo.questionsCount)].map((_, i) => (
          <Suspense
            key={`question${i}`}
            fallback={
              <Container
                variant="gradient-normal"
                className="p-4 w-[45%] h-28 animate-pulse flex-grow"
              />
            }
          >
            {/* @ts-expect-error Async Server Component*/}
            <QuestionLink
              qid={qid}
              index={i}
            />
          </Suspense>
        ))}
      </Container>
      <label
        htmlFor="delete-modal"
        className="btn btn-sm btn-error"
      >
        usuń
      </label>
    </aside>
  );
}
