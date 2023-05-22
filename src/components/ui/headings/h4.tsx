import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H4({ children }: Props) {
  return <h5 className="text-lg truncate">{children}</h5>;
}
