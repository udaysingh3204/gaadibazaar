import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  variant: z.string().optional(),
  yearOfManufacture: z
    .number()
    .int()
    .min(2000, "Year must be 2000 or later")
    .max(new Date().getFullYear() + 1, `Year must be ${new Date().getFullYear() + 1} or earlier`),
  registrationYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  fuelType: z.enum(["PETROL", "DIESEL", "CNG", "ELECTRIC", "HYBRID"]),
  transmission: z.enum(["MANUAL", "AUTOMATIC", "AMT", "CVT", "DCT"]),
  engineCC: z.number().int().min(100).max(10000),
  mileageKmpl: z.number().min(0).max(100).optional().nullable(),
  kmDriven: z.number().int().min(0),
  numberOfOwners: z.enum(["FIRST", "SECOND", "THIRD", "FOURTH_PLUS"]),
  bodyType: z.enum(["HATCHBACK", "SEDAN", "SUV", "MUV", "COUPE", "CONVERTIBLE", "PICKUP", "VAN"]),
  color: z.string().min(1, "Color is required"),
  insuranceValid: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  askingPrice: z.number().int().min(10000, "Price must be at least ₹10,000"),
  sellerName: z.string().min(1, "Seller name is required"),
  sellerPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
  highlights: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  isVerified: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  status: z.enum(["ACTIVE", "SOLD", "ON_HOLD", "REMOVED"]).default("ACTIVE"),
});

export type CarFormValues = z.infer<typeof carSchema>;
