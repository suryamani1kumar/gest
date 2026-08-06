"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

const initialWishlist = [
  {
    id: 1,
    name: "Sapphire Radiance Ring",
    category: "Rings",
    price: 4500,
    image: "/images/ring.png",
  },
  {
    id: 2,
    name: "Diamond Cascade Earrings",
    category: "Earrings",
    price: 8200,
    image: "/images/earrings.png",
  },
  {
    id: 3,
    name: "Emerald Legacy Necklace",
    category: "Necklaces",
    price: 12000,
    image: "/images/hero.png",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] pt-15 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative flex flex-col bg-white border border-[#E5E7EB] rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-[#C9A227]/40"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-[#6B7280] hover:text-[#7A1F1F] hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Image */}
                    <Link
                      href={`/collections/gemstones/${product.id}`}
                      className="block relative aspect-[4/3] bg-neutral-100 overflow-hidden"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-[#C9A227] uppercase tracking-widest text-[10px] font-bold block mb-2">
                          {product.category}
                        </span>
                        <Link href={`/collections/gemstones/${product.id}`}>
                          <h3 className="text-lg font-serif text-[#1A1A1A] line-clamp-2 group-hover:text-[#7A1F1F] transition-colors leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="mt-auto pt-4 border-t border-[#E5E7EB]/50">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[#1A1A1A] font-bold text-lg">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                            In Stock
                          </span>
                        </div>
                        <button className="w-full py-3 px-4 bg-white border border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center gap-2 rounded-sm group/btn cursor-pointer">
                          <ShoppingBag
                            size={14}
                            className="group-hover/btn:animate-bounce"
                          />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-32 px-4 text-center bg-white border border-[#E5E7EB] rounded-2xl border-dashed max-w-3xl mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
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
