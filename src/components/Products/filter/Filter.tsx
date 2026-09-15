"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import PriceRange from "./PriceRange";

const SHAPES = [
  "Round",
  "Radiant",
  "Princess",
  "Pear",
  "Oval",
  "Heart",
  "Emerald",
  "Cushion",
];

const ORIGINS = ["Sri Lanka", "Myanmar", "Colombia", "Zambia"];

export interface FilterState {
  priceMin: number;
  priceMax: number;
  caratPriceMin: number;
  caratPriceMax: number;
  weightMin: number;
  weightMax: number;
  shapes: string[];
  origins: string[];
}

interface FilterProps {
  activeFilterCount: number;
  clearAllFilters: () => void;

  filters: FilterState;

  onPriceChange: (min: number, max: number) => void;
  onCaratPriceChange: (min: number, max: number) => void;
  onWeightChange: (min: number, max: number) => void;

  toggleShape: (shape: string) => void;
  toggleOrigin: (origin: string) => void;
}

const Filter = ({
  activeFilterCount,
  clearAllFilters,
  filters,
  onPriceChange,
  onCaratPriceChange,
  onWeightChange,
  toggleShape,
  toggleOrigin,
}: FilterProps) => {
  return (
    <>
      {/* Price Range */}
      <FilterAccordion title="Price Range">
        <PriceRange
          min={1000}
          max={100000}
          valueMin={filters.priceMin}
          valueMax={filters.priceMax}
          onChange={onPriceChange}
          prefix="₹"
        />
      </FilterAccordion>

      {/* Price Per Carat */}
      <FilterAccordion title="Price Per Carat">
        <PriceRange
          min={100}
          max={50000}
          valueMin={filters.caratPriceMin}
          valueMax={filters.caratPriceMax}
          onChange={onCaratPriceChange}
          prefix="₹"
        />
      </FilterAccordion>

      {/* Weight */}
      <FilterAccordion title="Weight Carat">
        <PriceRange
          min={0.5}
          max={20}
          step={0.1}
          valueMin={filters.weightMin}
          valueMax={filters.weightMax}
          onChange={onWeightChange}
          prefix=""
          suffix=" ct"
        />
      </FilterAccordion>

      {/* Shape */}
      <FilterAccordion title="Shape">
        <FilterOptions
          options={SHAPES}
          selected={filters.shapes}
          onToggle={toggleShape}
        />
      </FilterAccordion>

      {/* Origin */}
      <FilterAccordion title="Origin">
        <FilterOptions
          options={ORIGINS}
          selected={filters.origins}
          onToggle={toggleOrigin}
        />
      </FilterAccordion>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="mt-5 w-full cursor-pointer rounded-lg border border-[#7A1F1F] py-2.5 text-sm font-semibold text-[#7A1F1F] transition-all hover:bg-[#7A1F1F] hover:text-white"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </>
  );
};

export default Filter;

/* -------------------------------------------------- */
/* Filter Options */
/* -------------------------------------------------- */

function FilterOptions({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 text-sm text-[#1A1A1A]"
            onClick={() => onToggle(option)}
          >
            <div
              className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-all duration-200 ${
                isSelected
                  ? "border-[#7A1F1F] bg-[#7A1F1F]"
                  : "border-[#D1D5DB]"
              }`}
            >
              {isSelected && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <span>{option}</span>

            <span className="ml-auto text-xs text-[#9CA3AF]">9</span>
          </label>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------- */
/* Accordion */
/* -------------------------------------------------- */

function FilterAccordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#E5E7EB] py-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
          {title}
        </span>

        <ChevronDown
          size={16}
          className={`text-[#6B7280] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}