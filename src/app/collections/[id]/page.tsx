import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  // Mock product data based on ID or just a generic one
  const product = {
    id: productId,
    name: 'Sapphire Radiance Ring',
    category: 'Rings',
    price: 4500,
    description: 'A breathtaking exhibition of deep ocean blues, the Sapphire Radiance Ring features a meticulously cut 2.5-carat Ceylon sapphire, surrounded by a delicate halo of conflict-free brilliant diamonds. Set in 18k white gold, this piece is a testament to timeless elegance and superior craftsmanship.',
    details: [
      'Center Stone: 2.5 Carat Blue Sapphire',
      'Accent Stones: 0.75 Carat Total Weight Diamonds (VVS1, E Color)',
      'Metal: 18k White Gold',
      'Setting: Prong and Pave',
      'Ethically sourced and conflict-free'
    ],
    images: [
      '/images/ring.png',
      '/images/craftsmanship.png',
    ]
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest mb-10">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/collections" className="hover:text-gray-900 transition-colors">Collections</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Product Images */}
          <div className="md:w-1/2 space-y-6">
            <div className="aspect-square relative bg-neutral-100 overflow-hidden">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square relative bg-neutral-100 overflow-hidden">
                <Image src={product.images[0]} alt={`${product.name} detail 1`} fill className="object-cover" />
              </div>
              <div className="aspect-square relative bg-neutral-100 overflow-hidden">
                <Image src={product.images[1]} alt={`${product.name} detail 2`} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold block mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl font-serif text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-emerald-800 font-medium mb-8">${product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-3 font-semibold">Ring Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5].map((size) => (
                  <button key={size} className="border border-gray-300 py-2 text-sm text-gray-700 hover:border-gray-900 transition-colors">
                    {size}
                  </button>
                ))}
              </div>
              <Link href="#" className="text-xs text-gray-500 underline mt-2 inline-block hover:text-gray-900">Size Guide</Link>
            </div>

            <div className="flex gap-4 mb-12">
              <Link href="/cart" className="flex-1 bg-gray-900 text-white text-center p-4 uppercase tracking-wider text-sm font-medium hover:bg-emerald-800 transition-colors">
                Add to Cart
              </Link>
              <button className="flex-none border border-gray-300 p-4 text-gray-900 hover:border-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4 font-semibold">Product Details</h3>
              <ul className="space-y-2 text-gray-600 font-light text-sm list-disc pl-4">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 font-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                <span>Complimentary insured shipping on all orders.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
