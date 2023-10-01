import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const defaultStyles = "disabled:opacity-50";

const buttonVariants = cva(defaultStyles, {
  // I can't use the full names becouse they are default in the HTMLAttributes
  variants: {
    variant: {
      normal: "bg-gradient-to-tr",
      ghost: "border-2",
    },
    tp: {
      //type
      normal: "rounded-2xl",
      round: "rounded-full",
    },
    bg: {
      //background
      light: "from-color3 to-color4 border-color4 text-black",
      normal: "from-color2 to-color3 border-color3 text-black",
      dark: "from-color1 to-color2 border-color2 text-white",
    },
    sz: {
      //size
      small: "px-2 py-1 text-xs",
      normal: "py-1 px-4",
      large: "py-2 px-6",
      even: "p-2",
    },
  },
  defaultVariants: {
    variant: "normal",
    tp: "normal",
    bg: "normal",
    sz: "normal",
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default forwardRef(function Button(
  { children, variant, bg, tp, sz, className, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, bg, tp, sz, className }))}
      {...props}
    >
      {children}
    </button>
  );
});
