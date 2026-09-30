"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Dot,
} from "lucide-react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import { useModalClose } from "@/src/hooks/useModalClose";

type Props = {
  onClose: () => void;
};

const IMAGES = [
  "/images/Rectangle.png",
  "/images/invitationstay.jpg",
  "/images/Rectangle.png",
  "/images/invitationstay.jpg",
  "/images/Rectangle.png",
  "/images/invitationstay.jpg",
  "/images/Rectangle.png",
  "/images/invitationstay.jpg",
  "/images/Rectangle.png",
  "/images/invitationstay.jpg",
  "/images/Rectangle.png",
  "/images/invitationstay.jpg",
];

const VISIBLE_THUMBS = 4;
const THUMB_GAP = "8px";
// Width of one thumbnail so VISIBLE_THUMBS fit exactly, edge to edge
const THUMB_WIDTH = `calc((100% - ${VISIBLE_THUMBS - 1} * ${THUMB_GAP}) / ${VISIBLE_THUMBS})`;

const SECTIONS = [
  {
    title: "KEY FEATURES",
    items: [
      "45 sqm on average",
      "Walk-out balcony",
      "Bespoke Armoire & cocktail bar",
    ],
  },
  {
    title: "ROOM FEATURES",
    items: [],
  },
  {
    title: "BATH AMENITIES",
    items: [],
  },
  {
    title: "EXCLUSIVE PRIVILEGES",
    items: [],
  },
];

export default function RoomDetailsModal({ onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [openSection, setOpenSection] = useState("KEY FEATURES");
  const { closing, triggerClose: handleClose } = useModalClose({ onClose });
  const [thumbStart, setThumbStart] = useState(0);
  const maxThumbStart = Math.max(0, IMAGES.length - VISIBLE_THUMBS);

  // Keep the active image inside the visible thumbnail window
  useEffect(() => {
    setThumbStart((start) => {
      if (activeImg < start) return activeImg;
      if (activeImg >= start + VISIBLE_THUMBS) return activeImg - VISIBLE_THUMBS + 1;
      return start;
    });
  }, [activeImg]);

  const prevThumbs = () => setThumbStart((s) => Math.max(0, s - 1));
  const nextThumbs = () => setThumbStart((s) => Math.min(maxThumbStart, s + 1));

  const toggleSection = (title: string) => {
    setOpenSection((s) => (s === title ? "" : title));
  };

  return (
    <div
      className={`fixed inset-0 z-9999 bg-black/60 flex items-center justify-center p-2 md:p-4 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
      onClick={handleClose}
    >
      <Section className="px-6 sm:px-0">
        <div
          className="
        bg-white
        w-full
        h-[95vh]
        lg:h-[85vh]
        flex
        flex-col
        shadow-2xl
        overflow-y-auto
        lg:overflow-hidden
    "
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOP HEADER */}
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b bg-white shrink-0">
            <h2 className={`${typography.textXl} font-arizona-sans-regular tracking-widest text-dark-gray uppercase `}
            >
              Room Details
            </h2>

            <button
              onClick={handleClose}
              className="text-xl text-dark-gray hover:text-black cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row flex-1 lg:min-h-0">
            {/* LEFT IMAGE SECTION */}
            <div className="w-full lg:w-[68%] flex flex-col shrink-0 lg:min-h-0">
              {/* Main Image */}
              <div className="relative h-70 sm:h-100 lg:h-auto lg:flex-1 lg:min-h-0 overflow-hidden">
                {IMAGES.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="room"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeImg === index ? "opacity-100" : "opacity-0"
                      }`}
                  />
                ))}

              </div>

              {/* Thumbnails */}
              <div className="relative h-20 md:h-24 lg:h-32 mt-2 shrink-0">
                {thumbStart > 0 && (
                  <button
                    onClick={prevThumbs}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/90 text-primary shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                <div className="w-full h-full overflow-hidden">
                  <div
                    className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                    style={{
                      gap: THUMB_GAP,
                      transform: `translateX(calc(-${thumbStart} * (${THUMB_WIDTH} + ${THUMB_GAP})))`,
                    }}
                  >
                    {IMAGES.map((src, index) => (
                      <div
                        key={index}
                        className="h-full shrink-0"
                        style={{ width: THUMB_WIDTH }}
                      >
                        <button
                          onClick={() => setActiveImg(index)}
                          className={`w-full h-full overflow-hidden transition-all duration-300 cursor-pointer ${activeImg === index
                            ? "opacity-50"
                            : "opacity-100"
                            }`}
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {thumbStart < maxThumbStart && (
                  <button
                    onClick={nextThumbs}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/90 text-primary shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT DETAILS SECTION */}
            <div className="w-full lg:w-[32%] bg-primary/4 lg:border-l border-gray-200 lg:overflow-y-auto">
              <div className="px-5">
                {SECTIONS.map((section) => {
                  const isOpen = openSection === section.title;

                  return (
                    <div
                      key={section.title}
                      className="border-b border-gray-200 font-arizona- text-xs lg:text-sm tracking-wider"
                    >
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                      >
                        <span className=" font-semibold uppercase tracking-[0.15em]">
                          {section.title}
                        </span>

                        {isOpen ? (
                          <ChevronUp size={16} className="text-dark-gray" />
                        ) : (
                          <ChevronDown size={16} className="text-dark-gray" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="pb-5">
                          {section.items.length > 0 ? (
                            <ul className="space-y-1">
                              {section.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-2  text-dark-gray"
                                >
                                  <span><Dot /></span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className=" text-dark-gray">
                              No details available.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
