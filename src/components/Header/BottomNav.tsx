"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  Gem,
  Diamond,
  Circle,
  Gift,
  Heart,
  Menu,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

type SubGroup = {
  title: string;
  links: string[];
};

type Category = {
  name: string;
  href: string;
  icon: React.ReactNode;
  submenu: SubGroup[];
  image: string;
  imageLabel: string;
  imageSubLabel: string;
  promoTitle: string;
  promoSub: string;
  promoImages: string[];
};

const categories: Category[] = [
  {
    name: "All Jewellery",
    href: "/collections/all",
    icon: <Sparkles size={18} />,
    submenu: [
      {
        title: "Shop By Category",
        links: ["Necklaces", "Chains", "Pendants", "Bracelets", "Bangles", "Mangalsutra"],
      },
      {
        title: "Collections",
        links: ["New Arrival", "Office Wear", "Temple Jewellery", "Minimal", "Traditional"],
      },
    ],
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80",
    imageLabel: "All Jewellery",
    imageSubLabel: "Explore Now",
    promoTitle: "Jewellery for Every Sparkle",
    promoSub: "Discover 6500+ Exquisite Designs.",
    promoImages: [
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=80&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=80&q=80",
    ],
  },
  {
    name: "Gold",
    href: "/collections/gold",
    icon: <Gem size={18} />,
    submenu: [
      {
        title: "Gold Jewellery",
        links: ["Gold Rings", "Gold Chains", "Gold Earrings", "Gold Pendants", "Gold Bangles"],
      },
      {
        title: "By Occasion",
        links: ["Bridal Gold", "Daily Wear Gold", "Office Gold", "Party Gold"],
      },
    ],
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    imageLabel: "Pure Gold",
    imageSubLabel: "Explore Now",
    promoTitle: "Gold for Every Occasion",
    promoSub: "Discover 3000+ Gold Designs.",
    promoImages: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=80&q=80",
      "https://images.unsplash.com/photo-1609609789754-3ffc0b8bb6da?w=80&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=80&q=80",
    ],
  },
  {
    name: "Diamond",
    href: "/collections/diamond",
    icon: <Diamond size={18} />,
    submenu: [
      {
        title: "Diamond Jewellery",
        links: [
          "All Diamond",
          "Diamond Bangles",
          "Diamond Bracelets",
          "Diamond Earrings",
          "Diamond Rings",
          "Diamond Mangalsutra",
          "Diamond Necklace Set",
          "Diamond Necklaces",
          "Diamond Nose Pins",
          "Diamond Pendants",
        ],
      },
    ],
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    imageLabel: "Natural Diamonds",
    imageSubLabel: "Explore Now",
    promoTitle: "Diamonds for Every Sparkle",
    promoSub: "Discover 6500+ Exquisite Designs.",
    promoImages: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=80&q=80",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=80&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94f5a5b?w=80&q=80",
    ],
  },
  {
    name: "Healing Crystals",
    href: "/collections/Healing Crystals",
    icon: <Circle size={18} />,
    submenu: [
      {
        title: "Earring Styles",
        links: ["Studs", "Hoops", "Jhumkas", "Drop Earrings", "Chandbalis"],
      },
      {
        title: "By Material",
        links: ["Gold Earrings", "Diamond Earrings", "Silver Earrings"],
      },
    ],
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=400&q=80",
    imageLabel: "Earrings",
    imageSubLabel: "Explore Now",
    promoTitle: "Earrings for Every Mood",
    promoSub: "Explore 2000+ Styles.",
    promoImages: [
      "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=80&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=80&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94f5a5b?w=80&q=80",
    ],
  },
  {
    name: "Rings",
    href: "/collections/rings",
    icon: <Circle size={18} />,
    submenu: [
      {
        title: "Ring Types",
        links: ["Engagement Rings", "Wedding Bands", "Statement Rings", "Stackable Rings"],
      },
      {
        title: "By Material",
        links: ["Gold Rings", "Diamond Rings", "Silver Rings"],
      },
    ],
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    imageLabel: "Rings",
    imageSubLabel: "Explore Now",
    promoTitle: "Rings for Every Moment",
    promoSub: "Find Your Perfect Ring.",
    promoImages: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&q=80",
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=80&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=80&q=80",
    ],
  },
  {
    name: "Mala",
    href: "/collections/mala",
    icon: <Heart size={18} />,
    submenu: [
      {
        title: "Daily Essentials",
        links: ["Light Necklaces", "Simple Earrings", "Thin Bangles", "Delicate Rings"],
      },
    ],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    imageLabel: "Daily Wear",
    imageSubLabel: "Explore Now",
    promoTitle: "Everyday Elegance",
    promoSub: "Light & Wearable Designs.",
    promoImages: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&q=80",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=80&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=80&q=80",
    ],
  },
  {
    name: "Gemstone",
    href: "/collections/gemstone",
    icon: <Gem size={18} />,
    submenu: [
      {
        title: "By Gemstone",
        links: ["Ruby", "Emerald", "Sapphire", "Pearl", "Coral", "Turquoise"],
      },
      {
        title: "By Jewellery",
        links: ["Gemstone Rings", "Gemstone Necklaces", "Gemstone Earrings"],
      },
    ],
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
    imageLabel: "Gemstones",
    imageSubLabel: "Explore Now",
    promoTitle: "Coloured Gemstone Magic",
    promoSub: "Vibrant & Precious Stones.",
    promoImages: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=80&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=80&q=80",
      "https://images.unsplash.com/photo-1609609789754-3ffc0b8bb6da?w=80&q=80",
    ],
  },
  {
    name: "Rudraksha",
    href: "/collections/Rudraksha",
    icon: <Diamond size={18} />,
    submenu: [
      {
        title: "Bridal Sets",
        links: ["Bridal Necklace Sets", "Bridal Earrings", "Bridal Bangles", "Bridal Maangtikka"],
      },
      {
        title: "Groom's Collection",
        links: ["Groom Rings", "Groom Chains", "Groom Bracelets"],
      },
    ],
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&q=80",
    imageLabel: "Wedding Collection",
    imageSubLabel: "Explore Now",
    promoTitle: "Dream Wedding Jewellery",
    promoSub: "Make Your Day Unforgettable.",
    promoImages: [
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=80&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94f5a5b?w=80&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=80&q=80",
    ],
  },
  {
    name: "Gifting",
    href: "/collections/gifting",
    icon: <Gift size={18} />,
    submenu: [
      {
        title: "Gift By Occasion",
        links: ["Birthday", "Anniversary", "Valentine's Day", "Festivals", "Baby Shower"],
      },
      {
        title: "Gift By Budget",
        links: ["Under ₹5,000", "₹5,000–₹15,000", "₹15,000+"],
      },
    ],
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=400&q=80",
    imageLabel: "Gift Someone Special",
    imageSubLabel: "Explore Now",
    promoTitle: "The Perfect Gift",
    promoSub: "For Every Special Moment.",
    promoImages: [
      "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=80&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&q=80",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=80&q=80",
    ],
  }
];

