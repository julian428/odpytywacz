"use client";

import { useQuestion } from "@/providers/question";

interface Props {
  answears: string[];
}

export default function CardAnswear({ answears }: Props) {
  const [question, setQuestion] = useQuestion();
  const showAnswear = () => {
    if (question.correct === null) return false;
    if (question.correct === true) return false;
    return true;
  };
  return (
    <div
      className={`badge badge-error ${showAnswear() ? "scale-100" : "scale-0"}`}
    >
      {answears.map((answear, i) => {
        if (answear) {
          if (answears[i + 1] !== "") return answear + ", ";
          return answear;
        }
      })}
    </div>
  );
}
