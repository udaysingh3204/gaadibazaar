"use client";

import { useFilterStore } from "@/store/filterStore";
import { INDIAN_BRANDS, formatIndianPrice } from "@/lib/utils";
import type { FuelType, Transmission, BodyType } from "@/types/car";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: "PETROL", label: "Petrol" },
  { value: "DIESEL", label: "Diesel" },
  { value: "CNG", label: "CNG" },
  { value: "ELECTRIC", label: "Electric" },
  { value: "HYBRID", label: "Hybrid" },
];

const TRANSMISSIONS: { value: Transmission; label: string }[] = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automatic" },
  { value: "AMT", label: "AMT" },
  { value: "CVT", label: "CVT" },
  { value: "DCT", label: "DCT" },
];

const BODY_TYPES: { value: BodyType; label: string }[] = [
  { value: "HATCHBACK", label: "Hatchback" },
  { value: "SEDAN", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "MUV", label: "MUV" },
  { value: "COUPE", label: "Coupe" },
  { value: "VAN", label: "Van" },
];

const KM_OPTIONS = [
  { value: "20000", label: "< 20,000 km" },
  { value: "50000", label: "20,000 – 50,000 km" },
  { value: "100000", label: "50,000 – 1,00,000 km" },
  { value: "999999", label: "> 1,00,000 km" },
];

function TogglePill<T extends string>({
  value,
  label,
  selected,
  onToggle,
}: {
  value: T;
  label: string;
  selected: boolean;
  onToggle: (v: T) => void;
}) {
  return (
    <button
      onClick={() => onToggle(value)}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        selected
          ? "bg-[#FF6B2B] text-white border-[#FF6B2B]"
          : "bg-white text-gray-600 border-gray-200 hover:border-[#FF6B2B]"
      }`}
    >
      {label}
    </button>
  );
}

interface FilterSidebarProps {
  onClose?: () => void;
}

export default function FilterSidebar({ onClose }: FilterSidebarProps) {
  const store = useFilterStore();
  const activeCount = store.getActiveFilterCount();

  const toggleFuel = (f: FuelType) => {
    const current = store.fuelType;
    store.setFuelType(
      current.includes(f) ? current.filter((x) => x !== f) : [...current, f]
    );
  };

  const toggleTransmission = (t: Transmission) => {
    const current = store.transmission;
    store.setTransmission(
      current.includes(t) ? current.filter((x) => x !== t) : [...current, t]
    );
  };

  const toggleBodyType = (b: BodyType) => {
    const current = store.bodyType;
    store.setBodyType(
      current.includes(b) ? current.filter((x) => x !== b) : [...current, b]
    );
  };

  const toggleBrand = (b: string) => {
    const current = store.brand;
    store.setBrand(
      current.includes(b) ? current.filter((x) => x !== b) : [...current, b]
    );
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <h2 className="font-bold text-[#0A1628]">
          Filters {activeCount > 0 && <span className="ml-1 text-[#FF6B2B]">({activeCount})</span>}
        </h2>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={store.clearAll} className="text-xs text-red-500 hover:text-red-700 h-8">
              Clear All
            </Button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">City</label>
          <input
            type="text"
            value={store.city}
            onChange={(e) => store.setCity(e.target.value)}
            placeholder="e.g. Mumbai, Delhi"
            className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">Brand</label>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
            {INDIAN_BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={store.brand.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="rounded accent-[#FF6B2B]"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#FF6B2B]">{b}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">
            Budget:{" "}
            <span className="font-normal text-gray-500">
              {formatIndianPrice(store.minPrice)} – {formatIndianPrice(store.maxPrice)}
            </span>
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={5000000}
              step={50000}
              value={store.maxPrice}
              onChange={(e) => store.setPriceRange(store.minPrice, Number(e.target.value))}
              className="w-full accent-[#FF6B2B]"
            />
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">
            Year: <span className="font-normal text-gray-500">{store.minYear} – {store.maxYear}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={2000}
              max={2025}
              value={store.minYear}
              onChange={(e) => store.setYearRange(Number(e.target.value), store.maxYear)}
              className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
            />
            <input
              type="number"
              min={2000}
              max={2025}
              value={store.maxYear}
              onChange={(e) => store.setYearRange(store.minYear, Number(e.target.value))}
              className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
            />
          </div>
        </div>

        {/* KM Driven */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">KM Driven</label>
          <div className="space-y-1">
            {KM_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="maxKm"
                  value={opt.value}
                  checked={store.maxKm === opt.value}
                  onChange={() => store.setMaxKm(opt.value)}
                  className="accent-[#FF6B2B]"
                />
                <span className="text-sm text-gray-600">{opt.label}</span>
              </label>
            ))}
            {store.maxKm && (
              <button onClick={() => store.setMaxKm("")} className="text-xs text-red-500 hover:underline mt-1">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">Fuel Type</label>
          <div className="flex flex-wrap gap-2">
            {FUEL_TYPES.map((f) => (
              <TogglePill
                key={f.value}
                value={f.value}
                label={f.label}
                selected={store.fuelType.includes(f.value)}
                onToggle={toggleFuel}
              />
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">Transmission</label>
          <div className="flex flex-wrap gap-2">
            {TRANSMISSIONS.map((t) => (
              <TogglePill
                key={t.value}
                value={t.value}
                label={t.label}
                selected={store.transmission.includes(t.value)}
                onToggle={toggleTransmission}
              />
            ))}
          </div>
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-sm font-semibold text-[#0A1628] mb-2">Body Type</label>
          <div className="flex flex-wrap gap-2">
            {BODY_TYPES.map((b) => (
              <TogglePill
                key={b.value}
                value={b.value}
                label={b.label}
                selected={store.bodyType.includes(b.value)}
                onToggle={toggleBodyType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
