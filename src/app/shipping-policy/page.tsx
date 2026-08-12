import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Gemstones, Rudraksha & Jewellery",
  description:
    "Learn about shipping, delivery timelines, order processing, tracking, delivery delays and shipping charges for gemstones, Rudraksha and jewellery orders.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/shipping-policy",
  },
};

const sections = [
  {
    title: "Order Processing",
    content: (
      <p>
        Orders are processed after successful payment confirmation. We carefully
        verify, pack, and prepare each product before dispatch. Processing time
        may vary depending on product availability, customization,
        certification, and order requirements.
      </p>
    ),
  },
  {
    title: "Shipping & Delivery",
    content: (
      <p>
        We ship orders to eligible delivery addresses through trusted courier
        and logistics partners. Estimated delivery times may vary depending on
        the delivery location, courier availability, weather conditions,
        holidays, and other circumstances.
      </p>
    ),
  },
  {
    title: "Estimated Delivery Time",
    content: (
      <>
        <p>
          Estimated delivery timelines will be communicated or displayed during
          the ordering process where applicable.
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Metro and major cities: approximately 2–5 business days.</li>
          <li>Other locations: approximately 4–8 business days.</li>
          <li>Remote locations may require additional delivery time.</li>
        </ul>

        <p className="mt-3">
          These are estimated timelines and are not guaranteed delivery dates.
        </p>
      </>
    ),
  },
  {
    title: "Shipping Charges",
    content: (
      <p>
        Shipping charges, if applicable, will be displayed during checkout
        before you complete your order. Shipping charges may vary depending on
        the destination, order value, package size, delivery method, and other
        applicable factors.
      </p>
    ),
  },
  {
    title: "Order Tracking",
    content: (
      <p>
        Once your order has been dispatched, tracking information may be
        provided through email, SMS, or your customer account, where applicable.
        You can use the tracking information to check the status of your
        shipment.
      </p>
    ),
  },
  {
    title: "Delivery Delays",
    content: (
      <>
        <p>
          Delivery may be delayed due to circumstances beyond our reasonable
          control, including:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Weather conditions</li>
          <li>Courier or logistics issues</li>
          <li>Public holidays</li>
          <li>Incorrect or incomplete delivery address</li>
          <li>Natural disasters</li>
          <li>Transportation disruptions</li>
          <li>Other unforeseen circumstances</li>
        </ul>
      </>
    ),
  },
  {
    title: "Incorrect Delivery Address",
    content: (
      <p>
        Customers are responsible for providing a complete and accurate shipping
        address, including the correct PIN code and contact number. We may not
        be responsible for delays, additional charges, or failed deliveries
        caused by incorrect or incomplete address information.
      </p>
    ),
  },
  {
    title: "Failed Delivery Attempts",
    content: (
      <p>
        If a courier partner is unable to deliver the package after the
        applicable delivery attempts, the shipment may be returned to us.
        Additional shipping charges may apply if the order needs to be shipped
        again due to an incorrect address, unavailable recipient, or other
        customer-related reasons.
      </p>
    ),
  },
  {
    title: "Damaged Package",
    content: (
      <p>
        If your package appears damaged at the time of delivery, please document
        the condition of the package and contact our customer support team as
        soon as possible. Photographs or videos may be requested to investigate
        the issue.
      </p>
    ),
  },
  {
    title: "International Shipping",
    content: (
      <p>
        International shipping may be available for selected locations.
        International customers may be responsible for applicable customs
        duties, import taxes, local taxes, or other charges imposed by the
        destination country.
      </p>
    ),
  },
  {
    title: "High-Value Orders",
    content: (
      <p>
        For high-value gemstones, jewellery, or other valuable products, we may
        use additional security measures, specialized packaging, insurance, or
        delivery procedures where applicable.
      </p>
    ),
  },
  
];

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Shipping Policy
        </h1>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-5xl p-3 sm:p-10">
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
