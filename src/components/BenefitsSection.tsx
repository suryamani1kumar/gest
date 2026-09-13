"use client";

import React from "react";
import {
  FaTruck,
  FaArrowsRotate,
  FaAward,
  FaHandshake,
  FaArrowRotateLeft,
} from "react-icons/fa6";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    title: "Free Shipping",
    description: "Get 100% Free Shipping",
    icon: <FaTruck />,
  },
  
  {
    title: "100% Certified",
    description: "Authentic & lab-certified gemstones",
    icon: <FaAward />,
  },
  {
    title: "Easy Exchange",
    description: "Easy exchange on eligible products",
    icon: <FaHandshake />,
  },
  {
    title: "14 Days Return",
    description: "14 Days Hassle-Free Returns",
    icon: <FaArrowRotateLeft />,
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-[1920px] flex-col px-5 py-8 sm:px-8 lg:flex-row lg:px-10 lg:py-12">
        {benefits.map((benefit, index) => (
          <React.Fragment key={benefit.title}>
            <div
              className="
                flex flex-1 flex-col items-center justify-center
                px-4 py-5 text-center
                sm:px-6
                lg:py-0
              "
            >
              {/* Icon */}
              <div
                className="
                  mb-3 flex h-12 w-12 items-center justify-center
                  text-[38px] font-light text-[#7a4a4a]
                  sm:h-14 sm:w-14 sm:text-[42px]
                "
              >
                {benefit.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  font-serif text-[18px] font-normal leading-6
                  text-[#101828]
                  sm:text-[20px]
                "
              >
                {benefit.title}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-2 font-serif text-[15px] font-normal
                  leading-6 text-[#172033]
                  sm:text-[16px]
                "
              >
                {benefit.description}
              </p>
            </div>

            {/* Divider */}
            {index !== benefits.length - 1 && (
              <div
                className="
                  hidden h-[120px] w-px self-center
                  bg-[#f1b8a6]
                  lg:block
                "
              />
            )}

            {/* Mobile Divider */}
            {index !== benefits.length - 1 && (
              <div
                className="
                  mx-auto h-px w-[75%]
                  bg-[#f1b8a6]
                  lg:hidden
                "
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;