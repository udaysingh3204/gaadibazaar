"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteConfirmDialogProps {
  carId: string;
  carName: string;
  onDeleted: () => void;
}

export default function DeleteConfirmDialog({ carId, carName, onDeleted }: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cars/${carId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Listing removed successfully");
      setOpen(false);
      onDeleted();
    } catch {
      toast.error("Failed to remove listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <strong>{carName}</strong>? The listing will be marked as removed and hidden from public view.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? "Removing…" : "Remove Listing"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
