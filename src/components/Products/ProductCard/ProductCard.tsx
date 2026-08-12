import { addToCart, setCart } from "@/redux/slices/cartSlice";
import {
  addToWishList,
  removeFromWishList,
} from "@/redux/slices/wishlistSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

interface CartItem {
  productId: string;
  quantity: number;
}

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const toggleWishlist = (id: string) => {
    const isWishlisted = wishlistItems.some((item) => item.productId === id);

    let updatedWishlist;

    if (isWishlisted) {
      dispatch(removeFromWishList(id));

      updatedWishlist = wishlistItems.filter((item) => item.productId !== id);
    } else {
      dispatch(
        addToWishList({
          productId: id,
        }),
      );

      updatedWishlist = [
        ...wishlistItems,
        {
          productId: id,
        },
      ];
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (productId: string) => {
    console.log("productId", productId);
    dispatch(
      addToCart({
        productId,
        quantity: 1,
      }),
    );
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);

      wishlist.forEach((item: { productId: string }) => {
        dispatch(addToWishList(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
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
      <Link href={`/collections/gemstones/${product.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
          <Image
            src={product?.gallery[0]?.url}
            alt={"Name"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      {/* Info */}
      <div className="px-3 pt-2 sm:p-4">
        <Link href={`/collections/gemstones/${product.slug}`}>
          <h3 className="text-sm sm:text-base text-center text-[#1A1A1A] mb-1.5 line-clamp-1 group-hover:text-[#7A1F1F] transition-colors">
            {product.name} - {product.specifications.weight.value}{" "}
            {product.specifications.weight.unit}
          </h3>
        </Link>
        <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
          {product.specifications.weight.value}{" "}
          {product.specifications.weight.unit} {product.indianName}
        </span>
        <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
          Origin : {product.specifications.origin}
        </span>
        <span className="text-[#6B7280] tracking-widest text-[13px] text-center block mb-1">
          SKU : {product.sku}
        </span>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-[#7A1F1F] font-bold text-sm sm:text-base">
            ₹ {product.pricing.sellingPrice.toLocaleString("en-IN")}
          </p>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="hidden sm:flex items-center gap-1 rounded-lg bg-[#FFFDF8] border border-[#E5E7EB] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] transition-all hover:bg-[#7A1F1F] hover:text-white hover:border-[#7A1F1F] cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
