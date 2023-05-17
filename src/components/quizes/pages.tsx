import Link from "next/link";

interface Props {
  count: number;
  currentPage: number;
}

export default function SelectPage({ count, currentPage }: Props) {
  if (count === 1) return <></>;

  let pagesArray: (number | null)[] = [];
  if (currentPage === 0) pagesArray = [0, 1, 2];
  else if (currentPage === count - 1)
    pagesArray = [count - 3, count - 2, count - 1];
  else pagesArray = [currentPage - 1, currentPage, currentPage + 1];

  return (
    <footer className="absolute bottom-8 h-fit">
      {currentPage > 0 && (
        <Link
          href={`/quizes?p=${currentPage - 1}`}
          className="absolute -left-4 top-1/2 -translate-y-1/2"
        >
          {"<"}
        </Link>
      )}
      <section className="flex gap-2">
        {pagesArray.map((page) => {
          if (page === null) return <></>;
          return (
            <PageLink
              key={`pageLink${page}`}
              page={page}
              isCurrent={currentPage === page}
            />
          );
        })}
      </section>
      {currentPage < count - 1 && (
        <Link
          href={`/quizes?p=${currentPage + 1}`}
          className="absolute -right-4 top-1/2 -translate-y-1/2"
        >
          {">"}
        </Link>
      )}
    </footer>
  );
}

function PageLink({ page, isCurrent }: { page: number; isCurrent: boolean }) {
  return (
    <Link href={`/quizes?p=${page}`}>
      <div
        className={`w-6 h-6 flex justify-center items-center rounded-lg border-2 ${
          isCurrent ? "border-color2" : "border-color1"
        }`}
      >
        {page + 1}
      </div>
    </Link>
  );
}
