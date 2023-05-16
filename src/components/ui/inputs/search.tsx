"use client";

import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ForwardedRef,
  forwardRef,
} from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FilterIcon } from "@/lib/icons";
import Input from "./input";
import Container from "../container";

const defaultStyles = "absolute top-1/2 -translate-y-1/2";

const searchVariants = cva(defaultStyles, {
  variants: {
    position: {
      right: "right-3",
      left: "left-3",
    },
  },
  defaultVariants: {
    position: "right",
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof searchVariants> {
  variant?:
    | "default"
    | "solid-light"
    | "solid-normal"
    | "solid-dark"
    | null
    | undefined;
  filter?: (event: ChangeEvent<HTMLInputElement>) => any;
}

export default forwardRef(function Search(
  { position, className, variant, filter, children, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    if (!filter) return;
    filter(event);
  };

  return (
    <section className="relative w-fit">
      <Input
        variant={variant}
        onChange={handleFilter}
        className="pr-8"
        ref={ref}
      />
      <button
        {...props}
        className={cn(searchVariants({ position, className }))}
      >
        <FilterIcon className="w-5 h-5" />
      </button>
    </section>
  );
});
