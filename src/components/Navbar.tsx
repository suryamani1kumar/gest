import React from 'react';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button className="p-2 -ml-2 mr-2 md:hidden">
              <Menu className="h-6 w-6 text-gray-900" />
            </button>
            <div className="hidden md:flex space-x-8">
              <Link href="/collections" className="text-sm font-medium text-gray-900 hover:text-emerald-800 transition-colors uppercase tracking-wider">Collections</Link>
              <Link href="/bespoke" className="text-sm font-medium text-gray-900 hover:text-emerald-800 transition-colors uppercase tracking-wider">Bespoke</Link>
              <Link href="/story" className="text-sm font-medium text-gray-900 hover:text-emerald-800 transition-colors uppercase tracking-wider">Our Story</Link>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="font-serif text-2xl tracking-widest uppercase font-bold text-gray-900">
              Aura & Gem
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-900 hover:text-emerald-800 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="text-gray-900 hover:text-emerald-800 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
