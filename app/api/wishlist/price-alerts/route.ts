import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const alertSchema = z.object({
  carId: z.string().min(1),
  currentPrice: z.number().positive(),
  enabled: z.boolean(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { carId, currentPrice, enabled } = alertSchema.parse(body);

    // TODO: Store price alert preference in database
    // For now, we'll just validate and return success
    // In future, this will:
    // 1. Create/update PriceAlert record in database
    // 2. Schedule price monitoring job
    // 3. Send notification when price drops 5%+

    if (!enabled) {
      // Remove price alert for this car
      console.log(`[Price Alert] Disabled for car ${carId}`);
    } else {
      // Enable price alert for this car
      const priceThreshold = currentPrice * 0.95; // 5% drop threshold
      console.log(
        `[Price Alert] Enabled for car ${carId}. Will notify if price drops below ₹${priceThreshold.toLocaleString("en-IN")}`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: enabled ? "Price alert enabled" : "Price alert disabled",
        data: {
          carId,
          enabled,
          priceThreshold: enabled ? currentPrice * 0.95 : null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data" },
        { status: 400 }
      );
    }

    console.error("[Price Alert API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update price alert" },
      { status: 500 }
    );
  }
}
