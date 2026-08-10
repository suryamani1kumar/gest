"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronRight,
  Heart,
  Star,
  Search,
} from "lucide-react";
import PriceRange from "@/components/Products/filter/PriceRange";

/* ─── Product Data ─── */
const allProducts = [
  {
    id: 1,
    name: "Sapphire Radiance Ring",
    category: "Rings",
    price: 4500,
    material: "Gold",
    rating: 4.8,
    reviews: 124,
    image: "/images/ring.png",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Diamond Cascade Earrings",
    category: "Earrings",
    price: 8200,
    material: "Platinum",
    rating: 4.9,
    reviews: 89,
    image: "/images/earrings.png",
    badge: "New",
  },
  {
    id: 3,
    name: "Emerald Legacy Necklace",
    category: "Necklaces",
    price: 12000,
    material: "Gold",
    rating: 5.0,
    reviews: 56,
    image: "/images/hero.png",
    badge: "",
  },
  {
    id: 4,
    name: "Golden Solitaire Ring",
    category: "Rings",
    price: 3800,
    material: "Gold",
    rating: 4.6,
    reviews: 201,
    image: "/images/ring.png",
    badge: "",
  },
  {
    id: 5,
    name: "Pearl Drop Earrings",
    category: "Earrings",
    price: 2100,
    material: "Silver",
    rating: 4.5,
    reviews: 67,
    image: "/images/earrings.png",
    badge: "",
  },
  {
    id: 6,
    name: "Sapphire Halo Pendant",
    category: "Necklaces",
    price: 5400,
    material: "Gold",
    rating: 4.7,
    reviews: 143,
    image: "/images/hero.png",
    badge: "Trending",
  },
  {
    id: 7,
    name: "Ruby Eternity Band",
    category: "Rings",
    price: 6800,
    material: "Platinum",
    rating: 4.9,
    reviews: 78,
    image: "/images/ring.png",
    badge: "New",
  },
  {
    id: 8,
    name: "Kundan Jhumka Earrings",
    category: "Earrings",
    price: 3200,
    material: "Gold",
    rating: 4.4,
    reviews: 112,
    image: "/images/earrings.png",
    badge: "",
  },
  {
    id: 9,
    name: "5 Mukhi Rudraksha Mala",
    category: "Rudraksha",
    price: 1500,
    material: "Natural",
    rating: 4.8,
    reviews: 234,
    image: "/images/craftsmanship.png",
    badge: "Bestseller",
  },
  {
    id: 10,
    name: "Manik (Ruby) Stone",
    category: "Gemstones",
    price: 7500,
    material: "Natural",
    rating: 4.9,
    reviews: 45,
    image: "/images/gemstones/manik.png",
    badge: "Certified",
  },
  {
    id: 11,
    name: "Panna (Emerald) Stone",
    category: "Gemstones",
    price: 9200,
    material: "Natural",
    rating: 5.0,
    reviews: 38,
    image: "/images/gemstones/Panna.png",
    badge: "Certified",
  },
  {
    id: 12,
    name: "Diamond Cluster Ring",
    category: "Rings",
    price: 15000,
    material: "Platinum",
    rating: 5.0,
    reviews: 29,
    image: "/images/ring.png",
    badge: "",
  },
  {
    id: 13,
    name: "Moonga (Red Coral)",
    category: "Gemstones",
    price: 3500,
    material: "Natural",
    rating: 4.6,
    reviews: 91,
    image: "/images/gemstones/moonga.png",
    badge: "",
  },
  {
    id: 14,
    name: "Pukhraj (Yellow Sapphire)",
    category: "Gemstones",
    price: 11000,
    material: "Natural",
    rating: 4.8,
    reviews: 62,
    image: "/images/gemstones/pukhraj.png",
    badge: "Trending",
  },
  {
    id: 15,
    name: "1 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 25000,
    material: "Natural",
    rating: 5.0,
    reviews: 18,
    image: "/images/craftsmanship.png",
    badge: "Rare",
  },
  {
    id: 16,
    name: "Temple Gold Necklace",
    category: "Necklaces",
    price: 18500,
    material: "Gold",
    rating: 4.7,
    reviews: 53,
    image: "/images/hero.png",
    badge: "",
  },
];

