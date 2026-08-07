"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Share2,
  Check,
  Package,
} from "lucide-react";

/* ─── Product Catalogue ─── */
const productCatalogue: Record<
  string,
  {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    description: string;
    shortDescription: string;
    images: string[];
    details: { label: string; value: string }[];
    highlights: string[];
    sizes?: number[];
    material: string;
    sku: string;
    inStock: boolean;
    badge: string;
  }
> = {
  "1": {
    id: 1,
    name: "Sapphire Radiance Ring",
    category: "Rings",
    price: 4500,
    originalPrice: 5200,
    rating: 4.8,
    reviews: 124,
    description:
      "A breathtaking exhibition of deep ocean blues, the Sapphire Radiance Ring features a meticulously cut 2.5-carat Ceylon sapphire, surrounded by a delicate halo of conflict-free brilliant diamonds. Set in 18k white gold, this piece is a testament to timeless elegance and superior craftsmanship. Every facet has been carefully calibrated to maximize brilliance and fire, creating a mesmerizing play of light that captivates from every angle.",
    shortDescription:
      "2.5ct Ceylon Sapphire with diamond halo set in 18k white gold.",
    images: [
      "/images/ring.png",
      "/images/craftsmanship.png",
      "/images/ring.png",
      "/images/craftsmanship.png",
    ],
    details: [
      { label: "Center Stone", value: "2.5 Carat Blue Sapphire (Ceylon)" },
      {
        label: "Accent Stones",
        value: "0.75ct Diamonds (VVS1, E Color)",
      },
      { label: "Metal", value: "18k White Gold" },
      { label: "Setting", value: "Prong and Pavé" },
      { label: "Weight", value: "4.2 grams" },
      { label: "Certification", value: "GIA Certified" },
    ],
    highlights: [
      "GIA Certified natural sapphire",
      "Ethically sourced & conflict-free",
      "Handcrafted by master artisans",
      "Lifetime warranty included",
    ],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
    material: "Gold",
    sku: "SR-RING-001",
    inStock: true,
    badge: "Bestseller",
  },
  "2": {
    id: 2,
    name: "Diamond Cascade Earrings",
    category: "Earrings",
    price: 8200,
    originalPrice: 9500,
    rating: 4.9,
    reviews: 89,
    description:
      "The Diamond Cascade Earrings feature a stunning waterfall of brilliant-cut diamonds, meticulously set in platinum. Each diamond is hand-selected for superior clarity and fire, creating an unparalleled cascade of light that moves with grace and elegance.",
    shortDescription:
      "Brilliant-cut diamond cascade set in platinum with push-back closure.",
    images: [
      "/images/earrings.png",
      "/images/craftsmanship.png",
      "/images/earrings.png",
      "/images/craftsmanship.png",
    ],
    details: [
      { label: "Stones", value: "3.2ct Total Diamonds (VS1, F Color)" },
      { label: "Metal", value: "950 Platinum" },
      { label: "Closure", value: "Push-back with safety catch" },
      { label: "Length", value: "4.5cm drop" },
      { label: "Weight", value: "6.8 grams (pair)" },
      { label: "Certification", value: "IGI Certified" },
    ],
    highlights: [
      "IGI Certified natural diamonds",
      "Handcrafted platinum setting",
      "Secure push-back closure",
      "Complimentary cleaning service",
    ],
    material: "Platinum",
    sku: "DC-EAR-002",
    inStock: true,
    badge: "New",
  },
};

/* Fallback for any ID not in the catalogue */
function getProduct(id: string) {
  if (productCatalogue[id]) return productCatalogue[id];
  return {
    id: parseInt(id) || 0,
    name: "Sapphire Radiance Ring",
    category: "Rings",
    price: 4500,
    originalPrice: 5200,
    rating: 4.8,
    reviews: 124,
    description:
      "A breathtaking exhibition of deep ocean blues, the Sapphire Radiance Ring features a meticulously cut 2.5-carat Ceylon sapphire, surrounded by a delicate halo of conflict-free brilliant diamonds. Set in 18k white gold, this piece is a testament to timeless elegance and superior craftsmanship.",
    shortDescription:
      "2.5ct Ceylon Sapphire with diamond halo set in 18k white gold.",
    images: [
      "/images/ring.png",
      "/images/craftsmanship.png",
      "/images/ring.png",
      "/images/craftsmanship.png",
    ],
    details: [
      { label: "Center Stone", value: "2.5 Carat Blue Sapphire (Ceylon)" },
      { label: "Accent Stones", value: "0.75ct Diamonds (VVS1, E Color)" },
      { label: "Metal", value: "18k White Gold" },
      { label: "Setting", value: "Prong and Pavé" },
      { label: "Weight", value: "4.2 grams" },
      { label: "Certification", value: "GIA Certified" },
    ],
    highlights: [
      "GIA Certified natural sapphire",
      "Ethically sourced & conflict-free",
      "Handcrafted by master artisans",
      "Lifetime warranty included",
    ],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
    material: "Gold",
    sku: "SR-RING-001",
    inStock: true,
    badge: "Bestseller",
  };
}

