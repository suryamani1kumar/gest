import React from 'react';
import Image from 'next/image';

export default function BespokePage() {
  return (
    <div className="pt-32 pb-24 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">Bespoke Design</h1>
            <p className="text-[#6B7280] mb-6 font-light leading-relaxed">
              Your story is unique, and your jewelry should be too. Our bespoke service invites you to collaborate with our master designers to create a one-of-a-kind piece that perfectly captures your vision and emotions.
            </p>
            <p className="text-[#6B7280] mb-10 font-light leading-relaxed">
              From the initial sketch to the final polish, experience the luxury of custom jewelry making.
            </p>
            
            <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-2xl">
              <h3 className="text-2xl font-serif mb-6 text-[#1A1A1A]">Request a Consultation</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg" placeholder="Your email address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
                  <textarea rows={4} className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg" placeholder="Briefly describe what you are looking for..."></textarea>
                </div>
                <button type="button" className="w-full bg-[#7A1F1F] text-white p-4 uppercase tracking-wider text-sm font-medium hover:bg-[#B8860B] transition-colors rounded-lg cursor-pointer">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="aspect-[3/4] relative w-full">
              <Image 
                src="/images/craftsmanship.png" 
                alt="Bespoke Craftsmanship" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
