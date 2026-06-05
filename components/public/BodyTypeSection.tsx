"use client";

import Link from "next/link";

const bodyTypes = [
  { type: "HATCHBACK", label: "Hatchback", emoji: "🚗" },
  { type: "SEDAN", label: "Sedan", emoji: "🚙" },
  { type: "SUV", label: "SUV", emoji: "🛻" },
  { type: "MUV", label: "MUV", emoji: "🚐" },
  { type: "ELECTRIC", label: "Electric", emoji: "⚡" },
  { type: "COUPE", label: "Coupe", emoji: "🏎️" },
];

export default function BodyTypeSection() {
  return (
    <section className="py-16 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#0A1628]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Browse by Type
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {bodyTypes.map(({ type, label, emoji }) => (
            <Link
              key={type}
              href={type === "ELECTRIC" ? `/cars?fuelType=ELECTRIC` : `/cars?bodyType=${type}`}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#FF6B2B] hover:shadow-md transition-all duration-200 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-[#FF6B2B]">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
