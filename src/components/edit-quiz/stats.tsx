import { Suspense } from "react";
import Games from "./stats/games";
import Likes from "./stats/likes";
import Questions from "./stats/questions";
import Container from "../ui/container";

interface Props {
  qid: string;
}

export default function Stats({ qid }: Props) {
  return (
    <aside className="flex lg:gap-6">
      <Suspense
        fallback={
          <Container
            variant="solid-light"
            opacity="full"
            className="w-40 h-40 scale-75 lg:scale-100 animate-pulse rounded-full"
          />
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <Questions qid={qid} />
      </Suspense>
      <Suspense
        fallback={
          <Container
            variant="solid-normal"
            opacity="full"
            className="w-40 h-40 scale-75 lg:scale-100 animate-pulse rounded-full"
          />
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <Likes qid={qid} />
      </Suspense>
      <Suspense
        fallback={
          <Container
            variant="solid-dark"
            opacity="full"
            className="w-40 h-40 scale-75 lg:scale-100 animate-pulse rounded-full"
          />
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <Games qid={qid} />
      </Suspense>
    </aside>
  );
}
