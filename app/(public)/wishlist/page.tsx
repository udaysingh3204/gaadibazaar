"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import CarGrid from "@/components/public/CarGrid";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Car } from "@/types/car";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.ids);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlistCars = async () => {
      if (wishlistIds.length === 0) {
        setCars([]);
        setLoading(false);
        return;
      }

      try {
        const promises = wishlistIds.map((id) =>
          fetch(`/api/cars/${id}`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch car ${id}`);
            return res.json();
          })
        );

        const results = await Promise.all(promises);
        setCars(results.map((r) => r.data || r).filter(Boolean));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistCars();
  }, [wishlistIds]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-64" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {cars.length > 0
              ? `You have ${cars.length} car${cars.length !== 1 ? "s" : ""} in your wishlist`
              : "Your wishlist is empty"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8">
            <p className="text-red-700 font-semibold">Error loading wishlist</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {cars.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-[#0A1628] mb-2">No cars yet</h2>
            <p className="text-gray-600 mb-6">
              Start building your wishlist by liking cars you love.
            </p>
            <Button asChild>
              <Link href="/cars">Browse Cars</Link>
            </Button>
          </div>
        ) : (
          <CarGrid cars={cars} loading={false} />
        )}
      </div>
    </div>
  );
}
