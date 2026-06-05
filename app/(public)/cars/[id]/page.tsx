export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ShieldCheck, MapPin, Phone, MessageCircle, Gauge,
  Calendar, Users, ChevronLeft, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CarCard from "@/components/public/CarCard";
import { formatIndianPrice, formatKm, calculateEMI, maskPhone, timeAgo } from "@/lib/utils";
import { normalizeCarData } from "@/lib/data-utils";
import type { Car, FuelType } from "@/types/car";

const fuelBadgeMap: Record<FuelType, "petrol" | "diesel" | "cng" | "electric" | "hybrid"> = {
  PETROL: "petrol", DIESEL: "diesel", CNG: "cng", ELECTRIC: "electric", HYBRID: "hybrid",
};

async function getCar(id: string) {
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car || car.status === "REMOVED") return null;
  // Increment view count
  prisma.car.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => null);
  return normalizeCarData(car);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) return { title: "Car Not Found" };

  const normalized = normalizeCarData(car);
  const images = Array.isArray(normalized.images) ? normalized.images : [];
  const ogImage = images[0] ?? "/og-default.jpg";

  return {
    title: `${car.yearOfManufacture} ${car.brand} ${car.model}${car.variant ? " " + car.variant : ""} — ${formatIndianPrice(car.askingPrice)} in ${car.city}`,
    description: `Buy this verified ${car.fuelType} ${car.transmission} ${car.brand} ${car.model} with ${car.kmDriven.toLocaleString("en-IN")} km driven. Priced at ${formatIndianPrice(car.askingPrice)} in ${car.city}. ${car.isVerified ? "Verified listing." : ""}`,
    openGraph: {
      images: [ogImage],
    },
  };
}

