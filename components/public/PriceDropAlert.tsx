"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PriceDropAlertProps {
  carId: string;
  currentPrice: number;
  onAlertToggle?: (enabled: boolean) => void;
  variant?: "button" | "compact";
  initialEnabled?: boolean;
}

export function PriceDropAlert({
  carId,
  currentPrice,
  onAlertToggle,
  variant = "button",
  initialEnabled = false,
}: PriceDropAlertProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wishlist/price-alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          currentPrice,
          enabled: !enabled,
        }),
      });

      if (!response.ok) throw new Error("Failed to update alert");

      const newState = !enabled;
      setEnabled(newState);
      onAlertToggle?.(newState);

      if (newState) {
        toast.success(
          `Alert enabled! We'll notify you if price drops below ₹${(currentPrice * 0.95).toLocaleString("en-IN")}`
        );
      } else {
        toast.info("Price drop alerts disabled for this car");
      }
    } catch (error) {
      toast.error("Failed to update alert preferences");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        className={cn(
          "p-2 rounded-lg transition-all",
          enabled
            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        )}
        title={enabled ? "Price drop alert enabled" : "Enable price drop alert"}
      >
        {enabled ? (
          <Bell className="w-4 h-4 fill-current" />
        ) : (
          <BellOff className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      variant={enabled ? "default" : "outline"}
      size="sm"
      className={cn("gap-2", enabled && "bg-blue-600 hover:bg-blue-700")}
    >
      {enabled ? (
        <>
          <Bell className="w-4 h-4 fill-current" />
          Alert On
        </>
      ) : (
        <>
          <BellOff className="w-4 h-4" />
          Alert Off
        </>
      )}
    </Button>
  );
}

/**
 * Price Alert Badge - Shows on wishlist items with active alerts
 */
export function PriceAlertBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-medium">
      <Bell className="w-3 h-3 fill-current" />
      Price Alert Active
    </div>
  );
}
