"use client";

import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import { getTimeAgo, getTimeUpdateFrequency } from "@/lib/utils";
import type { Question } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  qid: string;
  question: Question;
}

export default function QuestionLink({ qid, question }: Props) {
  const [timeAgo, setTimeAgo] = useState(
    getTimeAgo(new Date(question.createdAt).getTime())
  );

  useEffect(() => {
    const updateFrequency = getTimeUpdateFrequency(
      new Date(question.createdAt).getTime()
    );

    if (!updateFrequency) return;
    const timeUpdater = setInterval(() => {
      setTimeAgo(getTimeAgo(new Date(question.createdAt).getTime()));
    }, updateFrequency);

    return () => clearInterval(timeUpdater);
  }, [question.createdAt]);

  return (
    <Link
      href={`/quizes/${qid}/questions?q=${question.id}`}
      className="w-[45%] h-fit"
    >
      <Container
        variant="gradient-normal"
        className="p-4 w-full"
      >
        <header className="sapce-y-0">
          <H3>{question.question}</H3>
          <p className="opacity-80">{question.answears[0]}</p>
        </header>
        <p className="text-right opacity-50 text-xs">{timeAgo}</p>
      </Container>
    </Link>
  );
}
