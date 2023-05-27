"use client";

import { SearchIcon } from "@/lib/icons";

interface Props {
  searchParams: { [index: string]: string };
}

export default function QuizesSearch({ searchParams }: Props) {
  return (
    <form className="mb-4 relative">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="wyszukaj…"
            name="f"
            autoComplete="off"
            defaultValue={searchParams.f}
            className="input focus:ring-0"
          />
          <button className="btn btn-square text-2xl">
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  );
}
