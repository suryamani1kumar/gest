import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  // Mock cart items
  const cartItems = [
    { id: 1, name: 'Sapphire Radiance Ring', category: 'Rings', price: 4500, quantity: 1, image: '/images/ring.png' },
    { id: 3, name: 'Emerald Legacy Necklace', category: 'Necklaces', price: 12000, quantity: 1, image: '/images/hero.png' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Complimentary shipping
  const total = subtotal + shipping;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-gray-900">Your Shopping Bag</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3">
            <div className="border-t border-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="py-8 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative w-32 h-32 bg-neutral-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between h-32 py-1">
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-serif text-gray-900">{item.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <button className="text-sm text-gray-500 hover:text-gray-900 border border-gray-300 w-8 h-8 flex items-center justify-center">-</button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button className="text-sm text-gray-500 hover:text-gray-900 border border-gray-300 w-8 h-8 flex items-center justify-center">+</button>
                    </div>
                  </div>

                  <div className="h-32 py-1 flex flex-col justify-between items-end">
                    <p className="text-lg font-medium text-emerald-800">${item.price.toLocaleString()}</p>
                    <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-neutral-50 p-8 border border-gray-100 sticky top-32">
              <h3 className="text-xl font-serif text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm font-light text-gray-600 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Insured)</span>
                  <span className="uppercase text-xs tracking-wider">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-medium text-gray-900 mb-8">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              
              <Link 
                href="/checkout" 
                className="block text-center w-full bg-gray-900 text-white p-4 uppercase tracking-wider text-sm font-medium hover:bg-emerald-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
                <span className="text-xs uppercase tracking-widest">Secure Checkout</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
