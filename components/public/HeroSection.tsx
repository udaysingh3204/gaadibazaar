"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center pt-16 pb-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-[#FF6B2B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#FF6B2B] rounded-full animate-pulse" />
            Delhi NCR&apos;s #1 Verified Used Car Platform
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Find Your{" "}
            <span className="text-[#FF6B2B]">Next Perfect Car</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Verified cars from trusted dealers in Delhi, Gurgaon, Noida & Agra.
            Transparent prices, authentic reviews, zero stress.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <SearchBar />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-400"
        >
          {[
            ["2,000+", "Verified Cars"],
            ["Delhi NCR+", "Coverage"],
            ["4.8★", "Seller Rating"],
            ["<2hrs", "Response Time"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-white font-bold text-base">{num}</p>
              <p>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F8F7F4" />
        </svg>
      </div>
    </section>
  );
}
