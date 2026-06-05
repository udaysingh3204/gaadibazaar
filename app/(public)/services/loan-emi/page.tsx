"use client";

import { useState, useMemo } from "react";
import { IndianRupee, Calendar, Percent, TrendingDown } from "lucide-react";
import PageShell from "@/components/public/PageShell";
import { formatIndianPrice, calculateEMI } from "@/lib/utils";

export default function EMICalculatorPage() {
  const [price, setPrice] = useState(800000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(11);
  const [tenure, setTenure] = useState(60);

  const principal = price * (1 - downPct / 100);
  const downPayment = price * (downPct / 100);
  const emi = useMemo(
    () => calculateEMI(price, downPct / 100, rate / 100, tenure),
    [price, downPct, rate, tenure]
  );
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - principal;

  const partners = [
    { name: "HDFC Bank", rate: "10.5%", processing: "₹2,500", logo: "HDFC" },
    { name: "ICICI Bank", rate: "11.0%", processing: "₹3,500", logo: "ICICI" },
    { name: "State Bank of India", rate: "9.9%", processing: "₹1,500", logo: "SBI" },
    { name: "Bajaj Finance", rate: "12.5%", processing: "Nil", logo: "Bajaj" },
  ];

  return (
    <PageShell
      eyebrow="Plan Your Purchase"
      title="Car Loan EMI Calculator"
      subtitle="Estimate your monthly EMI, total interest, and compare offers from 12+ lenders in seconds."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Calculator inputs */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Loan Details
          </h2>

          <div className="space-y-6">
            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#0A1628] flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-[#FF6B2B]" />
                  Car Price
                </label>
                <span className="text-[#FF6B2B] font-bold text-lg">{formatIndianPrice(price)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-[#FF6B2B]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹1L</span>
                <span>₹50L</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#0A1628] flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-[#FF6B2B]" />
                  Down Payment
                </label>
                <span className="text-gray-600 font-semibold">
                  {downPct}% · {formatIndianPrice(downPayment)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={70}
                step={5}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="w-full accent-[#FF6B2B]"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#0A1628] flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-[#FF6B2B]" />
                  Interest Rate
                </label>
                <span className="text-gray-600 font-semibold">{rate}% p.a.</span>
              </div>
              <input
                type="range"
                min={7}
                max={18}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-[#FF6B2B]"
              />
            </div>

            {/* Tenure */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#0A1628] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#FF6B2B]" />
                  Tenure
                </label>
                <span className="text-gray-600 font-semibold">{tenure} months · {(tenure / 12).toFixed(1)} yrs</span>
              </div>
              <input
                type="range"
                min={12}
                max={84}
                step={6}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full accent-[#FF6B2B]"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2a4a] text-white rounded-2xl p-6 shadow-lg">
            <p className="text-gray-300 text-xs uppercase tracking-wider mb-1">Monthly EMI</p>
            <p className="text-4xl font-extrabold text-[#FF6B2B]" style={{ fontFamily: "var(--font-syne)" }}>
              {formatIndianPrice(emi)}
            </p>
            <p className="text-gray-400 text-xs mt-1">for {tenure} months</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Principal</span>
              <span className="font-semibold text-[#1A1A2E]">{formatIndianPrice(principal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Interest</span>
              <span className="font-semibold text-amber-600">{formatIndianPrice(totalInterest)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-semibold text-[#1A1A2E]">Total Payable</span>
              <span className="font-bold text-[#FF6B2B]">{formatIndianPrice(totalPayable)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lender comparison */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-[#0A1628] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
          Compare Offers from Our Lending Partners
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-gray-500">Lender</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-500">Interest (from)</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-500">Processing Fee</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-500">EMI @ {tenure}m</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {partners.map((p) => {
                const rateNum = parseFloat(p.rate);
                const partnerEMI = calculateEMI(price, downPct / 100, rateNum / 100, tenure);
                return (
                  <tr key={p.name} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-semibold text-[#0A1628]">{p.name}</td>
                    <td className="px-5 py-3 text-gray-600">{p.rate} p.a.</td>
                    <td className="px-5 py-3 text-gray-600">{p.processing}</td>
                    <td className="px-5 py-3 font-bold text-[#FF6B2B]">{formatIndianPrice(partnerEMI)}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-semibold text-[#FF6B2B] hover:underline">Apply →</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * Indicative rates. Final approval depends on credit score (CIBIL 750+) and income proof. GaadiBazaar partners with NBFCs registered with RBI.
        </p>
      </div>
    </PageShell>
  );
}
