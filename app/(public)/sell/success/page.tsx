"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, MessageCircle, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function SuccessContent() {
  const params = useSearchParams();
  const carId = params.get("id");

  const shareUrl = carId ? `${typeof window !== "undefined" ? window.location.origin : ""}/cars/${carId}` : "";

  const handleShare = async () => {
    if (shareUrl && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Listing link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Success card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <h1
            className="text-3xl font-extrabold text-[#0A1628] mb-3"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Listing Submitted!
          </h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            Your car listing is under review. Our team will approve it and make it live within{" "}
            <strong className="text-[#0A1628]">2 hours</strong>. You'll receive a WhatsApp notification once it's live.
          </p>

          {/* Timeline */}
          <div className="bg-[#F8F7F4] rounded-2xl p-5 mb-8 text-left space-y-4">
            {[
              { icon: CheckCircle2, color: "text-emerald-500", label: "Listing submitted", sub: "Just now", done: true },
              { icon: Clock, color: "text-[#FF6B2B]", label: "Team reviews your listing", sub: "Within 2 hours", done: false },
              { icon: MessageCircle, color: "text-blue-500", label: "Buyers start contacting you", sub: "On WhatsApp", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-emerald-100" : "bg-white border border-gray-200"}`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${item.done ? "text-[#0A1628]" : "text-gray-500"}`}>{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm font-semibold text-amber-800 mb-2">💡 While you wait:</p>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Share the listing with friends & family once it's live</li>
              <li>• Make sure your WhatsApp notifications are on</li>
              <li>• Respond to buyers quickly to close faster</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {carId && (
              <Button onClick={handleShare} variant="outline" className="w-full h-12 rounded-xl gap-2">
                <Share2 className="w-4 h-4" />
                Copy Listing Link (share later)
              </Button>
            )}
            <Button asChild className="w-full h-12 rounded-xl gap-2">
              <Link href="/cars">
                Browse Similar Cars <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full h-12">
              <Link href="/sell/list">List Another Car</Link>
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Questions?{" "}
          <a
            href="https://wa.me/919999999999?text=Hi, I listed my car on GaadiBazaar and have a question"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6B2B] underline underline-offset-2"
          >
            WhatsApp our support team
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SellSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
