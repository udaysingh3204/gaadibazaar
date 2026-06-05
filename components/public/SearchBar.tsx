"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INDIAN_BRANDS } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (city) params.set("city", city);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 sm:p-3 shadow-xl">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Brand */}
        <div className="flex-1">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white text-[#1A1A2E] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] cursor-pointer"
          >
            <option value="">All Brands</option>
            {INDIAN_BRANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="flex-1">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (e.g. Mumbai)"
            className="w-full h-12 px-4 rounded-xl bg-white text-[#1A1A2E] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] placeholder:text-gray-400"
          />
        </div>

        {/* Budget */}
        <div className="flex-1">
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white text-[#1A1A2E] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] cursor-pointer"
          >
            <option value="">Any Budget</option>
            <option value="300000">Under ₹3 Lakh</option>
            <option value="500000">Under ₹5 Lakh</option>
            <option value="800000">Under ₹8 Lakh</option>
            <option value="1200000">Under ₹12 Lakh</option>
            <option value="1800000">Under ₹18 Lakh</option>
            <option value="2500000">Under ₹25 Lakh</option>
            <option value="5000000">Under ₹50 Lakh</option>
          </select>
        </div>

        {/* CTA */}
        <Button size="lg" onClick={handleSearch} className="h-12 px-8 shrink-0">
          <Search className="w-4 h-4 mr-2" />
          Search Cars
        </Button>
      </div>
    </div>
  );
}
