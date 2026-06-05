import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // TODO: Fetch dealer's leads from database
    // For MVP, return mock CSV data
    const mockLeads = [
      {
        id: "lead-001",
        date: new Date().toISOString().split("T")[0],
        buyer_name: "Raj Kumar",
        buyer_phone: "9876543210",
        buyer_email: "raj@example.com",
        car_brand: "BMW",
        car_model: "3 Series",
        car_price: "₹25,00,000",
        status: "NEW",
        source: "PLATFORM",
      },
      {
        id: "lead-002",
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        buyer_name: "Priya Singh",
        buyer_phone: "9876543211",
        buyer_email: "priya@example.com",
        car_brand: "Mercedes",
        car_model: "C-Class",
        car_price: "₹30,00,000",
        status: "CONTACTED",
        source: "WHATSAPP",
      },
    ];

    // Generate CSV
    const headers = [
      "ID",
      "Date",
      "Buyer Name",
      "Buyer Phone",
      "Buyer Email",
      "Car Brand",
      "Car Model",
      "Car Price",
      "Status",
      "Source",
    ];

    const csvContent = [
      headers.join(","),
      ...mockLeads.map((lead) =>
        [
          lead.id,
          lead.date,
          `"${lead.buyer_name}"`,
          lead.buyer_phone,
          lead.buyer_email,
          lead.car_brand,
          lead.car_model,
          lead.car_price,
          lead.status,
          lead.source,
        ].join(",")
      ),
    ].join("\n");

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("[Lead Export API Error]", error);
    return NextResponse.json(
      { error: "Failed to export leads" },
      { status: 500 }
    );
  }
}
