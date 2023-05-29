import { Question } from "@prisma/client";
import AddQuestion from "./question/add";
import prisma from "@/lib/db";
import EditQuestion from "./question/edit";
import { Suspense } from "react";

interface Props {
  quizId: string;
  questionId?: string | null;
}

export default function Question({ quizId, questionId }: Props) {
  return (
    <>
      {!Boolean(questionId) ? (
        <AddQuestion qid={quizId} />
      ) : (
        <Suspense fallback={null}>
          {/* @ts-expect-error Async Server Component*/}
          <EditQuestion
            qid={quizId}
            id={questionId}
          />
        </Suspense>
      )}
    </>
  );
}
