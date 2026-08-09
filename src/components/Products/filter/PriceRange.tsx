"use client";

import { useState } from "react";

export default function PriceRange() {
  const MIN = 0;
  const MAX = 100000;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  return (
    <>
      {/* Price labels */}
      <div className="my-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          ₹{minPrice.toLocaleString("en-IN")}
        </span>

        <span className="font-medium text-gray-700">
          ₹{maxPrice.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Range */}
      <div className="relative h-6">
        <div className="absolute top-2.5 h-1 w-full rounded bg-gray-200" />

        {/* Active range */}
        <div
          className="absolute top-2.5 h-1 rounded bg-[#7A1F1F]"
          style={{
            left: `${(minPrice / MAX) * 100}%`,
            right: `${100 - (maxPrice / MAX) * 100}%`,
          }}
        />

        {/* Minimum slider */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={500}
          value={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value < maxPrice) {
              setMinPrice(value);
            }
          }}
          className="pointer-events-none cursor-pointer absolute top-0 h-6 w-full appearance-none bg-transparent
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#7A1F1F]"
        />

        {/* Maximum slider */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={500}
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value > minPrice) {
              setMaxPrice(value);
            }
          }}
          className="pointer-events-none cursor-pointer absolute top-0 h-6 w-full appearance-none bg-transparent
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#7A1F1F]"
        />
      </div>

      {/* Inputs */}
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">Min Price</label>

          <input
            type="number"
            value={minPrice}
            min={MIN}
            max={maxPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-500">Max Price</label>

          <input
            type="number"
            value={maxPrice}
            min={minPrice}
            max={MAX}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
      </div>
    </>
  );
}
