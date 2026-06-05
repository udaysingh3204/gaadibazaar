import { ShieldCheck, Users, FileCheck, Truck } from "lucide-react";

const stats = [
  { icon: ShieldCheck, label: "Verified Cars", value: "50,000+" },
  { icon: Users, label: "Happy Buyers", value: "2 Lakh+" },
  { icon: FileCheck, label: "Free RC Check", value: "Instant" },
  { icon: Truck, label: "Pan India", value: "30+ Cities" },
];

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B2B]/10 rounded-2xl flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-[#FF6B2B]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#0A1628]" style={{ fontFamily: "var(--font-syne)" }}>
                  {value}
                </p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
