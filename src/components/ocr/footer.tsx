"use client";

import Link from "next/link";
import Button from "../ui/button";
import { useOcrText } from "@/providers/ocrText";

interface Props {
  qid: string;
}

export default function Footer({ qid }: Props) {
  const [state, Dispatch] = useOcrText();

  const clearWords = () => {
    Dispatch({ type: "set-words", payload: "" });
  };

  return (
    <footer className="flex justify-evenly mt-8">
      <Link href={`/quizes/${qid}/questions`}>
        <Button className="px-6">wróć</Button>
      </Link>
      <Button
        onClick={clearWords}
        className="px-6"
      >
        wyczyść
      </Button>
    </footer>
  );
}
