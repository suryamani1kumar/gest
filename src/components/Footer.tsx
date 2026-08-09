import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { email, Tfn1, Tfn2 } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#4B1313] text-white border-t border-[#7A1F1F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-15 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-white uppercase font-serif tracking-[0.2em] text-sm mb-5">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-center  gap-3">
                <Phone size={18} className="text-[#C9A227] mt-0.5" />
                <div>
                  <Link href={`tel:${Tfn1}`}>
                    <p className="text-base">{Tfn1}</p>
                  </Link>
                  <Link href={`tel:${Tfn2}`}>
                    <p className="text-base">{Tfn2}</p>
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#C9A227] mt-0.5" />
                <Link href={`mailto:${email}`}>
                  <p className="text-base">{email}</p>
                </Link>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A227] mt-0.5" />
                <p>
                  74G, Nyay Khand-2, Kalapathar
                  <br />
                  Indirapuram, Ghaziabad,
                  <br />
                  Uttar Pradesh India - 201014
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#C9A227] mt-0.5" />
                <p>
                  Mon - Sun
                  <br />
                  10:30 AM - 9:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-serif uppercase tracking-[0.2em] text-sm mb-6">
              Explore
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/collections"
                  className="hover:text-[#C9A227] transition"
                >
                  All Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/collections"
                  className="hover:text-[#C9A227] transition"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  href="/bespoke"
                  className="hover:text-[#C9A227] transition"
                >
                  Bespoke Design
                </Link>
              </li>

              <li>
                <Link
                  href="/gemstones"
                  className="hover:text-[#C9A227] transition"
                >
                  Gemstones
                </Link>
              </li>
            </ul>
          </div>

          {/* Assistance */}
          <div>
            <h4 className="text-white font-serif uppercase tracking-[0.2em] text-sm mb-6">
              Other Links
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#C9A227] transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-[#C9A227] transition"
                >
                  Shipping Policy
                </Link>
              </li>

             <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-[#C9A227] transition"
                >
                  Return & Exchange Policy
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-[#C9A227] transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#C9A227] transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Map */}
          <div>
            <h4 className="text-white font-serif uppercase tracking-[0.2em] text-sm mb-6">
              Visit Our Store
            </h4>

            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8046895772513!2d77.3597492687387!3d28.63561518327509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce54b155ec4dd%3A0xdb138b279755df30!2s74c%2C%20near%20Kala%20Patthar%2C%20Naya%20Khand%20III%2C%20Makanpur%2C%20Nyay%20Khand%202%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201020!5e0!3m2!1sen!2sin!4v1786030315131!5m2!1sen!2sin"
                width="100%"
                height="200"
                loading="lazy"
                allowFullScreen
                className="w-full h-40"
              />
            </div>

            <p className="text-sm text-neutral-400 mt-4">
              Visit our showroom for premium jewellery, natural gemstones, and
              authentic Rudraksha.
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-8 border-t border-[#C9A227] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white">
            © {new Date().getFullYear()} Aura & Gem. All Rights Reserved.
          </p>

          <div className="flex flex-wrap gap-6 text-xs">
            <Link
              href="/privacy-policy"
              className="hover:text-[#C9A227] transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="hover:text-[#C9A227] transition"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/disclaimer"
              className="hover:text-[#C9A227] transition"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
