import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#7A1F1F]" />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-xs tracking-[0.25em] text-gray-500 uppercase">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
