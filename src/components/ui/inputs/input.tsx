import { type ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const defaultStyles = "rounded-2xl outline-none px-4 py-1";

const inputVariants = cva(defaultStyles, {
  variants: {
    variant: {
      "default":
        "bg-color1 bg-opacity-50 hover:bg-opacity-80 focus:bg-opacity-80 transition-all duration-700",
      "solid-light": "bg-color4",
      "solid-normal": "bg-color3",
      "solid-dark": "bg-color2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export default forwardRef(function input(
  { className, variant, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className={cn(inputVariants({ variant, className }))}
      {...props}
      ref={ref}
    />
  );
});
