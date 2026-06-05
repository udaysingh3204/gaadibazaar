import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GaadiBazaar — Buy & Sell Verified Used Cars in India",
    template: "%s | GaadiBazaar",
  },
  description:
    "Buy and sell verified second-hand cars in India. Browse thousands of used cars with full specs, KM driven, pricing and seller details. Best deals on Maruti, Hyundai, Tata, Honda.",
  keywords: [
    "used cars india",
    "second hand cars",
    "buy used car india",
    "verified used cars",
    "cars24 alternative",
    "spinny alternative",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "GaadiBazaar",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
