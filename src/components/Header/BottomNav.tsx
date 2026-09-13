"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { MdOutlineBrightnessHigh } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { HiOutlineChevronRight, HiOutlineChevronDown } from "react-icons/hi2";

type MenuItem = {
  name: string;
  img: string;
  link: string;
};

type SubGroup = {
  title: string;
  list: MenuItem[];
};

type Category = {
  name: string;
  href: string;
  icon: React.ReactNode;
  submenu: SubGroup[];
};

const categories: Category[] = [
  {
    name: "Gemstone",
    href: "/gemstones",
    icon: <IoDiamondOutline size={18} />,
    submenu: [
      {
        title: "Navratna · 9 Rashi Ratna",
        list: [
          {
            name: "Ruby (Manik)",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787570156/gemstone-products/ufqf52v7wnwvsefleoea.png",
            link: "/gemstones/ruby",
          },
          {
            name: "Blue Sapphire (Neelam)",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827408/gemstone-products/npp4ma5frmptmjpzmbpg.png",
            link: "/gemstones/blue-sapphire",
          },
          {
            name: "Emerald (Panna)",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827051/gemstone-products/mlb3on5mpeothilxkmrz.png",
            link: "/gemstones/emerald",
          },
          {
            name: "Yellow Sapphire (Pukhraj)",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787827592/gemstone-products/kpaz8jt4kdiz2we09p6h.png",
            link: "/gemstones/yellow-sapphire",
          },
          {
            name: "Pearl (Moti)",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844594/gemstone-products/t7vjucddlznnuou0adba.png",
            link: "/gemstones/pearl",
          },
          {
            name: "Red Coral (Moonga)",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844625/gemstone-products/kbdkfjjype71c5hyelg3.png",
            link: "/gemstones/red-coral",
          },
          // {
          //   name: "Diamond",
          //   img: "/images/gemstones/diamond.jpg",
          //   link: "/gemstones/diamond",
          // },
          // {
          //   name: "Hessonite (Gomed)",
          //   img: "/images/gemstones/blue-sapphire.jpg",
          //   link: "/gemstones/blue-sapphire",
          // },
          // {
          //   name: "Cat Eye (Lahsuniya)",
          //   img: "/images/gemstones/blue-sapphire.jpg",
          //   link: "/gemstones/blue-sapphire",
          // },
        ],
      },
      {
        title: "Popular Gemstones",
        list: [
          {
            name: "Opal",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787828503/gemstone-products/n6e9w7udpbx85myroua2.png",
            link: "/gemstones/opal",
          },
          {
            name: "Turquoise",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844648/gemstone-products/ozvefhlq1q4mj0ntonxp.jpg",
            link: "/gemstones/turquoise",
          },
          {
            name: "Citrine",
            img: "https://res.cloudinary.com/djrtuyxoj/image/upload/v1787844667/gemstone-products/oes0zceeynedoault6f0.jpg",
            link: "/gemstones/citrine",
          },
        ],
      },
      // {
      //   title: "Shop By Zodiac",
      //   list: [
      //     {
      //       name: "Aries",
      //       img: "/images/zodiac/aries.jpg",
      //       link: "/zodiac/aries",
      //     },
      //     {
      //       name: "Taurus",
      //       img: "/images/zodiac/taurus.jpg",
      //       link: "/zodiac/taurus",
      //     },
      //     {
      //       name: "Gemini",
      //       img: "/images/zodiac/gemini.jpg",
      //       link: "/zodiac/gemini",
      //     },
      //     {
      //       name: "Cancer",
      //       img: "/images/zodiac/cancer.jpg",
      //       link: "/zodiac/cancer",
      //     },
      //     {
      //       name: "Leo",
      //       img: "/images/zodiac/leo.jpg",
      //       link: "/zodiac/leo",
      //     },
      //     {
      //       name: "Virgo",
      //       img: "/images/zodiac/virgo.jpg",
      //       link: "/zodiac/virgo",
      //     },
      //     {
      //       name: "Libra",
      //       img: "/images/zodiac/libra.jpg",
      //       link: "/zodiac/libra",
      //     },
      //     {
      //       name: "Scorpio",
      //       img: "/images/zodiac/scorpio.jpg",
      //       link: "/zodiac/scorpio",
      //     },
      //   ],
      // },
    ],
  },

  {
    name: "Rudraksha",
    href: "/rudraksha",
    icon: <MdOutlineBrightnessHigh size={18} />,
    submenu: [
      {
        title: "Mukhi Rudraksha",
        list: [
          {
            name: "1 Mukhi Rudraksha",
            img: "/images/rudraksha/1-mukhi.jpg",
            link: "/rudraksha/1-mukhi",
          },
          // {
          //   name: "2 Mukhi Rudraksha",
          //   img: "/images/rudraksha/2-mukhi.jpg",
          //   link: "/rudraksha/2-mukhi",
          // },
          // {
          //   name: "3 Mukhi Rudraksha",
          //   img: "/images/rudraksha/3-mukhi.jpg",
          //   link: "/rudraksha/3-mukhi",
          // },
          // {
          //   name: "4 Mukhi Rudraksha",
          //   img: "/images/rudraksha/4-mukhi.jpg",
          //   link: "/rudraksha/4-mukhi",
          // },
          // {
          //   name: "5 Mukhi Rudraksha",
          //   img: "/images/rudraksha/5-mukhi.jpg",
          //   link: "/rudraksha/5-mukhi",
          // },
          // {
          //   name: "6 Mukhi Rudraksha",
          //   img: "/images/rudraksha/6-mukhi.jpg",
          //   link: "/rudraksha/6-mukhi",
          // },
          // {
          //   name: "7 Mukhi Rudraksha",
          //   img: "/images/rudraksha/7-mukhi.jpg",
          //   link: "/rudraksha/7-mukhi",
          // },
          // {
          //   name: "8 Mukhi Rudraksha",
          //   img: "/images/rudraksha/8-mukhi.jpg",
          //   link: "/rudraksha/8-mukhi",
          // },
        ],
      },
      // {
      //   title: "Mukhi Rudraksha",
      //   list: [
      //     {
      //       name: "9 Mukhi Rudraksha",
      //       img: "/images/rudraksha/9-mukhi.jpg",
      //       link: "/rudraksha/9-mukhi",
      //     },
      //     {
      //       name: "10 Mukhi Rudraksha",
      //       img: "/images/rudraksha/10-mukhi.jpg",
      //       link: "/rudraksha/10-mukhi",
      //     },
      //     {
      //       name: "11 Mukhi Rudraksha",
      //       img: "/images/rudraksha/11-mukhi.jpg",
      //       link: "/rudraksha/11-mukhi",
      //     },
      //     {
      //       name: "12 Mukhi Rudraksha",
      //       img: "/images/rudraksha/12-mukhi.jpg",
      //       link: "/rudraksha/12-mukhi",
      //     },
      //     {
      //       name: "13 Mukhi Rudraksha",
      //       img: "/images/rudraksha/13-mukhi.jpg",
      //       link: "/rudraksha/13-mukhi",
      //     },
      //     {
      //       name: "14 Mukhi Rudraksha",
      //       img: "/images/rudraksha/14-mukhi.jpg",
      //       link: "/rudraksha/14-mukhi",
      //     },
      //     {
      //       name: "Gauri Shankar",
      //       img: "/images/rudraksha/gauri-shankar.jpg",
      //       link: "/rudraksha/gauri-shankar",
      //     },
      //   ],
      // },
      // {
      //   title: "Rudraksha Mala",
      //   list: [
      //     {
      //       name: "5 Mukhi Mala",
      //       img: "/images/rudraksha/5-mukhi-mala.jpg",
      //       link: "/rudraksha/mala/5-mukhi",
      //     },
      //     {
      //       name: "108 Bead Mala",
      //       img: "/images/rudraksha/108-bead-mala.jpg",
      //       link: "/rudraksha/mala/108-bead",
      //     },
      //     {
      //       name: "108 + 1 Mala",
      //       img: "/images/rudraksha/108-plus-1.jpg",
      //       link: "/rudraksha/mala/108-plus-1",
      //     },
      //     {
      //       name: "Japa Mala",
      //       img: "/images/rudraksha/japa-mala.jpg",
      //       link: "/rudraksha/mala/japa",
      //     },
      //     {
      //       name: "Rudraksha Bracelet",
      //       img: "/images/rudraksha/bracelet.jpg",
      //       link: "/rudraksha/bracelets",
      //     },
      //   ],
      // },

      // {
      //   title: "Rudraksha By Origin",
      //   list: [
      //     {
      //       name: "Nepal Rudraksha",
      //       img: "/images/rudraksha/nepal.jpg",
      //       link: "/rudraksha/origin/nepal",
      //     },
      //     {
      //       name: "Haridwar Rudraksha",
      //       img: "/images/rudraksha/haridwar.jpg",
      //       link: "/rudraksha/origin/haridwar",
      //     },
      //     {
      //       name: "Indonesian Rudraksha",
      //       img: "/images/rudraksha/indonesia.jpg",
      //       link: "/rudraksha/origin/indonesia",
      //     },
      //   ],
      // },
    ],
  },
];

