import React, { useState } from "react";
import { PhotoSVG } from "../icons";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  images: string[];
};

export default function GalleryModal({
  open,
  setOpen,
  images,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // swipe tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const closeLightbox = () => setActiveIndex(null);

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : (prev as number) - 1
    );
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : (prev as number) + 1
    );
  };

  // swipe logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    const isSwipe = Math.abs(distance) > 50; // threshold

    if (!isSwipe) return;

    if (distance > 0) {
      // swipe left → next
      showNext();
    } else {
      // swipe right → prev
      showPrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[70vw] max-w-none h-[80vh] z-[1000] p-0 overflow-hidden">
        <div className="relative rounded-xl shadow-2xl w-full h-full mx-auto bg-white flex flex-col">

          {/* Header */}
          <div className="sticky top-0 z-50 bg-white flex items-center justify-center pt-4 pb-2">
            <div className="w-[95%] h-[50px] border p-1 rounded-[7px] flex justify-evenly items-center">
              <div className="w-full h-[100%] rounded-[7px] flex items-center justify-center gap-1 bg-[#e5f0ff] cursor-pointer">
                <PhotoSVG />
                <span className="text-[14px] text-blue-500">Photos</span>
                <span className="text-[14px] text-blue-500">
                  ({images?.length})
                </span>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="property"
                  className="w-full h-[220px] object-fill rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* LIGHTBOX */}
          {activeIndex !== null && (
            <div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-[2000]"
              onClick={closeLightbox}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close */}
              <button
                className="absolute top-5 right-5 text-white text-2xl"
                onClick={closeLightbox}
              >
                ✕
              </button>

              {/* Prev */}
              <button
                className="absolute left-5 text-white text-4xl px-3"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
              >
                ‹
              </button>

              {/* Image */}
              <img
                src={images[activeIndex]}
                alt="preview"
                className="max-h-[90vh] max-w-[90vw] object-fit rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next */}
              <button
                className="absolute right-5 text-white text-4xl px-3"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}