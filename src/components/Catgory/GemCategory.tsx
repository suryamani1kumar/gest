"use client";

import Link from "next/link";
import { GiH2O } from "react-icons/gi";
import { HiArrowUpRight } from "react-icons/hi2";

const subCategories = [
  {
    name: "Ruby ( Manik )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787570156/gemstone-products/ufqf52v7wnwvsefleoea.png",
    link: "/gemstones/ruby",
  },
  {
    name: "Blue Sapphire ( Neelam )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827408/gemstone-products/npp4ma5frmptmjpzmbpg.png",
    link: "/gemstones/blue-sapphire",
  },
  {
    name: "Emerald ( Panna )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827051/gemstone-products/mlb3on5mpeothilxkmrz.png",
    link: "/gemstones/emerald",
  },
  {
    name: "Yellow Sapphire ( Pukhraj )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827592/gemstone-products/kpaz8jt4kdiz2we09p6h.png",
    link: "/gemstones/yellow-sapphire",
  },
  {
    name: "Pearl ( Moti )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844594/gemstone-products/t7vjucddlznnuou0adba.png",
    link: "/gemstones/pearl",
  },
  {
    name: "Red Coral ( Moonga )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844625/gemstone-products/kbdkfjjype71c5hyelg3.png",
    link: "/gemstones/red-coral",
  },
  {
    name: "Opal",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787828503/gemstone-products/n6e9w7udpbx85myroua2.png",
    link: "/gemstones/opal",
  },
  {
    name: "Turquoise ( Firoza )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844648/gemstone-products/ozvefhlq1q4mj0ntonxp.jpg",
    link: "/gemstones/turquoise",
  },
  {
    name: "Citrine ( Sunela )",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844667/gemstone-products/oes0zceeynedoault6f0.jpg",
    link: "/gemstones/citrine",
  },
];

export default function GemCategory() {
  const featuredCategory = subCategories[0];
  const remainingCategories = subCategories.slice(1, 5);

  return (
    <section className="relative overflow-hidden bg-[#FFFDF8] py-16 sm:py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C9A227]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#7A1F1F]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7A1F1F]">
              The Art of Natural Beauty
            </span>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              Discover Our <span className="text-[#7A1F1F]">Gemstones</span>
            </h2>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-14 bg-[#C9A227]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
            </div>
          </div>

          <Link
            href="/gemstones"
            className="group flex w-fit items-center gap-2 border-b border-[#C9A227] pb-1 text-sm font-semibold text-[#7A1F1F]"
          >
            Explore Collection
            <HiArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* ================= EDITORIAL GRID ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {/* ================= FEATURED CATEGORY ================= */}
          <Link
            href={`/gemstones/${featuredCategory.link}`}
            className="group relative min-h-[430px] overflow-hidden rounded-2xl bg-[#EDE8DC] sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            {/* Image */}
            <img
              src={featuredCategory.img}
              alt={featuredCategory.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Featured badge */}
            <div className="absolute left-5 top-5">
              <span className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Featured
              </span>
            </div>

            {/* Arrow */}
            <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#7A1F1F] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
              <HiArrowUpRight size={20} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#E5C35B]">
                Discover
              </p>

              <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                {featuredCategory.name}
              </h3>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Explore Collection
                <HiArrowUpRight size={15} />
              </div>
            </div>
          </Link>

          {/* ================= SMALL CATEGORIES ================= */}
          {remainingCategories.map((gemstone) => (
            <Link
              key={gemstone.link}
              href={gemstone.link}
              className="group relative min-h-[220px] overflow-hidden rounded-2xl bg-[#EDE8DC]"
            >
              {/* Image */}
              <img
                src={gemstone.img}
                alt={gemstone.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-all duration-300 group-hover:from-black/85" />

              {/* Arrow */}
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7A1F1F] opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
                <HiArrowUpRight size={17} />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl font-bold text-white">
                  {gemstone.name}
                </h3>

                <div className="mt-1 flex items-center justify-between">
                  <span className="translate-y-2 text-xs font-semibold uppercase tracking-widest text-[#E5C35B] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ================= MOBILE / EXTRA CATEGORIES ================= */}
        {subCategories.length > 5 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {subCategories.slice(5).map((gemstone) => (
              <Link
                key={gemstone.link}
                href={gemstone.link}
                className="group relative h-40 overflow-hidden rounded-2xl bg-[#EDE8DC]"
              >
                <img
                  src={gemstone.img}
                  alt={gemstone.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif font-bold text-white">
                    {gemstone.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
