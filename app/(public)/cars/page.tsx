"use client";

import { Suspense } from "react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { X, ArrowUpDown } from "lucide-react";
import FilterSidebar from "@/components/public/FilterSidebar";
import FilterDrawer from "@/components/public/FilterDrawer";
import CarGrid from "@/components/public/CarGrid";
import Pagination from "@/components/public/Pagination";
import { CarComparison } from "@/components/public/CarComparison";
import { useFilterStore } from "@/store/filterStore";
import { Button } from "@/components/ui/button";
import type { Car, CarListResponse } from "@/types/car";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "km_asc", label: "KM: Low to High" },
  { value: "year_desc", label: "Year: Newest First" },
];

function CarsContent() {
  const searchParams = useSearchParams();
  const store = useFilterStore();

  const [cars, setCars] = useState<Car[]>(() => []);
  const [total, setTotal] = useState<number>(() => 0);
  const [totalPages, setTotalPages] = useState<number>(() => 1);
  const [loading, setLoading] = useState<boolean>(() => true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  // Initialize filters from URL on first load
  useEffect(() => {
    const brand = searchParams.get("brand");
    const city = searchParams.get("city");
    const maxPrice = searchParams.get("maxPrice");
    const bodyType = searchParams.get("bodyType");
    const fuelType = searchParams.get("fuelType");

    if (brand) store.setBrand([brand]);
    if (city) store.setCity(city);
    if (maxPrice) store.setPriceRange(store.minPrice, parseInt(maxPrice));
    if (bodyType) store.setBodyType([bodyType as Parameters<typeof store.setBodyType>[0][0]]);
    if (fuelType) store.setFuelType([fuelType as Parameters<typeof store.setFuelType>[0][0]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for comparison modal open event
  useEffect(() => {
    const handleOpenComparison = () => setComparisonOpen(true);
    window.addEventListener("open-comparison", handleOpenComparison);
    return () => window.removeEventListener("open-comparison", handleOpenComparison);
  }, []);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (store.brand.length > 0) store.brand.forEach((b) => params.append("brand", b));
      if (store.city) params.set("city", store.city);
      if (store.minPrice > 0) params.set("minPrice", String(store.minPrice));
      if (store.maxPrice < 5000000) params.set("maxPrice", String(store.maxPrice));
      if (store.fuelType.length > 0) store.fuelType.forEach((f) => params.append("fuelType", f));
      if (store.transmission.length > 0) store.transmission.forEach((t) => params.append("transmission", t));
      if (store.bodyType.length > 0) store.bodyType.forEach((b) => params.append("bodyType", b));
      if (store.minYear > 2005) params.set("minYear", String(store.minYear));
      if (store.maxYear < 2025) params.set("maxYear", String(store.maxYear));
      if (store.maxKm) params.set("maxKm", store.maxKm);
      params.set("sort", store.sort);
      params.set("page", String(store.page));
      params.set("limit", "12");

      const res = await fetch(`/api/cars?${params}`);
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data: CarListResponse = await res.json();
      setCars(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setCars([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [store.brand, store.city, store.minPrice, store.maxPrice, store.fuelType, store.transmission,
      store.bodyType, store.minYear, store.maxYear, store.maxKm, store.sort, store.page]);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  // Active filter chips
  const chips: { label: string; clear: () => void }[] = [];
  if (store.brand.length > 0)
    chips.push({ label: store.brand.join(", "), clear: () => store.setBrand([]) });
  if (store.city)
    chips.push({ label: store.city, clear: () => store.setCity("") });
  if (store.maxPrice < 5000000)
    chips.push({ label: `≤ ₹${(store.maxPrice / 100000).toFixed(1)}L`, clear: () => store.setPriceRange(0, 5000000) });
  if (store.fuelType.length > 0)
    chips.push({ label: store.fuelType.join(", "), clear: () => store.setFuelType([]) });
  if (store.transmission.length > 0)
    chips.push({ label: store.transmission.join(", "), clear: () => store.setTransmission([]) });
  if (store.bodyType.length > 0)
    chips.push({ label: store.bodyType.join(", "), clear: () => store.setBodyType([]) });
  if (store.minYear > 2005 || store.maxYear < 2025)
    chips.push({ label: `${store.minYear}–${store.maxYear}`, clear: () => store.setYearRange(2005, 2025) });
  if (store.maxKm)
    chips.push({ label: `≤ ${parseInt(store.maxKm).toLocaleString("en-IN")} km`, clear: () => store.setMaxKm("") });

  return (
    <>
      <CarComparison open={comparisonOpen} onOpenChange={setComparisonOpen} />
      <div className="min-h-screen bg-[#F8F7F4] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <div className="lg:hidden">
                  <FilterDrawer />
                </div>
                <p className="text-sm text-gray-500">
                  {loading ? (
                    <span className="inline-block w-24 h-4 skeleton rounded" />
                  ) : error ? (
                    <span className="text-red-500">Error loading cars</span>
                  ) : (
                    <>Showing <strong className="text-[#0A1628]">{Array.isArray(cars) ? cars.length : 0}</strong> of{" "}
                    <strong className="text-[#0A1628]">{total}</strong> cars</>
                  )}
                </p>
              </div>

              {/* Sort */}
              <div className="sm:ml-auto flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={store.sort}
                  onChange={(e) => store.setSort(e.target.value)}
                  className="h-9 pl-3 pr-8 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-3 py-1.5 rounded-full font-medium"
                  >
                    {chip.label}
                    <button onClick={chip.clear} className="hover:text-red-600 transition-colors ml-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <Button variant="ghost" size="sm" onClick={store.clearAll} className="h-7 text-xs text-red-500 hover:text-red-700 px-2">
                  Clear All
                </Button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <p className="text-red-700 font-semibold">Unable to load cars</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            )}
            {!error && <CarGrid cars={Array.isArray(cars) ? cars : []} loading={loading} />}
            <Pagination page={store.page} totalPages={totalPages} onPageChange={store.setPage} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F4] pt-16" />}>
      <CarsContent />
    </Suspense>
  );
}