const BottomNav = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMenuTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = (index: number) => {
    clearMenuTimeout();
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    clearMenuTimeout();

    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 150);
  };

  const activeCategory = activeIndex !== null ? categories[activeIndex] : null;

  return (
    <>
      {/* ================================
          MEGA MENU
      ================================= */}
      {activeCategory && (
        <div
          className="
            absolute left-0 right-0 top-full z-40
            border-t border-gray-100
            bg-white shadow-2xl
          "
          onMouseEnter={clearMenuTimeout}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex gap-8">
              {/* Groups */}
              <div className="grid flex-1 grid-cols-4 gap-x-10 gap-y-8">
                {activeCategory.submenu.map((group) => (
                  <div key={group.title} className="min-w-0">
                    {/* Group title */}
                    <h4 className="mb-4 border-b border-gray-300 pb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-600">
                      {group.title}
                    </h4>

                    {/* Items */}
                    <ul className="space-y-2">
                      {group.list.map((item) => (
                        <li key={item.link}>
                          <Link
                            href={item.link}
                            className="
                              group/link
                              flex items-center gap-3
                              rounded-md
                              text-sm text-gray-800
                              transition-colors
                              hover:text-[#B8860B]
                            "
                          >
                            {/* Image */}
                            <span
                              className="
                                h-8 w-8 shrink-0
                                overflow-hidden rounded-full
                                bg-gray-100
                              "
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                loading="lazy"
                                className="
                                  h-full w-full object-cover
                                  transition-transform duration-300
                                  group-hover/link:scale-110
                                "
                              />
                            </span>

                            {/* Name */}
                            <span className="flex-1">{item.name}</span>

                            {/* Arrow */}
                            <HiOutlineChevronRight
                              size={13}
                              className="
                                -translate-x-1
                                opacity-0
                                transition-all duration-200
                                group-hover/link:translate-x-0
                                group-hover/link:opacity-100
                              "
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================
          NAVIGATION BAR
      ================================= */}
      <nav className="hidden border-t border-gray-100 md:block bg-[#FAF8F2]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-5 overflow-x-auto whitespace-nowrap py-1 text-sm text-gray-600">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={category.href}
                  className={`
                    flex items-center gap-1.5
                    px-3 py-2
                    font-medium
                    transition-all duration-200
                    ${
                      activeIndex === index
                        ? "text-[#7A1F1F]"
                        : "text-gray-800 hover:text-[#B8860B]"
                    }
                  `}
                >
                  {/* Icon */}
                  <span
                    className={`
                      transition-colors
                      ${
                        activeIndex === index
                          ? "text-[#7A1F1F]"
                          : "text-gray-800"
                      }
                    `}
                  >
                    {category.icon}
                  </span>

                  {/* Name */}
                  <span>{category.name}</span>

                  {/* Chevron */}
                  {category.submenu.length > 0 && (
                    <HiOutlineChevronDown
                      size={13}
                      className={`
                        transition-transform duration-200
                        ${activeIndex === index ? "rotate-180" : ""}
                      `}
                    />
                  )}
                </Link>

                {/* Active underline */}
                {activeIndex === index && (
                  <span
                    className="
                      absolute bottom-0 left-3 right-3
                      h-0.5 rounded-full
                      bg-[#7A1F1F]
                    "
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
