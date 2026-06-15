export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ListingsTable from "@/components/admin/ListingsTable";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";
import type { Car } from "@/types/car";

export const metadata = { title: "Listings" };

export default async function AdminListingsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [cars, pendingCount] = await Promise.all([
    prisma.car.findMany({
      where: { status: { not: "REMOVED" } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.car.count({ where: { listingType: "PRIVATE", status: "ON_HOLD" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-extrabold text-[#0A1628]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            All Listings
          </h1>
          <p className="text-gray-500 text-sm mt-1">{cars.length} total listings</p>
        </div>
        <div className="flex gap-2">
          {pendingCount > 0 && (
            <Button asChild variant="outline" className="gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-50">
              <Link href="/admin/listings/pending">
                <Clock className="w-4 h-4" />
                {pendingCount} Pending Review
              </Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/admin/listings/new">
              <Plus className="w-4 h-4 mr-1" />
              Add New Car
            </Link>
          </Button>
        </div>
      </div>

      <ListingsTable cars={cars as Car[]} />
    </div>
  );
}
