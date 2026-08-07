import { email, Tfn1, Tfn2 } from "@/lib/data";
import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <div className="pt-15 pb-24 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
            Contact Us
          </h1>
          <p className="text-[#6B7280] font-light leading-relaxed">
            We are here to assist you with any inquiries, from tracking an order
            to scheduling a private viewing of our high jewelry collection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">
              Client Services
            </h3>
            <p className="text-[#6B7280] font-light mb-2">
              Email: <Link href={`mailto:${email}`}>{email}</Link>
            </p>
            <p className="text-[#6B7280] font-light mb-2">
              Phone: <Link href={`tel:${Tfn1}`}>{Tfn1}</Link>
              {",  "}
              <Link href={`tel:${Tfn2}`}>{Tfn2}</Link>
            </p>
            <p className="text-[#6B7280] font-light mt-4">
              Hours: Monday - Sunday, 10:30am - 9:30pm EST
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">
              Flagship Boutique
            </h3>
            <p className="text-[#6B7280] font-light mb-2">
              {" "}
              74G, Nyay Khand-2, Kalapathar, Indirapuram
            </p>
            <p className="text-[#6B7280] font-light mb-2">
              Ghaziabad, Uttar Pradesh India - 201014
            </p>
            <p className="text-[#6B7280] font-light mt-4">
              Walk-ins welcome, appointments preferred.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 border border-[#E5E7EB] rounded-2xl shadow-sm">
          <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6 text-center">
            Send a Message
          </h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full border-gray-300 border p-3 text-sm focus:outline-none focus:border-[#7A1F1F] rounded-lg"
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full bg-[#7A1F1F] text-white p-4 uppercase tracking-wider text-sm font-medium hover:bg-[#B8860B] transition-colors rounded-lg cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
