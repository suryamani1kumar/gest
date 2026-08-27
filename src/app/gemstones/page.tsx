"use client";

import React, { useEffect, useState } from "react";
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

const GemsStones = () => {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f6] px-6 py-16">
        <div className="mx-auto flex max-w-7xl justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-[#a67c00]" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl text-gray-900">
            {category?.name || "Gemstones"}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500">
            Discover our collection of natural gemstones, carefully selected for
            their beauty, quality and unique character.
          </p>
        </div>

        {/* Gemstone Cards */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {subCategories.map((gemstone) => (
            <Link
              key={gemstone._id}
              href={`/gemstones/${gemstone.slug}`}
              className="group"
            >
              <article
                className="
                  relative
                  flex
                  min-h-[200px]
                  flex-col
                  items-center
                  rounded-[20px]
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-4
                  text-center
                  shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#c99a19]
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.10)]
                "
              >
                {/* Image Circle */}
                <div
                  className="
                    relative
                    flex
                    h-[120px]
                    w-[120px]
                    items-center
                    justify-center
                    rounded-full
                    border-gray-200
                    transition-all
                    duration-300
                    group-hover:border-[#c99a19]
                  "
                >
                  {/* Inner Circle */}
                  <div
                    className="
                      relative
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-[#f7f4ec]
                    "
                  >
                    {gemstone.image?.url ? (
                      <img
                        src={gemstone.image.url}
                        alt={gemstone.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />
                    ) : (
                      <span className="font-serif text-3xl text-gray-300">
                        {gemstone.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Name */}
                <h2
                  className="
                    mt-3
                    font-serif
                    text-[21px]
                    font-semibold
                    text-gray-900
                    transition-colors
                    duration-300
                    group-hover:text-[#8d1f1f]
                  "
                >
                  {gemstone.name}
                </h2>

                

                {/* Product Count */}
                <span
                  className="
                    mt-3
                    rounded-full
                    bg-[#fbf0f0]
                    px-4
                    py-1.5
                    text-xs
                    font-medium
                    text-[#8d1f1f]
                    transition-all
                    duration-300
                    group-hover:bg-[#8d1f1f]
                    group-hover:text-white
                  "
                >
                  {gemstone.productCount || 0}+ Varieties
                </span>

                {/* View Details */}
                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-gray-400
                    transition-colors
                    duration-300
                    group-hover:text-gray-900
                  "
                >
                  View Collection
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {subCategories.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-gray-400">
              No gemstone categories found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default GemsStones;
