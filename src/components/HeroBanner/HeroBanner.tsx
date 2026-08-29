"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHome, FaChevronRight } from "react-icons/fa";

interface HeroBannerProps {
  title: string;
  description: string;
  image: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

export default function HeroBanner({
  title,
  description,
  image,
  breadcrumbs = [],
}: HeroBannerProps) {
  return (
   <section className="relative min-h-[420px] w-full overflow-hidden">
  {/* Background Image */}
  <Image
    src={image}
    alt={title}
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/55" />

  {/* Content */}
  <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
    
    {/* Title */}
    <h1 className="text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
      {title}
    </h1>

    {/* Description */}
    <p className="mt-4 max-w-2xl text-base leading-7 text-white drop-shadow-md sm:text-lg">
      {description}
    </p>

    {/* Breadcrumb */}
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/40 bg-black/30 px-5 py-2.5 text-sm backdrop-blur-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-white transition hover:text-white/80"
      >
        <FaHome className="text-xs" />
        Home
      </Link>

      {breadcrumbs.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          <FaChevronRight className="text-[10px] text-white/60" />

          {item.href ? (
            <Link
              href={item.href}
              className="text-white transition hover:text-white/80"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-white">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  </div>
</section>
  );
}
