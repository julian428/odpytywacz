import { Dispatch, SetStateAction } from "react";

interface Props {
  page: number;
  maxPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Paging({ page, maxPage, setPage }: Props) {
  const nextPage = () => {
    if (page >= maxPage) return;
    setPage((page) => page + 1);
  };
  const prevPage = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  return (
    <div className="btn-group">
      <button
        onClick={prevPage}
        className="btn bg-color1 hover:bg-color2 hover:bg-opacity-70"
      >
        «
      </button>
      <button className="btn bg-color1 hover:bg-color2 hover:bg-opacity-70">
        strona {page}
      </button>
      <button
        onClick={nextPage}
        className="btn bg-color1 hover:bg-color2 hover:bg-opacity-70"
      >
        »
      </button>
    </div>
  );
}
