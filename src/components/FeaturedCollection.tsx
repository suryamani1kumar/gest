"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    id: 1,
    name: 'Sapphire Radiance',
    category: 'Rings',
    image: '/images/ring.png',
    link: '#',
  },
  {
    id: 2,
    name: 'Diamond Cascade',
    category: 'Earrings',
    image: '/images/earrings.png',
    link: '#',
  },
];

export default function FeaturedCollection() {
  return (
    <section id="collections" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-800 uppercase tracking-widest text-sm font-medium mb-4 block">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
            Featured Collections
          </h2>
          <div className="w-24 h-px bg-gold-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {collections.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative block overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <span className="text-gold-300 uppercase tracking-widest text-xs font-semibold block mb-2">
                  {item.category}
                </span>
                <h3 className="text-2xl font-serif text-white mb-4">
                  {item.name}
                </h3>
                <Link 
                  href={item.link} 
                  className="inline-block text-white border-b border-white pb-1 uppercase tracking-wider text-sm hover:text-gold-300 hover:border-gold-300 transition-colors"
                >
                  Discover
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="#" 
            className="inline-block border border-gray-900 text-gray-900 px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
