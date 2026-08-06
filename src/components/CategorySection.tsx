"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const productCategories = [
  {
    id: "rings",
    name: "Rings",
    tagline: "Solitaires & Gemstones",
    count: "450+ Designs",
    image: "/images/ring.png",
    link: "/collections/rings",
  },
  {
    id: "earrings",
    name: "Earrings",
    tagline: "Studs, Drops & Jhumkas",
    count: "620+ Designs",
    image: "/images/earrings.png",
    link: "/collections/earrings",
  },
  {
    id: "necklaces",
    name: "Necklaces & Pendants",
    tagline: "Chains & Heritage Sets",
    count: "380+ Designs",
    image: "/images/hero.png",
    link: "/collections/necklaces",
  },
  {
    id: "gemstones",
    name: "Natural Gemstones",
    tagline: "Certified Ruby, Sapphire & Emerald",
    count: "100% Certified",
    image: "/images/gemstones/manik.png",
    link: "/gemstones",
  },
  {
    id: "rudraksha",
    name: "Sacred Rudraksha",
    tagline: "Blessed Beads & Malas",
    count: "Vedic Energized",
    image: "/images/craftsmanship.png",
    link: "/collections/rudraksha",
  },
  {
    id: "bangles",
    name: "Bangles & Bracelets",
    tagline: "Classic Gold & Diamond Kadas",
    count: "290+ Designs",
    image: "/images/banner2.jpg",
    link: "/collections/bangles",
  },
];

export default function CategorySection() {
  const [activeTab, setActiveTab] = useState("all");

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
          {productCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative block overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] p-4 text-center shadow-xs hover:shadow-xl hover:border-[#C9A227] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Circle */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden bg-[#FFFDF8] border-2 border-[#E5E7EB] group-hover:border-[#C9A227] transition-colors p-2 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Info */}
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#7A1F1F] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#6B7280] mt-1 line-clamp-1 font-light">
                {cat.tagline}
              </p>
              <span className="inline-block mt-3 px-2.5 py-0.5 text-[10px] font-semibold text-[#7A1F1F] bg-[#FAF0F0] rounded-full group-hover:bg-[#7A1F1F] group-hover:text-white transition-colors">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
