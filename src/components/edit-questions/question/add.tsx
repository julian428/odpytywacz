"use client";

import Button from "@/components/ui/button";
import H3 from "../../ui/headings/h3";
import Input from "../../ui/inputs/input";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import type { Question } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ApproveModal from "@/components/ui/modals/approve";

interface Props {
  qid: string;
  question?: Question;
}

export default function AddQuestion({ qid, question }: Props) {
  const { register, reset, handleSubmit } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const deleteQuestion = async () => {
    setLoading(true);
    try {
      toast.loading("usuwanie pytania");
      await axios.delete(`/api/question?q=${question?.id || ""}&qid=${qid}`);
      router.push(`/quizes/${qid}/questions`);
      toast.dismiss();
      toast.success("usunięto pytanie");
    } catch (error) {
      toast.dismiss();
      toast.error("nie udało się usunąć pytania.");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (data: FieldValues) => {
    setLoading(true);
    try {
      toast.loading("tworzenie pytania");
      await axios.post("/api/question", {
        qid,
        question: data.question.slice(0, 20),
        answears: [
          data.answear0.slice(0, 20),
          data.answear1.slice(0, 20),
          data.answear2.slice(0, 20),
          data.answear3.slice(0, 20),
          data.answear4.slice(0, 20),
        ],
      });
      reset();
      toast.dismiss();
      toast.success("stworzono pytanie.");
    } catch (error) {
      toast.dismiss();
      toast.error("Nie udało się stworzyć pytania");
    } finally {
      setLoading(false);
    }
  };

  const modifyQuestion = async (data: FieldValues) => {
    setLoading(true);
    try {
      toast.loading("naspisywanie pytania");
      await axios.put("/api/question", {
        id: question!.id,
        quizId: qid,
        question: data.question.slice(0, 20),
        answears: [
          data.answear0.slice(0, 20),
          data.answear1.slice(0, 20),
          data.answear2.slice(0, 20),
          data.answear3.slice(0, 20),
          data.answear4.slice(0, 20),
        ],
      });
      toast.dismiss();
      toast.success("nadpisano pytanie.");
    } catch (error) {
      toast.dismiss();
      toast.error("Nie udało się nadpisać pytania");
    } finally {
      setLoading(false);
    }
  };

  const handleMode = (data: FieldValues) => {
    if (question) {
      modifyQuestion(data);
    } else {
      addQuestion(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleMode)}
      className="flex flex-col items-center gap-4 text-3xl w-full lg:w-fit"
    >
      <ApproveModal
        message="napewno chcesz usunąć to pytanie?"
        setVisibility={setOpenModal}
        visible={openModal}
        action={deleteQuestion}
      />
      <section className="text-right space-y-2">
        <header className="flex gap-2 items-end justify-end w-full">
          <p className="text-sm opacity-50">max 20 znaków</p>
          <H3>pytanie</H3>
        </header>
        <Input
          {...register("question")}
          defaultValue={question?.question}
          maxLength={20}
          className="w-full lg:w-[400px] h-[80px]"
        />
      </section>
      <section className="flex flex-col gap-2">
        <header className="flex gap-2 items-end">
          <H3>odpowiedzi</H3>
          <p className="text-sm opacity-50">max 20 znaków</p>
        </header>
        <Input
          {...register("answear0")}
          defaultValue={question?.answears[0]}
          maxLength={20}
          className="w-full lg:w-[400px] h-[80px]"
        />
        <Input
          {...register("answear1")}
          defaultValue={question?.answears[1]}
          maxLength={20}
          className="w-full lg:w-[400px] h-[80px]"
        />
        <Input
          {...register("answear2")}
          defaultValue={question?.answears[2]}
          maxLength={20}
          className="w-full lg:w-[400px] h-[80px]"
        />
        <Input
          {...register("answear3")}
          defaultValue={question?.answears[3]}
          maxLength={20}
          className="w-full lg:w-[400px] h-[80px]"
        />
        <Input
          {...register("answear4")}
          defaultValue={question?.answears[4]}
          maxLength={20}
          className="w-full lg:w-[400px] h-[80px]"
        />
      </section>
      <section className="flex justify-evenly items-center w-full">
        {question !== undefined && (
          <Button
            variant="ghost"
            type="button"
            onClick={setOpenModal.bind(null, true)}
            disabled={loading}
            className="text-red-700 text-base px-8 border-red-700"
          >
            usuń
          </Button>
        )}
        <Button
          disabled={loading}
          className="text-base px-8"
        >
          {question === undefined ? "dodaj" : "nadpisz"}
        </Button>
        {question !== undefined && (
          <Button
            variant="ghost"
            bg="light"
            type="reset"
            disabled={loading}
            className="text-base px-8 text-white"
          >
            <Link href={`quizes/${qid}/questions`}>wróć</Link>
          </Button>
        )}
      </section>
    </form>
  );
}
