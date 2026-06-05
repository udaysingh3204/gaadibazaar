"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, ShieldCheck, Star, Search } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { formatIndianPrice, formatKm } from "@/lib/utils";
import type { Car, ListingStatus } from "@/types/car";

const STATUS_TABS: { value: "ALL" | ListingStatus; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "SOLD", label: "Sold" },
  { value: "ON_HOLD", label: "On Hold" },
];

const statusVariantMap: Record<ListingStatus, "success" | "sold" | "secondary" | "outline"> = {
  ACTIVE: "success",
  SOLD: "sold",
  ON_HOLD: "secondary",
  REMOVED: "outline",
};

interface ListingsTableProps {
  cars: Car[];
}

export default function ListingsTable({ cars }: ListingsTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [tab, setTab] = useState<"ALL" | ListingStatus>("ALL");
  const [search, setSearch] = useState("");

  const filtered = cars.filter((c) => {
    const matchTab = tab === "ALL" || c.status === tab;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.brand.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const handleStatusChange = async (id: string, status: ListingStatus) => {
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status updated");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.value
                  ? "bg-[#FF6B2B] text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand, model, city…"
            className="pl-9 pr-3 h-9 w-full sm:w-64 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-500">Car</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500">Year</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500">Price</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500">KM</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500">City</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500">Flags</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                  No listings found.
                </td>
              </tr>
            ) : (
              filtered.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                  {/* Car */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {car.images[0] ? (
                          <Image
                            src={car.images[0]}
                            alt={car.model}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1A2E] leading-tight">
                          {car.brand} {car.model}
                        </p>
                        {car.variant && (
                          <p className="text-xs text-gray-400">{car.variant}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{car.yearOfManufacture}</td>
                  <td className="px-4 py-3 font-semibold text-[#FF6B2B]">
                    {formatIndianPrice(car.askingPrice)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatKm(car.kmDriven)}</td>
                  <td className="px-4 py-3 text-gray-600">{car.city}</td>
                  <td className="px-4 py-3">
                    <select
                      value={car.status}
                      onChange={(e) => handleStatusChange(car.id, e.target.value as ListingStatus)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FF6B2B]"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="SOLD">Sold</option>
                      <option value="ON_HOLD">On Hold</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {car.isVerified && (
                        <span title="Verified"><ShieldCheck className="w-4 h-4 text-emerald-500" /></span>
                      )}
                      {car.isFeatured && (
                        <span title="Featured"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /></span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/listings/${car.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#FF6B2B] hover:bg-orange-50 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteConfirmDialog
                        carId={car.id}
                        carName={`${car.brand} ${car.model}`}
                        onDeleted={() => startTransition(() => router.refresh())}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {filtered.length} of {cars.length} listings
      </div>
    </div>
  );
}
