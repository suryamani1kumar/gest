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
    <div className="pt-32 pb-24 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-[#1A1A1A]">Your Shopping Bag</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3">
            <div className="border-t border-[#E5E7EB]">
              {cartItems.map((item) => (
                <div key={item.id} className="py-8 border-b border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative w-32 h-32 bg-neutral-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between h-32 py-1">
                    <div>
                      <span className="text-[#6B7280] uppercase tracking-widest text-xs font-semibold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-serif text-[#1A1A1A]">{item.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <button className="text-sm text-[#6B7280] hover:text-[#1A1A1A] border border-[#E5E7EB] w-8 h-8 flex items-center justify-center cursor-pointer">-</button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button className="text-sm text-[#6B7280] hover:text-[#1A1A1A] border border-[#E5E7EB] w-8 h-8 flex items-center justify-center cursor-pointer">+</button>
                    </div>
                  </div>

                  <div className="h-32 py-1 flex flex-col justify-between items-end">
                    <p className="text-lg font-medium text-[#7A1F1F]">${item.price.toLocaleString()}</p>
                    <button className="text-xs uppercase tracking-widest text-[#6B7280] hover:text-[#7A1F1F] transition-colors border-b border-transparent hover:border-[#7A1F1F] cursor-pointer">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-8 border border-[#E5E7EB] sticky top-32 rounded-2xl shadow-sm">
              <h3 className="text-xl font-serif text-[#1A1A1A] mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm font-light text-[#6B7280] border-b border-[#E5E7EB] pb-6">
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
              
              <div className="flex justify-between text-lg font-medium text-[#1A1A1A] mb-8">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              
              <Link 
                href="/checkout" 
                className="block text-center w-full bg-[#7A1F1F] text-white p-4 uppercase tracking-wider text-sm font-medium hover:bg-[#B8860B] transition-colors rounded-lg"
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