const categories = [
  "All",
  "Rings",
  "Earrings",
  "Necklaces",
  "Gemstones",
  "Rudraksha",
];

const materials = ["Gold", "Silver", "Platinum", "Natural"];

const priceRanges = [
  { label: "Under ₹3,000", min: 0, max: 3000 },
  { label: "₹3,000 – ₹7,000", min: 3000, max: 7000 },
  { label: "₹7,000 – ₹15,000", min: 7000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest First", value: "newest" },
];

/* ─── Filter Accordion ─── */
function FilterAccordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#E5E7EB] py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#6B7280] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
interface CartItem {
  productId: string;
  quantity: number;
}
/* ─── Main Page ─── */
export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(
    null,
  );
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log("wishlist", wishlist);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?productType=gemstone", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const saved = localStorage.getItem("wishlist");

    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  console.log("products", products);

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat],
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem("wishlist", JSON.stringify(updated));

      return updated;
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedMaterials([]);
    setSelectedPriceRange(null);
    setSearchQuery("");
    setSortBy("featured");
  };

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedMaterials.length +
    (selectedPriceRange !== null ? 1 : 0) +
    (searchQuery ? 1 : 0);

  /* ─── Filtered + Sorted Products ─── */
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Material
    if (selectedMaterials.length > 0) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }

    // Price range
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(
        (p) => p.price >= range.min && p.price < range.max,
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [
    selectedCategory,
    selectedMaterials,
    selectedPriceRange,
    sortBy,
    searchQuery,
  ]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  console.log("cart", cart);
  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);

      let updatedCart: CartItem[];

      if (existingItem) {
        // Increase quantity
        updatedCart = prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        // Add new product
        updatedCart = [
          ...prev,
          {
            productId,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };
  /* ─── Filter Sidebar Content ─── */
  const filterContent = (
    <>
      {/* Price Range */}
      <FilterAccordion title="Price Range">
        <div className="flex flex-col gap-2">
          <PriceRange />
        </div>
      </FilterAccordion>

      {/* Price Per Carat */}
      <FilterAccordion title="Price Per Carat">
        <div className="flex flex-col gap-2">
          <PriceRange />
        </div>
      </FilterAccordion>

      {/* Weight Range */}
      <FilterAccordion title="Weight Carat">
        <div className="flex flex-col gap-2">
          <PriceRange />
        </div>
      </FilterAccordion>

      {/* Shape */}
      <FilterAccordion title="Shape">
        <div className="flex flex-col gap-2.5">
          {materials.map((mat) => (
            <label
              key={mat}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#1A1A1A]"
            >
              <div
                className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-all duration-200 ${
                  selectedMaterials.includes(mat)
                    ? "border-[#7A1F1F] bg-[#7A1F1F]"
                    : "border-[#D1D5DB]"
                }`}
                onClick={() => toggleMaterial(mat)}
              >
                {selectedMaterials.includes(mat) && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span onClick={() => toggleMaterial(mat)}>{mat}</span>
              <span className="ml-auto text-xs text-[#9CA3AF]">
                {allProducts.filter((p) => p.material === mat).length}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Origin */}
      <FilterAccordion title="Origin">
        <div className="flex flex-col gap-2.5">
          {materials.map((mat) => (
            <label
              key={mat}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#1A1A1A]"
            >
              <div
                className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-all duration-200 ${
                  selectedMaterials.includes(mat)
                    ? "border-[#7A1F1F] bg-[#7A1F1F]"
                    : "border-[#D1D5DB]"
                }`}
                onClick={() => toggleMaterial(mat)}
              >
                {selectedMaterials.includes(mat) && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span onClick={() => toggleMaterial(mat)}>{mat}</span>
              <span className="ml-auto text-xs text-[#9CA3AF]">
                {allProducts.filter((p) => p.material === mat).length}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="mt-5 w-full rounded-lg border border-[#7A1F1F] py-2.5 text-sm font-semibold text-[#7A1F1F] transition-all hover:bg-[#7A1F1F] hover:text-white cursor-pointer"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* ─── Main Content ─── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* ─── Desktop Sidebar ─── */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <div className="sticky top-[150px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7A1F1F] text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {filterContent}
            </div>
          </aside>

          {/* ─── Mobile Filter Overlay ─── */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
                  <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
                    Filters
                  </h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#FAF0F0] transition cursor-pointer"
                  >
                    <X size={18} className="text-[#1A1A1A]" />
                  </button>
                </div>
                <div className="px-5 pb-8">{filterContent}</div>
              </div>
            </div>
          )}

          {/* ─── Products Area ─── */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#1A1A1A] transition hover:border-[#7A1F1F] hover:text-[#7A1F1F] lg:hidden cursor-pointer"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7A1F1F] text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-[#6B7280]">
                  Showing{" "}
                  <span className="font-semibold text-[#1A1A1A]">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B7280] hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none transition focus:border-[#7A1F1F] cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                    {selectedCategory}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-[#4B1313]"
                      onClick={() => setSelectedCategory("All")}
                    />
                  </span>
                )}
                {selectedPriceRange !== null && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                    {priceRanges[selectedPriceRange].label}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-[#4B1313]"
                      onClick={() => setSelectedPriceRange(null)}
                    />
                  </span>
                )}
                {selectedMaterials.map((mat) => (
                  <span
                    key={mat}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]"
                  >
                    {mat}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-[#4B1313]"
                      onClick={() => toggleMaterial(mat)}
                    />
                  </span>
                ))}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                    &quot;{searchQuery}&quot;
                    <X
                      size={12}
                      className="cursor-pointer hover:text-[#4B1313]"
                      onClick={() => setSearchQuery("")}
                    />
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-[#7A1F1F] underline underline-offset-2 hover:text-[#4B1313] transition cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#C9A227]/40"
                  >
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:bg-white hover:scale-110 cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={
                          wishlist.includes(product._id)
                            ? "fill-[#7A1F1F] text-[#7A1F1F]"
                            : "text-[#6B7280]"
                        }
                      />
                    </button>
                    {/* Image */}
                    <Link
                      href={`/collections/gemstones/${product.slug}`}
                      className="block"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
                        <Image
                          src={product?.gallery[0]?.url}
                          alt={"Name"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    {/* Info */}
                    <div className="px-3 pt-2 sm:p-4">
                      <Link href={`/collections/gemstones/${product.slug}`}>
                        <h3 className="text-sm sm:text-base text-center text-[#1A1A1A] mb-1.5 line-clamp-1 group-hover:text-[#7A1F1F] transition-colors">
                          {product.name} - {product.specifications.weight.value}{" "}
                          {product.specifications.weight.unit}
                        </h3>
                      </Link>
                      <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
                        {product.specifications.weight.value}{" "}
                        {product.specifications.weight.unit}{" "}
                        {product.indianName}
                      </span>
                      <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
                        Origin : {product.specifications.origin}
                      </span>
                      <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
                        SKU : {product.sku}
                      </span>

                      {/* Price + Add to Cart */}
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-[#7A1F1F] font-bold text-sm sm:text-base">
                          ₹{" "}
                          {product.pricing.sellingPrice.toLocaleString("en-IN")}
                        </p>
                        <button
                          onClick={() => addToCart(product._id)}
                          className="hidden sm:flex items-center gap-1 rounded-lg bg-[#FFFDF8] border border-[#E5E7EB] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] transition-all hover:bg-[#7A1F1F] hover:text-white hover:border-[#7A1F1F] cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FAF0F0]">
                  <Search size={32} className="text-[#7A1F1F]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">
                  No products found
                </h3>
                <p className="text-sm text-[#6B7280] max-w-md mb-6">
                  We couldn&apos;t find any products matching your filters. Try
                  adjusting your selection or clear all filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="rounded-full bg-[#7A1F1F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5A1717] cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
