import Hero from "@/components/Hero";
import FAQ from "@/components/Faq/FAQ";
import { Award, Gem, PackageCheck, Shield } from "lucide-react";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import Image from "next/image";
import BenefitsSection from "@/components/BenefitsSection";
import GemCategory from "@/components/Catgory/GemCategory";
import RudCategory from "@/components/Catgory/RudCategory";

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
const faqs = [
  {
    id: 1,
    question: "Are your gemstones and Rudraksha certified?",
    answer:
      "Yes. Every natural gemstone and authentic Rudraksha comes with a trusted laboratory certification or authenticity certificate to ensure its authenticity and quality.",
  },
  {
    id: 2,
    question: "Are your gemstones 100% natural?",
    answer:
      "Yes. We deal only in genuine natural gemstones sourced from trusted suppliers. Any treatments or enhancements, if applicable, are clearly mentioned on the product page.",
  },
  {
    id: 3,
    question: "Do you provide energized gemstones and Rudraksha?",
    answer:
      "Yes. We offer optional Vedic energization (Pran Pratishtha) performed by experienced priests before dispatch for customers who request this service.",
  },
  {
    id: 4,
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes. Cash on Delivery is available for eligible PIN codes across India. You can check availability during checkout.",
  },
  {
    id: 5,
    question: "Can I return or exchange my order?",
    answer:
      "Returns and exchanges are accepted according to our Return Policy. Customized, energized, or made-to-order products may not be eligible for return unless they are damaged or incorrect.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Credit Cards, Debit Cards, Net Banking, Wallets, and other secure online payment methods. Cash on Delivery is also available for selected locations.",
  },
  {
    id: 7,
    question: "Can I customize gemstone jewelry?",
    answer:
      "Yes. We offer customization for rings, pendants, bracelets, and other jewelry. You can choose the gemstone, metal, and size according to your preference.",
  },
  {
    id: 8,
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via SMS or email so you can monitor your shipment until it reaches you.",
  },
];
export default function Home() {
  return (
    <div>
      <div className="mx-3 my-4">
        <Hero />
      </div>

      <GemCategory />
      <RudCategory />
      <BenefitsSection />

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
                <Link
                  href={`/collections/gemstones/${product.id}`}
                  className="block"
                >
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

      {/* <Craftsmanship /> */}
      <section className="bg-[#FFFDF8] py-12">
        <div className="mx-auto max-w-7xl px-5">
          {/* Heading */}

          <div className="mb-10 text-center">
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl font-serif">
              Frequently Asked Questions
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C9A227]" />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <FAQ faqs={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
