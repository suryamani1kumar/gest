"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Minus,
  Plus,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

const initialCartItems = [
  {
    id: 1,
    name: "Sapphire Radiance Ring",
    category: "Rings",
    price: 4500,
    quantity: 1,
    image: "/images/ring.png",
  },
  {
    id: 3,
    name: "Emerald Legacy Necklace",
    category: "Necklaces",
    price: 12000,
    quantity: 1,
    image: "/images/hero.png",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Complimentary shipping
  const total = subtotal + shipping;

  return (
    <div className="pt-15 pb-24 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-[#7A1F1F] uppercase tracking-widest text-sm font-medium mb-4 block">
            Review Your Selection
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
            Your Shopping Bag
          </h1>
          <div className="w-24 h-px bg-[#C9A227]"></div>
        </motion.div>

        <AnimatePresence mode="wait">
          {cartItems.length > 0 ? (
            <motion.div
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col lg:flex-row gap-12"
            >
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="border-t border-[#E5E7EB]">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -20,
                          transition: { duration: 0.2 },
                        }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="py-8 border-b border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center gap-6 group"
                      >
                        <Link
                          href={`/collections/gemstones/${item.id}`}
                          className="relative w-32 h-40 bg-neutral-100 flex-shrink-0 overflow-hidden rounded-md"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </Link>

                        <div className="flex-grow flex flex-col justify-between h-full sm:h-40 py-1 w-full">
                          <div className="flex justify-between items-start w-full">
                            <div>
                              <span className="text-[#C9A227] uppercase tracking-widest text-[10px] font-bold block mb-1">
                                {item.category}
                              </span>
                              <Link href={`/collections/gemstones/${item.id}`}>
                                <h3 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#7A1F1F] transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                            </div>
                            <p className="text-lg font-bold text-[#1A1A1A] sm:hidden">
                              ₹
                              {(item.price * item.quantity).toLocaleString(
                                "en-IN",
                              )}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-6 sm:mt-0 w-full">
                            <div className="flex items-center border border-[#E5E7EB] rounded-sm">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-10 h-10 flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] hover:bg-neutral-50 transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-10 text-center text-sm font-medium text-[#1A1A1A]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] hover:bg-neutral-50 transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B7280] hover:text-[#7A1F1F] transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Desktop Price */}
                        <div className="hidden sm:flex h-40 py-1 flex-col justify-start items-end min-w-[120px]">
                          <p className="text-xl font-bold text-[#1A1A1A]">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                          <p className="text-xs text-[#6B7280] mt-2">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:w-1/3"
              >
                <div className="bg-white p-8 border border-[#E5E7EB] sticky top-32 rounded-2xl shadow-lg hover:border-[#C9A227]/30 transition-colors">
                  <h3 className="text-2xl font-serif text-[#1A1A1A] mb-8">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6 text-sm text-[#4B5563] border-b border-[#E5E7EB] pb-6">
                    <div className="flex justify-between items-center">
                      <span>
                        Subtotal (
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0,
                        )}{" "}
                        items)
                      </span>
                      <span className="font-medium text-[#1A1A1A]">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping (Insured)</span>
                      <span className="uppercase text-[10px] font-bold tracking-widest text-[#7A1F1F] bg-[#FAF0F0] px-2 py-1 rounded">
                        Complimentary
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Taxes</span>
                      <span className="text-xs">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xl font-serif font-bold text-[#1A1A1A] mb-8">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] text-white p-4 uppercase tracking-widest text-sm font-bold hover:bg-[#7A1F1F] transition-colors rounded-sm group"
                  >
                    Proceed to Checkout
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[#6B7280]">
                    <ShieldCheck size={16} className="text-[#C9A227]" />
                    <span className="text-xs uppercase tracking-widest font-medium">
                      Secure Checkout
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-32 px-4 text-center bg-white border border-[#E5E7EB] rounded-2xl border-dashed max-w-3xl mx-auto"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 bg-[#FAF0F0] rounded-full flex items-center justify-center mb-8"
              >
                <ShoppingBag size={40} className="text-[#7A1F1F]" />
              </motion.div>
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-4">
                Your shopping bag is empty
              </h2>
              <p className="text-[#6B7280] max-w-md mx-auto mb-10 text-lg">
                Explore our collections to discover extraordinary pieces crafted
                with passion and precision.
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
