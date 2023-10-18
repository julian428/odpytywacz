import type { ReactNode } from "react";

interface Props {
  click?: () => any;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function ActionButton({
  click,
  disabled,
  active,
  className,
  children,
}: Props) {
  const styles = "";
  const activeStyles = active ? "bg-white" : "";
  console.log(active);
  return (
    <button
      onClick={click}
      disabled={disabled}
      className={className + styles + activeStyles}
    >
      {children}
    </button>
  );
}
