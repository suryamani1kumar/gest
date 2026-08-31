"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CategoryImage {
  url: string;
  publicId: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  productCount: number;
  image: CategoryImage | null;
  status: "Active" | "Inactive";
}

export default function CategorySection() {
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGemstoneCategories = async () => {
      try {
        setLoading(true);

        // Get Gemstone parent category
        const categoryResponse = await fetch("/api/categories?name=Gemstone");

        const categoryResult = await categoryResponse.json();

        if (!categoryResult.success || !categoryResult.data?.length) {
          return;
        }

        const gemstoneCategory = categoryResult.data[0];

        setCategory(gemstoneCategory);

        // Get Gemstone subcategories
        const subCategoryResponse = await fetch(
          `/api/categories?parentCategory=${gemstoneCategory._id}`,
        );

        const subCategoryResult = await subCategoryResponse.json();

        if (subCategoryResult.success) {
          setSubCategories(subCategoryResult.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch gemstone categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemstoneCategories();
  }, []);

  return (
    <section className="py-10 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-[#7A1F1F] uppercase tracking-[3px] text-xs font-semibold block mb-2">
            Explore By Category
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] font-bold">
            Product Categories
          </h2>
          <div className="w-20 h-0.5 bg-[#C9A227] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {subCategories.map((gemstone) => (
            <Link
              key={gemstone._id}
              href={`/gemstones/${gemstone.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] p-4 text-center shadow-xs hover:shadow-xl hover:border-[#C9A227] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Circle */}
              <div className="relative w-30 h-30 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden bg-[#FFFDF8] group-hover:border-[#C9A227] transition-colors flex items-center justify-center">
                {/* Inner Circle */}
                {gemstone.image?.url ? (
                  <img
                    src={gemstone.image.url}
                    alt={gemstone.name}
                    className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="font-serif text-3xl text-gray-300">
                    {gemstone.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Category Name */}
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#7A1F1F] transition-colors line-clamp-1">
                {gemstone.name}
              </h3>

              {/* Product Count */}
              <span className="inline-block mt-3 px-2.5 py-0.5 text-[12px] font-semibold text-[#7A1F1F] bg-[#FAF0F0] rounded-full group-hover:bg-[#7A1F1F] group-hover:text-white transition-colors">
                {gemstone.productCount || 0}+ Selections
              </span>

              {/* View Details */}
              <p className="text-[13px] flex items-center justify-center gap-2 text-[#6B7280] mt-3 line-clamp-1 font-light transition-colors  duration-300  group-hover:text-gray-900">
                View Collection
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
