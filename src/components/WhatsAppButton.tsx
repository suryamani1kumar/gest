import { Tfn1 } from "@/lib/data";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = `I'm interested and I have a few questions
${window.location.href}`;

    const url = `https://wa.me/${Tfn1.replaceAll(" ", "").replaceAll("+91", "")}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsApp}
      aria-label="Chat on WhatsApp"
      className=" fixed right-6 z-50 bottom-[88px] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110 hover:bg-green-600 md:bottom-6"
    >
      <FaWhatsapp size={30} />
    </button>
  );
}
