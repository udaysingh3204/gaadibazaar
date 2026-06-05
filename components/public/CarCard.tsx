"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Fuel, Settings, Gauge, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerificationBadges } from "@/components/public/VerificationBadges";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatIndianPrice, formatKm, cn } from "@/lib/utils";
import type { Car, FuelType } from "@/types/car";

interface CarCardProps {
  car: Car;
}

const fuelBadgeMap: Record<FuelType, "petrol" | "diesel" | "cng" | "electric" | "hybrid"> = {
  PETROL: "petrol",
  DIESEL: "diesel",
  CNG: "cng",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
};

const fuelLabel: Record<FuelType, string> = {
  PETROL: "Petrol",
  DIESEL: "Diesel",
  CNG: "CNG",
  ELECTRIC: "Electric",
  HYBRID: "Hybrid",
};

export default function CarCard({ car }: CarCardProps) {
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(car.id);
  const images = Array.isArray(car.images) ? car.images : [];
  const imageUrl = images[0] || "/images/placeholders/car.jpg";

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Link href={`/cars/${car.id}`} className="relative block w-full h-full">
          <Image
            src={imageUrl}
            alt={`${car.yearOfManufacture} ${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => toggle(car.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10",
            wishlisted
              ? "bg-[#FF6B2B] text-white"
              : "bg-white/90 text-gray-500 hover:bg-white hover:text-[#FF6B2B]"
          )}
        >
          <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {car.isFeatured && (
            <Badge variant="featured">Featured</Badge>
          )}
          {car.status === "SOLD" && (
            <Badge variant="sold">Sold</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/cars/${car.id}`}>
            <h3 className="font-bold text-[#1A1A2E] text-base leading-tight hover:text-[#FF6B2B] transition-colors line-clamp-1">
              {car.yearOfManufacture} {car.brand} {car.model}
              {car.variant ? ` ${car.variant}` : ""}
            </h3>
          </Link>
        </div>

        {/* Verification Badges */}
        <div className="mb-2">
          <VerificationBadges car={car} variant="compact" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant={fuelBadgeMap[car.fuelType]}>{fuelLabel[car.fuelType]}</Badge>
          <Badge variant="secondary">{car.transmission}</Badge>
          <Badge variant="secondary">{car.numberOfOwners.replace("_PLUS", "+").replace("FOURTH", "4th")} Owner</Badge>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {formatKm(car.kmDriven)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3 h-3" />
            {car.mileageKmpl ? `${car.mileageKmpl} kmpl` : "—"}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            {car.engineCC}cc
          </span>
        </div>

        {/* Price + City */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[#FF6B2B] font-bold text-lg leading-none">
              {formatIndianPrice(car.askingPrice)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-0.5">
              <MapPin className="w-3 h-3" />
              {car.city}
            </p>
          </div>
          <div className="flex gap-1.5">
            <Button
              onClick={() => window.dispatchEvent(new CustomEvent("open-comparison", { detail: { car } }))}
              size="sm"
              variant="outline"
              title="Add to comparison"
              className="px-2.5 h-9"
            >
              <span className="text-sm">↔️</span>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href={`/cars/${car.id}`}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
