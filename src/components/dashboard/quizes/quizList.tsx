"use client";

import Link from "next/link";
import Container from "../../ui/container";
import Search from "../../ui/inputs/search";
import QuizLink from "./quizLink";
import { ChangeEvent, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface Props {
  quizes: { id: string; title: string; ownerId: string }[];
  uid?: string | null;
}

export default function QuizList({ quizes, uid }: Props) {
  const [dynamicQuizes, setDynamicQuizes] = useState(quizes);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    pusherClient.subscribe(`quiz-${uid}`);

    pusherClient.bind(
      "new-quiz",
      (quiz: { id: string; title: string; ownerId: string }) => {
        setDynamicQuizes((prevState) => [quiz, ...prevState]);
      }
    );

    return () => {
      pusherClient.unsubscribe(`quiz-${uid}`);
    };
  }, [uid]);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Container
      variant="solid-light"
      className="w-full h-80 lg:h-[650px] flex flex-col items-center py-4 px-8"
    >
      <div className="mb-4 relative">
        <Search
          variant="solid-light"
          filter={handleFilter}
        />
      </div>
      <section className="max-h-full pt-6 overflow-y-auto w-full flex flex-col items-center space-y-8">
        {uid ? (
          dynamicQuizes.map((quiz) => {
            if (!quiz.title.toLowerCase().includes(filter.toLowerCase().trim()))
              return <></>;
            return (
              <QuizLink
                quiz={quiz}
                uid={uid}
                key={quiz.id}
              />
            );
          })
        ) : (
          <Link href="/auth">Zaloguj się</Link>
        )}
      </section>
    </Container>
  );
}
