export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DashboardStats from "@/components/admin/DashboardStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatIndianPrice, timeAgo } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [total, active, sold, onHold, viewsResult, recentCars] = await Promise.all([
    prisma.car.count({ where: { status: { not: "REMOVED" } } }),
    prisma.car.count({ where: { status: "ACTIVE" } }),
    prisma.car.count({ where: { status: "SOLD" } }),
    prisma.car.count({ where: { status: "ON_HOLD" } }),
    prisma.car.aggregate({ where: { status: { not: "REMOVED" } }, _sum: { viewCount: true } }),
    prisma.car.findMany({
      where: { status: { not: "REMOVED" } },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true, brand: true, model: true, variant: true,
        askingPrice: true, status: true, city: true, createdAt: true,
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-extrabold text-[#0A1628]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, {session.user?.name}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/listings/new">
            <Plus className="w-4 h-4 mr-1" />
            Add New Car
          </Link>
        </Button>
      </div>

      <DashboardStats
        total={total}
        active={active}
        sold={sold}
        onHold={onHold}
        totalViews={viewsResult._sum.viewCount ?? 0}
      />

      {/* Recent listings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#0A1628]">Recent Listings</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/listings" className="text-[#FF6B2B] hover:text-[#E55A1C]">View All</Link>
          </Button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50">
              <th className="px-6 py-3 text-left font-semibold text-gray-500">Car</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-500">Price</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-500">City</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-500">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-500">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentCars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium text-[#1A1A2E]">
                  <Link href={`/admin/listings/${car.id}/edit`} className="hover:text-[#FF6B2B]">
                    {car.brand} {car.model}{car.variant ? ` ${car.variant}` : ""}
                  </Link>
                </td>
                <td className="px-6 py-3 text-[#FF6B2B] font-semibold">
                  {formatIndianPrice(car.askingPrice)}
                </td>
                <td className="px-6 py-3 text-gray-500">{car.city}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    car.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                    car.status === "SOLD" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400 text-xs">{timeAgo(car.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
