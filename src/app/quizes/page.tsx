import QuizLink from "@/components/quizes/link";
import QuizesSearch from "@/components/quizes/search";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  searchParams: {
    p?: string;
    f?: string;
  };
}

export default function page({ searchParams }: Props) {
  const currentPage = parseInt(searchParams.p || "0");
  return (
    <article className="flex flex-col items-center mt-8 gap-6 lg:gap-12 lg:p-0 p-4">
      <QuizesSearch searchParams={searchParams} />
      {/* pagination */}
      <div className="btn-group">
        <Link
          href={`/quizes?p=${currentPage - 1}`}
          className={`btn ${currentPage <= 0 && "btn-disabled"}`}
        >
          «
        </Link>
        <button className="btn">strona {currentPage + 1}</button>
        <Link
          href={`/quizes?p=${currentPage + 1}`}
          className="btn"
        >
          »
        </Link>
      </div>
      {/* quizes */}
      <section className="flex flex-col lg:flex-row lg:flex-wrap gap-8 justify-center content-start w-full">
        {[...new Array(9)].map((_, i) => (
          <Suspense
            key={`quiz${i}`}
            fallback={
              <Container
                variant="gradient-dark"
                className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
              />
            }
          >
            {/* @ts-expect-error Async Server Component*/}
            <QuizLink
              index={i}
              page={currentPage}
              filter={searchParams.f || ""}
            />
          </Suspense>
        ))}
      </section>
    </article>
  );
}
