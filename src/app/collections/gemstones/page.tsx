"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, X, ChevronDown, Heart, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
import Loader from "@/components/Spinloader/Loader";
import Filter from "@/components/Products/filter/Filter";

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

/* ─── Main Page ─── */
export default function CollectionsPage() {
  const dispatch = useDispatch();
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(
    null,
  );
  const [selectedPricePerCarat, setSelectedPricePerCarat] = useState<
    number | null
  >(null);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const toggleMaterial = (mat: string) => {
    setSelectedShapes((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat],
    );
  };

  const clearAllFilters = () => {
    setSelectedOrigin("All");
    setSelectedShapes([]);
    setSelectedPriceRange(null);
    setSortBy("featured");
  };

  const activeFilterCount =
    (selectedOrigin !== "All" ? 1 : 0) +
    selectedShapes.length +
    (selectedPriceRange !== null ? 1 : 0);

  /* ─── Filtered + Sorted Products ─── */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedOrigin !== "All") {
      result = result.filter((p) => p.category === selectedOrigin);
    }

    // Material
    if (selectedShapes.length > 0) {
      result = result.filter((p) => selectedShapes.includes(p.material));
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
  }, [selectedOrigin, selectedShapes, selectedPriceRange, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex gap-15">
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

                <Filter
                  activeFilterCount={activeFilterCount}
                  toggleMaterial={toggleMaterial}
                  clearAllFilters={clearAllFilters}
                  selectedShapes={selectedShapes}
                />
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
                  <div className="px-5 pb-8">
                    {" "}
                    <Filter
                      activeFilterCount={activeFilterCount}
                      toggleMaterial={toggleMaterial}
                      clearAllFilters={clearAllFilters}
                      selectedShapes={selectedShapes}
                    />
                  </div>
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
                  {selectedOrigin !== "All" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                      {selectedOrigin}
                      <X
                        size={12}
                        className="cursor-pointer hover:text-[#4B1313]"
                        onClick={() => setSelectedOrigin("All")}
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
                  {selectedShapes.map((mat) => (
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
                    <ProductCard product={product} key={product._id} />
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
                    We couldn&apos;t find any products matching your filters.
                    Try adjusting your selection or clear all filters.
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
      )}
    </div>
  );
}
