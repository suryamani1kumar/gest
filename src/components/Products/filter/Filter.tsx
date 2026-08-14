import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import PriceRange from "./PriceRange";

const Filter = ({
  activeFilterCount,
  toggleMaterial,
  clearAllFilters,
  selectedMaterials,
}: {
  activeFilterCount: number;
  toggleMaterial: (mat: string) => void;
  clearAllFilters: () => void;
  selectedMaterials: string[];
}) => {
  return (
    <>
      {/* Price Range */}
      <FilterAccordion title="Price Range">
        <div className="flex flex-col gap-2">
          <PriceRange />
        </div>
      </FilterAccordion>

      {/* Price Per Carat */}
      <FilterAccordion title="Price Per Carat">
        <div className="flex flex-col gap-2">
          <PriceRange />
        </div>
      </FilterAccordion>

      {/* Weight Range */}
      <FilterAccordion title="Weight Carat">
        <div className="flex flex-col gap-2">
          <PriceRange />
        </div>
      </FilterAccordion>

      {/* Shape */}
      <FilterAccordion title="Shape">
        <div className="flex flex-col gap-2.5">
          {[
            "Round",
            "Radiant",
            "Princess",
            "Pear",
            "Oval",
            "Heart",
            "Emerald",
            "Cushion",
          ].map((mat) => (
            <label
              key={mat}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#1A1A1A]"
            >
              <div
                className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-all duration-200 ${
                  selectedMaterials.includes(mat)
                    ? "border-[#7A1F1F] bg-[#7A1F1F]"
                    : "border-[#D1D5DB]"
                }`}
                onClick={() => toggleMaterial(mat)}
              >
                {selectedMaterials.includes(mat) && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
              <span onClick={() => toggleMaterial(mat)}>{mat}</span>
              <span className="ml-auto text-xs text-[#9CA3AF]">
                {/* {allProducts.filter((p) => p.material === mat).length} */}{" "}
                9
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Origin */}
      <FilterAccordion title="Origin">
        <div className="flex flex-col gap-2.5">
          {[" Sri Lanka", "Myanmar", "Colombia", "Zambia"].map((mat) => (
            <label
              key={mat}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#1A1A1A]"
            >
              <div
                className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-all duration-200 ${
                  selectedMaterials.includes(mat)
                    ? "border-[#7A1F1F] bg-[#7A1F1F]"
                    : "border-[#D1D5DB]"
                }`}
                onClick={() => toggleMaterial(mat)}
              >
                {selectedMaterials.includes(mat) && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
              <span onClick={() => toggleMaterial(mat)}>{mat}</span>
              <span className="ml-auto text-xs text-[#9CA3AF]">
                {/* {allProducts.filter((p) => p.material === mat).length} */}{" "}
                9
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="mt-5 w-full rounded-lg border border-[#7A1F1F] py-2.5 text-sm font-semibold text-[#7A1F1F] transition-all hover:bg-[#7A1F1F] hover:text-white cursor-pointer"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </>
  );
};

export default Filter;

/* ─── Filter Accordion ─── */
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
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
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
