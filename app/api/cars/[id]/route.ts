import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { carSchema } from "@/lib/validations/car.schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car || car.status === "REMOVED") {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // Increment view count (non-blocking)
    prisma.car.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => null);

    return NextResponse.json(car);
  } catch (error) {
    console.error("[GET /api/cars/[id]]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();

    // Allow partial updates — only validate provided fields
    const partial = carSchema.partial().safeParse(body);
    if (!partial.success) {
      return NextResponse.json(
        { message: "Validation error", errors: partial.error.flatten() },
        { status: 400 }
      );
    }

    const data = {
      ...partial.data,
      ...(partial.data.insuranceValid !== undefined && {
        insuranceValid: partial.data.insuranceValid
          ? new Date(partial.data.insuranceValid)
          : null,
      }),
    };

    const car = await prisma.car.update({ where: { id }, data });
    return NextResponse.json(car);
  } catch (error) {
    console.error("[PATCH /api/cars/[id]]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.car.update({ where: { id }, data: { status: "REMOVED" } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/cars/[id]]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
