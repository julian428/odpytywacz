"use client";

import { useEffect, useState } from "react";
import Games from "./stats/games";
import Likes from "./stats/likes";
import Questions from "./stats/questions";
import { pusherClient } from "@/lib/pusher";
import type { Question } from "@prisma/client";

interface Props {
  qid: string;
  questionCount: number;
  likes: number;
  timesPlayed: number;
}

export default function Stats({
  qid,
  questionCount,
  likes,
  timesPlayed,
}: Props) {
  const [dynamicQuestionCount, setDynamicQuestionCount] =
    useState(questionCount);

  useEffect(() => {
    pusherClient.subscribe(`quiz-${qid}`);

    pusherClient.bind("new-question", (question: Question) => {
      setDynamicQuestionCount((prevState) => prevState + 1);
    });

    pusherClient.bind("deleted-question", (question: Question) => {
      setDynamicQuestionCount((prevState) => prevState - 1);
    });

    return () => {
      pusherClient.unsubscribe(`quiz-${qid}`);
    };
  }, [qid]);

  return (
    <aside className="flex lg:gap-6">
      <Questions questionsCount={dynamicQuestionCount} />
      <Likes likes={likes} />
      <Games timesPlayed={timesPlayed} />
    </aside>
  );
}
