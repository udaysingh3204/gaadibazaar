"use client";

import PageShell from "@/components/public/PageShell";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, DollarSign, Gauge } from "lucide-react";

export default function NewVsUsedPage() {
  const comparison = [
    {
      category: "Purchase Price",
      new: "₹8,00,000 (Maruti Swift)",
      used: "₹5,50,000 (3-year-old Swift)",
      newPro: "Potential financing up to 90%",
      usedPro: "50% lower initial cost",
      newCon: "Immediate 15-20% depreciation",
      usedCon: "Slower value depreciation",
      winner: "used",
    },
    {
      category: "Total Cost of Ownership (5 years)",
      new: "₹12,50,000",
      used: "₹8,20,000",
      newPro: "Warranty covers repairs (3 years)",
      usedPro: "No depreciation cliff after year 3",
      newCon: "Steep depreciation years 1-3",
      usedCon: "May need extended warranty (₹15-30k)",
      winner: "used",
      breakdown: "Purchase ₹8L + Maintenance ₹2L + Insurance ₹2.5L + Fuel ₹2.5L = ₹15L (new) vs ₹5.5L + ₹1.5L + ₹2.5L + ₹2.5L = ₹11.5L (used)",
    },
    {
      category: "Insurance",
      new: "Comprehensive: ₹500-700/month",
      used: "Comprehensive: ₹400-550/month",
      newPro: "Cashless repairs at authorized centers",
      usedPro: "Lower premiums, wider repair network",
      newCon: "Premium can jump after 3 years",
      usedCon: "Depends on previous claim history",
      winner: "used",
    },
    {
      category: "Maintenance",
      new: "₹20-30k/year (Years 1-3)",
      used: "₹30-50k/year (3-5 year old cars)",
      newPro: "Free service up to 60,000 km",
      usedPro: "No major surprises if inspected well",
      newCon: "Parts are expensive post-warranty",
      usedCon: "Unexpected repairs can pile up",
      winner: "new",
    },
    {
      category: "Reliability & Warranty",
      new: "3-year/100k km warranty",
      used: "Usually no warranty (buy as-is)",
      newPro: "Peace of mind, no surprises",
      usedPro: "Extended warranty available (₹15-30k)",
      newCon: "Limited coverage after 3 years",
      usedCon: "Risk of hidden defects",
      winner: "new",
    },
    {
      category: "Choice & Availability",
      new: "Limited models in chosen config",
      used: "Thousands of cars in every price range",
      newPro: "Latest tech, features, safety standards",
      usedPro: "Can find exact make/model/color",
      newCon: "Delivery waits of 2-4 months",
      usedCon: "Inspection risk higher",
      winner: "used",
    },
    {
      category: "Loan Availability",
      new: "90% financing common",
      used: "70-75% financing typical",
      newPro: "Better rates, easier approval",
      usedPro: "Lower EMI due to lower principal",
      newCon: "Higher interest rate vs salary",
      usedCon: "Some banks won't finance older cars",
      winner: "new",
    },
    {
      category: "Resale Value",
      new: "Loses 15-20% Year 1, then 8-10% annually",
      used: "Loses 5-8% annually (slow decline)",
      newPro: "Easier to resell (known history)",
      usedPro: "Better value retention post-Year 3",
      newCon: "Steep drop in first 12 months",
      usedCon: "Buyer has limited recourse",
      winner: "used",
    },
  ];

  const scenarios = [
    {
      title: "Choose NEW if:",
      color: "from-blue-50 to-blue-100",
      icon: CheckCircle,
      points: [
        "You drive 15,000+ km/year (warranty covers heavily)",
        "Peace of mind and reliability are top priority",
        "You can afford 90% financing and lower EMI",
        "You want latest safety tech (6 airbags, ABS, ESC)",
        "You plan to keep the car for 5+ years",
      ],
    },
    {
      title: "Choose USED if:",
      color: "from-green-50 to-green-100",
      icon: TrendingDown,
      points: [
        "Budget is tight — save 40-50% vs new",
        "You want to avoid the depreciation cliff (Year 1-3)",
        "You drive erratically or unsure about usage pattern",
        "You want to buy multiple cars (business fleet)",
        "You plan to sell within 2-3 years",
      ],
    },
  ];

  const truthBombs = [
    {
      stat: "30-40%",
      desc: "Average depreciation in Year 1 for new cars. A ₹8L car becomes ₹5.2L. That's why buying used is smarter financially.",
    },
    {
      stat: "₹2-3 Lakhs",
      desc: "Cost difference between buying a 6-month-old car vs new. Same car, same warranty, way cheaper.",
    },
    {
      stat: "18 days",
      desc: "Average time a used car sits on dealer lot before selling. Good inventory management = fast sales = better prices.",
    },
    {
      stat: "5x",
      desc: "How much a hidden defect can cost. A ₹50k engine repair obliterates a ₹1L savings. Always inspect before buying.",
    },
  ];

  return (
    <PageShell
      eyebrow="Buying Guide"
      title="New vs Used: The real numbers for Indian car buyers"
      subtitle="Should you buy a brand-new car or a used one? We crunched 5 years of ownership costs."
    >
      {/* Comparison Table */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left font-bold text-[#0A1628]">Factor</th>
                  <th className="px-6 py-4 text-left font-bold text-[#0A1628]">New Car</th>
                  <th className="px-6 py-4 text-left font-bold text-[#0A1628]">Used Car (3-5 yrs old)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.map((row) => (
                  <tr key={row.category} className={row.winner === "used" ? "bg-green-50" : "bg-blue-50"}>
                    <td className="px-6 py-4 font-bold text-[#0A1628]">{row.category}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#0A1628]">{row.new}</p>
                      <p className="text-xs text-gray-500 mt-1">{row.newPro}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#0A1628]">{row.used}</p>
                      <p className="text-xs text-gray-500 mt-1">{row.usedPro}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Green = Used wins | Blue = New wins | Based on Maruti Swift (popular base car for Indians)
        </p>
      </div>

      {/* Scenarios */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Which should you buy?
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <div
                key={scenario.title}
                className={`rounded-2xl bg-gradient-to-br ${scenario.color} border border-gray-100 p-8`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-[#FF6B2B]" />
                  <h3 className="text-xl font-bold text-[#0A1628]">{scenario.title}</h3>
                </div>
                <ul className="space-y-3">
                  {scenario.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-gray-700">
                      <span className="text-[#FF6B2B] font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost Breakdown Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          5-Year total cost: real example
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* New Car */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-6">New Maruti Swift VXI (₹8,00,000)</h3>
            <div className="space-y-4">
              {[
                { label: "On-road cost", value: "₹8,50,000" },
                { label: "Depreciation (5 years)", value: "-₹4,25,000", negative: true },
                { label: "Insurance (5 years @ ₹600/month)", value: "-₹3,60,000", negative: true },
                { label: "Maintenance + repairs", value: "-₹1,50,000", negative: true },
                { label: "Fuel (12k km/yr @ ₹8/km)", value: "-₹2,40,000", negative: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-blue-900">{item.label}</span>
                  <span className={`font-bold ${item.negative ? "text-red-600" : "text-green-600"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="border-t-2 border-blue-300 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-blue-900">Total Cost of Ownership</span>
                <span className="text-2xl font-bold text-blue-900">₹13,25,000</span>
              </div>
            </div>
          </div>

          {/* Used Car */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 p-8">
            <h3 className="text-xl font-bold text-green-900 mb-6">Used Swift VXI, 3 years old (₹5,50,000)</h3>
            <div className="space-y-4">
              {[
                { label: "Purchase price", value: "₹5,50,000" },
                { label: "Depreciation (next 5 years)", value: "-₹1,10,000", negative: true },
                { label: "Insurance (5 years @ ₹450/month)", value: "-₹2,70,000", negative: true },
                { label: "Maintenance + repairs + extended warranty", value: "-₹1,50,000", negative: true },
                { label: "Fuel (12k km/yr @ ₹8/km)", value: "-₹2,40,000", negative: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-green-900">{item.label}</span>
                  <span className={`font-bold ${item.negative ? "text-red-600" : "text-green-600"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="border-t-2 border-green-300 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-green-900">Total Cost of Ownership</span>
                <span className="text-2xl font-bold text-green-900">₹9,20,000</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-6 text-sm">
          <strong>Verdict:</strong> Buying used saves ₹4,05,000 (31%) over 5 years.
        </p>
      </div>

      {/* Truth Bombs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Things nobody talks about
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {truthBombs.map((bomb) => (
            <div key={bomb.stat} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="text-3xl font-extrabold text-[#FF6B2B] mb-2">{bomb.stat}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{bomb.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inspection Tips */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8">
        <div className="flex gap-4 items-start mb-6">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">If you choose used: inspect before buying</h3>
            <p className="text-amber-800 text-sm mb-4">
              A bad purchase can wipe out all your savings. Use GaadiBazaar's{" "}
              <a href="/services/rc-check" className="underline font-semibold hover:text-amber-700">
                RC Verification
              </a>{" "}
              and{" "}
              <a href="/services/challan-check" className="underline font-semibold hover:text-amber-700">
                Challan Lookup
              </a>{" "}
              tools. Don't skip this.
            </p>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-amber-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Engine & Transmission:</strong> Take a test drive on highway + city. Check for knocks, vibrations.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Body & Paint:</strong> Check for accident repairs, rust. Get a pre-purchase inspection report.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>RC & Insurance:</strong> Verify ownership, check for outstanding loans or challan dues.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Service History:</strong> Request maintenance records. A well-maintained car costs less to own.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Extended Warranty:</strong> For 3-5 year old cars, buy extended warranty (₹15-30k). Worth it.</span>
          </li>
        </ul>
      </div>
    </PageShell>
  );
}
