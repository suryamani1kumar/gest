"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'Rings', name: 'Rings' },
  { id: 'Earrings', name: 'Earrings' },
  { id: 'Necklaces', name: 'Necklaces' },
];

const allProducts = [
  { id: 1, name: 'Sapphire Radiance Ring', category: 'Rings', price: '$4,500', image: '/images/ring.png' },
  { id: 2, name: 'Diamond Cascade Earrings', category: 'Earrings', price: '$8,200', image: '/images/earrings.png' },
  { id: 3, name: 'Emerald Legacy Necklace', category: 'Necklaces', price: '$12,000', image: '/images/hero.png' },
  { id: 4, name: 'Golden Solitaire Ring', category: 'Rings', price: '$3,800', image: '/images/ring.png' },
  { id: 5, name: 'Pearl Drop Earrings', category: 'Earrings', price: '$2,100', image: '/images/earrings.png' },
  { id: 6, name: 'Sapphire Halo Pendant', category: 'Necklaces', price: '$5,400', image: '/images/hero.png' },
];

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4 font-bold">All Collections</h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto font-light">Discover our complete range of high-end jewelry, meticulously crafted to elevate every moment.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#7A1F1F] text-white shadow-md'
                  : 'bg-white text-[#1A1A1A] border border-[#E5E7EB] hover:border-[#7A1F1F] hover:text-[#7A1F1F]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative block overflow-hidden border border-[#E5E7EB] pb-4 hover:shadow-md transition-all duration-300 rounded-xl bg-white">
              <Link href={`/collections/${product.id}`} className="block">
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative mb-3">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="px-3 sm:px-4 text-center">
                  <span className="text-[#6B7280] uppercase tracking-widest text-[10px] sm:text-xs font-semibold block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-serif text-[#1A1A1A] mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[#7A1F1F] font-semibold text-sm sm:text-base mb-2">{product.price}</p>
                </div>
              </Link>
              <div className="px-3 sm:px-4 text-center">
                <button className="text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 uppercase tracking-wider text-[11px] hover:text-[#B8860B] hover:border-[#B8860B] transition-colors font-medium relative z-10 cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
