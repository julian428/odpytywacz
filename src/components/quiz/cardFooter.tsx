"use client";

import { getPercentage } from "@/lib/utils";
import { useQuestion } from "@/providers/question";
import { useSession } from "@/providers/session";
import { useSessionStorage } from "@react-hooks-library/core";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  question: {
    id: string;
    question: string;
    answears: string[];
  };
  questions: string[];
}

export default function CardFooter({ question, questions }: Props) {
  const helpRef = useRef<HTMLButtonElement>(null);
  const checkRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const url = usePathname();
  const session = useSession();
  const qid = url.split("/")[2];
  const [points, setPoints] = useSessionStorage(`points-${qid}`, 0);
  const [sessionQuestion, setSessionQuestion] = useQuestion();

  useEffect(() => {
    const startTime = window.sessionStorage.getItem("start-" + qid);
    if (startTime) return;
    window.sessionStorage.setItem(
      `start-${qid}`,
      JSON.stringify(new Date().getTime())
    );
  }, []);

  useEffect(() => {
    if (helpRef.current) {
      helpRef.current.disabled =
        sessionQuestion.helped || sessionQuestion.tempCorrect || false;
    }
    if (checkRef.current) {
      checkRef.current.disabled = sessionQuestion.tempCorrect || false;
    }
  }, [sessionQuestion]);

  const help = () => {
    if (helpRef.current) helpRef.current.disabled = true;
    if (sessionQuestion.correct) return;
    setSessionQuestion({
      helped: true,
    });
  };

  const check = () => {
    if (sessionQuestion.correct) return;
    setSessionQuestion({ correct: false, tempCorrect: false });
  };

  //? returns all question ids that were wrong
  const getErrors = () => {
    const errors: string[] = [];
    questions.map((id) => {
      const isCorrect = window.sessionStorage.getItem(id);
      if (!isCorrect) {
        errors.push(id);
      } else {
        const parsedQuestion = JSON.parse(isCorrect);
        if (!parsedQuestion.correct) errors.push(id);
      }
    });
    return errors;
  };

  const endQuiz = async () => {
    const uid = session?.user?.id;
    const startTime = JSON.parse(
      window.sessionStorage.getItem(`start-${qid}`) ||
        JSON.stringify(new Date().getTime())
    ) as number;
    if (!uid) {
      router.push(
        `${url}/stats?p=${getPercentage(points, questions.length)}&t=${
          new Date().getTime() - startTime
        }`
      );
      window.sessionStorage.removeItem(`points-${qid}`);
      window.sessionStorage.removeItem(`start-${qid}`);
      questions.map((id) => {
        window.sessionStorage.removeItem(id);
      });
      return;
    }
    try {
      await axios.put("/api/quiz/add-timePlayed", { quizId: qid });
    } catch (error) {}
    try {
      await axios.put("/api/quiz-stats", {
        ownerId: uid,
        quizId: qid,
        candidateErrors: getErrors(),
        currentTime: new Date().getTime() - startTime,
        currentPercentage: Math.round(getPercentage(points, questions.length)),
      });
      router.push(`/quizes/${qid}/stats/${uid}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          try {
            await axios.post("/api/quiz-stats", {
              ownerId: uid,
              quizId: qid,
              candidateErrors: getErrors(),
              currentTime: new Date().getTime() - startTime,
              currentPercentage: Math.round(
                getPercentage(points, questions.length)
              ),
            });
            router.push(`/quizes/${qid}/stats/${uid}`);
          } catch (error) {}
          return;
        }
      }
    } finally {
      window.sessionStorage.removeItem(`points-${qid}`);
      window.sessionStorage.removeItem(`start-${qid}`);
      questions.map((id) => {
        window.sessionStorage.removeItem(id);
      });
    }
  };

  return (
    <>
      <div
        className={`badge ${
          sessionQuestion.helped ? "scale-100" : "scale-0"
        } transition-all`}
      >{`długość: ${question.answears[0].length}`}</div>
      <footer className="w-full px-8 flex justify-between items-center">
        <button
          onClick={endQuiz}
          className="btn btn-sm"
        >
          zakończ
        </button>
        <section className="flex gap-4 items-center">
          <div
            className="tooltip tooltip-primary"
            data-tip="pomoc"
          >
            <button
              onClick={help}
              ref={helpRef}
              className="btn btn-sm text-xl btn-outline btn-circle"
            >
              ?
            </button>
          </div>
          <button
            ref={checkRef}
            onClick={check}
            className="btn btn-sm btn-primary"
          >
            sprawdź
          </button>
        </section>
      </footer>
    </>
  );
}
