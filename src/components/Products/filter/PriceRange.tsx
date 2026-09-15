"use client";

interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;

  valueMin: number;
  valueMax: number;

  onChange: (min: number, max: number) => void;

  prefix?: string;
  suffix?: string;
}

export default function PriceRange({
  min,
  max,
  step = 500,
  valueMin,
  valueMax,
  onChange,
  prefix = "₹",
  suffix = "",
}: PriceRangeProps) {
  const formatValue = (value: number) => {
    return `${prefix}${value.toLocaleString("en-IN")}${suffix}`;
  };

  const minPercent = ((valueMin - min) / (max - min)) * 100;
  const maxPercent = ((valueMax - min) / (max - min)) * 100;

  const handleMinChange = (value: number) => {
    if (value < valueMax) {
      onChange(value, valueMax);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value > valueMin) {
      onChange(valueMin, value);
    }
  };

  return (
    <>
      {/* Labels */}
      <div className="my-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          {formatValue(valueMin)}
        </span>

        <span className="font-medium text-gray-700">
          {formatValue(valueMax)}
        </span>
      </div>

      {/* Slider */}
      <div className="relative h-6">
        {/* Background */}
        <div className="absolute top-2.5 h-1 w-full rounded bg-gray-200" />

        {/* Active range */}
        <div
          className="absolute top-2.5 h-1 rounded bg-[#7A1F1F]"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Minimum */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="pointer-events-none absolute top-0 h-6 w-full cursor-pointer appearance-none bg-transparent
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#7A1F1F]"
        />

        {/* Maximum */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="pointer-events-none absolute top-0 h-6 w-full cursor-pointer appearance-none bg-transparent
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
          <label className="mb-1 block text-xs text-gray-500">
            Min
          </label>

          <input
            type="number"
            value={valueMin}
            min={min}
            max={valueMax - step}
            step={step}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value >= min && value < valueMax) {
                handleMinChange(value);
              }
            }}
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-[#7A1F1F]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-500">
            Max
          </label>

          <input
            type="number"
            value={valueMax}
            min={valueMin + step}
            max={max}
            step={step}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value > valueMin && value <= max) {
                handleMaxChange(value);
              }
            }}
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-[#7A1F1F]"
          />
        </div>
      </div>
    </>
  );
}