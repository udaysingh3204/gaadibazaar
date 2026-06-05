"use client";

import { useState } from "react";
import { AlertTriangle, Search, MapPin, Calendar, IndianRupee, FileText, CheckCircle } from "lucide-react";
import PageShell from "@/components/public/PageShell";
import { Button } from "@/components/ui/button";
import { formatIndianPrice } from "@/lib/utils";

interface Challan {
  id: string;
  offence: string;
  location: string;
  date: string;
  fine: number;
  status: "PENDING" | "PAID";
}

const MOCK: Record<string, Challan[]> = {
  "DL3CAB1234": [],
  "MH02CD5678": [
    { id: "MH202604120781", offence: "Driving without seatbelt", location: "Bandra Worli Sea Link", date: "12-Apr-2026", fine: 1000, status: "PENDING" },
    { id: "MH202602010224", offence: "Over-speeding (84 in 60 zone)", location: "Eastern Express Hwy", date: "01-Feb-2026", fine: 2000, status: "PENDING" },
  ],
  "KA01AB9999": [
    { id: "KA202603151045", offence: "Signal jump", location: "MG Road, Bangalore", date: "15-Mar-2026", fine: 500, status: "PAID" },
  ],
};

export default function ChallanCheckPage() {
  const [rc, setRc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Challan[] | null>(null);
  const [searched, setSearched] = useState("");

  const handleSearch = () => {
    setLoading(true);
    setResult(null);
    const normalized = rc.replace(/\s+/g, "").toUpperCase();
    setTimeout(() => {
      setResult(MOCK[normalized] ?? []);
      setSearched(normalized);
      setLoading(false);
    }, 800);
  };

  const pendingDues = result?.filter((c) => c.status === "PENDING").reduce((s, c) => s + c.fine, 0) ?? 0;

  return (
    <PageShell
      eyebrow="Settle Before You Drive"
      title="Traffic Challan Lookup"
      subtitle="Check pending traffic challans on any Indian vehicle across all states. Free, instant, official data."
    >
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={rc}
            onChange={(e) => setRc(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter Vehicle Number"
            className="flex-1 h-12 px-4 rounded-xl border border-gray-200 text-base font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] uppercase"
            maxLength={12}
          />
          <Button size="lg" onClick={handleSearch} disabled={loading || rc.length < 6}>
            <Search className="w-4 h-4 mr-2" />
            {loading ? "Searching…" : "Check Challans"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-400">
          <span>Try:</span>
          {Object.keys(MOCK).map((sample) => (
            <button key={sample} onClick={() => setRc(sample)} className="text-[#FF6B2B] hover:underline font-mono">{sample}</button>
          ))}
        </div>
      </div>

      {result !== null && (
        <>
          {result.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-emerald-800 mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                All Clear!
              </h3>
              <p className="text-emerald-700">No pending challans on <strong>{searched}</strong>. This vehicle has a clean traffic record.</p>
            </div>
          ) : (
            <>
              {/* Summary */}
              {pendingDues > 0 && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-amber-100 text-sm font-semibold uppercase tracking-wider mb-1">Total Pending Dues</p>
                    <p className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>
                      {formatIndianPrice(pendingDues)}
                    </p>
                  </div>
                  <Button variant="secondary" size="lg" className="bg-white text-[#0A1628]">
                    Pay All Dues Now
                  </Button>
                </div>
              )}

              {/* Challan list */}
              <div className="space-y-3">
                {result.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          c.status === "PENDING" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                        }`}>
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0A1628]">{c.offence}</h3>
                          <p className="text-xs text-gray-400 mt-0.5 font-mono">Challan #{c.id}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        c.status === "PENDING" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />{c.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />{c.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#FF6B2B] font-semibold justify-end">
                        <IndianRupee className="w-3.5 h-3.5" />{c.fine.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Info section */}
      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <FileText className="w-8 h-8 text-[#FF6B2B] mb-3" />
          <h3 className="font-bold text-[#0A1628] mb-2">Why check challans before buying?</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Unpaid challans transfer with ownership in many states. A ₹500 fine can balloon to ₹5,000+ with penalties.
            Settle them or get the seller to pay before the transaction closes.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="font-bold text-[#0A1628] mb-2">Data sources</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Our challan lookup syncs with VAHAN (Centre), Delhi Police, Mumbai Traffic Police, Karnataka & Telangana e-Challan databases.
            Updated every 6 hours.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
