"use client";

import { useOcrText } from "@/providers/ocrText";
import Button from "../ui/button";
import Container from "../ui/container";
import H3 from "../ui/headings/h3";
import Input from "../ui/inputs/input";
import { FormEvent, KeyboardEvent, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

interface Props {
  qid: string;
}

export default function SaveQuestion({ qid }: Props) {
  const [state, Dispatch] = useOcrText();
  const [loading, setLoading] = useState(false);

  const handleCopy = (event: KeyboardEvent) => {
    if (event.key === "v" && event.ctrlKey) {
      event.preventDefault();
      (event.target as HTMLInputElement).value += state.clipBoard;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = { ...event.target } as {
      [index: number]: HTMLInputElement;
    };
    const question = formData[0].value;
    if (question.length < 1) return;
    const answears = [
      formData[1].value,
      formData[2].value,
      formData[3].value,
      formData[4].value,
      formData[5].value,
    ];
    try {
      setLoading(true);
      toast.loading("dodawanie pytania");
      await axios.post("/api/question", { qid, question, answears });
      Object.entries(formData).map(([key, input], index) => {
        if (index < 6) {
          return (input.value = "");
        }
      });

      toast.dismiss();
      toast.success("dodano pytanie");
    } catch (error) {
      toast.dismiss();
      toast.error("nie dodano pytania");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className="w-full space-y-4 p-4">
        <section className="space-y-4 text-right">
          <H3>pytanie</H3>
          <Input
            onKeyDown={handleCopy}
            disabled={loading}
            className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100"
          />
        </section>
        <section className="flex flex-col gap-4">
          <H3>odpowiedzi</H3>
          <Input
            onKeyDown={handleCopy}
            disabled={loading}
            className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100"
          />
          <Input
            onKeyDown={handleCopy}
            disabled={loading}
            className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100"
          />
          <Input
            onKeyDown={handleCopy}
            disabled={loading}
            className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100"
          />
          <Input
            onKeyDown={handleCopy}
            disabled={loading}
            className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100"
          />
          <Input
            onKeyDown={handleCopy}
            disabled={loading}
            className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100"
          />
        </section>
        <Button disabled={loading}>dodaj</Button>
      </Container>
    </form>
  );
}
