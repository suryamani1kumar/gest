import React from 'react';

export default function FAQPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-serif text-xl text-gray-900 mb-3">Do you offer international shipping?</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Yes, we offer complimentary secure and insured shipping worldwide for all orders over $1,000. For orders under this amount, standard international shipping rates apply.
            </p>
          </div>
          
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-serif text-xl text-gray-900 mb-3">What is your return policy?</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              We accept returns for refund or exchange within 30 days of delivery, provided the piece is in its original, unworn condition with all tags and packaging intact. Bespoke and engraved items are final sale.
            </p>
          </div>
          
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-serif text-xl text-gray-900 mb-3">Are your diamonds ethically sourced?</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Absolutely. We adhere strictly to the Kimberley Process and only source diamonds from trusted partners who share our commitment to ethical, conflict-free, and sustainable practices.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-serif text-xl text-gray-900 mb-3">How long does a bespoke order take?</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Depending on the complexity of the design and the sourcing of specific gemstones, a bespoke piece typically takes between 4 to 8 weeks from the final design approval.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
