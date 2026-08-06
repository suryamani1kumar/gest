"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Timeless Beauty",
    subtitle: "Nature's Treasures",
    description:
      "Exquisite Gemstones. Trusted Quality. Crafted by Nature, Chosen for You.",
    buttonText: "Explore Collection",
    buttonLink: "/collection",
    features: [
      {
        title: "100% <br/> Natural",
        icon: "/images/banner/icon/diamond.png",
      },
      {
        title: "Certified <br/> Gemstones",
        icon: "/images/banner/icon/certificate.png",
      },
      {
        title: "Ethically <br/> Sourced",
        icon: "/images/banner/icon/source.png",
      },
      {
        title: "Trusted <br/> Quality",
        icon: "/images/banner/icon/shield.png",
      },
    ],
    image: "/images/banner/banner1.png",
  },
  {
    id: 2,
    title: "Timeless Elegance",
    subtitle: "Nature's Treasures",
    description:
      "Exquisite Gemstones. Fine Jewelry. Crafted by Nature, Perfected for You.",
    buttonText: "Explore Collection",
    buttonLink: "/collection",
    features: [
      {
        title: "Natural <br/> Gemstones",
        icon: "/images/banner/icon/diamond.png",
      },
      {
        title: "Fine Gold <br/> & Silver",
        icon: "/images/banner/icon/ring.png",
      },
      {
        title: "Trusted <br/> Quality",
        icon: "/images/banner/icon/shield.png",
      },
    ],
    image: "/images/banner/banner2.png",
  },
  {
    id: 3,
    title: "Rudraksha",
    subtitle: "Divine Energy. Ancient Wisdom.",
    description:
      "Authentic Rudraksha beads blessed by nature, known to bring peace, prosperity, and protection. Wear the power of Lord Shiva.",
    buttonText: "Explore Collection",
    buttonLink: "/collection",
    features: [
      {
        title: "Brings Peace <br/> & Calm",
        icon: "/images/banner/icon/meditation.png",
      },
      {
        title: "Protects From <br/> Negativity",
        icon: "/images/banner/icon/shield.png",
      },
      {
        title: "Enhances Focus <br/> & Clarity",
        icon: "/images/banner/icon/lotus.png",
      },
      {
        title: "Supports Spiritual <br/> Growth",
        icon: "/images/banner/icon/om.png",
      },
    ],
    image: "/images/banner/banner3.png",
  },
  {
    id: 4,
    title: "Rudraksha",
    subtitle: "Divine Energy. Ancient Wisdom.",
    description:
      "Authentic Rudraksha beads blessed by nature, known to bring peace, prosperity and protection. Wear the power of Lord Shiva.",
    buttonText: "Explore Collection",
    buttonLink: "/collection",
    features: [
      {
        title: "Brings Peace <br/> & Calm",
        icon: "/images/banner/icon/meditation.png",
      },
      {
        title: "Protects From <br/> Negativity",
        icon: "/images/banner/icon/shield.png",
      },
      {
        title: "Enhances Focus <br/> & Clarity",
        icon: "/images/banner/icon/lotus.png",
      },
      {
        title: "Supports Spiritual <br/> Growth",
        icon: "/images/banner/icon/om.png",
      },
    ],
    image: "/images/banner/banner4.png",
  },
];

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-116px)] md:h-[calc(100vh-130px)] w-full overflow-hidden">
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
        className="h-[calc(100vh-116px)] md:h-[calc(100vh-130px)] w-full heroSwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[calc(100vh-116px)] md:h-[calc(100vh-130px)] w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                width={1920}
                height={1080}
                priority={index === 0}
                className="absolute inset-0 h-full w-full object-cover"
                sizes="100vw"
              />

              {/* Content */}
              <div className="relative flex z-10 max-w-7xl mx-auto h-full items-center">
                <div className="flex flex-col justify-center text-white">
                  <span className="mb-2 text-sm md:text-lg tracking-[5px] uppercase text-[#ffd371]">
                    {slide.subtitle}
                  </span>

                  <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#ffd371]">
                    {slide.title}
                  </h1>

                  <div className="my-5 h-px w-60 bg-amber-500" />

                  <p className="max-w-xl text-base md:text-md leading-9 text-neutral-200">
                    {slide.description}
                  </p>
                  {/* Button */}
                  <div className="mt-8">
                    <Link href={slide.buttonLink}>
                      <button className="rounded-lg bg-[#caa146] px-6 py-3 cursor-pointer text-lg font-semibold text-black transition hover:bg-amber-300">
                        {slide.buttonText} →
                      </button>
                    </Link>
                  </div>
                  {/* Features */}
                  <div className="mt-10 hidden md:flex flex-wrap justify-start gap-6">
                    {slide.features.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-fit"
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={65}
                          height={65}
                          className="object-contain"
                        />

                        <p
                          className="mt-3 text-center text-xs font-medium uppercase tracking-wide text-white"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="hero-prev absolute  cursor-pointer left-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#caa146] bg-black/40 text-[#caa146] backdrop-blur-md transition-all duration-300 hover:bg-[#caa146] hover:text-black">
        <ChevronLeft size={28} />
      </button>

      <button className="hero-next absolute cursor-pointer right-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#caa146] bg-black/40 text-[#caa146] backdrop-blur-md transition-all duration-300 hover:bg-[#caa146] hover:text-black">
        <ChevronRight size={28} />
      </button>
    </section>
  );
}
