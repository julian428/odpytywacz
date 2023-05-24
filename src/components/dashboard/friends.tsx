import { Suspense } from "react";
import FriendsDashboardHeader from "./friends/friendsHeader";
import FriendsList from "./friends/friendsList";
import RequestList from "./friends/requestList";
import Container from "../ui/container";
import { SearchIcon } from "@/lib/icons";

interface Props {
  filter?: string;
}

export default function FriendsDashboard({ filter }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <FriendsDashboardHeader />
      <section className="h-96 lg:h-[650px] space-y-4 lg:space-y-8">
        <Container
          variant="solid-dark"
          className="w-full h-80 lg:h-[565px] flex flex-col items-center py-4 px-8"
        >
          <form className="mb-4 relative">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="wyszukaj…"
                  name="f"
                  autoComplete="off"
                  defaultValue={filter}
                  className="input bg-secondary focus:ring-0"
                />
                <button className="btn btn-square btn-secondary text-2xl">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </form>
          <Suspense fallback={null}>
            {/* @ts-expect-error Async Server Component*/}
            <FriendsList filter={filter} />
          </Suspense>
        </Container>
        <Suspense
          fallback={
            <Container
              variant="solid-dark"
              className="w-full overflow-x-auto flex gap-4 py-2 h-[52px] animate-pulse"
            />
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <RequestList />
        </Suspense>
      </section>
    </section>
  );
}
