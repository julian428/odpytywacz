"use client";

import { useOcrText } from "@/providers/ocrText";
import Container from "../ui/container";
import WordBadge from "./wordBadge";

export default function WordsList() {
  const [state, Dispatch] = useOcrText();

  return (
    <Container className="lg:w-[1000px] lg:h-[700px] w-full h-96 flex flex-wrap content-start gap-4 p-4 overflow-y-auto">
      {state.words.map((word) => (
        <WordBadge
          word={word}
          key={word + "key"}
        />
      ))}
    </Container>
  );
}
