"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-xl"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={cn(
              "w-9 h-9 rounded-xl text-sm font-medium transition-all",
              p === page
                ? "bg-[#FF6B2B] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF6B2B] hover:text-[#FF6B2B]"
            )}
          >
            {p}
          </button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-xl"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
