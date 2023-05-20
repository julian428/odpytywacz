"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import { useState } from "react";
import Question from "./question";
import H2 from "../ui/headings/h2";
import H3 from "../ui/headings/h3";
import H1 from "../ui/headings/h1";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { usePoints } from "@/providers/points";
import { toast } from "react-hot-toast";

interface Props {
  uid?: string | null;
  quiz: {
    title: string;
    Owner: {
      name: string;
    };
    id: string;
    Questions: {
      id: string;
      answears: string[];
      question: string;
    }[];
    _count: {
      Questions: number;
    };
  };
}

export default function Quiz({ quiz, uid }: Props) {
  const [index, setIndex] = useState(0);
  const managePoints = usePoints();
  const router = useRouter();

  const addIndex = () => {
    if (index < quiz._count.Questions - 1) {
      setIndex((prevState) => prevState + 1);
    }
  };

  const substractIndex = () => {
    if (index < 1) return;
    setIndex((prevState) => prevState - 1);
  };

  const getErrors = () => {
    const questionIds = quiz.Questions.map((question) => question.id);
    const errorIds = questionIds.filter((questionId) => {
      const point = managePoints("GET", questionId);
      if (point === 0 || point === 0.5) {
        return true;
      }
      return false;
    });
    return errorIds;
  };

  const endQuizHandler = async () => {
    //! I'm sorry for this mess :)
    if (!uid) {
      router.push(
        `/quizes/${quiz.id}/stats?p=${managePoints("GET")}&t=${managePoints(
          "TIME"
        )}`
      );
      return;
    }
    try {
      await axios.put("/api/quiz/add-timePlayed", { quizId: quiz.id });
    } catch (error) {}
    try {
      await axios.put("/api/quiz-stats", {
        ownerId: uid,
        quizId: quiz.id,
        candidateErrors: getErrors(),
        currentTime: new Date().getTime() - managePoints("TIME"),
        currentPercentage: (managePoints("GET") / quiz._count.Questions) * 100,
      });
      router.push(`/quizes/${quiz.id}/stats/${uid}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          try {
            await axios.post("/api/quiz-stats", {
              ownerId: uid,
              quizId: quiz.id,
              candidateErrors: getErrors(),
              currentTime: new Date().getTime() - managePoints("TIME"),
              currentPercentage:
                (managePoints("GET") / quiz._count.Questions) * 100,
            });
            router.push(`/quizes/${quiz.id}/stats/${uid}`);
          } catch (error) {
            toast.error("Nie udało się utworzyć statystyk");
          }
          return;
        }
        toast.error("Nie udało się przekierować do statystyk");
      }
    }
  };

  return (
    <>
      <section className="text-center mt-16 space-y-2">
        <H1>{quiz.title}</H1>
        <section className="flex gap-2 justify-center items-center">
          <p className="opacity-80">0%</p>
          <progress
            className="progress progress-success w-56"
            value={index}
            max={quiz._count.Questions - 1}
          />
          <p className="opacity-80">100%</p>
        </section>
      </section>
      <article className="flex w-fit justify-center gap-4 relative mx-auto mt-16">
        <button
          className={`text-9xl ${
            index === 0 && "hidden"
          } absolute left-0 -translate-x-full top-1/2 -translate-y-1/2`}
          onClick={substractIndex}
        >
          <ArrowLeftIcon />
        </button>
        <section>
          {quiz.Questions.map((question, i) => {
            return (
              <Question
                question={question}
                visible={i === index}
                addIndex={addIndex}
                endQuiz={endQuizHandler}
              />
            );
          })}
        </section>
        <button
          className={`text-9xl ${
            index === quiz._count.Questions - 1 && "hidden"
          } absolute right-0 translate-x-full top-1/2 -translate-y-1/2`}
          onClick={addIndex}
        >
          <ArrowRightIcon />
        </button>
      </article>
    </>
  );
}
