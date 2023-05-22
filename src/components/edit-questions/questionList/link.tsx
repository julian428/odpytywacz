"use client";

import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import H4 from "@/components/ui/headings/h4";
import { EditIcon } from "@/lib/icons";
import { getTimeAgo, getTimeUpdateFrequency } from "@/lib/utils";
import { Question } from "@prisma/client";
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
      className="w-full flex-grow lg:w-[30%] h-fit"
      href={`/quizes/${qid}/questions?q=${question.id}`}
    >
      <Container
        variant="gradient-normal"
        className="w-full flex justify-between items-center px-4 py-2"
      >
        <section className="w-full">
          <H3>{question.question}</H3>
          <H4>
            {question.answears[0] || "-brak pytań-"}
            {question.answears.filter((ans) => ans.length > 0).length > 1 &&
              " +" +
                question.answears.reduce((sum, answear) => {
                  if (answear) return sum + 1;
                  return sum;
                }, -1)}
          </H4>
          <p>{timeAgo}</p>
        </section>
        <EditIcon className="text-4xl" />
      </Container>
    </Link>
  );
}
