"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, Gauge, Calendar, Users, Fuel, Settings, Shield, MapPin, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatIndianPrice, formatKm } from "@/lib/utils";
import type { Car, FuelType } from "@/types/car";

interface CarComparisonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCars?: Car[];
}

const fuelLabel: Record<FuelType, string> = {
  PETROL: "Petrol",
  DIESEL: "Diesel",
  CNG: "CNG",
  ELECTRIC: "Electric",
  HYBRID: "Hybrid",
};

export function CarComparison({ open, onOpenChange, initialCars = [] }: CarComparisonProps) {
  const [selectedCars, setSelectedCars] = useState<Car[]>(initialCars.slice(0, 3));
  const [searchQuery, setSearchQuery] = useState("");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all cars for selection
  const fetchCars = useCallback(async () => {
    if (allCars.length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cars?limit=100`);
      const data = await res.json();
      setAllCars(data.data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  }, [allCars.length]);

  const handleAddCar = (car: Car) => {
    if (selectedCars.length < 3 && !selectedCars.find((c) => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
      setSearchQuery("");
    }
  };

  const handleRemoveCar = (carId: string) => {
    setSelectedCars(selectedCars.filter((c) => c.id !== carId));
  };

  const filteredCars = allCars.filter((car) => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return (
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.city.toLowerCase().includes(query)
    );
  });

  const specs = [
    { label: "Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Year", key: "yearOfManufacture" },
    { label: "Price", key: "askingPrice" },
    { label: "KM Driven", key: "kmDriven" },
    { label: "Fuel Type", key: "fuelType" },
    { label: "Transmission", key: "transmission" },
    { label: "Engine (CC)", key: "engineCC" },
    { label: "Mileage (kmpl)", key: "mileageKmpl" },
    { label: "Body Type", key: "bodyType" },
    { label: "Owners", key: "numberOfOwners" },
    { label: "City", key: "city" },
    { label: "Verified", key: "isVerified" },
  ];

  const getSpecValue = (car: Car, key: string) => {
    const value = (car as any)[key];
    if (key === "askingPrice") return formatIndianPrice(value);
    if (key === "kmDriven") return formatKm(value);
    if (key === "fuelType") return fuelLabel[value as FuelType];
    if (key === "isVerified") return value ? "✓ Verified" : "Not Verified";
    if (key === "numberOfOwners") return value.replace("_PLUS", "+").replace("FOURTH", "4th") + " Owner";
    if (key === "transmission") return value;
    if (key === "bodyType") return value;
    if (key === "numberOfOwners") return value;
    if (value === null || value === undefined) return "—";
    return String(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex items-center justify-between mb-6">
          <div>
            <DialogTitle className="text-2xl">Compare Cars</DialogTitle>
            <p className="text-sm text-gray-500 mt-1">Select up to 3 cars to compare specs and pricing</p>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Car Selection Section */}
        {selectedCars.length < 3 && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Add cars to compare ({selectedCars.length}/3)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by brand, model, or city... (e.g., 'BMW', 'Delhi')"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!allCars.length) fetchCars();
                }}
                onFocus={() => !allCars.length && fetchCars()}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] text-sm"
              />
              {searchQuery && filteredCars.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  {filteredCars.slice(0, 6).map((car) => (
                    <button
                      key={car.id}
                      onClick={() => handleAddCar(car)}
                      disabled={!!selectedCars.find((c) => c.id === car.id)}
                      className="w-full flex items-center justify-between gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{car.yearOfManufacture} {car.brand} {car.model}</p>
                        <p className="text-xs text-gray-500">{formatIndianPrice(car.askingPrice)} • {car.city}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700 w-32">Specification</th>
                {selectedCars.map((car) => (
                  <th key={car.id} className="px-4 py-3 text-center font-semibold text-gray-700 min-w-[240px] border-l border-gray-200">
                    <div className="flex justify-center mb-3">
                      <button
                        onClick={() => handleRemoveCar(car.id)}
                        className="p-1 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="aspect-[16/10] relative rounded-lg overflow-hidden mb-3 bg-gray-100">
                      <Image
                        src={Array.isArray(car.images) && car.images.length > 0 ? car.images[0] : "/images/placeholders/car.svg"}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link href={`/cars/${car.id}`}>
                      <h3 className="font-bold text-gray-900 hover:text-[#FF6B2B] transition-colors line-clamp-2">
                        {car.yearOfManufacture} {car.brand} {car.model}
                      </h3>
                    </Link>
                    <p className="text-[#FF6B2B] font-bold mt-2 mb-3">{formatIndianPrice(car.askingPrice)}</p>
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/cars/${car.id}`}>View Details</Link>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, idx) => (
                <tr
                  key={spec.key}
                  className={cn(
                    "border-b border-gray-100",
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  )}
                >
                  <td className="px-4 py-3 font-medium text-gray-700">{spec.label}</td>
                  {selectedCars.map((car) => (
                    <td
                      key={car.id}
                      className="px-4 py-3 text-center border-l border-gray-200 text-gray-600"
                    >
                      {getSpecValue(car, spec.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedCars.length === 0 && (
          <div className="py-12 text-center">
            <Gauge className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Search for cars to compare</p>
            <p className="text-sm text-gray-400 mt-1">Compare up to 3 cars side-by-side to make the right choice</p>
          </div>
        )}

        {/* Footer */}
        {selectedCars.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button
              onClick={() => onOpenChange(false)}
              variant="secondary"
              className="w-full"
            >
              Done Comparing
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
