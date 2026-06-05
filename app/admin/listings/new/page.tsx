import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CarForm from "@/components/admin/CarForm";

export const metadata = { title: "Add New Car" };

export default async function NewListingPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-extrabold text-[#0A1628]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Add New Car
        </h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details to publish a new listing.</p>
      </div>
      <CarForm />
    </div>
  );
}
