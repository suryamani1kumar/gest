"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/hero.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-gold-300 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6 block"
        >
          The High Jewelry Collection
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-8"
        >
          Elegance Forged in <br /> <span className="italic font-light">Precious Time</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl font-light"
        >
          Discover exceptional craftsmanship and rarest gemstones curated for those who appreciate the extraordinary.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link 
            href="#collections" 
            className="inline-block bg-white text-neutral-900 px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-neutral-200 transition-colors duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
