import { SearchIcon } from "@/lib/icons";
import Container from "../../ui/container";
import { Suspense } from "react";
import GetFilteredUsers from "./getFilteredUsers";

interface Props {
  filter?: string;
}

export default function AddFriend({ filter }: Props) {
  return (
    <section className="flex flex-col items-center w-full lg:w-fit justify-between">
      <form className="mb-4 relative">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="wyszukaj…"
              name="friend"
              autoComplete="off"
              defaultValue={filter}
              className="input focus:ring-0"
            />
            <button className="btn btn-square text-2xl">
              <SearchIcon />
            </button>
          </div>
        </div>
      </form>
      <Container className="lg:h-[600px] lg:w-[400px] h-96 w-full">
        <Suspense fallback={null}>
          {/* @ts-expect-error Async Server Component*/}
          <GetFilteredUsers filter={filter} />
        </Suspense>
      </Container>
    </section>
  );
}
