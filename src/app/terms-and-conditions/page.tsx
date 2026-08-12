import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Gemstones, Rudraksha & Jewellery",
  description:
    "Read our Terms & Conditions for purchasing natural gemstones, Rudraksha and jewellery, including orders, payments, shipping, returns, cancellations and website usage.",
  keywords: [
    "terms and conditions",
    "gemstone terms and conditions",
    "Rudraksha terms and conditions",
    "jewellery terms and conditions",
    "online gemstone store terms",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Gemstones, Rudraksha & Jewellery",
    description:
      "Read the Terms & Conditions for our gemstone, Rudraksha and jewellery store.",
    url: "/terms-and-conditions",
    siteName: "Your Store Name",
    type: "website",
  },
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using our website, you agree to be bound by these Terms
        & Conditions. If you do not agree with any part of these terms, please
        do not use our website or place an order.
      </p>
    ),
  },
  {
    id: "products",
    title: "Products & Product Information",
    content: (
      <p>
        We make reasonable efforts to ensure that product descriptions,
        photographs, specifications, prices, and availability are accurate.
        However, natural gemstones, Rudraksha, and jewellery may have natural
        variations in color, texture, size, weight, inclusions, and appearance.
      </p>
    ),
  },
  {
    id: "natural-products",
    title: "Natural Gemstones & Rudraksha",
    content: (
      <p>
        Natural gemstones and Rudraksha are unique products. Natural inclusions,
        variations, marks, textures, and differences in appearance may occur.
        Such characteristics are not necessarily considered defects.
      </p>
    ),
  },
  {
    id: "pricing",
    title: "Pricing & Taxes",
    content: (
      <p>
        Product prices displayed on our website are subject to change without
        prior notice. Applicable taxes, shipping charges, discounts, and other
        charges will be displayed where applicable.
      </p>
    ),
  },
  {
    id: "orders",
    title: "Orders & Order Acceptance",
    content: (
      <p>
        Placing an order constitutes a request to purchase a product. We reserve
        the right to accept, reject, or cancel an order in cases such as product
        unavailability, pricing errors, incorrect information, payment issues,
        or suspected fraudulent activity.
      </p>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    content: (
      <p>
        Customers are responsible for providing accurate billing and payment
        information. Orders may be processed only after successful payment
        confirmation where applicable.
      </p>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    content: (
      <p>
        Delivery timelines displayed on the website are estimates. Delays may
        occur due to courier issues, weather conditions, holidays, incorrect
        addresses, or circumstances beyond our reasonable control.
      </p>
    ),
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    content: (
      <p>
        Returns, exchanges, cancellations, and refunds are subject to our
        applicable Return & Refund Policy. Customers are advised to review that
        policy before placing an order.
      </p>
    ),
  },
  {
    id: "cancellation",
    title: "Order Cancellation",
    content: (
      <p>
        Orders may be cancelled subject to our Cancellation Policy and the
        processing status of the order. Once an order has been dispatched,
        cancellation may no longer be possible.
      </p>
    ),
  },
  {
    id: "account",
    title: "User Accounts",
    content: (
      <p>
        If you create an account on our website, you are responsible for
        maintaining the confidentiality of your login information and for
        activities performed through your account.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <p>
        All website content, including text, images, logos, graphics, product
        photographs, designs, and other materials, belongs to us or our
        respective licensors and may not be reproduced or commercially used
        without prior permission.
      </p>
    ),
  },
  {
    id: "astrology",
    title: "Astrology & Spiritual Information",
    content: (
      <p>
        Information relating to gemstones, Rudraksha, astrology, planetary
        associations, spiritual practices, and traditional benefits is provided
        for informational purposes and is based on traditional beliefs. We do
        not guarantee specific personal, medical, financial, or astrological
        results.
      </p>
    ),
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    content: (
      <>
        <p>You agree not to:</p>

        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Use the website for unlawful purposes.</li>
          <li>Attempt unauthorized access to our systems.</li>
          <li>Introduce viruses or malicious code.</li>
          <li>Copy or reproduce website content without permission.</li>
          <li>Use the website to conduct fraudulent activities.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content: (
      <p>
        Our website may use third-party services such as payment gateways,
        courier companies, analytics providers, and other service providers.
        Their services may be governed by their own terms and policies.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <p>
        To the extent permitted by applicable law, we shall not be responsible
        for losses resulting from circumstances beyond our reasonable control or
        from reliance on information provided on the website for general or
        informational purposes.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms & Conditions from time to time. Changes will
        become effective when the updated terms are published on this page.
      </p>
    ),
  },
  
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Terms & Conditions
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base">
          Please read these Terms & Conditions carefully before using our
          website or purchasing our product.
        </p>
      </div>

      {/* Content */}
      <article className="p-3 sm:p-10 mx-auto max-w-5xl ">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-lg font-semibold text-[#1A1A1A] sm:text-xl">
                {section.title}
              </h2>

              <div className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-[15px]">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
