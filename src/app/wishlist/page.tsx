"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToWishList,
  removeFromWishList,
} from "@/redux/slices/wishlistSlice";

interface Product {
  _id: string;
  name: string;
  slug: string;
  indianName?: string;
  sku?: string;

  gallery?: {
    url: string;
  }[];

  specifications?: {
    weight?: {
      value?: number | string;
      unit?: string;
    };
    origin?: string;
  };

  pricing?: {
    sellingPrice?: number;
  };
}

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistIds = wishlistItems.map((item) => item.productId);

        console.log("wishlistIds:", wishlistIds);

        if (!wishlistIds.length) {
          setWishlist([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/wishlist?ids=${wishlistIds.join(",")}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist products");
        }

        const data = await response.json();

        if (data.success) {
          setWishlist(data.data || []);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [wishlistItems]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (!savedWishlist) {
      setLoading(false);
      return;
    }

    try {
      const items: { productId: string }[] = JSON.parse(savedWishlist);

      items.forEach((item) => {
        dispatch(addToWishList(item));
      });
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, [dispatch]);

  const removeFromWishlist = (id: string) => {
    dispatch(removeFromWishList(id));

    setWishlist((prev) => prev.filter((product) => product._id !== id));

    localStorage.setItem(
      "wishlist",
      JSON.stringify(
        wishlistItems.filter((product) => product.productId !== id),
      ),
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-[#7A1F1F]">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading wishlist...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] pt-15 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#7A1F1F] uppercase tracking-widest text-sm font-medium mb-4 block">
            Your Personal Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
            Wishlist
          </h1>
          <div className="w-24 h-px bg-[#C9A227] mx-auto"></div>
        </motion.div>
        <AnimatePresence mode="wait">
          {wishlist.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {wishlist.map((product) => {
                  const weight = product.specifications?.weight;

                  return (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        height: 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#C9A227]/40"
                    >
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product._id)}
                        className="absolute cursor-pointer top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-[#6B7280] hover:text-[#7A1F1F] hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* Image */}
                      <Link
                        href={`/collections/gemstones/${product.slug}`}
                        className="block"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
                          {product.gallery?.[0]?.url ? (
                            <Image
                              src={product.gallery[0].url}
                              alt={product.name || "Product"}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="px-3 pt-2 sm:p-4">
                        <Link href={`/collections/gemstones/${product.slug}`}>
                          <h3 className="text-sm sm:text-base text-center text-[#1A1A1A] mb-1.5 line-clamp-1 group-hover:text-[#7A1F1F] transition-colors">
                            {product.name}

                            {weight?.value && (
                              <>
                                {" - "}
                                {weight.value} {weight.unit}
                              </>
                            )}
                          </h3>
                        </Link>

                        {/* Weight + Indian Name */}
                        {(weight?.value || product.indianName) && (
                          <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
                            {weight?.value} {weight?.unit}
                            {product.indianName && <> {product.indianName}</>}
                          </span>
                        )}

                        {/* Origin */}
                        {product.specifications?.origin && (
                          <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
                            Origin : {product.specifications.origin}
                          </span>
                        )}

                        {/* SKU */}
                        {product.sku && (
                          <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
                            SKU : {product.sku}
                          </span>
                        )}

                        {/* Price + Add to Cart */}
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-[#7A1F1F] font-bold text-sm sm:text-base">
                            ₹{" "}
                            {product.pricing?.sellingPrice
                              ? product.pricing.sellingPrice.toLocaleString(
                                  "en-IN",
                                )
                              : "N/A"}
                          </p>

                          <button
                            type="button"
                            className="hidden sm:flex items-center gap-1 rounded-lg bg-[#FFFDF8] border border-[#E5E7EB] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] transition-all hover:bg-[#7A1F1F] hover:text-white hover:border-[#7A1F1F] cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-32 px-4 text-center max-w-3xl mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="w-24 h-24 bg-[#FAF0F0] rounded-full flex items-center justify-center mb-8"
              >
                <Heart size={40} className="text-[#7A1F1F]" />
              </motion.div>

              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-4">
                Your wishlist is empty
              </h2>

              <p className="text-[#6B7280] max-w-md mx-auto mb-10 text-lg">
                Save your favorite pieces here to review them later or share
                with someone special.
              </p>

              <Link
                href="/collections"
                className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#7A1F1F] transition-colors duration-300 rounded-sm group"
              >
                Discover Collections
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
