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
        Questions: {
          select: {
            id: true,
            question: true,
            answears: true,
            createdAt: true,
          },
        },
        title: true,
      },
    });

    if (!quiz) return null;
    return quiz;
  } catch (error) {
    return null;
  }
}

export default async function Questions({ qid }: Props) {
  const quiz = await getQuizInfo(qid);
  if (!quiz) redirect("/dashboard");

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
        keyword={quiz.title}
      />
      <Link
        className="btn btn-ghost"
        href={`/quizes/${qid}/questions`}
      >
        dodaj pytanie
      </Link>
      <Container className="w-full p-4 h-[485px] max-w-[500px] flex flex-wrap content-start gap-x-4 gap-y-4 justify-start overflow-y-auto">
        {quiz.Questions.map((question) => (
          <QuestionLink
            qid={qid}
            question={question}
          />
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
