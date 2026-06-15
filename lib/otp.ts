import { prisma } from "@/lib/prisma";

const OTP_TTL_MINUTES = 10;
const OTP_COOLDOWN_SECONDS = 60;

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOtp(phone: string): Promise<{ code: string; cooldownError?: string }> {
  // Check cooldown — prevent spam
  const recent = await prisma.otpRequest.findFirst({
    where: {
      phone,
      createdAt: { gte: new Date(Date.now() - OTP_COOLDOWN_SECONDS * 1000) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (recent) {
    const secondsLeft = Math.ceil(
      OTP_COOLDOWN_SECONDS - (Date.now() - recent.createdAt.getTime()) / 1000
    );
    return { code: "", cooldownError: `Wait ${secondsLeft}s before requesting again` };
  }

  // Invalidate previous unused OTPs for this phone
  await prisma.otpRequest.updateMany({
    where: { phone, used: false },
    data: { used: true },
  });

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await prisma.otpRequest.create({ data: { phone, code, expiresAt } });

  return { code };
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const record = await prisma.otpRequest.findFirst({
    where: {
      phone,
      code,
      used: false,
      expiresAt: { gte: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return false;

  await prisma.otpRequest.update({ where: { id: record.id }, data: { used: true } });
  return true;
}
