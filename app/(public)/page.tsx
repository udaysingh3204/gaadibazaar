export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { normalizeCarListData } from "@/lib/data-utils";
import HeroSection from "@/components/public/HeroSection";
import TrustBadges from "@/components/public/TrustBadges";
import CarCard from "@/components/public/CarCard";
import HowItWorks from "@/components/public/HowItWorks";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import BodyTypeSection from "@/components/public/BodyTypeSection";
import { NCRQuickLinks } from "@/components/public/NCRQuickLinks";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

async function FeaturedCars() {
  const cars = await prisma.car.findMany({
    where: { isFeatured: true, status: "ACTIVE" },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const normalized = normalizeCarListData(cars.length > 0 ? cars :
    await prisma.car.findMany({
      where: { status: "ACTIVE" },
      take: 4,
      orderBy: { viewCount: "desc" },
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {normalized.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

function FeaturedCarsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Skeleton className="aspect-[16/10] rounded-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <NCRQuickLinks />

      {/* Featured Listings */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-1">
                Handpicked
              </p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#0A1628]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Featured Cars
              </h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/cars">View All</Link>
            </Button>
          </div>
          <Suspense fallback={<FeaturedCarsSkeleton />}>
            <FeaturedCars />
          </Suspense>
        </div>
      </section>

      <BodyTypeSection />
      <HowItWorks />
      <TestimonialsSection />

      {/* CTA Banner */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to find your car?
          </h2>
          <p className="text-gray-500 mb-8">
            Join 2 lakh+ happy buyers who found their perfect drive on GaadiBazaar.
          </p>
          <Button asChild size="lg">
            <Link href="/cars">Browse All Cars</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