const SPEC_ROWS = (car: Car) => [
  { label: "Brand", value: car.brand },
  { label: "Model", value: `${car.model}${car.variant ? " " + car.variant : ""}` },
  { label: "Year of Manufacture", value: car.yearOfManufacture },
  { label: "Registration Year", value: car.registrationYear },
  { label: "Fuel Type", value: car.fuelType.charAt(0) + car.fuelType.slice(1).toLowerCase() },
  { label: "Transmission", value: car.transmission },
  { label: "Engine", value: `${car.engineCC} cc` },
  { label: "Mileage", value: car.mileageKmpl ? `${car.mileageKmpl} kmpl` : "—" },
  { label: "KM Driven", value: formatKm(car.kmDriven) },
  { label: "Owners", value: car.numberOfOwners.replace("_PLUS", "+").replace("FOURTH", "4th") },
  { label: "Insurance Valid", value: car.insuranceValid ? new Date(car.insuranceValid).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—" },
  { label: "Color", value: car.color },
  { label: "Body Type", value: car.bodyType.charAt(0) + car.bodyType.slice(1).toLowerCase() },
  { label: "City", value: car.city },
];

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

  const emi = calculateEMI(car.askingPrice);

  // Similar cars
  const similar = await prisma.car.findMany({
    where: {
      id: { not: car.id },
      status: "ACTIVE",
      OR: [{ brand: car.brand }, { bodyType: car.bodyType }],
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.yearOfManufacture} ${car.brand} ${car.model}`,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.yearOfManufacture),
    fuelType: car.fuelType,
    color: car.color,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.kmDriven, unitCode: "KMT" },
    offers: {
      "@type": "Offer",
      price: car.askingPrice,
      priceCurrency: "INR",
      availability: car.status === "ACTIVE" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
    image: car.images,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#F8F7F4] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
            <span>/</span>
            <Link href="/cars" className="hover:text-[#FF6B2B]">Cars</Link>
            <span>/</span>
            <span className="text-[#1A1A2E] font-medium">{car.brand} {car.model}</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: images (3 cols) */}
            <div className="lg:col-span-3">
              {car.images.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    {car.isVerified && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    )}
                  </div>
                  {car.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {car.images.slice(1, 5).map((img: any, i: number) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                          <Image src={img} alt={`View ${i + 2}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-2xl bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No images</span>
                </div>
              )}

              {/* Full spec table */}
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-[#0A1628]" style={{ fontFamily: "var(--font-syne)" }}>
                    Full Specifications
                  </h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {SPEC_ROWS(car as Car).map(({ label, value }) => (
                    <div key={label} className="flex px-6 py-3">
                      <span className="w-44 text-sm text-gray-500 shrink-0">{label}</span>
                      <span className="text-sm font-medium text-[#1A1A2E]">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: details (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Header */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant={fuelBadgeMap[car.fuelType as FuelType]}>{car.fuelType}</Badge>
                  <Badge variant="secondary">{car.transmission}</Badge>
                  {car.isFeatured && <Badge variant="featured">Featured</Badge>}
                </div>

                <h1
                  className="text-2xl font-extrabold text-[#0A1628] leading-tight mb-1"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {car.yearOfManufacture} {car.brand} {car.model}
                  {car.variant ? ` ${car.variant}` : ""}
                </h1>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                  <MapPin className="w-3.5 h-3.5" />
                  {car.city}
                  <span className="text-gray-300">·</span>
                  {timeAgo(car.createdAt)}
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: Gauge, label: "KM Driven", value: formatKm(car.kmDriven) },
                    { icon: Calendar, label: "Year", value: String(car.yearOfManufacture) },
                    { icon: Users, label: "Owners", value: car.numberOfOwners.replace("_PLUS", "+").replace("FIRST", "1st").replace("SECOND", "2nd").replace("THIRD", "3rd").replace("FOURTH", "4th") },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-[#F8F7F4] rounded-xl p-3 text-center">
                      <Icon className="w-4 h-4 text-[#FF6B2B] mx-auto mb-1" />
                      <p className="text-xs font-bold text-[#0A1628]">{value}</p>
                      <p className="text-[10px] text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mb-5">
                  <p className="text-3xl font-extrabold text-[#FF6B2B]" style={{ fontFamily: "var(--font-syne)" }}>
                    {formatIndianPrice(car.askingPrice)}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    EMI from{" "}
                    <strong className="text-gray-600">{formatIndianPrice(emi)}/month*</strong>
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <a
                    href={`tel:${car.sellerPhone}`}
                    className="flex items-center justify-center gap-2 w-full h-11 bg-[#FF6B2B] text-white rounded-full font-semibold hover:bg-[#E55A1C] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Seller · {maskPhone(car.sellerPhone)}
                  </a>
                  <a
                    href={`https://wa.me/91${car.sellerPhone}?text=Hi, I'm interested in your ${car.brand} ${car.model} listed on GaadiBazaar.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-11 bg-[#25D366] text-white rounded-full font-semibold hover:bg-[#1ebe59] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Seller
                  </a>
                </div>
              </div>

              {/* Highlights */}
              {car.highlights.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-bold text-[#0A1628] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                    Key Highlights
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {car.highlights.map((h: any) => (
                      <span key={h} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-medium">
                        <Star className="w-3 h-3 fill-emerald-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Seller info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-[#0A1628] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  Seller Information
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0A1628] text-white rounded-full flex items-center justify-center font-bold">
                    {car.sellerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A2E]">{car.sellerName}</p>
                    <p className="text-xs text-gray-400">Private Seller · {car.city}</p>
                  </div>
                </div>
              </div>

              {/* Back */}
              <Button asChild variant="outline" className="w-full">
                <Link href="/cars">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Listings
                </Link>
              </Button>
            </div>
          </div>

          {/* Similar cars */}
          {similar.length > 0 && (
            <div className="mt-14">
              <h2
                className="text-2xl font-extrabold text-[#0A1628] mb-6"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Similar Cars
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similar.map((s) => (
                  <CarCard key={s.id} car={s as Car} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
