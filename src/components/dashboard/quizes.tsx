import QuizDashboardHeader from "./quizes/quizHeader";
import QuizList from "./quizes/quizList";
import Container from "../ui/container";
import { SearchIcon } from "@/lib/icons";
import { Suspense } from "react";

interface Props {
  filter?: string;
}

export default function QuizDashboard({ filter }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <QuizDashboardHeader />
      <Container
        variant="solid-light"
        className="w-full lg:w-[400px] h-80 lg:h-[600px] flex flex-col items-center py-4 px-8"
      >
        <form className="mb-4 relative">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="wyszukaj…"
                name="q"
                autoComplete="off"
                defaultValue={filter}
                className="input bg-accent focus:ring-0"
              />
              <button className="btn btn-square btn-accent text-2xl">
                <SearchIcon />
              </button>
            </div>
          </div>
        </form>
        <Suspense fallback={null}>
          {/* @ts-expect-error Async Server Component*/}
          <QuizList filter={filter} />
        </Suspense>
      </Container>
    </section>
  );
}
