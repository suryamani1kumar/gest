"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Craftsmanship() {
  return (
    <section className="py-24 bg-[#FFFDF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-square relative w-full max-w-lg mx-auto">
              <Image 
                src="/images/craftsmanship.png" 
                alt="Jewelry Craftsmanship" 
                fill
                className="object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute -inset-4 border border-[#C9A227]/50 -z-10 rounded-sm translate-x-6 translate-y-6 hidden md:block"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <span className="text-[#7A1F1F] uppercase tracking-widest text-sm font-medium mb-4 block">
              The Art of Creation
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
              Mastery in Every <br /> <span className="italic font-light">Detail</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">
              For generations, our master artisans have dedicated their lives to the pursuit of perfection. Each piece in our collection is meticulously crafted by hand, marrying traditional techniques with contemporary vision.
            </p>
            <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed">
              We source only the finest, ethically obtained gemstones and precious metals, ensuring that your jewelry is not only a symbol of beauty, but also of responsibility and integrity.
            </p>
            
            <button className="text-gray-900 border-b border-gray-900 pb-1 uppercase tracking-wider text-sm hover:text-[#B8860B] hover:border-[#B8860B] transition-colors font-medium cursor-pointer">
              Discover Our Story
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
