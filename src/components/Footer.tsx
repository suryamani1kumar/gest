import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1c3b59] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo */}
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-sm mb-5">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-amber-400 mt-0.5" />
                <div>
                  <p>+91 98765 43210</p>
                  <p>+91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber-400 mt-0.5" />
                <p>info@auraandgem.com</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-0.5" />
                <p>
                  Shop No. 12, MG Road,
                  <br />
                  Jaipur, Rajasthan,
                  <br />
                  India - 302001
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-amber-400 mt-0.5" />
                <p>
                  Mon - Sat
                  <br />
                  10:00 AM - 8:00 PM
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
                  className="hover:text-amber-400 transition"
                >
                  All Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/collections"
                  className="hover:text-amber-400 transition"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  href="/bespoke"
                  className="hover:text-amber-400 transition"
                >
                  Bespoke Design
                </Link>
              </li>

              <li>
                <Link
                  href="/gemstones"
                  className="hover:text-amber-400 transition"
                >
                  Gemstones
                </Link>
              </li>
            </ul>
          </div>

          {/* Assistance */}
          <div>
            <h4 className="text-white font-serif uppercase tracking-[0.2em] text-sm mb-6">
              Assistance
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-amber-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-amber-400 transition"
                >
                  Shipping & Returns
                </Link>
              </li>

              <li>
                <Link
                  href="/care-guide"
                  className="hover:text-amber-400 transition"
                >
                  Care Guide
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-amber-400 transition">
                  FAQ
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
                src="https://www.google.com/maps?q=Jaipur,Rajasthan&output=embed"
                width="100%"
                height="240"
                loading="lazy"
                allowFullScreen
                className="w-full h-60"
              />
            </div>

            <p className="text-sm text-neutral-400 mt-4">
              Visit our showroom to experience our handcrafted jewellery
              collection in person.
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Aura & Gem. All Rights Reserved.
          </p>

          <div className="flex flex-wrap gap-6 text-xs">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>

            <Link href="/disclaimer" className="hover:text-white transition">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
