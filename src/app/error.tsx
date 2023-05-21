"use client";

import H2 from "@/components/ui/headings/h2";
import Image from "next/image";

interface Props {
  error: Error;
}

export default function error({ error }: Props) {
  return (
    <article className="flex flex-col items-center gap-16 mt-32">
      <Image
        width={100}
        height={100}
        className="lg:w-96 w-4/5"
        src={"/error.svg"}
        alt="error"
      />
      <H2>{error.message}</H2>
    </article>
  );
}
