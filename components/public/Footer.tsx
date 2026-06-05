import Link from "next/link";
import { Car, Phone, Mail, MapPin, Globe, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FF6B2B] rounded-xl flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-syne)" }}>
                Gaadi<span className="text-[#FF6B2B]">Bazaar</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              India&apos;s trusted marketplace for verified used cars. Transparent pricing, zero hassle.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B2B] transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-white font-semibold mb-4">Browse Cars</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Hatchbacks", "/cars?bodyType=HATCHBACK"],
                ["Sedans", "/cars?bodyType=SEDAN"],
                ["SUVs", "/cars?bodyType=SUV"],
                ["MUVs", "/cars?bodyType=MUV"],
                ["Electric Cars", "/cars?fuelType=ELECTRIC"],
                ["Under ₹5 Lakh", "/cars?maxPrice=500000"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#FF6B2B] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tools & Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["RC Verification", "/services/rc-check"],
                ["Challan Lookup", "/services/challan-check"],
                ["EMI Calculator", "/services/loan-emi"],
                ["For Dealers", "/for-dealers"],
                ["Pricing", "/pricing"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#FF6B2B] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["About Us", "/about"],
                ["How It Works", "/how-it-works"],
                ["Blog", "/blog"],
                ["Careers", "/careers"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#FF6B2B] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#FF6B2B] shrink-0" />
                <span>GaadiBazaar, 2nd Floor,<br />DLF Cyber City, Gurgaon - 122002</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B2B] shrink-0" />
                <a href="tel:+911800123456" className="hover:text-[#FF6B2B]">1800-123-4567 (Toll Free)</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B2B] shrink-0" />
                <a href="mailto:hello@gaadibazaar.in" className="hover:text-[#FF6B2B]">hello@gaadibazaar.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} GaadiBazaar. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
