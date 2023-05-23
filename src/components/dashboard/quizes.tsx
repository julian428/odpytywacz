import { Suspense } from "react";
import QuizDashboardHeader from "./quizes/quizHeader";
import QuizList from "./quizes/quizList";
import Container from "../ui/container";
import { SearchIcon } from "@/lib/icons";

interface Props {
  filter?: string;
}

export default function QuizDashboard({ filter }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <QuizDashboardHeader />
      <Suspense
        fallback={
          <Container
            variant="solid-light"
            className="w-full h-80 lg:h-[650px] py-4 px-8 animate-pulse"
          />
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <QuizList filter={filter} />
      </Suspense>
    </section>
  );
}
