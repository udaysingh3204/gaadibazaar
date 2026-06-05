import { Search, ClipboardCheck, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Filter",
    description:
      "Search thousands of verified listings. Filter by brand, city, budget, fuel type and more to find your perfect match.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: ClipboardCheck,
    title: "Inspect & Verify",
    description:
      "Every car comes with a 200-point inspection report, full RC and history check so you buy with complete confidence.",
    color: "bg-orange-50 text-[#FF6B2B]",
  },
  {
    icon: Car,
    title: "Drive Home",
    description:
      "Close the deal directly with the seller. We offer doorstep delivery and documentation assistance across India.",
    color: "bg-green-50 text-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-2">Simple Process</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#0A1628]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            How GaadiBazaar Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-green-200" />

          {steps.map(({ icon: Icon, title, description, color }, index) => (
            <div key={title} className="relative text-center">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl ${color} flex items-center justify-center mx-auto`}>
                  <Icon className="w-9 h-9" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#0A1628] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3
                className="text-xl font-bold text-[#0A1628] mb-3"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
