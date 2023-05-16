"use client";

import Link from "next/link";
import Container from "../ui/container";
import type { Question } from "@prisma/client";
import QuestionsList from "./questions/questionsList";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import Button from "../ui/button";
import SecureApprove from "../ui/modals/secureApprove";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  qid: string;
  quizName: string;
  questions: Question[];
}

export default function Questions({ qid, quizName, questions }: Props) {
  const [dynamicQuestions, setDynamicQuestions] = useState(questions);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(`quiz-${qid}`);

    pusherClient.bind("new-question", (question: Question) => {
      setDynamicQuestions((prevState) => [question, ...prevState]);
    });
    pusherClient.bind("updated-question", (question: Question) => {
      setDynamicQuestions((prevState) => {
        const copyState = prevState;
        const updatedIndex = copyState.findIndex(
          (state) => state.id === question.id
        );
        copyState[updatedIndex] = question;
        return copyState;
      });
    });
    pusherClient.bind("deleted-question", (question: Question) => {
      setDynamicQuestions((prevState) =>
        prevState.filter((state) => state.id !== question.id)
      );
    });

    return () => {
      pusherClient.unsubscribe(`quiz-${qid}`);
    };
  }, [qid]);

  const deleteQuiz = async () => {
    try {
      toast.loading("usuwanie quizu");
      await axios.delete(`/api/quiz?id=${qid}`);
      toast.dismiss();
      toast.success(`usunięto quiz ${quizName}`);
    } catch (error) {
      toast.dismiss();
      toast.error("nie udało się usunąć quizu");
    } finally {
      router.push("/dashboard");
    }
  };

  return (
    <aside className="flex flex-col gap-4 items-center">
      <SecureApprove
        visibility={openModal}
        setVisibility={setOpenModal}
        action={deleteQuiz}
        keyword={quizName}
      />
      <Container
        variant="gradient-dark"
        className="bg-opacity-60 px-8 py-2"
      >
        <Link href={`/quizes/${qid}/questions`}>dodaj pytanie</Link>
      </Container>
      <QuestionsList
        qid={qid}
        questions={dynamicQuestions}
      />
      <Button
        variant="ghost"
        onClick={setOpenModal.bind(null, true)}
        className="border-red-700 text-red-700 px-6 font-black"
      >
        usuń
      </Button>
    </aside>
  );
}
