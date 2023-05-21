"use client";

import { useState } from "react";
import Paging from "./paging";
import Question from "./question";

interface Props {
  questions: {
    id: string;
    answears: string[];
    question: string;
  }[];
}

export default function WrongQuestions({ questions }: Props) {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexIsVisible = (index: number) => {
    const rangeSize = currentPage * pageSize;
    if (index < rangeSize && index >= rangeSize - pageSize) {
      return true;
    }
    return false;
  };

  return (
    <section className="space-y-16 mt-8">
      <article className="lg:grid overflow-y-auto lg:grid-cols-3 lg:grid-rows-2 flex flex-col h-[500px] lg:h-fit gap-8 px-4">
        {questions.map((question, index) => {
          return (
            <Question
              question={question}
              visible={indexIsVisible(index)}
              key={question.id}
            />
          );
        })}
      </article>
      {questions.length > pageSize && (
        <Paging
          page={currentPage}
          setPage={setCurrentPage}
          maxPage={Math.ceil(questions.length / pageSize)}
        />
      )}
    </section>
  );
}
