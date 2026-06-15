import Link from "next/link";
import { ShieldCheck, Zap, TrendingUp, IndianRupee, Phone, Star, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sell Your Car — GaadiBazaar",
  description: "List your used car on GaadiBazaar and get genuine buyers in Delhi NCR & Agra. Free listing, OTP-verified, live in under 2 hours.",
};

const STATS = [
  { value: "2,000+", label: "Verified Listings" },
  { value: "<2 hrs", label: "Avg. Response Time" },
  { value: "NCR + Agra", label: "Coverage Area" },
  { value: "₹0", label: "Listing Fee*" },
];

const STEPS = [
  {
    num: "01",
    title: "Verify with OTP",
    desc: "Enter your phone number and verify with a 6-digit OTP. Takes 30 seconds.",
  },
  {
    num: "02",
    title: "Fill Car Details",
    desc: "Brand, model, year, KMs driven, condition — our smart form guides you through it.",
  },
  {
    num: "03",
    title: "Add Photos",
    desc: "Upload up to 10 photos. Clear images get 3× more inquiries.",
  },
  {
    num: "04",
    title: "Go Live",
    desc: "Our team reviews and approves your listing. Buyers start reaching out on WhatsApp.",
  },
];

const BENEFITS = [
  { icon: ShieldCheck, title: "Verified Buyers Only", desc: "Every buyer is real — no spam, no time-wasters. Genuine inquiries from NCR & Agra." },
  { icon: Zap, title: "List in 5 Minutes", desc: "Our streamlined form takes under 5 minutes. No paperwork, no agents." },
  { icon: TrendingUp, title: "Best Price", desc: "Set your own price. Our market insights tell you if you're priced right." },
  { icon: Phone, title: "Direct WhatsApp", desc: "Buyers contact you directly on WhatsApp — no middleman, no hidden fees." },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    city: "Gurgaon",
    car: "2019 Maruti Swift",
    text: "Sold my Swift in 4 days. Got 8 inquiries and 3 serious buyers. The OTP process was super easy.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    city: "Noida",
    car: "2020 Hyundai Creta",
    text: "Listed my Creta and got calls the same evening. Much better than OLX — buyers here are serious.",
    rating: 5,
  },
  {
    name: "Amit Agarwal",
    city: "Agra",
    car: "2018 Honda City",
    text: "Couldn't find a buyer for weeks through local dealers. GaadiBazaar got me 5 inquiries in 2 days!",
    rating: 5,
  },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0A1628] pt-24 pb-20 px-4 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2B]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B2B]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FF6B2B]/10 border border-[#FF6B2B]/30 text-[#FF6B2B] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            Free Listing · OTP Verified · Live in &lt;2 Hours
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Sell Your Car at the{" "}
            <span className="text-[#FF6B2B]">Best Price</span>
            <br className="hidden sm:block" /> in Delhi NCR
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            India's most trusted used car marketplace for NCR & Agra. Real buyers, direct WhatsApp contact,
            zero brokerage. List today and sell fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8 h-14 rounded-full shadow-lg shadow-[#FF6B2B]/30">
              <Link href="/sell/list">
                List Your Car — It's Free
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 h-14 rounded-full border-white/20 text-white hover:bg-white/10">
              <Link href="/cars">See Active Listings</Link>
            </Button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden relative z-10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/5 backdrop-blur-sm px-6 py-5 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FF6B2B]" style={{ fontFamily: "var(--font-syne)" }}>
                {s.value}
              </p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-[#F8F7F4]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-2">Simple Process</p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#0A1628]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Sell in 4 Easy Steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="text-4xl font-extrabold text-[#FF6B2B]/20 mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-[#0A1628] text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-300">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="px-10 h-13 rounded-full">
              <Link href="/sell/list">Start Selling Now →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-2">Why GaadiBazaar</p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#0A1628]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The Smarter Way to Sell
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex gap-4 p-6 bg-[#F8F7F4] rounded-2xl border border-gray-100 hover:border-[#FF6B2B]/30 transition-colors">
                <div className="w-12 h-12 bg-[#FF6B2B]/10 rounded-xl flex items-center justify-center shrink-0">
                  <b.icon className="w-6 h-6 text-[#FF6B2B]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A1628] mb-1">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#0A1628]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-2">Happy Sellers</p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Real Stories from NCR
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FF6B2B] fill-[#FF6B2B]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.city} · Sold: {t.car}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl font-extrabold text-[#0A1628]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is listing free?", a: "Yes, listing your car on GaadiBazaar is completely free for private sellers. We charge ₹0 to list and zero brokerage on the sale." },
              { q: "How long does approval take?", a: "Our team reviews and approves listings within 2 hours during business hours (9am–7pm). You'll get a WhatsApp notification once live." },
              { q: "How do buyers contact me?", a: "Buyers see your masked number and send a WhatsApp message or call directly. No emails, no forms — real conversations." },
              { q: "Can I list multiple cars?", a: "Yes! Each car needs its own listing with OTP verification. This ensures all listings are genuine." },
              { q: "What photos should I add?", a: "Front, rear, both sides, interior dashboard, seats, odometer, and engine bay. Listings with 8+ photos get 3× more inquiries." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B2B] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0A1628] mb-1">{q}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FF6B2B] to-[#E55A1C]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to Sell? Let's Go.
          </h2>
          <p className="text-white/80 mb-8 text-lg">Join thousands of sellers who found the right buyer on GaadiBazaar.</p>
          <Button asChild size="lg" variant="secondary" className="px-10 h-14 rounded-full text-base font-bold bg-white text-[#FF6B2B] hover:bg-gray-100">
            <Link href="/sell/list">List Your Car for Free →</Link>
          </Button>
          <p className="text-white/60 text-xs mt-4">*Free for private sellers. Dealer plans available separately.</p>
        </div>
      </section>
    </div>
  );
}
