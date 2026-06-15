import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/lib/blog-data";
import { LAUNCH_CITIES } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/cars`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/sell`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const cityUrls: MetadataRoute.Sitemap = LAUNCH_CITIES.map((city) => ({
    url: `${baseUrl}/cars?city=${encodeURIComponent(city)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

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
    return [...staticRoutes, ...blogUrls, ...cityUrls, ...carUrls];
  } catch {
    return [...staticRoutes, ...blogUrls, ...cityUrls];
  }
}
