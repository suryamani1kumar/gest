import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Craftsmanship from "@/components/Craftsmanship";
import FAQ from "@/components/Faq/FAQ";
import { Award, Gem, PackageCheck, Shield } from "lucide-react";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import Image from "next/image";

export const trustFeatures = [
  {
    id: 1,
    title: "Certified Authenticity",
    description: "Trusted certification with every eligible gemstone.",
    icon: Award,
  },
  {
    id: 2,
    title: "Natural & Genuine",
    description:
      "Only authentic gemstones and Rudraksha from reliable sources.",
    icon: Gem,
  },
  {
    id: 3,
    title: "Secure Packaging",
    description: "Every order is packed with care to ensure safe delivery.",
    icon: PackageCheck,
  },
  {
    id: 4,
    title: "Quality Guaranteed",
    description: "Each product is inspected to meet our quality standards.",
    icon: Shield,
  },
];

const products = [
  {
    id: 1,
    name: "Sapphire Radiance Ring",
    category: "Rings",
    price: "$4,500",
    image: "/images/ring.png",
  },
  {
    id: 2,
    name: "Diamond Cascade Earrings",
    category: "Earrings",
    price: "$8,200",
    image: "/images/earrings.png",
  },
  {
    id: 3,
    name: "Emerald Legacy Necklace",
    category: "Necklaces",
    price: "$12,000",
    image: "/images/hero.png",
  },
  {
    id: 4,
    name: "Golden Solitaire Ring",
    category: "Rings",
    price: "$3,800",
    image: "/images/ring.png",
  },
  {
    id: 5,
    name: "Pearl Drop Earrings",
    category: "Earrings",
    price: "$2,100",
    image: "/images/earrings.png",
  },
  {
    id: 6,
    name: "Sapphire Halo Pendant",
    category: "Necklaces",
    price: "$5,400",
    image: "/images/hero.png",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <section className="border-y border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
            {trustFeatures.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-5 px-6 py-7 transition-all duration-300 hover:bg-[#FFFDF8]"
                >
                  {/* Icon */}

                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#FFFDF8] transition-all duration-300 group-hover:bg-[#7A1F1F] group-hover:border-[#7A1F1F]">
                    <Icon
                      size={24}
                      className="text-[#7A1F1F] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  {/* Content */}

                  <div>
                    <h3 className="text-base font-bold uppercase tracking-wide text-[#1A1A1A]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CategorySection />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div
            className="relative overflow-hidden rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/banner2.jpg')",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />

            {/* Decorative Blur */}
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#C9A227]/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center justify-center px-8 py-10 text-center lg:px-20">
              <h3 className="max-w-3xl text-2xl font-bold leading-tight text-white md:text-6xl">
                Looking for the Perfect
                <span className="block text-[#C9A227]">
                  Gemstone or Rudraksha?
                </span>
              </h3>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-200">
                Have questions about our products? Our team is happy to assist
                you with product information, order details, and general
                support.
              </p>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row">
                {/* Call Button */}
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#B8860B] hover:scale-105"
                >
                  <PhoneCall size={22} />
                  Call +91 98765 43210
                </a>

                {/* Contact Button */}
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#7A1F1F]"
                >
                  Contact Us
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <span className="text-[#7A1F1F] uppercase tracking-widest text-sm font-medium mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              Featured Collections
            </h2>
            <div className="w-24 h-px bg-[#C9A227] mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 max-w-7xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative block overflow-hidden border border-[#E5E7EB] pb-4 hover:shadow-md transition-all duration-300 rounded-xl bg-white"
              >
                <Link href={`/collections/gemstones/${product.id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-3 sm:px-4 text-center">
                    <span className="text-[#6B7280] uppercase tracking-widest text-[10px] sm:text-xs font-semibold block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-serif text-[#1A1A1A] mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[#7A1F1F] font-semibold text-sm sm:text-base mb-2">
                      {product.price}
                    </p>
                  </div>
                </Link>
                <div className="px-3 sm:px-4 text-center">
                  <button className="text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 uppercase tracking-wider text-[11px] hover:text-[#B8860B] hover:border-[#B8860B] transition-colors font-medium relative z-10 cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Craftsmanship />
      <FAQ />
    </div>
  );
}
