import Container from "@/components/ui/container";
import QuestionLink from "./questionLink";
import { Suspense } from "react";

interface Props {
  qid: string;
  questionsCount: number;
}

export default function QuestionsList({ qid, questionsCount }: Props) {
  return (
    <>
      {[...new Array(questionsCount)].map((_, i) => (
        <Suspense
          key={`question${i}`}
          fallback={
            <Container
              variant="gradient-normal"
              className="p-4 w-[45%] h-28 animate-pulse flex-grow"
            />
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <QuestionLink
            qid={qid}
            index={i}
          />
        </Suspense>
      ))}
    </>
  );
}
