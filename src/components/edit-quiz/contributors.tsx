import ContributorsList from "./contributors/contributors";
import FriendsList from "./contributors/friends";
import H3 from "../ui/headings/h3";
import { Suspense } from "react";
import Container from "../ui/container";

interface Props {
  qid: string;
}

export default function Contributors({ qid }: Props) {
  return (
    <section className="flex flex-col justify-between mb-12">
      <aside className="space-y-2">
        <H3>dodaj znajomych</H3>
        <Suspense
          fallback={
            <Container className="w-full lg:w-96 h-32 p-4 animate-pulse" />
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <FriendsList qid={qid} />
        </Suspense>
      </aside>
      <aside className="space-y-2 mt-8">
        <H3>wspólnicy</H3>
        <Suspense
          fallback={
            <Container className="w-full lg:w-96 h-[485px] p-4 animate-pulse" />
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <ContributorsList qid={qid} />
        </Suspense>
      </aside>
    </section>
  );
}
