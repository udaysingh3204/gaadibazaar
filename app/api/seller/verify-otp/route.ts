import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";

const schema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  code: z.string().length(6, "OTP must be 6 digits"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional(),
  city: z.string().min(1, "City is required"),
});

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "gaadibazaar-seller-secret");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, code, name, email, city } = schema.parse(body);

    const valid = await verifyOtp(phone, code);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Find or create PrivateSeller by phone
    let seller = await prisma.privateSeller.findFirst({ where: { phone } });
    if (seller) {
      seller = await prisma.privateSeller.update({
        where: { id: seller.id },
        data: { name, email, city, otpVerified: true },
      });
    } else {
      seller = await prisma.privateSeller.create({
        data: { phone, name, email, city, otpVerified: true },
      });
    }

    // Issue short-lived JWT (1 hour) for the seller session
    const token = await new SignJWT({ sellerId: seller.id, phone, name })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(SECRET);

    return NextResponse.json({ success: true, token, seller: { id: seller.id, name, phone, city } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 });
    }
    console.error("[Verify OTP Error]", error);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
