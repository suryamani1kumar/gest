import { Tfn1 } from "@/lib/data";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { PiPhoneCallLight } from "react-icons/pi";

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = `I'm interested and I have a few questions
${window.location.href}`;

    const url = `https://wa.me/${Tfn1.replaceAll(" ", "").replaceAll("+91", "")}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Link
        href={`tel:${Tfn1}`}
        className="fixed bottom-[100px] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-white shadow-lg transition hover:scale-110 hover:bg-[#B8921F]"
      >
        <PiPhoneCallLight size={30} />
      </Link>
      
      <button
        onClick={handleWhatsApp}
        aria-label="Chat on WhatsApp"
        className="fixed cursor-pointer bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110 hover:bg-green-600"
      >
        <span className="absolute inset-0 rounded-full border-1 bg-green-500 animate-ping opacity-50" />

        <FaWhatsapp size={30} />
      </button>
    </>
  );
}
