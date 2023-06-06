"use client";

import { useOcrText } from "@/providers/ocrText";
import Button from "../ui/button";
import Container from "../ui/container";
import H3 from "../ui/headings/h3";
import Input from "../ui/inputs/input";
import { FormEvent, KeyboardEvent, RefObject, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PasteIcon } from "@/lib/icons";

interface Props {
  qid: string;
}

export default function SaveQuestion({ qid }: Props) {
  const [state, Dispatch] = useOcrText();
  const [loading, setLoading] = useState(false);

  const questionRef = useRef<HTMLInputElement>(null);

  const answear0Ref = useRef<HTMLInputElement>(null);
  const answear1Ref = useRef<HTMLInputElement>(null);
  const answear2Ref = useRef<HTMLInputElement>(null);
  const answear3Ref = useRef<HTMLInputElement>(null);
  const answear4Ref = useRef<HTMLInputElement>(null);

  const handlePaste = (event: KeyboardEvent) => {
    if (event.key === "v" && event.ctrlKey) {
      event.preventDefault();
      (event.target as HTMLInputElement).value += state.clipBoard;
    }
  };

  const handleButtonPaste = (ref?: RefObject<HTMLInputElement>) => {
    if (!ref || !ref.current) return;
    ref.current.value += state.clipBoard;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const question = questionRef.current?.value.slice(0, 20) || "";
    if (question.length < 1) return;
    const answears = [
      answear0Ref.current?.value.slice(0, 20) || "",
      answear1Ref.current?.value.slice(0, 20) || "",
      answear2Ref.current?.value.slice(0, 20) || "",
      answear3Ref.current?.value.slice(0, 20) || "",
      answear4Ref.current?.value.slice(0, 20) || "",
    ];
    try {
      setLoading(true);
      toast.loading("dodawanie pytania");
      await axios.post("/api/question", { qid, question, answears });
      questionRef.current!.value = "";
      answear0Ref.current!.value = "";
      answear1Ref.current!.value = "";
      answear2Ref.current!.value = "";
      answear3Ref.current!.value = "";
      answear4Ref.current!.value = "";

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
          <header className="flex items-end justify-end w-full gap-2">
            <p className="text-sm opacity-50">max 20 znaków</p>
            <H3>pytanie</H3>
          </header>
          <div className="relative">
            <Input
              ref={questionRef}
              onKeyDown={handlePaste}
              disabled={loading}
              maxLength={20}
              className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
            />
            <button
              type="button"
              onClick={handleButtonPaste.bind(null, questionRef)}
              className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasteIcon />
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <header className="flex items-end gap-2">
            <H3>odpowiedzi</H3>
            <p className="text-sm opacity-50">max 20 znaków</p>
          </header>
          <div className="relative">
            <Input
              ref={answear0Ref}
              onKeyDown={handlePaste}
              disabled={loading}
              maxLength={20}
              className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
            />
            <button
              type="button"
              onClick={handleButtonPaste.bind(null, answear0Ref)}
              className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasteIcon />
            </button>
          </div>
          <div className="relative">
            <Input
              ref={answear1Ref}
              onKeyDown={handlePaste}
              disabled={loading}
              maxLength={20}
              className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
            />
            <button
              type="button"
              onClick={handleButtonPaste.bind(null, answear1Ref)}
              className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasteIcon />
            </button>
          </div>
          <div className="relative">
            <Input
              ref={answear2Ref}
              onKeyDown={handlePaste}
              disabled={loading}
              maxLength={20}
              className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
            />
            <button
              type="button"
              onClick={handleButtonPaste.bind(null, answear2Ref)}
              className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasteIcon />
            </button>
          </div>
          <div className="relative">
            <Input
              ref={answear3Ref}
              onKeyDown={handlePaste}
              disabled={loading}
              maxLength={20}
              className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
            />
            <button
              type="button"
              onClick={handleButtonPaste.bind(null, answear3Ref)}
              className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasteIcon />
            </button>
          </div>
          <div className="relative">
            <Input
              ref={answear4Ref}
              onKeyDown={handlePaste}
              disabled={loading}
              maxLength={20}
              className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
            />
            <button
              type="button"
              onClick={handleButtonPaste.bind(null, answear4Ref)}
              className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasteIcon />
            </button>
          </div>
        </section>
        <Button disabled={loading}>dodaj</Button>
      </Container>
    </form>
  );
}
