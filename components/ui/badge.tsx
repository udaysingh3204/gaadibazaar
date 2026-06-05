import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#0A1628] text-white",
        secondary: "bg-gray-100 text-gray-700",
        outline: "border border-gray-200 text-gray-700",
        success: "bg-green-100 text-green-700",
        verified: "bg-emerald-100 text-emerald-700",
        sold: "bg-red-100 text-red-700",
        featured: "bg-amber-100 text-amber-700",
        petrol: "bg-blue-100 text-blue-700",
        diesel: "bg-yellow-100 text-yellow-800",
        cng: "bg-green-100 text-green-700",
        electric: "bg-emerald-100 text-emerald-700",
        hybrid: "bg-teal-100 text-teal-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
