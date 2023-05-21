import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H3({ children }: Props) {
  return <h4 className="lg:text-3xl text-xl font-medium">{children}</h4>;
}
