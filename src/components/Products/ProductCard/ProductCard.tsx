import {
  addToWishlistAsync,
  removeFromWishlistAsync,
} from "@/redux/slices/wishlistSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({
  product,
  gemcat,
}: {
  product: any;
  gemcat?: string | undefined;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const toggleWishlist = (id: string) => {
    const isWishlisted = wishlistItems.some((item) => item.productId === id);

    if (isWishlisted) {
      dispatch(removeFromWishlistAsync(id));
    } else {
      dispatch(addToWishlistAsync({ productId: id }));
    }
  };

  return (
    <Link href={`/gemstones/${gemcat}/${product.slug}`} className="block">
      <div className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#C9A227]/40">
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product._id)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:bg-white hover:scale-110 cursor-pointer"
        >
          <Heart
            size={16}
            className={
              wishlistItems.some((item) => item.productId === product._id)
                ? "fill-[#7A1F1F] text-[#7A1F1F]"
                : "text-[#6B7280]"
            }
          />
        </button>
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
          <Image
            src={product?.gallery[0]?.url}
            alt={"Name"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* Info */}
        <div className="px-3 pt-2 sm:p-4">
          <h3 className="text-sm sm:text-base text-center text-[#1A1A1A] mb-1.5 line-clamp-1 group-hover:text-[#7A1F1F] transition-colors">
            {product.name} - {product.gemstone.weight}{" "}
            {product.gemstone.weightUnit}
          </h3>

          <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
            {product.gemstone.weight} {product.gemstone.weightUnit}{" "}
            {product.gemstone.indianName}
          </span>
          <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
            Origin : {product.gemstone.origin}
          </span>
          <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
            SKU : {product.sku}
          </span>
          <p className="text-[#7A1F1F] font-bold text-center text-sm sm:text-base">
            ₹ {product.pricing.sellingPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
