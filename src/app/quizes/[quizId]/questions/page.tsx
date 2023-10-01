import Question from "@/components/edit-questions/question";
import Footer from "@/components/edit-questions/question/footer";
import QuestionList from "@/components/edit-questions/questionList";
import Container from "@/components/ui/container";
import { Suspense } from "react";

interface Props {
  params: { quizId: string };
  searchParams: { q?: string };
}

export default async function page({ params, searchParams }: Props) {
  return (
    <article className="flex flex-col-reverse gap-8 lg:gap-0 lg:flex-row justify-evenly items-end p-4">
      <Question
        quizId={params.quizId}
        questionId={searchParams.q}
      />
      <Suspense
        fallback={
          <section className="flex flex-col items-end gap-4 w-full lg:w-fit">
            <header className="lg:flex lg:flex-col lg:items-end hidden">
              <div className="bg-white opacity-50 animate-pulse w-96 h-16 mb-2 rounded-2xl" />
              <div className="bg-white opacity-10 animate-pulse w-24 h-4 rounded-2xl" />
            </header>
            <Container className="w-full lg:w-[1000px] h-96 max-h-full animate-pulse lg:h-[650px] p-4" />
          </section>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <QuestionList qid={params.quizId} />
      </Suspense>
      <Suspense>
        {/* @ts-expect-error Async Server Component*/}
        <Footer
          params={params}
          searchParams={searchParams}
        />
      </Suspense>
    </article>
  );
}
