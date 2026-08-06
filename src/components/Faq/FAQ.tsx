"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
const faqs = [
  {
    id: 1,
    question: "Are your gemstones and Rudraksha certified?",
    answer:
      "Yes. Every natural gemstone and authentic Rudraksha comes with a trusted laboratory certification or authenticity certificate to ensure its authenticity and quality.",
  },
  {
    id: 2,
    question: "Are your gemstones 100% natural?",
    answer:
      "Yes. We deal only in genuine natural gemstones sourced from trusted suppliers. Any treatments or enhancements, if applicable, are clearly mentioned on the product page.",
  },
  {
    id: 3,
    question: "Do you provide energized gemstones and Rudraksha?",
    answer:
      "Yes. We offer optional Vedic energization (Pran Pratishtha) performed by experienced priests before dispatch for customers who request this service.",
  },
  {
    id: 4,
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes. Cash on Delivery is available for eligible PIN codes across India. You can check availability during checkout.",
  },
  {
    id: 5,
    question: "Can I return or exchange my order?",
    answer:
      "Returns and exchanges are accepted according to our Return Policy. Customized, energized, or made-to-order products may not be eligible for return unless they are damaged or incorrect.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Credit Cards, Debit Cards, Net Banking, Wallets, and other secure online payment methods. Cash on Delivery is also available for selected locations.",
  },
  {
    id: 7,
    question: "Can I customize gemstone jewelry?",
    answer:
      "Yes. We offer customization for rings, pendants, bracelets, and other jewelry. You can choose the gemstone, metal, and size according to your preference.",
  },
  {
    id: 8,
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via SMS or email so you can monitor your shipment until it reaches you.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const toggleFAQ = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return (
    <section className="bg-[#FFFDF8] py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}

        <div className="mb-14 text-center">
          <h2 className="mt-3 text-4xl font-bold text-[#7A1F1F] md:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C9A227]" />
        </div>

        {/* Accordion */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="self-start overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-[#7A1F1F]">
                  {faq.question}
                </span>

                <span className="text-3xl text-[#7A1F1F]">
                  {open === faq.id ? <Minus /> : <Plus />}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open === faq.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#E5E7EB] px-6 pb-6 pt-4">
                    <p className="leading-8 text-[#6B7280]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
