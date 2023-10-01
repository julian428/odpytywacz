"use client";

import { ArrowRightIcon } from "@/lib/icons";

interface Props {
  destination: number;
}

export default function ScrollTo({ destination }: Props) {
  const move = () => {
    window.scrollTo(destination, document.body.scrollHeight);
  };
  return (
    <button
      onClick={move}
      className="text-5xl rotate-90"
    >
      <ArrowRightIcon />
    </button>
  );
}
