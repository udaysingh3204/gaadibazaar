"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/cars", label: "Browse Cars" },
    { href: "/cars?bodyType=SUV", label: "SUVs" },
    { href: "/cars?fuelType=ELECTRIC", label: "Electric" },
    { href: "/for-dealers", label: "For Dealers" },
    { href: "/sell", label: "Sell Your Car", highlight: true },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        isHome && !scrolled
          ? "bg-transparent"
          : "bg-[#0A1628]/95 backdrop-blur-md shadow-lg"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#FF6B2B] rounded-xl flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-syne)" }}>
            Gaadi<span className="text-[#FF6B2B]">Bazaar</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                link.highlight
                  ? "text-[#FF6B2B] hover:text-[#FF8B4B]"
                  : pathname === link.href
                  ? "text-[#FF6B2B]"
                  : "text-gray-300 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link href="/wishlist" className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF6B2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Button asChild size="sm" className="hidden md:flex">
            <Link href="/cars">Buy a Car</Link>
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A1628] border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-white py-2 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full mt-2">
            <Link href="/cars">Buy a Car</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
