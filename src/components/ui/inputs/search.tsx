"use client";

import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useRef,
} from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/lib/icons";
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
  defaultValue?: string;
  filter?: (event: ChangeEvent<HTMLInputElement>) => any;
}

export default forwardRef(function Search(
  {
    position,
    className,
    variant,
    filter,
    children,
    defaultValue,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    if (filter) {
      filter(event);
    }
  };

  return (
    <section className="relative w-fit">
      <Input
        variant={variant}
        defaultValue={defaultValue}
        onChange={handleFilter}
        onKeyUp={(event) => event.key === "Enter" && buttonRef.current?.click()}
        className="pr-8"
        ref={ref}
      />
      <button
        aria-label="wyszukaj"
        {...props}
        ref={buttonRef}
        className={cn(searchVariants({ position, className }))}
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </section>
  );
});
