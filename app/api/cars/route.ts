import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { carSchema } from "@/lib/validations/car.schema";
import { normalizeCarListData } from "@/lib/data-utils";
import type { Prisma, FuelType, Transmission, BodyType } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") ?? "12")));
    const skip = (page - 1) * limit;

    const where: Prisma.CarWhereInput = {};

    const brand = searchParams.get("brand");
    if (brand) where.brand = { equals: brand };

    const city = searchParams.get("city");
    if (city) where.city = { contains: city };

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      where.askingPrice = {};
      if (minPrice) where.askingPrice.gte = parseInt(minPrice);
      if (maxPrice) where.askingPrice.lte = parseInt(maxPrice);
    }

    const fuelType = searchParams.getAll("fuelType");
    if (fuelType.length > 0) where.fuelType = { in: fuelType as FuelType[] };

    const transmission = searchParams.getAll("transmission");
    if (transmission.length > 0) where.transmission = { in: transmission as Transmission[] };

    const bodyType = searchParams.getAll("bodyType");
    if (bodyType.length > 0) where.bodyType = { in: bodyType as BodyType[] };

    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    if (minYear || maxYear) {
      where.yearOfManufacture = {};
      if (minYear) where.yearOfManufacture.gte = parseInt(minYear);
      if (maxYear) where.yearOfManufacture.lte = parseInt(maxYear);
    }

    const maxKm = searchParams.get("maxKm");
    if (maxKm) where.kmDriven = { lte: parseInt(maxKm) };

    const status = searchParams.get("status");
    if (status) {
      where.status = status as Prisma.EnumListingStatusFilter;
    } else {
      where.status = { not: "REMOVED" };
    }

    const featured = searchParams.get("featured");
    if (featured === "true") where.isFeatured = true;

    const sort = searchParams.get("sort") ?? "newest";
    let orderBy: Prisma.CarOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { askingPrice: "asc" };
    else if (sort === "price_desc") orderBy = { askingPrice: "desc" };
    else if (sort === "km_asc") orderBy = { kmDriven: "asc" };
    else if (sort === "year_desc") orderBy = { yearOfManufacture: "desc" };

    const [data, total] = await Promise.all([
      prisma.car.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          brand: true,
          model: true,
          variant: true,
          yearOfManufacture: true,
          registrationYear: true,
          fuelType: true,
          transmission: true,
          engineCC: true,
          mileageKmpl: true,
          kmDriven: true,
          numberOfOwners: true,
          bodyType: true,
          color: true,
          city: true,
          askingPrice: true,
          images: true,
          isVerified: true,
          isFeatured: true,
          status: true,
          viewCount: true,
          createdAt: true,
          updatedAt: true,
          insuranceValid: true,
          sellerName: true,
          sellerPhone: true,
          highlights: true,
        },
      }),
      prisma.car.count({ where }),
    ]);

    return NextResponse.json({
      data: normalizeCarListData(data),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[GET /api/cars]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = carSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation error", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const car = await prisma.car.create({
      data: {
        ...parsed.data,
        mileageKmpl: parsed.data.mileageKmpl ?? null,
        insuranceValid: parsed.data.insuranceValid
          ? new Date(parsed.data.insuranceValid)
          : null,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("[POST /api/cars]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
