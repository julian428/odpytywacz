import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H1({ children }: Props) {
  return <h2 className="text-6xl font-black">{children}</h2>;
}
