import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Gemstones, Rudraksha & Jewellery",
  description:
    "Read our Return & Exchange Policy for gemstones, Rudraksha and jewellery, including eligibility, exchange, refund and cancellation information.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/refund-policy",
  },
};

const sections = [
  {
    title: "Return & Exchange Eligibility",
    content: (
      <p>
        We accept returns or exchanges only for products that meet the
        eligibility requirements mentioned in this policy. The product must be
        unused, undamaged, and returned with its original packaging,
        certificate, invoice, and other accessories, where applicable.
      </p>
    ),
  },
  {
    title: "Return Period",
    content: (
      <p>
        Return or exchange requests must be raised within{" "}
        <strong className="text-[#1A1A1A]">7 days</strong> from the date of
        delivery. Requests received after this period may not be accepted.
      </p>
    ),
  },
  {
    title: "Eligible Reasons for Return",
    content: (
      <>
        <p>Returns may be accepted in cases such as:</p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Wrong product received.</li>
          <li>Product received in damaged condition.</li>
          <li>Product has a manufacturing defect.</li>
          <li>Product does not match the ordered specifications.</li>
          <li>Product is missing from the package.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Natural Gemstone Variations",
    content: (
      <p>
        Natural gemstones may naturally vary in color, clarity, inclusions,
        texture, shape, and appearance. Minor natural variations are not
        considered defects and may not qualify for a return or exchange.
      </p>
    ),
  },
  {
    title: "Products That Cannot Be Returned",
    content: (
      <>
        <p>
          Certain products may not be eligible for return or exchange,
          including:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Products that have been damaged after delivery.</li>
          <li>Products that have been altered, resized, or modified.</li>
          <li>Products showing signs of use or wear.</li>
          <li>Products without original packaging or certificates.</li>
          <li>Customized or specially prepared products, where applicable.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Exchange Policy",
    content: (
      <p>
        An eligible product may be exchanged for another product subject to
        availability. If the replacement product has a higher price, the
        customer may be required to pay the difference. If the replacement
        product has a lower price, the applicable difference will be handled
        according to our refund policy.
      </p>
    ),
  },
  {
    title: "Return Request Process",
    content: (
      <>
        <p>To request a return or exchange:</p>

        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Contact our customer support within the return period.</li>
          <li>Provide your order number and reason for the request.</li>
          <li>Provide photographs or videos if requested.</li>
          <li>Wait for our confirmation before sending the product back.</li>
        </ol>
      </>
    ),
  },
  {
    title: "Product Inspection",
    content: (
      <p>
        Returned products may be inspected after they are received. The return
        or exchange will be approved only after confirming that the product
        meets the applicable eligibility requirements.
      </p>
    ),
  },
  {
    title: "Return Shipping",
    content: (
      <p>
        If the return is due to an incorrect, damaged, defective, or
        misrepresented product, we may arrange or reimburse the applicable
        return shipping cost. For other approved returns, return shipping
        charges may be borne by the customer.
      </p>
    ),
  },
  {
    title: "Refunds",
    content: (
      <p>
        Once an eligible return has been received and approved, the applicable
        refund will be processed using the original payment method or another
        appropriate method, subject to the circumstances of the order.
      </p>
    ),
  },
  {
    title: "Refund Processing Time",
    content: (
      <p>
        Refund processing time may depend on the payment method, banking
        institution, payment gateway, and other factors outside our control.
        Customers will be notified once the refund has been initiated.
      </p>
    ),
  },
  {
    title: "Order Cancellation",
    content: (
      <p>
        Cancellation requests should be submitted as soon as possible after
        placing an order. Once an order has been processed or dispatched,
        cancellation may no longer be possible.
      </p>
    ),
  },
  {
    title: "Damaged Products",
    content: (
      <p>
        If your package arrives damaged, please contact us as soon as possible
        and provide photographs or video evidence of the package and product.
        This helps us investigate the issue with the delivery partner.
      </p>
    ),
  },
  
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}

      <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Return & Exchange Policy
        </h1>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-5xl p-6 sm:p-10">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
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
