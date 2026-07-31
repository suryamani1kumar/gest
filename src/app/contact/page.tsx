import React from 'react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 font-light leading-relaxed">
            We are here to assist you with any inquiries, from tracking an order to scheduling a private viewing of our high jewelry collection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-xl text-gray-900 mb-4">Client Services</h3>
            <p className="text-gray-600 font-light mb-2">Email: concierge@auragem.com</p>
            <p className="text-gray-600 font-light mb-2">Phone: +1 (800) 123-4567</p>
            <p className="text-gray-600 font-light mt-4">Hours: Monday - Friday, 9am - 6pm EST</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-gray-900 mb-4">Flagship Boutique</h3>
            <p className="text-gray-600 font-light mb-2">742 Fifth Avenue</p>
            <p className="text-gray-600 font-light mb-2">New York, NY 10019</p>
            <p className="text-gray-600 font-light mt-4">Walk-ins welcome, appointments preferred.</p>
          </div>
        </div>

        <div className="bg-neutral-50 p-8 border border-gray-100">
          <h3 className="font-serif text-2xl text-gray-900 mb-6 text-center">Send a Message</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={5} className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-emerald-800"></textarea>
            </div>
            <button type="button" className="w-full bg-gray-900 text-white p-4 uppercase tracking-wider text-sm font-medium hover:bg-emerald-800 transition-colors">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
