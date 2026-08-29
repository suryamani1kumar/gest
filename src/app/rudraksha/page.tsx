"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Loader from "@/components/Spinloader/Loader";

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

const Rudraksha = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGemstoneCategories = async () => {
      try {
        setLoading(true);

        // Get Gemstone parent category
        const categoryResponse = await fetch("/api/categories?name=Rudraksha");

        const categoryResult = await categoryResponse.json();

        if (!categoryResult.success || !categoryResult.data?.length) {
          return;
        }

        const rudrakshaCategory = categoryResult.data[0];

        setCategory(rudrakshaCategory);

        // Get Gemstone subcategories
        const subCategoryResponse = await fetch(
          `/api/categories?parentCategory=${rudrakshaCategory._id}`,
        );

        const subCategoryResult = await subCategoryResponse.json();

        if (subCategoryResult.success) {
          setSubCategories(subCategoryResult.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch rudraksha categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemstoneCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] ">
      <HeroBanner
        title="Rudraksha"
        description="Discover our carefully selected collection of authentic Rudraksha, chosen for purity, quality, and spiritual significance."
        image="/images/gemstones/gembanner1.png"
        breadcrumbs={[
          {
            label: "Rudraksha",
          },
        ]}
      />
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Gemstone Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {subCategories.map((rudraksha) => (
            <Link
              key={rudraksha._id}
              href={`/gemstones/${rudraksha.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] p-4 text-center shadow-xs hover:shadow-xl hover:border-[#C9A227] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Circle */}
              <div className="relative w-30 h-30 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden bg-[#FFFDF8] group-hover:border-[#C9A227] transition-colors flex items-center justify-center">
                {/* Inner Circle */}
                {rudraksha.image?.url ? (
                  <img
                    src={rudraksha.image.url}
                    alt={rudraksha.name}
                    className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="font-serif text-3xl text-gray-300">
                    {rudraksha.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Category Name */}
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#7A1F1F] transition-colors line-clamp-1">
                {rudraksha.name}
              </h3>

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

        {/* Empty State */}
        {subCategories.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-gray-400">
              No rudraksha categories found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Rudraksha;
