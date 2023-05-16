import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const defaultStyles = "rounded-2xl outline-none p-2 resize-none";

const textareaVariants = cva(defaultStyles, {
  variants: {
    variant: {
      default:
        "bg-color1 bg-opacity-50 hover:bg-opacity-80 focus:bg-opacity-80 transition-all duration-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export default forwardRef(function Textarea(
  { variant, className, ...props }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cn(textareaVariants({ variant, className }))}
    />
  );
});
