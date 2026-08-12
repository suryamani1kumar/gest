"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface faqsItem {
  id: number;
  question: string;
  answer: string;
}
interface FAQProps {
  faqs: faqsItem[];
  mt?: string;
}

export default function FAQ({ faqs, mt = "" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  const toggleFAQ = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return faqs.map((faq) => (
    <div
      key={faq.id}
      className={`self-start overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 ${mt}`}
    >
      <button
        onClick={() => toggleFAQ(faq.id)}
        className="flex w-full cursor-pointer items-center justify-between p-3 text-left"
      >
        <span className="text-md text-[#1A1A1A]">{faq.question}</span>

        <span className="text-md text-[#7A1F1F]">
          {open === faq.id ? <Minus /> : <Plus />}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open === faq.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#E5E7EB] px-3 pb-3 pt-4">
            <p className="leading-8 text-[#6B7280]">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  ));
}
