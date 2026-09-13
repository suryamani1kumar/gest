"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

const subCategories = [
  {
    name: "Blue Sapphire",
    hindi: "Neelam",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827408/gemstone-products/npp4ma5frmptmjpzmbpg.png",
    link: "/gemstones/blue-sapphire",
  },
  {
    name: "Emerald",
    hindi: "Panna",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827051/gemstone-products/mlb3on5mpeothilxkmrz.png",
    link: "/gemstones/emerald",
  },
  {
    name: "Yellow Sapphire",
    hindi: "Pukhraj",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827592/gemstone-products/kpaz8jt4kdiz2we09p6h.png",
    link: "/gemstones/yellow-sapphire",
  },
  {
    name: "Pearl",
    hindi: "Moti",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844594/gemstone-products/t7vjucddlznnuou0adba.png",
    link: "/gemstones/pearl",
  },
  {
    name: "Red Coral",
    hindi: "Moonga",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844625/gemstone-products/kbdkfjjype71c5hyelg3.png",
    link: "/gemstones/red-coral",
  },
  {
    name: "Opal",
    hindi: "",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787828503/gemstone-products/n6e9w7udpbx85myroua2.png",
    link: "/gemstones/opal",
  },
  {
    name: "Turquoise",
    hindi: "Firoza",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844648/gemstone-products/ozvefhlq1q4mj0ntonxp.jpg",
    link: "/gemstones/turquoise",
  },
  {
    name: "Citrine",
    hindi: "Sunela",
    img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844667/gemstone-products/oes0zceeynedoault6f0.jpg",
    link: "/gemstones/citrine",
  },
];

export default function RudCategory() {
  const categories = subCategories;

  return (
    <section className="relative overflow-hidden bg-[#FAF8F2] py-10 sm:py-12 lg:py-14">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-60 w-60 rounded-full bg-[#C9A227]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#7A1F1F]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7A1F1F]">
              Our Collection
            </p>

            <h3 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-3xl">
              Choose Your <span className="text-[#7A1F1F]">Rudraksha</span>
            </h3>
          </div>

          <Link
            href="/rudraksha"
            className="group hidden w-fit items-center gap-2 border-b border-[#C9A227] pb-1 text-sm font-semibold text-[#7A1F1F] sm:flex"
          >
            View All
            <HiArrowUpRight
              size={17}
              className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((rudraksha) => (
            <Link
              key={rudraksha.link}
              href={rudraksha.link}
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Reduced height */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EEEAE1]">
                <img
                  src={rudraksha.img}
                  alt={rudraksha.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-90" />

                {/* Arrow */}
                <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white text-[#7A1F1F] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <HiArrowUpRight size={15} />
                </div>

                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h4 className="font-serif text-base font-bold text-white sm:text-lg">
                    {rudraksha.name}
                  </h4>

                  {rudraksha.hindi && (
                    <p className="mt-0.5 text-xs text-[#E5C35B]">
                      {rudraksha.hindi}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/rudraksha"
            className="flex items-center gap-2 border-b border-[#C9A227] pb-1 text-sm font-semibold text-[#7A1F1F]"
          >
            View All Rudrakshas
            <HiArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
