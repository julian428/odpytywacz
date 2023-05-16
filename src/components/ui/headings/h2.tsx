import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H2({ children }: Props) {
  return <h3 className="text-5xl font-bold">{children}</h3>;
}