const relatedProducts = [
  {
    id: 4,
    name: "Golden Solitaire Ring",
    price: 3800,
    image: "/images/ring.png",
    category: "Rings",
  },
  {
    id: 7,
    name: "Ruby Eternity Band",
    price: 6800,
    image: "/images/ring.png",
    category: "Rings",
  },
  {
    id: 10,
    name: "Manik (Ruby) Stone",
    price: 7500,
    image: "/images/gemstones/manik.png",
    category: "Gemstones",
  },
  {
    id: 6,
    name: "Sapphire Halo Pendant",
    price: 5400,
    image: "/images/hero.png",
    category: "Necklaces",
  },
];

const customerReviews = [
  {
    name: "Priya S.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely stunning ring! The sapphire is even more beautiful in person. The craftsmanship is impeccable.",
    verified: true,
  },
  {
    name: "Rahul M.",
    rating: 5,
    date: "1 month ago",
    comment:
      "Purchased this as an engagement ring. My fiancée was speechless. Worth every penny!",
    verified: true,
  },
  {
    name: "Anita K.",
    rating: 4,
    date: "2 months ago",
    comment:
      "Beautiful design and quality. Shipping was fast and the packaging felt very premium.",
    verified: true,
  },
];

/* ─── Star Rating Component ─── */
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.round(rating)
              ? "fill-[#C9A227] text-[#C9A227]"
              : "text-[#E5E7EB]"
          }
        />
      ))}
    </div>
  );
}

/* ─── Tabs ─── */
const tabs = ["Details", "Shipping", "Reviews"];

