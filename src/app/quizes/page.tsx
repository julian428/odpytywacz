import QuizLink from "@/components/quizes/link";
import QuizesSearch from "@/components/quizes/search";
import prisma from "@/lib/db";
import Link from "next/link";

interface Props {
  searchParams: {
    p?: string;
    f?: string;
  };
}

async function getPageQuizes(skip: number, filter?: string) {
  try {
    const quizes = await prisma.quiz.findMany({
      skip,
      take: 9,
      where: {
        OR: [
          { title: { contains: filter } },
          { topic: { contains: filter } },
          { Owner: { name: { contains: filter } } },
        ],
      },
      select: {
        id: true,
        title: true,
        topic: true,
        description: true,
        Owner: { select: { name: true } },
      },
    });
    return quizes;
  } catch (error) {
    return [];
  }
}

export default async function page({ searchParams }: Props) {
  const currentPage = parseInt(searchParams.p || "0");
  const quizes = await getPageQuizes(currentPage * 9, searchParams.f);
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
        {quizes.map((quiz) => (
          <QuizLink
            key={quiz.id}
            quiz={quiz}
          />
        ))}
      </section>
    </article>
  );
}
