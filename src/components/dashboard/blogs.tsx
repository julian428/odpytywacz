import { SearchIcon } from "@/lib/icons";
import BlogsDashboardHeader from "./blogs/blogsHeader";
import BlogsList from "./blogs/blogsList";
import Container from "../ui/container";
import { Suspense } from "react";

interface Props {
  filter?: string;
}

export default function BlogDashboard({ filter }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <BlogsDashboardHeader />
      <Container
        className="w-full h-80 lg:w-[400px] lg:h-[600px] flex flex-col items-center py-4 px-8"
        variant="solid-normal"
      >
        <form className="mb-4 relative">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="wyszukaj…"
                defaultValue={filter}
                name="b"
                autoComplete="off"
                className="input bg-neutral focus:ring-0"
              />
              <button className="btn btn-square bg-neutral text-2xl">
                <SearchIcon />
              </button>
            </div>
          </div>
        </form>
        <Suspense>
          {/* @ts-expect-error Async Server Component*/}
          <BlogsList filter={filter} />
        </Suspense>
      </Container>
    </section>
  );
}
