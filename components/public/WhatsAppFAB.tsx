"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

export function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I need help with GaadiBazaar")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip label */}
      {hovered && (
        <div className="bg-[#0A1628] text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg animate-fade-in whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-[#0A1628] rotate-45" />
        </div>
      )}

      {/* FAB button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/50 hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-7 h-7" fill="white" strokeWidth={0} />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

        {/* Online dot */}
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
      </a>
    </div>
  );
}
