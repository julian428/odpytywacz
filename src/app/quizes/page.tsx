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
    <article className="flex flex-col items-center lg:justify-center mt-8 gap-6 lg:gap-12 lg:p-0 p-4">
      <QuizesSearch searchParams={searchParams} />
      {/* pagination */}
      <div className="btn-group">
        <Link
          href={`/quizes?p=${currentPage - 1}&f=${searchParams.f || ""}`}
          className={`btn ${currentPage <= 0 && "btn-disabled"}`}
        >
          «
        </Link>
        <button className="btn">strona {currentPage + 1}</button>
        <Link
          href={`/quizes?p=${currentPage + 1}&f=${searchParams.f || ""}`}
          className="btn"
        >
          »
        </Link>
      </div>
      {/* quizes */}
      <section className="flex flex-col lg:flex-row lg:flex-wrap gap-[5%] gap-y-8 content-start w-4/5">
        {[...new Array(9)].map((_, i) => (
          <Suspense
            key={`quiz${i}`}
            fallback={
              <Container
                variant="gradient-dark"
                className="relative p-6 space-y-4 lg:w-[30%] h-[180px] w-full animate-pulse"
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
