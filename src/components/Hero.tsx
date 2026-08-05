"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/images/banner1.jpg",
    subtitle: "The High Jewelry Collection",
    title: "Elegance Forged in",
    italic: "Precious Time",
    description:
      "Discover exceptional craftsmanship and rare gemstones curated for those who appreciate extraordinary luxury.",
  },
  {
    image: "/images/banner2.jpg",
    subtitle: "Luxury Diamonds",
    title: "Timeless",
    italic: "Brilliance",
    description:
      "Exclusive diamond jewellery designed with perfection and elegance.",
  },
  {
    image: "/images/banner3.jpg",
    subtitle: "Natural Gemstones",
    title: "Rare",
    italic: "Treasures",
    description:
      "Explore premium emeralds, rubies, sapphires, and exceptional gemstones.",
  },
  {
    image: "/images/banner4.jpg",
    subtitle: "Natural Gemstones",
    title: "Rare",
    italic: "Treasures",
    description:
      "Explore premium emeralds, rubies, sapphires, and exceptional gemstones.",
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop={true}
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        className="h-screen w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full">
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/45"></div>
              </div>

              {/* Content */}
              <div className="relative z-20 flex h-full items-center justify-center">
                <div className="max-w-4xl px-6 text-center">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 block uppercase tracking-[0.35em] text-yellow-300 text-sm md:text-base"
                  >
                    {slide.subtitle}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-white"
                  >
                    {slide.title}
                    <br />
                    <span className="italic font-light">{slide.italic}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-gray-200"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-10"
                  >
                    <Link
                      href="#collections"
                      className="inline-flex rounded bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-yellow-400"
                    >
                      Explore Collection
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      <button className="hero-prev absolute  cursor-pointer left-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black">
        <ChevronLeft size={28} />
      </button>

      {/* Next Button */}
      <button className="hero-next absolute cursor-pointer right-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black">
        <ChevronRight size={28} />
      </button>
    </section>
  );
}
