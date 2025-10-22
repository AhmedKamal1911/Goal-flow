import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/register"],
        disallow: ["/flow", "/api"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
