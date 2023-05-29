"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  message: string;
  className?: string;
  children: ReactNode;
}

export default function SubmitToast({
  children,
  className,
  message,
  ...props
}: Props) {
  const sendToast = async () => {
    const toast = (await import("react-hot-toast")).default;
    toast.success(message);
  };
  return (
    <button
      onClick={sendToast}
      type="submit"
      {...props}
      className={className}
    >
      {children}
    </button>
  );
}
