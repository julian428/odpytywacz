"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {children}
    </>
  );
}
