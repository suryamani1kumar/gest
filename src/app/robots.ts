import type { MetadataRoute } from "next";

const BASE_URL = "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
      //   disallow: [
      //     "/api/",
      //     "/account/",
      //     "/cart/",
      //     "/checkout/",
      //     "/wishlist/",
      //   ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}