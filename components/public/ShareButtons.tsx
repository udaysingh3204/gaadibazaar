"use client";

import { MessageCircle, Link2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Car } from "@/types/car";

interface ShareButtonsProps {
  car: Car;
  carUrl?: string;
}

export function ShareButtons({ car, carUrl }: ShareButtonsProps) {
  const url = carUrl || (typeof window !== "undefined" ? window.location.href : "");
  const title = `${car.yearOfManufacture} ${car.brand} ${car.model}`;
  const message = `Check out this ${car.yearOfManufacture} ${car.brand} ${car.model} on GaadiBazaar! Price: ₹${car.askingPrice.toLocaleString("en-IN")} in ${car.city}. ${url}`;

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleWhatsApp}
        variant="outline"
        size="sm"
        className="gap-2 border-green-200 text-green-700 hover:bg-green-50"
      >
        <MessageCircle className="w-4 h-4" />
        Share on WhatsApp
      </Button>

      <Button
        onClick={handleCopyLink}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Copy className="w-4 h-4" />
        Copy Link
      </Button>
    </div>
  );
}
