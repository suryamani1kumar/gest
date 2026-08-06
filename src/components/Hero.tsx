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
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                  <div className="max-w-2xl text-white">
                    <span className="mb-2 block text-xs tracking-[3px] uppercase text-[#ffd371] sm:text-sm md:text-lg md:tracking-[5px]">
                      {slide.subtitle}
                    </span>

                    <h1 className="font-serif text-3xl font-bold text-[#ffd371] sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <div className="my-5 h-px w-40 bg-amber-500 sm:w-60" />

                    <p className="max-w-xl text-sm leading-7 text-neutral-200 sm:text-base md:leading-8">
                      {slide.description}
                    </p>

                    <div className="mt-8">
                      <Link href={slide.buttonLink}>
                        <button className="rounded-lg bg-[#caa146] px-5 py-3 text-base font-semibold text-black transition hover:bg-amber-300 sm:px-6 sm:text-lg">
                          {slide.buttonText} →
                        </button>
                      </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-10 hidden md:flex md:flex-wrap md:justify-start md:gap-8">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="hero-prev absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#caa146] bg-black/40 text-[#caa146] backdrop-blur-md transition hover:bg-[#caa146] hover:text-black lg:flex">
        <ChevronLeft size={24} />
      </button>

      <button className="hero-next absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#caa146] bg-black/40 text-[#caa146] backdrop-blur-md transition hover:bg-[#caa146] hover:text-black lg:flex">
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
