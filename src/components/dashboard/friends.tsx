import { Suspense } from "react";
import FriendsDashboardHeader from "./friends/friendsHeader";
import FriendsList from "./friends/friendsList";
import RequestList from "./friends/requestList";
import Container from "../ui/container";

interface Props {
  filter?: string;
  requests: {
    name: string;
    owner: string;
    id: string;
  }[];
}

export default function FriendsDashboard({ filter, requests }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <FriendsDashboardHeader />
      <section className="h-96 lg:h-[650px] space-y-4 lg:space-y-8">
        <Suspense
          fallback={
            <Container
              variant="solid-normal"
              className="w-full h-80 lg:h-[565px] py-4 px-8 animate-pulse"
            />
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <FriendsList filter={filter} />
        </Suspense>
        <RequestList requests={requests} />
      </section>
    </section>
  );
}
