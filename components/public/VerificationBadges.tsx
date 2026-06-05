"use client";

import { Phone, Mail, FileCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Car } from "@/types/car";

interface VerificationBadgesProps {
  car: Car;
  variant?: "inline" | "stack" | "compact";
  showLabel?: boolean;
}

export function VerificationBadges({ car, variant = "inline", showLabel = false }: VerificationBadgesProps) {
  // Mock verification data (in future, will come from database)
  const verification = {
    phone: true,
    email: car.isVerified,
    rc: car.isVerified,
  };

  const badges = [
    { key: "phone", label: "Phone", icon: Phone, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { key: "email", label: "Email", icon: Mail, color: "bg-purple-50 text-purple-600 border-purple-200" },
    { key: "rc", label: "RC", icon: FileCheck, color: "bg-green-50 text-green-600 border-green-200" },
  ];

  const verified = badges.filter((b) => verification[b.key as keyof typeof verification]);

  if (verified.length === 0) return null;

  if (variant === "stack") {
    return (
      <div className="flex flex-col gap-1.5">
        {verified.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.key} className={cn("flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium", badge.color)}>
              <Icon className="w-3.5 h-3.5" />
              {badge.label} Verified
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1">
        {verified.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.key} className={cn("p-1.5 rounded-full border", badge.color)} title={`${badge.label} Verified`}>
              <Icon className="w-3 h-3" />
            </div>
          );
        })}
      </div>
    );
  }

  // inline variant (default)
  return (
    <div className="flex flex-wrap gap-2">
      {verified.map((badge) => {
        const Icon = badge.icon;
        return (
          <div key={badge.key} className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium", badge.color)}>
            <Icon className="w-3 h-3" />
            {showLabel ? `${badge.label} ✓` : "✓"}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Hero Badge - Shows overall seller verification status
 * Used on car detail page and search results
 */
export function VerificationHeroBadge({ car }: { car: Car }) {
  if (!car.isVerified) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      <span className="text-sm font-semibold text-emerald-700">Verified Seller</span>
    </div>
  );
}
