"use client";

import Search from "@/components/ui/inputs/search";
import { getSearchParamsString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
  searchParams: { [index: string]: string };
}

export default function QuizesSearch({ searchParams }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchFilter = () => {
    const searchString = getSearchParamsString(searchParams, {
      blacklist: ["f"],
      replace: [["p", "0"]],
    });
    if (!searchRef.current || searchRef.current.value.length < 1) {
      router.push(`/quizes?${searchString}`);
    } else {
      router.push(`/quizes?${searchString}f=${searchRef.current.value}`);
    }
  };

  return (
    <Search
      defaultValue={searchParams.f}
      onClick={searchFilter}
      ref={searchRef}
    />
  );
}