const BottomNav = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 120);
  };

  const activeCategory = activeIndex !== null ? categories[activeIndex] : null;

  return (
    <>
      {/* ── Mega-menu dropdown ── */}
      {activeCategory && (
        <div
          className="absolute left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-40"
          style={{
            top: "100%",
            animation: "slideDown 0.18s ease-out forwards",
          }}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex gap-8">
              {/* Sub-groups */}
              <div className="flex gap-10 flex-1">
                {activeCategory.submenu.map((group) => (
                  <div key={group.title} className="min-w-[160px]">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      {group.title}
                    </h4>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link}>
                          <Link
                            href={`${activeCategory.href}/${link
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="text-sm text-gray-700 hover:text-red-800 transition-colors flex items-center gap-1 group/link"
                          >
                            <span>{link}</span>
                            <ChevronRight
                              size={12}
                              className="opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Promo Banner */}
              <div className="flex items-center bg-[#fdf8f3] rounded-xl px-5 py-4 gap-4 min-w-[300px] max-w-[340px]">
                <div className="flex -space-x-2">
                  {activeCategory.promoImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800 leading-tight">
                    {activeCategory.promoTitle}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{activeCategory.promoSub}</p>
                </div>
                <Link
                  href={activeCategory.href}
                  className="bg-red-800 hover:bg-red-900 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap"
                >
                  View All
                </Link>
              </div>

              {/* Product Image Panel */}
              <div className="relative rounded-xl overflow-hidden min-w-[180px] max-w-[200px] h-[180px] flex-shrink-0 group/img cursor-pointer">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.imageLabel}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold text-sm leading-tight">{activeCategory.imageLabel}</p>
                  <Link
                    href={activeCategory.href}
                    className="text-xs flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors mt-0.5"
                  >
                    {activeCategory.imageSubLabel}
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Nav bar ── */}
      <div className="hidden md:block bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto whitespace-nowrap py-3 text-gray-600 text-sm gap-1">
            {categories.map((cat, index) => (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={cat.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200 font-medium ${
                    activeIndex === index
                      ? "text-red-800"
                      : "hover:text-red-800"
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      activeIndex === index ? "text-red-800" : "text-gray-400"
                    }`}
                  >
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </Link>
                {activeIndex === index && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-800 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default BottomNav;
