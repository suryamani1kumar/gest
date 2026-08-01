import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const cartItems = [
    { id: 1, name: 'Sapphire Radiance Ring', category: 'Rings', price: 4500, quantity: 1, image: '/images/ring.png' },
    { id: 3, name: 'Emerald Legacy Necklace', category: 'Necklaces', price: 12000, quantity: 1, image: '/images/hero.png' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.08; // Mock 8% tax
  const total = subtotal + taxes;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block border-b border-transparent hover:border-gray-900 transition-colors">
            &larr; Return to Bag
          </Link>
          <h1 className="text-4xl font-serif text-gray-900">Checkout</h1>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          
          <div className="lg:w-2/3 space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-serif text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input type="email" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="newsletter" className="w-4 h-4 text-emerald-800 border-gray-300 focus:ring-emerald-800" />
                  <label htmlFor="newsletter" className="text-sm font-light text-gray-600">Email me with news and exclusive offers</label>
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-serif text-gray-900 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h2 className="text-xl font-serif text-gray-900 mb-6">Payment</h2>
              <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-300 bg-neutral-50 p-6 space-y-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration date (MM/YY)</label>
                    <input type="text" placeholder="MM / YY" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800 bg-white" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Security code</label>
                    <input type="text" placeholder="CVC" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800 bg-white" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800 bg-white" />
                </div>
              </div>
            </section>

            <button type="button" className="w-full bg-gray-900 text-white p-5 uppercase tracking-widest text-sm font-medium hover:bg-emerald-800 transition-colors mt-8">
              Pay ${total.toLocaleString()}
            </button>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-neutral-50 p-8 border border-gray-100 sticky top-32">
              <h3 className="text-xl font-serif text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-6 border-b border-gray-200 pb-6 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-white flex-shrink-0 border border-gray-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 text-sm font-light text-gray-600 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="uppercase text-xs tracking-wider">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-medium text-gray-900 mb-8">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
