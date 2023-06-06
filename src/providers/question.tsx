"use client";

import { useSessionStorage } from "@react-hooks-library/core";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
  questionId: string;
}

const QuestionContext = createContext<
  [
    {
      answear: string;
      correct: null | boolean;
      tempCorrect: boolean | null;
      helped: boolean;
    },
    (state: {
      answear?: string;
      correct?: boolean;
      tempCorrect?: boolean;
      helped?: true;
    }) => void
  ]
>([{ answear: "", correct: null, tempCorrect: null, helped: false }, () => {}]);

let first = 2;

export default function QuestionProvider({ children, questionId }: Props) {
  useEffect(() => {
    first = 2;
  }, [questionId]);

  const [sessionQuestion, setSessionQuestion] = useSessionStorage(questionId, {
    answear: "",
    correct: null as boolean | null,
    tempCorrect: null as boolean | null,
    helped: false,
  });
  const [question, setQuestion] = useState(sessionQuestion);

  const manager = (state: {
    answear?: string;
    correct?: boolean;
    tempCorrect?: boolean;
    helped?: true;
  }) => {
    setQuestion((prevState) => {
      setSessionQuestion({ ...prevState, ...state });
      return { ...prevState, ...state };
    });
  };

  useEffect(() => {
    if (first < 1) return;
    setQuestion(sessionQuestion);
    first--;
  }, [sessionQuestion]);

  return (
    <QuestionContext.Provider value={[question, manager]}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => useContext(QuestionContext);
