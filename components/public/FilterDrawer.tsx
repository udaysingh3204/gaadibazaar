"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FilterSidebar from "./FilterSidebar";
import { useFilterStore } from "@/store/filterStore";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const activeCount = useFilterStore((s) => s.getActiveFilterCount());

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative"
      >
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        Filters
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FF6B2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-sm w-full h-[90vh] overflow-hidden flex flex-col">
          <FilterSidebar onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
