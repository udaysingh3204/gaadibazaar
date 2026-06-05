"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarGalleryProps {
  images: string[];
  carTitle: string;
}

export function CarGallery({ images: initialImages, carTitle }: CarGalleryProps) {
  const images = Array.isArray(initialImages) && initialImages.length > 0 ? initialImages : ["/images/placeholders/car.svg"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") setZoomOpen(false);
    },
    [goToPrevious, goToNext]
  );

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Large Image */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in">
          <Image
            src={images[selectedIndex]}
            alt={`${carTitle} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover"
            priority
            onClick={() => setZoomOpen(true)}
          />

          {/* Zoom Button */}
          <button
            onClick={() => setZoomOpen(true)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-lg transition-all shadow-lg"
            title="Click to zoom"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  selectedIndex === idx
                    ? "border-[#FF6B2B] ring-2 ring-[#FF6B2B] ring-offset-2"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl max-h-screen p-0 bg-black border-none">
          <div className="relative w-full h-[80vh] bg-black flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
              aria-label="Close zoom"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Zoomed Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedIndex]}
                alt={`${carTitle} zoomed - Image ${selectedIndex + 1}`}
                fill
                className={cn(
                  "object-contain transition-all",
                  isZoomed ? "scale-150" : "scale-100"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter in Modal */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {selectedIndex + 1} / {images.length}
                </div>
              </>
            )}

            {/* Help Text */}
            <div className="absolute bottom-4 left-4 z-40 text-white/60 text-xs">
              {isZoomed ? "Click to zoom out" : "Click to zoom in"} • Arrow keys to navigate
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Keyboard Navigation */}
      {typeof window !== "undefined" && (
        <div>
          {(() => {
            if (zoomOpen) {
              window.addEventListener("keydown", handleKeyDown);
            }
            return null;
          })()}
        </div>
      )}
    </>
  );
}
