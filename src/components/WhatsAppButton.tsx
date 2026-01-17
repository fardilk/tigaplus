import { MessageCircle } from "lucide-react";
import { WHATSAPP_PHONE } from "@/context/OrderContext";

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent("Halo TigaPlus! Saya ingin bertanya tentang jasa pembuatan website.");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-card text-card-foreground text-sm rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat via WhatsApp
      </span>
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
    </button>
  );
}
