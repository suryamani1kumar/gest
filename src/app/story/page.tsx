import React from 'react';
import Image from 'next/image';

export default function StoryPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Heritage</h1>
          <p className="text-xl text-gray-600 font-light italic">"Jewelry is not just an accessory; it is a profound expression of love, legacy, and art."</p>
        </div>

        <div className="mb-16 aspect-video relative w-full overflow-hidden">
          <Image 
            src="/images/craftsmanship.png" 
            alt="Master Jeweler" 
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg prose-neutral mx-auto max-w-none">
          <h3 className="font-serif text-2xl text-gray-900 mb-4">A Legacy of Excellence</h3>
          <p className="text-gray-600 font-light leading-relaxed mb-8">
            Founded in the heart of the artisan district, Aura & Gem began with a simple yet ambitious vision: to create jewelry that transcends time. Our founders, master gemologists and visionary designers, sought to bring back the golden age of craftsmanship where every piece was a labor of immense love and dedication.
          </p>

          <h3 className="font-serif text-2xl text-gray-900 mb-4">Ethical Sourcing</h3>
          <p className="text-gray-600 font-light leading-relaxed mb-8">
            We believe that true beauty cannot exist without responsibility. That is why every gemstone we use is strictly conflict-free, and our precious metals are sourced from verified, sustainable refineries. We are committed to leaving a positive impact on both the communities we work with and the environment.
          </p>

          <h3 className="font-serif text-2xl text-gray-900 mb-4">The Craft</h3>
          <p className="text-gray-600 font-light leading-relaxed mb-8">
            Our atelier houses some of the most skilled artisans in the world. Utilizing techniques passed down through generations alongside cutting-edge technology, we ensure that every facet, every setting, and every polish meets our exacting standards of perfection.
          </p>
        </div>

      </div>
    </div>
  );
}
