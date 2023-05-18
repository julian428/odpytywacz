import { getSearchParamsString } from "@/lib/utils";
import Link from "next/link";

interface Props {
  count: number;
  currentPage: number;
  params: { [index: string]: string };
}

export default function SelectPage({ count, currentPage, params }: Props) {
  if (count === 1) return <></>;

  let pagesArray: (number | null)[] = [];
  if (count === 2) {
    pagesArray = [0, 1];
  } else if (currentPage === 0) pagesArray = [0, 1, 2];
  else if (currentPage === count - 1)
    pagesArray = [count - 3, count - 2, count - 1];
  else pagesArray = [currentPage - 1, currentPage, currentPage + 1];

  const paramsString = getSearchParamsString(params, { blacklist: ["p"] });

  return (
    <footer className="relative">
      {currentPage > 0 && count !== 2 && (
        <Link
          href={`/quizes?${paramsString}p=${currentPage - 1}`}
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
              paramsString={paramsString}
              page={page}
              isCurrent={currentPage === page}
            />
          );
        })}
      </section>
      {currentPage < count - 1 && count !== 2 && (
        <Link
          href={`/quizes?${paramsString}p=${currentPage + 1}`}
          className="absolute -right-4 top-1/2 -translate-y-1/2"
        >
          {">"}
        </Link>
      )}
    </footer>
  );
}

function PageLink({
  page,
  isCurrent,
  paramsString,
}: {
  page: number;
  isCurrent: boolean;
  paramsString: string;
}) {
  return (
    <Link href={`/quizes?${paramsString}p=${page}`}>
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
