import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Sharma",
    city: "Delhi",
    car: "2021 Maruti Swift",
    stars: 5,
    text: "Found my dream car within 2 days on GaadiBazaar. The verification process is genuine — no hidden surprises after purchase. The seller was responsive and the deal was smooth!",
  },
  {
    name: "Sneha Iyer",
    city: "Bangalore",
    car: "2020 Hyundai Creta",
    stars: 5,
    text: "As a first-time used car buyer, I was nervous. GaadiBazaar's transparent pricing and RC verification feature gave me the confidence to go ahead. Highly recommend!",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    car: "2022 Tata Nexon",
    stars: 4,
    text: "Great platform with genuine listings. The filter options are very detailed which helped me narrow down exactly what I wanted. Got a fantastic deal on the Nexon.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-2">Real Stories</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Happy Buyers Across India
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, city, car, stars, text }) => (
            <div key={name} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <Quote className="w-8 h-8 text-[#FF6B2B]/30 absolute top-4 right-4" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold">{name}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {city} · Bought {car}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
