import Link from "next/link";
import { MapPin } from "lucide-react";

const CITIES = [
  { name: "Delhi", icon: "🏛️" },
  { name: "Gurgaon", icon: "🏢" },
  { name: "Noida", icon: "🌆" },
  { name: "Faridabad", icon: "🏙️" },
  { name: "Ghaziabad", icon: "🏘️" },
  { name: "Greater Noida", icon: "🌇" },
  { name: "Agra", icon: "🕌" },
  { name: "Mathura", icon: "🛕" },
];

export function NCRQuickLinks() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-5">
          <MapPin className="w-4 h-4 text-[#FF6B2B]" />
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Browse by City</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {CITIES.map((city) => (
            <Link
              key={city.name}
              href={`/cars?city=${encodeURIComponent(city.name)}`}
              className="group flex items-center gap-2 px-4 py-2.5 bg-[#F8F7F4] hover:bg-[#FF6B2B] border border-gray-100 hover:border-[#FF6B2B] rounded-full text-sm font-medium text-gray-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>{city.icon}</span>
              <span>Cars in {city.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
