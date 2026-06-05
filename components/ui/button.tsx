import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF6B2B] text-white rounded-full hover:bg-[#E55A1C] focus-visible:ring-[#FF6B2B]",
        secondary:
          "bg-white text-[#0A1628] border border-[#0A1628] rounded-full hover:bg-gray-50 focus-visible:ring-[#0A1628]",
        ghost:
          "hover:bg-gray-100 text-[#1A1A2E] rounded-xl",
        outline:
          "border border-gray-200 bg-white hover:bg-gray-50 text-[#1A1A2E] rounded-xl",
        destructive:
          "bg-red-600 text-white rounded-xl hover:bg-red-700",
        link: "underline-offset-4 hover:underline text-[#FF6B2B] p-0 h-auto",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
