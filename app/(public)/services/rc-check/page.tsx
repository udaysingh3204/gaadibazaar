"use client";

import { useState } from "react";
import { ShieldCheck, Search, Car, Calendar, MapPin, Fuel, AlertCircle, CheckCircle } from "lucide-react";
import PageShell from "@/components/public/PageShell";
import { Button } from "@/components/ui/button";

interface RCResult {
  ownerName: string;
  registrationDate: string;
  rcStatus: string;
  fuelType: string;
  vehicleClass: string;
  maker: string;
  model: string;
  fitnessUpto: string;
  insuranceUpto: string;
  pucUpto: string;
  registeredAt: string;
  challanCount: number;
}

const MOCK_DB: Record<string, RCResult> = {
  "DL3CAB1234": {
    ownerName: "Rajesh K***r",
    registrationDate: "12-Mar-2021",
    rcStatus: "ACTIVE",
    fuelType: "Petrol",
    vehicleClass: "M-Cycle/Scooter (LMV)",
    maker: "Maruti Suzuki",
    model: "Swift VXI",
    fitnessUpto: "11-Mar-2036",
    insuranceUpto: "28-Aug-2026",
    pucUpto: "14-Nov-2026",
    registeredAt: "Mall Road, Delhi",
    challanCount: 0,
  },
  "MH02CD5678": {
    ownerName: "Priya S****a",
    registrationDate: "07-Jun-2020",
    rcStatus: "ACTIVE",
    fuelType: "Diesel",
    vehicleClass: "LMV (Private)",
    maker: "Hyundai",
    model: "Creta SX",
    fitnessUpto: "06-Jun-2035",
    insuranceUpto: "15-Jan-2027",
    pucUpto: "21-Sep-2026",
    registeredAt: "Tardeo, Mumbai",
    challanCount: 2,
  },
};

export default function RCCheckPage() {
  const [rcNumber, setRcNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RCResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setNotFound(false);
    setResult(null);
    const normalized = rcNumber.replace(/\s+/g, "").toUpperCase();
    setTimeout(() => {
      const found = MOCK_DB[normalized];
      if (found) setResult(found);
      else setNotFound(true);
      setLoading(false);
    }, 900);
  };

  return (
    <PageShell
      eyebrow="Verify Before You Buy"
      title="RC Verification — instant, free"
      subtitle="Pull official VAHAN/Parivahan data for any Indian vehicle. Owner, insurance, fitness, PUC and challans — in one search."
    >
      {/* Search Box */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={rcNumber}
            onChange={(e) => setRcNumber(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter Vehicle Number (e.g. DL3CAB1234)"
            className="flex-1 h-12 px-4 rounded-xl border border-gray-200 text-base font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] uppercase"
            maxLength={12}
          />
          <Button size="lg" onClick={handleSearch} disabled={loading || rcNumber.length < 6}>
            <Search className="w-4 h-4 mr-2" />
            {loading ? "Checking…" : "Check RC"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-400">
          <span>Try:</span>
          {Object.keys(MOCK_DB).map((rc) => (
            <button key={rc} onClick={() => setRcNumber(rc)} className="text-[#FF6B2B] hover:underline font-mono">{rc}</button>
          ))}
        </div>
      </div>

      {/* Result */}
      {notFound && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">No record found</p>
            <p className="text-amber-700 text-sm mt-0.5">We couldn&apos;t find this vehicle in the VAHAN database. Double-check the number, or it may be from a state that hasn&apos;t synced yet.</p>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Verified via VAHAN</span>
              </div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                {result.maker} {result.model}
              </h2>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {result.rcStatus}
            </span>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 p-6">
            {[
              { icon: Car, label: "Owner", value: result.ownerName },
              { icon: Calendar, label: "Registration Date", value: result.registrationDate },
              { icon: Fuel, label: "Fuel Type", value: result.fuelType },
              { icon: Car, label: "Vehicle Class", value: result.vehicleClass },
              { icon: MapPin, label: "Registered At", value: result.registeredAt },
              { icon: Calendar, label: "Fitness Valid Up To", value: result.fitnessUpto },
              { icon: ShieldCheck, label: "Insurance Up To", value: result.insuranceUpto },
              { icon: CheckCircle, label: "PUC Valid Up To", value: result.pucUpto },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-[#FF6B2B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-[#1A1A2E]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Challan banner */}
          <div className={`px-6 py-4 border-t flex items-center justify-between ${result.challanCount === 0 ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"}`}>
            <div>
              <p className={`font-semibold ${result.challanCount === 0 ? "text-emerald-800" : "text-amber-800"}`}>
                {result.challanCount === 0 ? "✓ No pending challans" : `⚠ ${result.challanCount} pending challan${result.challanCount > 1 ? "s" : ""}`}
              </p>
              <p className={`text-xs mt-0.5 ${result.challanCount === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                {result.challanCount === 0 ? "This vehicle has a clean record" : "Total dues to be settled before transfer"}
              </p>
            </div>
            <Button asChild variant={result.challanCount === 0 ? "outline" : "default"} size="sm">
              <a href="/services/challan-check">View Details</a>
            </Button>
          </div>
        </div>
      )}

      {/* Why use this */}
      <div className="grid sm:grid-cols-3 gap-4 mt-10">
        {[
          { title: "Avoid stolen vehicles", desc: "Cross-check the RC against the seller&apos;s ID before paying token." },
          { title: "Check insurance status", desc: "An expired policy can mean ₹20k+ unexpected costs." },
          { title: "Verify ownership history", desc: "Confirm the seller is the registered owner — not a flipper." },
        ].map((b) => (
          <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="font-semibold text-[#0A1628] mb-1">{b.title}</p>
            <p className="text-sm text-gray-500">{b.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
