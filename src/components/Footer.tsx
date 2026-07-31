import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 py-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="font-serif text-2xl tracking-widest uppercase font-bold text-white mb-6 block">
            Aura & Gem
          </Link>
          <p className="text-sm leading-relaxed text-neutral-400">
            Crafting timeless elegance. Our jewelry is designed for the modern individual, combining classic craftsmanship with contemporary aesthetics.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Explore</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/collections" className="hover:text-white transition-colors">All Collections</Link></li>
            <li><Link href="/collections" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/bespoke" className="hover:text-white transition-colors">Bespoke Design</Link></li>
            <li><Link href="/collections" className="hover:text-white transition-colors">Gift Guide</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Assistance</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/care-guide" className="hover:text-white transition-colors">Care Guide</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Newsletter</h4>
          <p className="text-sm text-neutral-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-neutral-900 border border-neutral-800 text-white px-4 py-2 w-full text-sm focus:outline-none focus:border-neutral-600 transition-colors"
            />
            <button className="bg-white text-neutral-950 px-4 py-2 text-sm uppercase tracking-wider font-medium hover:bg-neutral-200 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-neutral-900 text-xs text-neutral-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Aura & Gem. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
