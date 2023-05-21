import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H1({ children }: Props) {
  return <h2 className="lg:text-6xl text-3xl font-black">{children}</h2>;
}
