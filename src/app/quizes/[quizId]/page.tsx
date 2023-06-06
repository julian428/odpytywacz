import Card from "@/components/quiz/card";
import H1 from "@/components/ui/headings/h1";
import H3 from "@/components/ui/headings/h3";
import prisma from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  params: {
    quizId: string;
  };
  searchParams: {
    q: string;
  };
}

async function getQuestions(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        title: true,
        Owner: {
          select: {
            name: true,
          },
        },
        Questions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!quiz) return null;
    return {
      questions: quiz.Questions.map((question) => question.id),
      title: quiz.title,
    };
  } catch (error) {
    return null;
  }
}

export default async function page({ params, searchParams }: Props) {
  const quiz = await getQuestions(params.quizId);
  if (!quiz) {
    (await import("next/navigation")).notFound();
    return;
  }

  const currentQuestion = parseInt(searchParams.q || "0");

  return (
    <article className="mt-8 flex flex-col items-center gap-8 px-4">
      <input
        type="checkbox"
        id="choose-question"
        className="modal-toggle"
      />
      <label
        htmlFor="choose-question"
        className="modal cursor-pointer"
      >
        <label
          className="modal-box relative text-center space-y-4 w-96 h-96"
          htmlFor=""
        >
          <H3>Wybierz pytanie</H3>
          <section className="max-h-3/5 flex flex-wrap content-start gap-[2%] gap-y-2 overflow-y-auto w-full mx-auto">
            {quiz.questions.map((_, i) => (
              <Link
                key={`question${i}`}
                href={`/quizes/${params.quizId}?q=${i}`}
                className={`btn btn-xs w-[8%] h-[8%] ${
                  i === currentQuestion && "btn-active"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </section>
        </label>
      </label>
      <header>
        <H1>{quiz.title}</H1>
      </header>
      <QuizNav
        currentQuestion={currentQuestion}
        maxQuestion={quiz.questions.length - 1}
        qid={params.quizId}
      />
      <Suspense>
        {/* @ts-expect-error Async Server Component*/}
        <Card
          id={quiz.questions[currentQuestion]}
          questions={quiz.questions}
        />
      </Suspense>
    </article>
  );
}

function QuizNav({
  qid,
  currentQuestion,
  maxQuestion,
}: {
  qid: string;
  currentQuestion: number;
  maxQuestion: number;
}) {
  return (
    <nav>
      <div className="btn-group">
        <Link
          href={`/quizes/${qid}?q=${currentQuestion - 1}`}
          className={`btn ${currentQuestion <= 0 && "btn-disabled"}`}
        >
          «
        </Link>
        <label
          htmlFor="choose-question"
          className="btn"
        >
          pytanie {currentQuestion + 1}
        </label>
        <Link
          href={`/quizes/${qid}?q=${currentQuestion + 1}`}
          className={`btn ${currentQuestion >= maxQuestion && "btn-disabled"}`}
        >
          »
        </Link>
      </div>
    </nav>
  );
}
