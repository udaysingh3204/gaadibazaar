import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/cars`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
  ];

  try {
    const cars = await prisma.car.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, updatedAt: true },
    });
    const carUrls: MetadataRoute.Sitemap = cars.map((car) => ({
      url: `${baseUrl}/cars/${car.id}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...carUrls];
  } catch {
    return staticRoutes;
  }
}
