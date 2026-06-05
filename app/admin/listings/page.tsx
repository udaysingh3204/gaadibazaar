export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ListingsTable from "@/components/admin/ListingsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Car } from "@/types/car";

export const metadata = { title: "Listings" };

export default async function AdminListingsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const cars = await prisma.car.findMany({
    where: { status: { not: "REMOVED" } },
    orderBy: { createdAt: "desc" },
  });

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
        <Button asChild>
          <Link href="/admin/listings/new">
            <Plus className="w-4 h-4 mr-1" />
            Add New Car
          </Link>
        </Button>
      </div>

      <ListingsTable cars={cars as Car[]} />
    </div>
  );
}
