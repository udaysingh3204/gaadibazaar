import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "gaadibazaar-seller-secret");

const listingSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  variant: z.string().optional(),
  yearOfManufacture: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  registrationYear: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  fuelType: z.enum(["PETROL", "DIESEL", "CNG", "ELECTRIC", "HYBRID"]),
  transmission: z.enum(["MANUAL", "AUTOMATIC", "AMT", "CVT", "DCT"]),
  engineCC: z.number().int().min(100).max(10000),
  mileageKmpl: z.number().optional().nullable(),
  kmDriven: z.number().int().min(0),
  numberOfOwners: z.enum(["FIRST", "SECOND", "THIRD", "FOURTH_PLUS"]),
  bodyType: z.enum(["HATCHBACK", "SEDAN", "SUV", "MUV", "COUPE", "CONVERTIBLE", "PICKUP", "VAN"]),
  color: z.string().min(1),
  city: z.string().min(1),
  askingPrice: z.number().int().min(10000),
  highlights: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  sellerToken: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = listingSchema.parse(body);

    // Verify seller JWT
    let sellerId: string;
    let sellerName: string;
    let sellerPhone: string;
    try {
      const { payload } = await jwtVerify(data.sellerToken, SECRET);
      sellerId = payload.sellerId as string;
      sellerName = payload.name as string;
      sellerPhone = payload.phone as string;
    } catch {
      return NextResponse.json({ success: false, error: "Invalid or expired session. Please verify OTP again." }, { status: 401 });
    }

    const car = await prisma.car.create({
      data: {
        brand: data.brand,
        model: data.model,
        variant: data.variant,
        yearOfManufacture: data.yearOfManufacture,
        registrationYear: data.registrationYear,
        fuelType: data.fuelType,
        transmission: data.transmission,
        engineCC: data.engineCC,
        mileageKmpl: data.mileageKmpl,
        kmDriven: data.kmDriven,
        numberOfOwners: data.numberOfOwners,
        bodyType: data.bodyType,
        color: data.color,
        city: data.city,
        askingPrice: data.askingPrice,
        sellerName,
        sellerPhone,
        highlights: data.highlights,
        images: data.images,
        listingType: "PRIVATE",
        status: "ON_HOLD",
        sellerId,
      },
    });

    return NextResponse.json({ success: true, carId: car.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 });
    }
    console.error("[Seller Listing Error]", error);
    return NextResponse.json({ success: false, error: "Failed to create listing" }, { status: 500 });
  }
}
