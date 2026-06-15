"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, MapPin, Gauge, Phone, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatIndianPrice, formatKm } from "@/lib/utils";

interface SellerInfo {
  name: string;
  phone: string;
  email: string | null;
  city: string;
}

interface PendingCar {
  id: string;
  brand: string;
  model: string;
  variant: string | null;
  yearOfManufacture: number;
  fuelType: string;
  transmission: string;
  kmDriven: number;
  askingPrice: number;
  city: string;
  images: string[];
  sellerName: string;
  sellerPhone: string;
  highlights: string[];
  createdAt: string;
  seller: SellerInfo | null;
}

interface Props {
  cars: PendingCar[];
}

export function PendingListingsClient({ cars: initialCars }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [cars, setCars] = useState(initialCars);
  const [processing, setProcessing] = useState<string | null>(null);

  const handleAction = async (carId: string, action: "approve" | "reject") => {
    setProcessing(carId);
    try {
      const status = action === "approve" ? "ACTIVE" : "REMOVED";
      const res = await fetch(`/api/cars/${carId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Request failed");

      setCars((prev) => prev.filter((c) => c.id !== carId));
      toast.success(action === "approve" ? "Listing approved and live!" : "Listing rejected.");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Action failed. Try again.");
    } finally {
      setProcessing(null);
    }
  };

  if (cars.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-2xl border border-gray-100">
        <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">All caught up! No pending listings.</p>
        <p className="text-gray-400 text-sm mt-1">New private seller submissions will appear here.</p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/admin/listings">View All Listings</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cars.map((car) => {
        const images = Array.isArray(car.images) ? car.images : [];
        const highlights = Array.isArray(car.highlights) ? car.highlights : [];
        const isProcessing = processing === car.id;

        return (
          <div
            key={car.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row"
          >
            {/* Image */}
            <div className="sm:w-48 shrink-0 bg-gray-100 relative aspect-[4/3] sm:aspect-auto">
              {images[0] ? (
                <Image
                  src={images[0]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No photo</div>
              )}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-[10px]">
                  {images.length} photo{images.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-700 border-amber-200">
                      Private Seller
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(car.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0A1628] text-lg">
                    {car.yearOfManufacture} {car.brand} {car.model}
                    {car.variant ? ` ${car.variant}` : ""}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {car.city}</span>
                    <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {formatKm(car.kmDriven)}</span>
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
                  </div>
                </div>
                <p className="text-xl font-extrabold text-[#FF6B2B] shrink-0">
                  {formatIndianPrice(car.askingPrice)}
                </p>
              </div>

              {/* Seller info */}
              <div className="bg-[#F8F7F4] rounded-xl p-3 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <strong>{car.sellerName}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  +91 {car.sellerPhone}
                </span>
                {car.seller?.email && (
                  <span className="text-gray-500">{car.seller.email}</span>
                )}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {highlights.slice(0, 6).map((h) => (
                    <span key={h} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-auto pt-1">
                <Button
                  onClick={() => handleAction(car.id, "approve")}
                  disabled={isProcessing}
                  className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
                  size="sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isProcessing ? "Processing…" : "Approve & Publish"}
                </Button>
                <Button
                  onClick={() => handleAction(car.id, "reject")}
                  disabled={isProcessing}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button asChild variant="ghost" size="sm" className="gap-1.5 ml-auto">
                  <Link href={`/admin/listings/${car.id}/edit`}>
                    <ExternalLink className="w-4 h-4" />
                    Full Edit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
