"use client";

import Image from "next/image";

interface Props {
  error: Error;
}

export default function error({ error }: Props) {
  return (
    <article className="flex flex-col items-center gap-16 mt-32 w-screen">
      <Image
        width={100}
        height={100}
        className="lg:w-96 w-4/5"
        src={"/error.svg"}
        alt="error"
      />
      <p className="break-words text-xl">{error.message}</p>
    </article>
  );
}
