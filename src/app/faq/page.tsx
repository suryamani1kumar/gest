import type { Metadata } from "next";
import FAQ from "@/components/Faq/FAQ";

const faqs = [
  {
    id: 1,
    question: "Are your gemstones natural and certified?",
    answer:
      "We offer genuine gemstones with detailed product information. Where applicable, gemstones are provided with certification from the relevant laboratory. Certification and treatment details are mentioned on the individual product page.",
  },
  {
    id: 2,
    question: "How can I buy genuine gemstones online?",
    answer:
      "You can browse our collection of natural gemstones, check the gemstone specifications, certification details, photographs and pricing, and place your order securely through our online store. Our team is also available if you need assistance before purchasing.",
  },
  {
    id: 3,
    question: "How do I choose the right gemstone?",
    answer:
      "The right gemstone depends on factors such as gemstone type, quality, colour, clarity, origin, size and budget. If you are purchasing a gemstone for traditional astrological purposes, we recommend consulting a qualified astrologer.",
  },
  {
    id: 4,
    question: "Do you sell original and certified Rudraksha?",
    answer:
      "Yes. We offer Rudraksha with product-specific authenticity and certification information where applicable. Details such as Mukhi type and origin are provided on the relevant product page.",
  },
  {
    id: 5,
    question: "How can I identify an original Rudraksha?",
    answer:
      "Rudraksha should be evaluated based on its natural characteristics and, where applicable, professional or laboratory authentication. Common home tests should not be treated as conclusive proof of authenticity.",
  },
  {
    id: 6,
    question: "What is Mukhi Rudraksha?",
    answer:
      "Mukhi refers to the natural faces or clefts visible on a Rudraksha bead. Different Mukhi Rudraksha varieties are traditionally associated with different spiritual practices and beliefs.",
  },
  {
    id: 7,
    question: "Which Rudraksha is suitable for me?",
    answer:
      "The choice of Rudraksha depends on your personal requirements, preferences and traditional spiritual or astrological practices. Our team can help you understand the different Rudraksha varieties and their product specifications.",
  },
  {
    id: 8,
    question: "Do you have a physical gemstone and jewellery store?",
    answer:
      "Yes. We have 10+ years of experience through our physical store, where customers can personally view gemstones, Rudraksha and jewellery and speak with our team.",
  },
  {
    id: 9,
    question: "Can I visit your physical store before buying gemstones online?",
    answer:
      "Yes. You can visit our physical store to view available gemstones, Rudraksha and jewellery, compare products and discuss your requirements with our team before making an online purchase.",
  },
  {
    id: 10,
    question: "Do you offer gemstone jewellery and customised jewellery?",
    answer:
      "Yes. We offer gemstone jewellery and selected custom jewellery options. Depending on the product, you may be able to choose the gemstone, metal, design and size.",
  },
  {
    id: 11,
    question: "How do I choose the right gemstone ring size?",
    answer:
      "You can use our ring-size guide to measure your finger before ordering. If you are unsure about your size, our team can help you select the appropriate ring size.",
  },
  {
    id: 12,
    question: "Do you sell gemstones and jewellery online across India?",
    answer:
      "Yes. You can purchase our available gemstones, Rudraksha and jewellery online from across India, subject to delivery availability at your location.",
  },
  {
    id: 13,
    question: "How are gemstones and jewellery shipped?",
    answer:
      "Gemstones, Rudraksha and jewellery are securely packaged to help protect them during transportation. Tracking information is provided after dispatch when available.",
  },
  {
    id: 14,
    question:
      "What is your return and exchange policy for gemstones and jewellery?",
    answer:
      "Returns and exchanges are subject to our current policy. Conditions may differ for loose gemstones, customised jewellery, resized products and special orders. Please review our return policy before purchasing.",
  },
  {
    id: 15,
    question: "Why should I buy gemstones, Rudraksha or jewellery from you?",
    answer:
      "We combine 10+ years of physical-store experience with the convenience of online shopping. We focus on genuine products, transparent product information, certification where applicable, knowledgeable assistance and customer support before and after your purchase.",
  },
];

export const metadata: Metadata = {
  title: "FAQs | Natural Gemstones, Rudraksha & Jewellery",

  description:
    "Find answers about natural and certified gemstones, original Rudraksha, gemstone jewellery, online orders, shipping, returns and our 10+ years of physical-store experience.",

  alternates: {
    canonical: "/faq",
  },

  openGraph: {
    title: "FAQs | Natural Gemstones, Rudraksha & Jewellery",
    description:
      "Get answers about natural gemstones, certified Rudraksha, gemstone jewellery, online orders, shipping and our 10+ years of physical-store experience.",
    url: "/faq",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "FAQs | Natural Gemstones, Rudraksha & Jewellery",
    description:
      "Answers about natural gemstones, Rudraksha, gemstone jewellery, orders, shipping and more.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  return (
    <section className="bg-[#FFFDF8] py-16 sm:py-20">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B8860B]">
            Help & Information
          </p>

          <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Find answers about our natural gemstones, Rudraksha, jewellery,
            online orders and our 10+ years of physical-store experience.
          </p>
        </div>

        {/* FAQ List */}
        <FAQ faqs={faqs} mt={"mb-5"}/>
      </div>
    </section>
  );
}
