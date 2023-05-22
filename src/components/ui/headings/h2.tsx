import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H2({ children }: Props) {
  return (
    <h3 className="lg:text-5xl text-3xl font-bold truncate">{children}</h3>
  );
}
