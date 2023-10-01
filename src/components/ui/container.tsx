import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const defaultStyles = "rounded-2xl py-1 px-2 w-fit text-black";

const containerVariants = cva(defaultStyles, {
  variants: {
    variant: {
      "default": "bg-color1 text-white",
      "solid-light": "bg-color4",
      "solid-normal": "bg-color3",
      "solid-dark": "bg-color2",
      "solid-very-dark": "bg-color1",
      "gradient-normal": "bg-gradient-to-r from-color3 to-color4",
      "gradient-dark": "bg-gradient-to-tr from-color1 to-color2 text-white",
    },
    opacity: {
      normal: "bg-opacity-50",
      full: "bg-opacity-100",
    },
  },
  defaultVariants: {
    variant: "default",
    opacity: "normal",
  },
});

interface Props
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {}

export default function Container({
  children,
  variant,
  opacity,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(containerVariants({ variant, opacity, className }))}
      {...props}
    >
      {children}
    </div>
  );
}
