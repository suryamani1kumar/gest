import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gemstones, Rudraksha & Jewellery",
  description:
    "Read our Privacy Policy to understand how we collect, use, protect, and manage your personal information when you use our gemstone, Rudraksha and jewellery website.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections = [
  {
    title: "Introduction",
    content: (
      <p>
        We respect your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, store,
        and protect information when you visit our website, create an account,
        or purchase our gemstones, Rudraksha, jewellery, and related products.
      </p>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect information such as:</p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Name and contact details.</li>
          <li>Email address and phone number.</li>
          <li>Billing and shipping address.</li>
          <li>Account and login-related information.</li>
          <li>Order and purchase information.</li>
          <li>
            Payment-related information processed through payment providers.
          </li>
          <li>Product preferences and customer communications.</li>
          <li>Information you provide when contacting customer support.</li>
          <li>Technical information about your device and website usage.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Email Verification",
    content: (
      <p>
        We may use your email address to verify your account, send one-time
        passwords (OTP), confirm orders, provide account-related notifications,
        and communicate important information regarding your purchases or
        account.
      </p>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <p>Your information may be used to:</p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Create and manage your customer account.</li>
          <li>Verify your email address and account.</li>
          <li>Process and fulfil orders.</li>
          <li>Process payments through authorized payment providers.</li>
          <li>Arrange shipping and delivery.</li>
          <li>Provide customer support.</li>
          <li>Send order and account notifications.</li>
          <li>Improve our website, products, and services.</li>
          <li>Prevent fraud, misuse, and unauthorized activities.</li>
          <li>Comply with applicable legal requirements.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Payment Information",
    content: (
      <p>
        Payments may be processed through third-party payment gateways or
        payment service providers. We may not directly store complete payment
        card or banking credentials on our servers. Payment information may be
        handled according to the privacy policies and security practices of the
        respective payment provider.
      </p>
    ),
  },
  {
    title: "Shipping Information",
    content: (
      <p>
        To deliver your order, we may share necessary information such as your
        name, phone number, shipping address, and order details with courier,
        logistics, and delivery partners.
      </p>
    ),
  },
  {
    title: "Cookies & Similar Technologies",
    content: (
      <p>
        We may use cookies and similar technologies to maintain sessions,
        remember preferences, improve website functionality, understand website
        usage, and provide a better customer experience. You may be able to
        manage cookies through your browser settings.
      </p>
    ),
  },
  {
    title: "Account Information",
    content: (
      <p>
        If you create an account, you are responsible for keeping your login
        credentials secure. Please notify us if you believe your account has
        been accessed without authorization.
      </p>
    ),
  },
  {
    title: "Third-Party Services",
    content: (
      <p>
        We may use trusted third-party services for payment processing,
        shipping, analytics, authentication, email delivery, cloud storage,
        security, and other website operations. These providers may process
        information as necessary to provide their services.
      </p>
    ),
  },
  {
    title: "Data Security",
    content: (
      <p>
        We take reasonable technical and organizational measures to protect your
        personal information against unauthorized access, loss, misuse,
        alteration, or disclosure. However, no method of transmission or
        electronic storage can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        We may retain personal information for as long as necessary to provide
        our services, maintain transaction and business records, resolve
        disputes, prevent fraud, comply with legal obligations, and enforce
        applicable agreements and policies.
      </p>
    ),
  },
  {
    title: "Your Privacy Choices",
    content: (
      <>
        <p>
          Depending on applicable law, you may have rights regarding your
          personal information, which may include:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Requesting access to certain personal information.</li>
          <li>Requesting correction of inaccurate information.</li>
          <li>Requesting deletion where legally applicable.</li>
          <li>Withdrawing certain permissions or consent.</li>
          <li>Requesting information about how your data is used.</li>
        </ul>

        <p className="mt-3">
          Requests can be made through our customer support contact details.
        </p>
      </>
    ),
  },
  {
    title: "Marketing Communications",
    content: (
      <p>
        Where applicable, we may send promotional emails, offers, product
        updates, or other marketing communications with your permission or as
        otherwise permitted by applicable law. You may opt out of promotional
        communications using the unsubscribe option provided in the
        communication.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p>
        Our website is not intended to knowingly collect personal information
        from children. If you believe that a child has provided personal
        information to us, please contact us so that we can take appropriate
        action.
      </p>
    ),
  },
  {
    title: "External Links",
    content: (
      <p>
        Our website may contain links to third-party websites or services. We
        are not responsible for the privacy practices or content of external
        websites. We recommend reviewing their privacy policies before providing
        personal information.
      </p>
    ),
  },
  {
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our services, technology, legal requirements, or business practices.
        The updated policy will be published on this page with a revised "Last
        Updated" date.
      </p>
    ),
  },
  
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-4xl p-3 sm:p-10">
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
