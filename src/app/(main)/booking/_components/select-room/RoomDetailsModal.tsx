"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Dot,
} from "lucide-react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

type Props = {
  onClose: () => void;
};

const IMAGES = [
  "/images/Rectangle.png",
  "/images/Rectangle.png",
  "/images/Rectangle.png",
];

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

  const prev = () => {
    setActiveImg((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  };

  const next = () => {
    setActiveImg((i) => (i + 1) % IMAGES.length);
  };

  const toggleSection = (title: string) => {
    setOpenSection((s) => (s === title ? "" : title));
  };

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/60 flex items-center justify-center p-2 md:p-4"
      onClick={onClose}
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
              onClick={onClose}
              className="text-xl text-dark-gray hover:text-black cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row flex-1">
            {/* LEFT IMAGE SECTION */}
            <div className="w-full lg:w-[68%] flex flex-col shrink-0">
              {/* Main Image */}
              <div className="relative h-70 sm:h-100 lg:flex-1 overflow-hidden">
                <img
                  src={IMAGES[activeImg]}
                  alt="room"
                  className="w-full h-full object-cover"
                />



                {/* Navigation */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={next}
                    className="w-10 h-10 bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="h-20 md:h-24 lg:h-32 flex gap-2 mt-2 px-2 shrink-0">
                {IMAGES.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImg(index)}
                    className={`overflow-hidden transition-all duration-300 cursor-pointer ${activeImg === index
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
                ))}
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
