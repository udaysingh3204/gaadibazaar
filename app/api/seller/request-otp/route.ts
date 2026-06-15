import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOtp } from "@/lib/otp";
import { sendEmail } from "@/lib/email-helper";

const schema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, email } = schema.parse(body);

    const { code, cooldownError } = await createOtp(phone);

    if (cooldownError) {
      return NextResponse.json({ success: false, error: cooldownError }, { status: 429 });
    }

    // Send OTP via email if provided, otherwise log for dev
    if (email) {
      await sendEmail({
        to: email,
        subject: `Your GaadiBazaar OTP: ${code}`,
        html: `
          <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #0A1628;">Verify your phone number</h2>
            <p style="color: #555;">Use the OTP below to verify your listing on GaadiBazaar.</p>
            <div style="background: #F8F7F4; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <p style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #FF6B2B; margin: 0;">${code}</p>
              <p style="color: #999; font-size: 12px; margin-top: 8px;">Expires in 10 minutes</p>
            </div>
            <p style="color: #999; font-size: 12px;">If you didn't request this, ignore this email.</p>
          </div>
        `,
      });
    } else {
      // Dev mode: log OTP
      console.log(`[OTP] Phone: ${phone} → Code: ${code}`);
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 });
    }
    console.error("[Request OTP Error]", error);
    return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 });
  }
}
