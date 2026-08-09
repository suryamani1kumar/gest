"use client";
import Image from "next/image";
import { useState } from "react";

const Gallery = ({ image }: { image: { url: string; publicId: string }[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  console.log("image", image);

  return (
    <div className="lg:w-[55%]">
      {/* Main Image */}
      <div className="flex-1 relative">
        <div className="aspect-4/3 relative bg-neutral-50 rounded-2xl overflow-hidden group">
          <Image
            src={image[selectedImage].url}
            alt={"ss"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex sm:flex-row mt-8 gap-3 overflow-x-auto sm:overflow-visible sm:w-20 flex-shrink-0">
        {image.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
              selectedImage === idx
                ? "border-[#7A1F1F] shadow-md"
                : "border-[#E5E7EB] hover:border-[#C9A227]"
            }`}
          >
            <Image
              src={img.url}
              alt={`${"ss"} view ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
