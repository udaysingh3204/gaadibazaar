import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  carId: z.string().min(1),
  buyerName: z.string().min(1),
  buyerPhone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  buyerEmail: z.string().email().optional(),
  message: z.string().optional(),
  source: z.enum(["PLATFORM", "WHATSAPP", "PHONE"]).default("PLATFORM"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { carId, buyerName, buyerPhone, buyerEmail, message, source } = schema.parse(body);

    const car = await prisma.car.findUnique({ where: { id: carId }, select: { dealerId: true } });
    if (!car) {
      return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
    }

    const lead = await prisma.lead.create({
      data: { carId, buyerName, buyerPhone, buyerEmail, message, source, dealerId: car.dealerId },
    });

    // Increment dealer total leads
    if (car.dealerId) {
      await prisma.dealer.update({
        where: { id: car.dealerId },
        data: { totalLeads: { increment: 1 } },
      }).catch(() => null);
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 });
    }
    console.error("[Lead API Error]", error);
    return NextResponse.json({ success: false, error: "Failed to record lead" }, { status: 500 });
  }
}
