"use client";

import { ReactNode } from "react";

interface Props {
  message: string;
  className?: string;
  children: ReactNode;
}

export default function SubmitToast({ children, className, message }: Props) {
  const sendToast = async () => {
    const toast = (await import("react-hot-toast")).default;
    toast.success(message);
  };
  return (
    <button
      onClick={sendToast}
      type="submit"
      className={className}
    >
      {children}
    </button>
  );
}
