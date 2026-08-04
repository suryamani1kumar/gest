import Image from "next/image";
const gemstones = [
  {
    id: 1,
    name: "Ruby",
    indianName: "Manik",
    color: "Red",
    category: "Precious",
    image: "/images/gemstones/ruby.png",
  },
  {
    id: 2,
    name: "Pearl",
    indianName: "Moti",
    color: "White",
    category: "Organic",
    image: "/images/gemstones/moti.png",
  },
  {
    id: 3,
    name: "Red Coral",
    indianName: "Moonga",
    color: "Red",
    category: "Organic",
    image: "/images/gemstones/moonga.png",
  },
  {
    id: 4,
    name: "Emerald",
    indianName: "Panna",
    color: "Green",
    category: "Precious",
    image: "/images/gemstones/panna.png",
  },
  {
    id: 5,
    name: "Yellow Sapphire",
    indianName: "Pukhraj",
    color: "Yellow",
    category: "Precious",
    image: "/images/gemstones/pukhraj.png",
  },
  {
    id: 6,
    name: "Diamond",
    indianName: "Heera",
    color: "Colorless",
    category: "Precious",
    image: "/images/gemstones/diamond.png",
  },
  {
    id: 7,
    name: "Blue Sapphire",
    indianName: "Neelam",
    color: "Blue",
    category: "Precious",
    image: "/images/gemstones/neelam.png",
  },
  {
    id: 8,
    name: "Hessonite Garnet",
    indianName: "Gomed",
    color: "Honey Brown",
    category: "Semi-Precious",
    image: "/images/gemstones/gomed.png",
  },
  {
    id: 9,
    name: "Cat's Eye",
    indianName: "Lehsunia",
    color: "Greenish Yellow",
    category: "Semi-Precious",
    image: "/images/gemstones/lehsunia.png",
  },
  {
    id: 10,
    name: "Opal",
    indianName: "Opal",
    color: "White",
    category: "Semi-Precious",
    image: "/images/gemstones/opal.png",
  },
  {
    id: 11,
    name: "Zircon",
    indianName: "Jarkan",
    color: "White",
    category: "Semi-Precious",
    image: "/images/gemstones/jarkan.png",
  },
  {
    id: 12,
    name: "Turquoise",
    indianName: "Firoza",
    color: "Sky Blue",
    category: "Semi-Precious",
    image: "/images/gemstones/firoza.png",
  },
  {
    id: 13,
    name: "Amethyst",
    indianName: "Jamunia",
    color: "Purple",
    category: "Semi-Precious",
    image: "/images/gemstones/jamunia.png",
  },
  {
    id: 14,
    name: "Garnet",
    indianName: "Tamra Mani",
    color: "Deep Red",
    category: "Semi-Precious",
    image: "/images/gemstones/tamra-mani.png",
  },
  {
    id: 15,
    name: "Citrine",
    indianName: "Sunela",
    color: "Golden Yellow",
    category: "Semi-Precious",
    image: "/images/gemstones/sunela.png",
  },
  {
    id: 16,
    name: "Peridot",
    indianName: "Peridot",
    color: "Olive Green",
    category: "Semi-Precious",
    image: "/images/gemstones/peridot.png",
  },
  {
    id: 17,
    name: "Aquamarine",
    indianName: "Aquamarine",
    color: "Light Blue",
    category: "Semi-Precious",
    image: "/images/gemstones/aquamarine.png",
  },
  {
    id: 18,
    name: "Tourmaline",
    indianName: "Tourmaline",
    color: "Multi-color",
    category: "Semi-Precious",
    image: "/images/gemstones/tourmaline.png",
  },
  {
    id: 19,
    name: "Tanzanite",
    indianName: "Tanzanite",
    color: "Violet Blue",
    category: "Rare",
    image: "/images/gemstones/tanzanite.png",
  },
  {
    id: 20,
    name: "Morganite",
    indianName: "Morganite",
    color: "Soft Pink",
    category: "Rare",
    image: "/images/gemstones/morganite.png",
  },
];

const Gemstones = () => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-[4px] uppercase">
            Explore Collection
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-gray-900">
            Popular Gemstones
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-gray-500 text-lg">
            Discover the world's most beautiful natural gemstones, carefully
            selected for luxury jewellery and timeless elegance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {gemstones.map((gem) => (
            <div
              key={gem.id}
              className="group p-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-28 flex items-center justify-center">
                <Image
                  src={gem.image}
                  alt={gem.name}
                  width={100}
                  height={60}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              
                <h2 className="text-1xl font-bold text-center text-gray-900">{gem.name}</h2>

                <p className="text-amber-600 text-center font-medium mt-1">
                  {gem.indianName}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gemstones;
