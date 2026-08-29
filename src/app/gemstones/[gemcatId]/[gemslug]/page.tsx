"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Share2,
  Package,
  PhoneCall,
} from "lucide-react";
import Gallery from "@/components/Products/Gallery/Gallery";
import { Tfn1 } from "@/lib/data";
import Loader from "@/components/Spinloader/Loader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { addToCartAsync } from "@/redux/slices/cartSlice";
import Login from "@/components/Account/Login";

const relatedProducts = [
  {
    id: 4,
    name: "Golden Solitaire Ring",
    price: 3800,
    image: "/images/ring.png",
    category: "Rings",
  },
  {
    id: 7,
    name: "Ruby Eternity Band",
    price: 6800,
    image: "/images/ring.png",
    category: "Rings",
  },
  {
    id: 10,
    name: "Manik (Ruby) Stone",
    price: 7500,
    image: "/images/gemstones/manik.png",
    category: "Gemstones",
  },
  {
    id: 6,
    name: "Sapphire Halo Pendant",
    price: 5400,
    image: "/images/hero.png",
    category: "Necklaces",
  },
];

/* ─── Tabs ─── */
const tabs = ["Details", "Shipping"];

/* ─── Main Page ─── */
export default function ProductDetailPage() {
  const params = useParams();
  console.log("params", params);
  const productId = params.gemslug as string;
  const productCatgory = params.gemcatId as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  console.log("product", product);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/products/${productId}`);

        const result = await response.json();
        console.log("result", result);
        if (!response.ok) {
          throw new Error(result.message || "Product not found");
        }

        setProduct(result.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCartAsync({ productId: product._id, quantity }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  /** Buy Now: add to cart then go to checkout (login guard) */
  const handleBuyNow = async () => {
    if (!product) return;
    // Always add/sync item to cart first
    await dispatch(addToCartAsync({ productId: product._id, quantity }));
    if (!isAuthenticated) {
      // Show login modal; after login navigate to checkout
      setShowLoginModal(true);
      return;
    }
    router.push("/checkout");
  };

  /** Called by Login modal after successful auth */
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Login Modal for Buy Now */}
      {showLoginModal && (
        <Login
          setAccountOpen={setShowLoginModal}
          onSuccess={handleLoginSuccess}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* ─── Breadcrumbs ─── */}
          <div className="border-b border-[#E5E7EB] bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 py-3 text-xs text-[#6B7280]">
                <Link href="/" className="hover:text-[#7A1F1F] transition">
                  Home
                </Link>
                <ChevronRight size={12} />
                <Link
                  href="/gemstones"
                  className="hover:text-[#7A1F1F] transition"
                >
                  Gemstones
                </Link>
                <ChevronRight size={12} />
                <Link
                  href={`/gemstones/${productCatgory}`}
                  className="hover:text-[#7A1F1F] transition"
                >
                  {productCatgory.charAt(0).toUpperCase() +
                    productCatgory.slice(1)}
                </Link>
                <ChevronRight size={12} />
                <span className="text-[#1A1A1A] font-medium">
                  {product.name}
                </span>
              </nav>
            </div>
          </div>
          {/* ─── Product Section ─── */}
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
              {/* ─── Image Gallery ─── */}
              <Gallery image={product?.gallery} />

              {/* ─── Product Info ─── */}
              <div className="lg:w-[45%]">
                {/* Name */}
                <h1 className="font-serif text-2xl sm:text-md lg:text-3xl text-[#1A1A1A] mb-3 leading-tight">
                  {product.name} ({product.gemstone.indianName}) -{" "}
                  {product.gemstone.weight} Carats
                </h1>

                {/* SKU */}
                <p className="mb-3 text-xs text-[#9CA3AF]">
                  SKU: {product.sku}
                </p>
                <p className="mb-3 text-xs text-[#9CA3AF]">
                  Origin: {product.gemstone.origin}
                </p>

                {/* Price */}
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-2xl font-bold text-[#7A1F1F]">
                    ₹{product.pricing.salePrice.toLocaleString("en-IN")}
                  </span>
                  {product.pricing.sellingPrice > product.pricing.salePrice && (
                    <>
                      <span className="text-lg text-[#9CA3AF] line-through">
                        ₹{product.pricing.sellingPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        {product.pricing.discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-[#6B7280] my-3">
                  Inclusive of all taxes.
                </p>

                {/* Short Description */}
                <p className="text-[#6B7280] leading-relaxed text-sm mb-6">
                  {product.name} ({product.gemstone.indianName}) weighing{" "}
                  {product.gemstone.weight} Carats (8.25 Ratti) of{" "}
                  {product.gemstone.origin} Origin, Unheated & Untreated
                  Gemstone certified by Govt. IIGJ
                </p>

                {/* Divider */}
                <div className="h-px bg-[#E5E7EB] mb-6" />

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-[#E5E7EB] overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-10 w-10 items-center justify-center text-[#6B7280] transition hover:bg-[#FAF0F0] hover:text-[#7A1F1F] cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="flex h-10 w-10 items-center justify-center border-x border-[#E5E7EB] text-sm font-semibold text-[#1A1A1A]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="flex h-10 w-10 items-center justify-center text-[#6B7280] transition hover:bg-[#FAF0F0] hover:text-[#7A1F1F] cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`flex h-[40px] w-[40px] items-center justify-center rounded-lg border-1 transition-all duration-200 cursor-pointer ${
                          isWishlisted
                            ? "border-[#7A1F1F] bg-[#FAF0F0] text-[#7A1F1F]"
                            : "border-[#E5E7EB] text-[#6B7280] hover:border-[#7A1F1F] hover:text-[#7A1F1F]"
                        }`}
                      >
                        <Heart
                          size={20}
                          className={isWishlisted ? "fill-[#7A1F1F]" : ""}
                        />
                      </button>
                      <button className="flex h-[40px] w-[40px] items-center justify-center rounded-lg border-1 border-[#E5E7EB] text-[#6B7280] transition-all hover:border-[#7A1F1F] hover:text-[#7A1F1F] cursor-pointer">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="mb-6 flex w-full gap-3">
                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      addedToCart
                        ? "bg-green-600 text-white"
                        : "bg-[#7A1F1F] text-white hover:bg-[#5A1717]"
                    }`}
                  >
                    {addedToCart ? "Added to Cart" : "Add to Cart"}
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    className="flex flex-1 items-center cursor-pointer justify-center rounded-lg border-2 border-[#C9A227] bg-[#C9A227] py-3.5 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] transition-all hover:border-[#B8860B] hover:bg-[#B8860B] hover:text-white"
                  >
                    Buy Now
                  </button>
                </div>
                <div className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                  <p className="text-sm">
                    Customize your Gemstone in Bracelet, Pendant, or Ring of
                    your choice. For assistance, please contact
                  </p>
                  <Link
                    href={`tel:${Tfn1}`}
                    className="flex flex-1 items-center justify-center rounded-lg py-2.5 text-sm tracking-wider text-[#7A1F1F] transition-all"
                  >
                    <div className="flex items-center justify-center rounded-full bg-white/20 ">
                      <PhoneCall size={15} className="mr-2" /> {Tfn1}
                    </div>{" "}
                  </Link>
                </div>
              </div>
            </div>
            {/* Trust Badges */}

            <div className="grid grid-cols-2 gap-3 mt-10">
              {[
                {
                  icon: Truck,
                  title: "Free Shipping",
                  desc: "Orders above ₹2,000",
                },
                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                  desc: "10 - 7 day return policy",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Payment",
                  desc: "100% encrypted",
                },
                {
                  icon: Award,
                  title: "Certified",
                  desc: "Lab authenticated",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg border border-[#E5E7EB] bg-white p-3"
                  >
                    <Icon size={18} className="text-[#7A1F1F] flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Tabs Section ─── */}
          <div className="border-t border-[#E5E7EB] bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Tab Headers */}
              <div className="flex gap-0 border-b border-[#E5E7EB]">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "text-[#7A1F1F]"
                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7A1F1F]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="py-10">
                {activeTab === "Details" && (
                  <div>
                    <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
                      About This Product
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-7 mb-6">
                      A breathtaking exhibition of deep ocean blues, the
                      Sapphire Radiance Ring features a meticulously cut
                      2.5-carat Ceylon sapphire, surrounded by a delicate halo
                      of conflict-free brilliant diamonds. Set in 18k white
                      gold, this piece is a testament to timeless elegance and
                      superior craftsmanship.
                    </p>
                    <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
                      Specifications
                    </h3>
                    <div className="w-full overflow-hidden rounded-xl border border-[#BDBDBD]">
                      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
                        {/* Row 1 */}
                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Gemstone
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            {product.name} ({product.indianName})
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Certification
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            op
                          </span>
                        </div>
                        {/* Row 6 */}
                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-[#FFFDF8] px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Origin
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            ko
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-[#FFFDF8] px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Shape
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            oiu
                          </span>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-white px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Colour
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            {product.gemstone.color}
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-white px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Specific Gravity
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            89
                          </span>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2  bg-[#FFFDF8] px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Weight (ratti)
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            7
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-[#FFFDF8] px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Treatment
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            jk
                          </span>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-white px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Return Policy
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            0
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2 bg-white px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Exact Dimensions
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            90
                          </span>
                        </div>

                        {/* Row 5 */}
                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2  bg-[#FFFDF8] px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Refractive Index
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            90
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(100px,1fr)_20px_minmax(120px,1.5fr)] items-start gap-2  bg-[#FFFDF8] px-5 py-3.5 text-sm">
                          <span className="font-semibold text-[#171717]">
                            Cut
                          </span>
                          <span className="text-center text-[#171717]">:</span>
                          <span className="min-w-0 break-words text-[#333333]">
                            ooi
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Shipping" && (
                  <div className="max-w-2xl space-y-6">
                    {[
                      {
                        icon: Truck,
                        title: "Free Standard Shipping",
                        desc: "Complimentary insured shipping on all orders above ₹2,000. Standard delivery takes 5-7 business days. Express delivery (2-3 days) available at ₹299.",
                      },
                      {
                        icon: Package,
                        title: "Premium Packaging",
                        desc: "Every order arrives in our signature luxury packaging — a velvet-lined box with a certificate of authenticity and care card.",
                      },
                      {
                        icon: RotateCcw,
                        title: "Returns & Exchanges",
                        desc: "We offer a 7-day return/exchange policy for eligible products. Customized, energized, or made-to-order items may not qualify for returns unless damaged.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Insured Delivery",
                        desc: "All shipments are fully insured against loss or damage during transit. Track your order in real-time via SMS and email updates.",
                      },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-[#FFFDF8] p-5"
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FAF0F0]">
                            <Icon size={18} className="text-[#7A1F1F]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#1A1A1A] mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-[#6B7280] leading-6">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Related Products ─── */}
          <div className="bg-[#FFFDF8] py-12 border-t border-[#E5E7EB]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <span className="text-[#7A1F1F] uppercase tracking-[3px] text-xs font-semibold block mb-2">
                  You May Also Like
                </span>
                <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">
                  Related Products
                </h2>
                <div className="w-16 h-0.5 bg-[#C9A227] mx-auto mt-3 rounded-full" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/collections/${item.id}`}
                    className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#C9A227]/40"
                  >
                    <div className="aspect-square relative overflow-hidden bg-neutral-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3 sm:p-4 text-center">
                      <span className="text-[#6B7280] uppercase tracking-widest text-[10px] font-semibold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-serif text-[#1A1A1A] mb-1 line-clamp-1 group-hover:text-[#7A1F1F] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[#7A1F1F] font-bold text-sm">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
