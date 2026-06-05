import PageShell from "@/components/public/PageShell";
import { Search, ClipboardCheck, Car, FileSignature, IndianRupee, MapPin } from "lucide-react";

export const metadata = { title: "How It Works" };

const buyerSteps = [
  { icon: Search, title: "Browse listings", desc: "Search across 50,000+ verified used cars from dealers near you. Filter by brand, budget, fuel type, body type and more." },
  { icon: ClipboardCheck, title: "Inspect & verify", desc: "Every car comes with a 200-point inspection, RC verification, insurance check and accident history report." },
  { icon: IndianRupee, title: "Get the best deal", desc: "Compare prices, get EMI estimates, and negotiate directly with the seller. No middleman commission." },
  { icon: FileSignature, title: "Paperwork done for you", desc: "RC transfer, insurance, NOC — we coordinate the entire ownership transfer process. Zero hassle." },
  { icon: Car, title: "Drive home", desc: "Pick up the car from the dealership or get it delivered to your doorstep across 30+ Indian cities." },
];

const dealerSteps = [
  { icon: MapPin, title: "List your inventory", desc: "Upload cars in minutes with our mobile-first dealer app. Auto-fill specs from registration number." },
  { icon: Search, title: "Reach buyers across India", desc: "Your listings get visibility on GaadiBazaar's national marketplace, partner channels and Google Search." },
  { icon: IndianRupee, title: "Convert leads instantly", desc: "Built-in WhatsApp lead routing, missed-call lead capture, and CRM keep you ahead of every buyer enquiry." },
];

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How GaadiBazaar Works"
      title="Buying or selling — built to be effortless"
      subtitle="From your first search to driving home (or from listing a car to closing the sale), we walk through every step."
    >
      {/* For Buyers */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-6" style={{ fontFamily: "var(--font-syne)" }}>
          🛒 For Buyers
        </h2>
        <div className="space-y-4">
          {buyerSteps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-4 items-start">
              <div className="w-12 h-12 bg-[#FF6B2B]/10 rounded-2xl flex items-center justify-center shrink-0">
                <step.icon className="w-6 h-6 text-[#FF6B2B]" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#FF6B2B] font-bold text-sm">Step {i + 1}</span>
                  <h3 className="font-bold text-[#0A1628]">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For Dealers */}
      <div>
        <h2 className="text-2xl font-bold text-[#0A1628] mb-6" style={{ fontFamily: "var(--font-syne)" }}>
          🏬 For Dealers
        </h2>
        <div className="space-y-4">
          {dealerSteps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-4 items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                <step.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-600 font-bold text-sm">Step {i + 1}</span>
                  <h3 className="font-bold text-[#0A1628]">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
