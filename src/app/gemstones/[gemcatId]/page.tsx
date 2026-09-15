"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
import Loader from "@/components/Spinloader/Loader";
import Filter, { FilterState } from "@/components/Products/filter/Filter";
import { useParams } from "next/navigation";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest First", value: "newest" },
];

const DEFAULT_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 100000,

  caratPriceMin: 0,
  caratPriceMax: 50000,

  weightMin: 0,
  weightMax: 20,

  shapes: [],
  origins: [],
};

export default function GemsStonesCatPage() {
  const params = useParams<{ gemcatId: string }>();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* ─────────────────────────────
     Fetch Products
  ───────────────────────────── */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products?productType=gemstone&category=${params.gemcatId}`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        if (data.success) {
          const products = data.data || [];
          setProducts(products);

          if (products.length > 0) {
            const prices = products.map(
              (product: any) => Number(product.pricing.salePrice) || 0,
            );

            const caratPrices = products.map(
              (product: any) => Number(product.pricing.sellUnitPrice) || 0,
            );

            console.log("caratPrices", caratPrices);

            const weights = products.map(
              (product: any) => Number(product.weight) || 0,
            );

            const shapes = [
              ...new Set(
                products.map((product: any) => product.shape).filter(Boolean),
              ),
            ];

            const origins = [
              ...new Set(
                products.map((product: any) => product.origin).filter(Boolean),
              ),
            ];

            setFilters({
              priceMin: Math.min(...prices),
              priceMax: Math.max(...prices),

              caratPriceMin: Math.min(...caratPrices),
              caratPriceMax: Math.max(...caratPrices),

              weightMin: Math.min(...weights),
              weightMax: Math.max(...weights),

              shapes: [],
              origins: [],
            });
          }
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (params.gemcatId) {
      fetchProducts();
    }
  }, [params.gemcatId]);

  /* ─────────────────────────────
     Toggle Shape
  ───────────────────────────── */

  const toggleShape = (shape: string) => {
    setFilters((prev) => ({
      ...prev,
      shapes: prev.shapes.includes(shape)
        ? prev.shapes.filter((item) => item !== shape)
        : [...prev.shapes, shape],
    }));
  };

  /* ─────────────────────────────
     Toggle Origin
  ───────────────────────────── */

  const toggleOrigin = (origin: string) => {
    setFilters((prev) => ({
      ...prev,
      origins: prev.origins.includes(origin)
        ? prev.origins.filter((item) => item !== origin)
        : [...prev.origins, origin],
    }));
  };

  /* ─────────────────────────────
     Clear Filters
  ───────────────────────────── */

  const clearAllFilters = () => {
    setFilters({
      ...DEFAULT_FILTERS,
      shapes: [],
      origins: [],
    });
  };

  /* ─────────────────────────────
     Active Filter Count
  ───────────────────────────── */

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (
      filters.priceMin !== DEFAULT_FILTERS.priceMin ||
      filters.priceMax !== DEFAULT_FILTERS.priceMax
    ) {
      count++;
    }

    if (
      filters.caratPriceMin !== DEFAULT_FILTERS.caratPriceMin ||
      filters.caratPriceMax !== DEFAULT_FILTERS.caratPriceMax
    ) {
      count++;
    }

    if (
      filters.weightMin !== DEFAULT_FILTERS.weightMin ||
      filters.weightMax !== DEFAULT_FILTERS.weightMax
    ) {
      count++;
    }

    count += filters.shapes.length;
    count += filters.origins.length;

    return count;
  }, [filters]);

  /* ─────────────────────────────
     Filter + Sort Products
  ───────────────────────────── */

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      console.log("product", product);
      const price = Number(product.pricing.salePrice) || 0;
      const caratPrice = Number(product.pricing.sellUnitPrice) || 0;
      const weight = Number(product.weight) || 0;

      /* Price */
      const priceMatch = price >= filters.priceMin && price <= filters.priceMax;

      /* Price per Carat */
      const caratPriceMatch =
        caratPrice >= filters.caratPriceMin &&
        caratPrice <= filters.caratPriceMax;

      /* Weight */
      const weightMatch =
        weight >= filters.weightMin && weight <= filters.weightMax;

      /* Shape */
      const shapeMatch =
        filters.shapes.length === 0 || filters.shapes.includes(product.shape);

      /* Origin */
      const originMatch =
        filters.origins.length === 0 ||
        filters.origins.includes(product.origin);

      return (
        priceMatch &&
        caratPriceMatch &&
        weightMatch &&
        shapeMatch &&
        originMatch
      );
    });

    /* Sorting */

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (Number(a.price) || 0) - (Number(b.price) || 0);

        case "price-desc":
          return (Number(b.price) || 0) - (Number(a.price) || 0);

        case "rating":
          return (Number(b.rating) || 0) - (Number(a.rating) || 0);

        case "newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );

        case "featured":
        default:
          return (Number(b.featured) || 0) - (Number(a.featured) || 0);
      }
    });
  }, [products, filters, sortBy]);

  /* ─────────────────────────────
     Remove Shape
  ───────────────────────────── */

  const removeShape = (shape: string) => {
    setFilters((prev) => ({
      ...prev,
      shapes: prev.shapes.filter((item) => item !== shape),
    }));
  };

  /* ─────────────────────────────
     Remove Origin
  ───────────────────────────── */

  const removeOrigin = (origin: string) => {
    setFilters((prev) => ({
      ...prev,
      origins: prev.origins.filter((item) => item !== origin),
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex gap-15">
            {/* ═══════════════════════════════
                DESKTOP SIDEBAR
            ═══════════════════════════════ */}

            <aside className="hidden w-[260px] flex-shrink-0 lg:block">
              <div className="sticky top-[150px]">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                    Filters
                  </h2>

                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7A1F1F] text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>

                <Filter
                  filters={filters}
                  activeFilterCount={activeFilterCount}
                  clearAllFilters={clearAllFilters}
                  toggleShape={toggleShape}
                  toggleOrigin={toggleOrigin}
                  onPriceChange={(min, max) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceMin: min,
                      priceMax: max,
                    }))
                  }
                  onCaratPriceChange={(min, max) =>
                    setFilters((prev) => ({
                      ...prev,
                      caratPriceMin: min,
                      caratPriceMax: max,
                    }))
                  }
                  onWeightChange={(min, max) =>
                    setFilters((prev) => ({
                      ...prev,
                      weightMin: min,
                      weightMax: max,
                    }))
                  }
                />
              </div>
            </aside>

            {/* ═══════════════════════════════
                MOBILE FILTER
            ═══════════════════════════════ */}

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setMobileFiltersOpen(false)}
                />

                <div className="absolute right-0 top-0 h-full w-[320px] max-w-[85vw] overflow-y-auto bg-white shadow-2xl">
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
                    <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                      Filters
                    </h2>

                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#FAF0F0]"
                    >
                      <X size={18} className="text-[#1A1A1A]" />
                    </button>
                  </div>

                  <div className="px-5 pb-8">
                    <Filter
                      filters={filters}
                      activeFilterCount={activeFilterCount}
                      clearAllFilters={clearAllFilters}
                      toggleShape={toggleShape}
                      toggleOrigin={toggleOrigin}
                      onPriceChange={(min, max) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceMin: min,
                          priceMax: max,
                        }))
                      }
                      onCaratPriceChange={(min, max) =>
                        setFilters((prev) => ({
                          ...prev,
                          caratPriceMin: min,
                          caratPriceMax: max,
                        }))
                      }
                      onWeightChange={(min, max) =>
                        setFilters((prev) => ({
                          ...prev,
                          weightMin: min,
                          weightMax: max,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════
                PRODUCTS AREA
            ═══════════════════════════════ */}

            <div className="min-w-0 flex-1">
              {/* Top Bar */}

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}

                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#1A1A1A] transition hover:border-[#7A1F1F] hover:text-[#7A1F1F] lg:hidden"
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
                  <span className="hidden text-xs text-[#6B7280] sm:inline">
                    Sort by:
                  </span>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none transition focus:border-[#7A1F1F]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ═══════════════════════════════
                  ACTIVE FILTER TAGS
              ═══════════════════════════════ */}

              {activeFilterCount > 0 && (
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {/* Price */}

                  {(filters.priceMin !== DEFAULT_FILTERS.priceMin ||
                    filters.priceMax !== DEFAULT_FILTERS.priceMax) && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                      Price: ₹{filters.priceMin.toLocaleString("en-IN")}
                      {" - "}₹{filters.priceMax.toLocaleString("en-IN")}
                      <X
                        size={12}
                        className="cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            priceMin: DEFAULT_FILTERS.priceMin,
                            priceMax: DEFAULT_FILTERS.priceMax,
                          }))
                        }
                      />
                    </span>
                  )}

                  {/* Carat Price */}

                  {(filters.caratPriceMin !== DEFAULT_FILTERS.caratPriceMin ||
                    filters.caratPriceMax !==
                      DEFAULT_FILTERS.caratPriceMax) && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                      Carat Price: ₹
                      {filters.caratPriceMin.toLocaleString("en-IN")}
                      {" - "}₹{filters.caratPriceMax.toLocaleString("en-IN")}
                      <X
                        size={12}
                        className="cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            caratPriceMin: DEFAULT_FILTERS.caratPriceMin,
                            caratPriceMax: DEFAULT_FILTERS.caratPriceMax,
                          }))
                        }
                      />
                    </span>
                  )}

                  {/* Weight */}

                  {(filters.weightMin !== DEFAULT_FILTERS.weightMin ||
                    filters.weightMax !== DEFAULT_FILTERS.weightMax) && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]">
                      Weight: {filters.weightMin} - {filters.weightMax} ct
                      <X
                        size={12}
                        className="cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            weightMin: DEFAULT_FILTERS.weightMin,
                            weightMax: DEFAULT_FILTERS.weightMax,
                          }))
                        }
                      />
                    </span>
                  )}

                  {/* Shapes */}

                  {filters.shapes.map((shape) => (
                    <span
                      key={shape}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]"
                    >
                      {shape}

                      <X
                        size={12}
                        className="cursor-pointer"
                        onClick={() => removeShape(shape)}
                      />
                    </span>
                  ))}

                  {/* Origins */}

                  {filters.origins.map((origin) => (
                    <span
                      key={origin}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF0F0] px-3 py-1 text-xs font-medium text-[#7A1F1F]"
                    >
                      {origin}

                      <X
                        size={12}
                        className="cursor-pointer"
                        onClick={() => removeOrigin(origin)}
                      />
                    </span>
                  ))}

                  {/* Clear All */}

                  <button
                    onClick={clearAllFilters}
                    className="cursor-pointer text-xs font-medium text-[#7A1F1F] underline underline-offset-2 transition hover:text-[#4B1313]"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* ═══════════════════════════════
                  PRODUCTS GRID
              ═══════════════════════════════ */}

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      product={product}
                      key={product._id}
                      gemcat={params.gemcatId}
                    />
                  ))}
                </div>
              ) : (
                /* ═══════════════════════════════
                   EMPTY STATE
                ═══════════════════════════════ */

                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FAF0F0]">
                    <Search size={32} className="text-[#7A1F1F]" />
                  </div>

                  <h3 className="mb-2 font-serif text-xl font-bold text-[#1A1A1A]">
                    No products found
                  </h3>

                  <p className="mb-6 max-w-md text-sm text-[#6B7280]">
                    We couldn&apos;t find any products matching your filters.
                    Try adjusting your selection or clear all filters.
                  </p>

                  <button
                    onClick={clearAllFilters}
                    className="cursor-pointer rounded-full bg-[#7A1F1F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5A1717]"
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