/* ─── Main Page ─── */
export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProduct(productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* ─── Breadcrumbs ─── */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-3 text-xs text-[#6B7280]">
            <Link href="/" className="hover:text-[#7A1F1F] transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link
              href="/collections"
              className="hover:text-[#7A1F1F] transition"
            >
              Collections
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#1A1A1A] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ─── Product Section ─── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
          {/* ─── Image Gallery ─── */}
          <div className="lg:w-[55%]">
            {/* <div className="flex flex-col-reverse sm:flex-row gap-4"> */}
            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="aspect-square relative bg-neutral-50 rounded-2xl overflow-hidden group">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex sm:flex-row mt-8 gap-3 overflow-x-auto sm:overflow-visible sm:w-20 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#7A1F1F] shadow-md"
                      : "border-[#E5E7EB] hover:border-[#C9A227]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
            {/* </div> */}
          </div>

          {/* ─── Product Info ─── */}
          <div className="lg:w-[45%]">
            {/* Category */}
            <span className="text-[#6B7280] uppercase tracking-[3px] text-[11px] font-semibold block mb-2">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} />
              <span className="text-sm text-[#1A1A1A] font-medium">
                {product.rating}
              </span>
              <span className="text-sm text-[#6B7280]">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl font-bold text-[#7A1F1F]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-[#9CA3AF] line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-[#6B7280] mb-6">
              Inclusive of all taxes. Free shipping on orders above ₹2,000.
            </p>

            {/* Short Description */}
            <p className="text-[#6B7280] leading-relaxed text-sm mb-6">
              {product.shortDescription}
            </p>

            {/* Highlights */}
            <div className="mb-6 space-y-2">
              {product.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-[#1A1A1A]"
                >
                  <Check size={14} className="text-green-600 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E5E7EB] mb-6" />

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    Select Size
                  </h3>
                  <button className="text-xs text-[#7A1F1F] underline underline-offset-2 hover:text-[#4B1313] transition cursor-pointer">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedSize === size
                          ? "border-[#7A1F1F] bg-[#7A1F1F] text-white shadow-sm"
                          : "border-[#E5E7EB] text-[#1A1A1A] hover:border-[#7A1F1F] hover:text-[#7A1F1F]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
                Quantity
              </h3>
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center rounded-lg border border-[#E5E7EB] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center text-[#6B7280] transition hover:bg-[#FAF0F0] hover:text-[#7A1F1F] cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-[#E5E7EB] text-sm font-semibold text-[#1A1A1A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="flex h-10 w-10 items-center justify-center text-[#6B7280] transition hover:bg-[#FAF0F0] hover:text-[#7A1F1F] cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex h-[40px] w-[40px] items-center justify-center rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      isWishlisted
                        ? "border-[#7A1F1F] bg-[#FAF0F0] text-[#7A1F1F]"
                        : "border-[#E5E7EB] text-[#6B7280] hover:border-[#7A1F1F] hover:text-[#7A1F1F]"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={isWishlisted ? "fill-[#7A1F1F]" : ""}
                    />
                  </button>
                  <button className="flex h-[40px] w-[40px] items-center justify-center rounded-lg border-2 border-[#E5E7EB] text-[#6B7280] transition-all hover:border-[#7A1F1F] hover:text-[#7A1F1F] cursor-pointer">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`w-1/2 flex items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-[#7A1F1F] text-white hover:bg-[#5A1717]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} />
                    Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
              {/* Buy Now */}
              <Link
                href="/checkout"
                className="w-1/2 flex items-center justify-center rounded-lg border-2 border-[#C9A227] bg-[#C9A227] py-3.5 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] transition-all hover:bg-[#B8860B] hover:border-[#B8860B] hover:text-white"
              >
                Buy Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Truck,
                  title: "Free Shipping",
                  desc: "Orders above ₹2,000",
                },
                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                  desc: "7-day return policy",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Payment",
                  desc: "100% encrypted",
                },
                {
                  icon: Award,
                  title: "Certified",
                  desc: "Lab authenticated",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg border border-[#E5E7EB] bg-white p-3"
                  >
                    <Icon size={18} className="text-[#7A1F1F] flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SKU */}
            <p className="mt-5 text-xs text-[#9CA3AF]">SKU: {product.sku}</p>
          </div>
        </div>
      </div>

      {/* ─── Tabs Section ─── */}
      <div className="border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Headers */}
          <div className="flex gap-0 border-b border-[#E5E7EB]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "text-[#7A1F1F]"
                    : "text-[#6B7280] hover:text-[#1A1A1A]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7A1F1F]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-10">
            {activeTab === "Details" && (
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
                    About This Product
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-7 mb-6">
                    {product.description}
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
                    Specifications
                  </h3>
                  <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                    {product.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                          idx % 2 === 0 ? "bg-[#FFFDF8]" : "bg-white"
                        }`}
                      >
                        <span className="font-medium text-[#1A1A1A]">
                          {detail.label}
                        </span>
                        <span className="text-[#6B7280]">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Shipping" && (
              <div className="max-w-2xl space-y-6">
                {[
                  {
                    icon: Truck,
                    title: "Free Standard Shipping",
                    desc: "Complimentary insured shipping on all orders above ₹2,000. Standard delivery takes 5-7 business days. Express delivery (2-3 days) available at ₹299.",
                  },
                  {
                    icon: Package,
                    title: "Premium Packaging",
                    desc: "Every order arrives in our signature luxury packaging — a velvet-lined box with a certificate of authenticity and care card.",
                  },
                  {
                    icon: RotateCcw,
                    title: "Returns & Exchanges",
                    desc: "We offer a 7-day return/exchange policy for eligible products. Customized, energized, or made-to-order items may not qualify for returns unless damaged.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Insured Delivery",
                    desc: "All shipments are fully insured against loss or damage during transit. Track your order in real-time via SMS and email updates.",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-[#FFFDF8] p-5"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FAF0F0]">
                        <Icon size={18} className="text-[#7A1F1F]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#1A1A1A] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#6B7280] leading-6">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "Reviews" && (
              <div>
                {/* Review Summary */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="text-center sm:text-left">
                    <div className="text-5xl font-bold text-[#1A1A1A]">
                      {product.rating}
                    </div>
                    <StarRating rating={product.rating} size={16} />
                    <p className="text-sm text-[#6B7280] mt-1">
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                  <div className="flex-1 sm:ml-8 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count =
                        star === 5
                          ? 85
                          : star === 4
                            ? 28
                            : star === 3
                              ? 8
                              : star === 2
                                ? 2
                                : 1;
                      const pct = Math.round((count / product.reviews) * 100);
                      return (
                        <div
                          key={star}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span className="w-6 text-right text-[#6B7280]">
                            {star}★
                          </span>
                          <div className="flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#C9A227]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-xs text-[#9CA3AF]">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-5">
                  {customerReviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[#1A1A1A]">
                              {review.name}
                            </span>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                <Check size={10} />
                                Verified
                              </span>
                            )}
                          </div>
                          <StarRating rating={review.rating} size={12} />
                        </div>
                        <span className="text-xs text-[#9CA3AF]">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280] leading-6">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Related Products ─── */}
      <div className="bg-[#FFFDF8] py-12 border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[#7A1F1F] uppercase tracking-[3px] text-xs font-semibold block mb-2">
              You May Also Like
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">
              Related Products
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A227] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/collections/${item.id}`}
                className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#C9A227]/40"
              >
                <div className="aspect-square relative overflow-hidden bg-neutral-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <span className="text-[#6B7280] uppercase tracking-widest text-[10px] font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-serif text-[#1A1A1A] mb-1 line-clamp-1 group-hover:text-[#7A1F1F] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[#7A1F1F] font-bold text-sm">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
