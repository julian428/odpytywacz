import H2 from "@/components/ui/headings/h2";
import List from "./list";
import { Suspense } from "react";
import Container from "@/components/ui/container";
import RequestsList from "./requestsList";

interface Props {
  page: string;
  friend?: string;
}

export default function FriendsList({ page, friend }: Props) {
  return (
    <section className="h-[688px] flex flex-col justify-between items-center">
      <H2>lista znajomych</H2>
      <Suspense
        fallback={<Container className="h-[500px] w-[400px] animate-pulse" />}
      >
        {/* @ts-expect-error Async Server Component*/}
        <List
          page={page}
          filter={friend}
        />
      </Suspense>
      <Suspense
        fallback={<Container className="w-[400px] h-[60px] animate-pulse" />}
      >
        {/* @ts-expect-error Async Server Component*/}
        <RequestsList />
      </Suspense>
    </section>
  );
}
