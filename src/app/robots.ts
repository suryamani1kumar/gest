import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [
        "/",
        "/api/",
        "/account/",
        "/cart/",
        "/checkout/",
        "/wishlist/",
      ],
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
