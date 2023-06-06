"use client";

import { useQuestion } from "@/providers/question";
import { useSessionStorage } from "@react-hooks-library/core";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CardInput({
  serverQuestion,
}: {
  serverQuestion: {
    id: string;
    question: string;
    answears: string[];
  };
}) {
  const url = usePathname();
  const maxAnswearLength = serverQuestion.answears.reduce((max, answear) => {
    if (max > answear.length) return max;
    return answear.length;
  }, 0);

  const inputRef = useRef<HTMLInputElement>(null);
  const [points, setPoints] = useSessionStorage(
    `points-${url.split("/")[2]}`,
    0
  );
  const [sessionQuestion, setSessionQuestion] = useQuestion();

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = sessionQuestion.answear;
    inputRef.current.disabled = sessionQuestion.tempCorrect || false;
    inputRef.current.style.borderColor =
      sessionQuestion.tempCorrect === null
        ? ""
        : sessionQuestion.tempCorrect
        ? "green"
        : "red";
  }, [sessionQuestion, inputRef.current]);

  const checkAnswear = () => {
    if (!inputRef.current) return;
    if (sessionQuestion.correct) return;
    const answear = inputRef.current.value;
    setSessionQuestion({
      answear,
    });
    if (answear.length < 1) return;
    if (serverQuestion.answears.includes(inputRef.current.value)) {
      inputRef.current.disabled = true;
      inputRef.current.style.borderColor = "green";
      if (sessionQuestion.correct === null) {
        setPoints(points + 1);
        setSessionQuestion({
          answear,
          correct: true,
          tempCorrect: true,
        });
      } else {
        setSessionQuestion({
          answear,
          tempCorrect: true,
        });
      }
    } else if (answear.length >= maxAnswearLength) {
      inputRef.current.style.borderColor = "red";
      setSessionQuestion({
        answear,
        correct: false,
        tempCorrect: false,
      });
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue={sessionQuestion.answear}
      placeholder="odpowiedź..."
      onChange={checkAnswear}
      className="input text-2xl input-lg input-bordered w-full max-w-md border-2"
    />
  );
}
