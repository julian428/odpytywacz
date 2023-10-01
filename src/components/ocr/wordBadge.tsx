"use client";

import { useRef } from "react";
import Button from "../ui/button";
import { useOcrText } from "@/providers/ocrText";
import { toast } from "react-hot-toast";

export default function WordBadge({ word }: { word: string }) {
  const badgeRef = useRef<HTMLButtonElement>(null);
  const [state, Dispatch] = useOcrText();

  const handleClipBoard = () => {
    if (!badgeRef || !badgeRef.current) return;
    const payload = badgeRef.current.innerHTML;
    Dispatch({ type: "set-clipboard", payload });
    toast.success("skopiowano");
    badgeRef.current?.classList.add("opacity-50");
  };

  return (
    <Button
      onClick={handleClipBoard}
      ref={badgeRef}
      className="flex-grow"
    >
      {word}
    </Button>
  );
}
