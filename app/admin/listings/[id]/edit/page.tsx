export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CarForm from "@/components/admin/CarForm";
import type { Car } from "@/types/car";

export const metadata = { title: "Edit Listing" };

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-extrabold text-[#0A1628]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Edit Listing
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {car.brand} {car.model} {car.variant ?? ""}
        </p>
      </div>
      <CarForm car={car as Car} />
    </div>
  );
}
