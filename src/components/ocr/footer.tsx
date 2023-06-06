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
    <footer className="flex justify-center gap-4 mt-8 pb-4">
      <Link
        href={`/quizes/${qid}/questions`}
        className="px-6 w-24 btn btn-sm"
      >
        wróć
      </Link>
      <button
        onClick={clearWords}
        className="px-6 w-24 btn btn-sm"
      >
        wyczyść
      </button>
    </footer>
  );
}
