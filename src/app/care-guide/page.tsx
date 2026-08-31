import React from 'react';

export default function CareGuidePage() {
  return (
    <div className="pt-32 pb-24 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">Care Guide</h1>
          <p className="text-[#6B7280] font-light leading-relaxed">
            Fine jewelry is crafted to last generations, but it requires proper care and attention to maintain its original brilliance.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 border border-[#E5E7EB] rounded-2xl space-y-12 shadow-sm">
          <section>
            <h3 className="font-serif text-2xl text-gray-900 mb-4">Everyday Care</h3>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              We recommend removing your jewelry when engaging in physical activities, swimming, or using household chemicals. Perfumes, lotions, and hairsprays can also dull the shine of your gemstones and metals. Always put your jewelry on last when getting dressed.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-gray-900 mb-4">Cleaning Diamonds & Gemstones</h3>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              Most hard gemstones like diamonds, sapphires, and rubies can be safely cleaned using warm water, mild dish soap, and a soft-bristled toothbrush. Gently scrub behind the stone where dust and soap residue can collect.
            </p>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              For softer stones like emeralds, pearls, and opals, avoid soaking and harsh brushing. Wipe them gently with a damp, soft cloth. Never use ultrasonic cleaners on these delicate materials.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-gray-900 mb-4">Storage</h3>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              Store your jewelry in its original R.K. JEWELLERS & GEMS box or a fabric-lined jewelry case. Keep pieces separated to prevent them from scratching each other—diamonds are the hardest mineral and can easily scratch other stones and metals.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
