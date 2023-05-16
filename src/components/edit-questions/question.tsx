"use client";

import { Question } from "@prisma/client";
import AddQuestion from "./question/add";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface Props {
  quizId: string;
  questionId?: string | null;
  questions: Question[];
}

export default function Question({ quizId, questionId, questions }: Props) {
  const [dynamicQuestions, setDynamicQuestions] = useState(questions);

  useEffect(() => {
    pusherClient.subscribe(`quiz-${quizId}`);

    pusherClient.bind("new-question", (question: Question) => {
      setDynamicQuestions((prevState) => [question, ...prevState]);
    });
    pusherClient.bind("updated-question", (question: Question) => {
      setDynamicQuestions((prevState) => {
        const copyState = prevState;
        const updatedIndex = copyState.findIndex(
          (state) => state.id === question.id
        );
        copyState[updatedIndex] = question;
        return copyState;
      });
    });
    pusherClient.bind("deleted-question", (question: Question) => {
      setDynamicQuestions((prevState) =>
        prevState.filter((state) => state.id !== question.id)
      );
    });

    return () => {
      pusherClient.unsubscribe(`quiz-${quizId}`);
    };
  }, [quizId]);

  return (
    <AddQuestion
      qid={quizId}
      question={dynamicQuestions.find((question) => question.id === questionId)}
    />
  );
}
