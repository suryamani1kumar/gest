import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CollectionsPage() {
  const products = [
    { id: 1, name: 'Sapphire Radiance Ring', category: 'Rings', price: '$4,500', image: '/images/ring.png' },
    { id: 2, name: 'Diamond Cascade Earrings', category: 'Earrings', price: '$8,200', image: '/images/earrings.png' },
    { id: 3, name: 'Emerald Legacy Necklace', category: 'Necklaces', price: '$12,000', image: '/images/hero.png' },
    { id: 4, name: 'Golden Solitaire Ring', category: 'Rings', price: '$3,800', image: '/images/ring.png' },
    { id: 5, name: 'Pearl Drop Earrings', category: 'Earrings', price: '$2,100', image: '/images/earrings.png' },
    { id: 6, name: 'Sapphire Halo Pendant', category: 'Necklaces', price: '$5,400', image: '/images/hero.png' },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">All Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">Discover our complete range of high-end jewelry, meticulously crafted to elevate every moment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group relative block overflow-hidden border border-gray-100 pb-6 hover:shadow-lg transition-shadow duration-300">
              <Link href={`/collections/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden bg-neutral-100 relative mb-6">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="px-6 text-center">
                  <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold block mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-emerald-800 font-medium mb-4">{product.price}</p>
                </div>
              </Link>
              <div className="px-6 text-center">
                <button className="text-gray-900 border-b border-gray-900 pb-1 uppercase tracking-wider text-xs hover:text-emerald-800 hover:border-emerald-800 transition-colors font-medium relative z-10">
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
