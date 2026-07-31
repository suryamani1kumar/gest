import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import Craftsmanship from "@/components/Craftsmanship";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCollection />
      <Craftsmanship />
    </div>
  );
}
