"use client";

import { Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

interface FeaturedUpgradePromptProps {
  carId: string;
  isFeatured?: boolean;
  askingPrice?: number;
}

export function FeaturedUpgradePrompt({ carId, isFeatured = false, askingPrice = 500000 }: FeaturedUpgradePromptProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isFeatured) return null;

  const featurePrice = 500; // ₹500 for 30 days

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 border border-orange-300 text-orange-700 rounded-lg text-xs font-semibold transition-all"
        title="Make this listing featured"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Featured
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Featured Listing
            </DialogTitle>
            <DialogDescription>
              Get more visibility and higher conversion rates
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Benefits */}
            <div className="space-y-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-gray-900 text-sm">Why go Featured?</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">✨</span>
                  <span>Featured on homepage for 30 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">🔝</span>
                  <span>Appears at top of search results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">⚡</span>
                  <span>Average 3x more inquiries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">⏰</span>
                  <span>Sell your car 30% faster</span>
                </li>
              </ul>
            </div>

            {/* Pricing */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-600">Regular feature</p>
                  <p className="text-2xl font-bold text-gray-900">₹{featurePrice}</p>
                </div>
                <p className="text-xs text-gray-500">30 days</p>
              </div>
              <p className="text-xs text-gray-600">One-time payment • No auto-renewal</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">300%</p>
                <p className="text-xs text-gray-600">More Views</p>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <p className="text-lg font-bold text-gray-900">3.2x</p>
                <p className="text-xs text-gray-600">Higher CTR</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">30%</p>
                <p className="text-xs text-gray-600">Faster Sale</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setDialogOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button
                onClick={() => {
                  // TODO: Redirect to payment page or show payment modal
                  window.location.href = `/cars/${carId}#upgrade-to-featured`;
                }}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Get Featured
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>No hidden fees. Cancel anytime. Money-back guarantee if no inquiries within 7 days.</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
