"use client";

import type { Question } from "@prisma/client";
import H1 from "../ui/headings/h1";
import Container from "../ui/container";
import QuestionLink from "./questionList/link";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface Props {
  title: string;
  owner: string;
  qid: string;
  questions: Question[];
}

export default function QuestionList({ title, owner, questions, qid }: Props) {
  const [dynamicQuestions, setDynamicQuestions] = useState(questions);
  useEffect(() => {
    pusherClient.subscribe(`quiz-${qid}`);

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
      pusherClient.unsubscribe(`quiz-${qid}`);
    };
  }, [qid]);
  return (
    <section className="flex flex-col items-end gap-4 w-full lg:w-fit">
      <header className="lg:block hidden">
        <H1>{title}</H1>
        <p className="text-right opacity-50 text-xs">{owner}</p>
      </header>
      <Container className="w-full lg:w-[1000px] h-96 max-h-full overflow-y-auto lg:h-[650px] p-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-start lg:content-start gap-4">
        {dynamicQuestions.map((question) => (
          <QuestionLink
            key={question.id}
            qid={qid}
            question={question}
          />
        ))}
      </Container>
    </section>
  );
}
