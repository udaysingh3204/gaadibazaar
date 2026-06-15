export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PendingListingsClient } from "./PendingListingsClient";

export const metadata = { title: "Pending Private Listings" };

export default async function PendingListingsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const pending = await prisma.car.findMany({
    where: { listingType: "PRIVATE", status: "ON_HOLD" },
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-extrabold text-[#0A1628]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Pending Private Listings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {pending.length} listing{pending.length !== 1 ? "s" : ""} awaiting review — approve or reject each one.
        </p>
      </div>

      <PendingListingsClient cars={pending as any} />
    </div>
  );
}
