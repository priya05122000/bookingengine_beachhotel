'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = { onClose: () => void };

const IMAGES = [
    '/images/Rectangle.png',
    '/images/Rectangle.png',
    '/images/Rectangle.png',
];

const SECTIONS = [
    {
        title: 'KEY FEATURES',
        items: ['45 sqm on average', 'Walk-out balcony', 'Bespoke Armoire & cocktail bar'],
    },
    { title: 'ROOM FEATURES', items: [] },
    { title: 'BATH AMENITIES', items: [] },
    { title: 'EXCLUSIVE PRIVILEGES', items: [] },
];

export default function RoomDetailsModal({ onClose }: Props) {
    const [activeImg, setActiveImg] = useState(0);
    const [openSection, setOpenSection] = useState<string>('KEY FEATURES');

    function prev() {
        setActiveImg((i) => (i - 1 + IMAGES.length) % IMAGES.length);
    }
    function next() {
        setActiveImg((i) => (i + 1) % IMAGES.length);
    }

    function toggleSection(title: string) {
        setOpenSection((s) => (s === title ? '' : title));
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="flex w-[80vw] h-[80vh] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left: image gallery — 68% */}
                <div className="flex flex-col w-[68%] h-full">
                    {/* Main image area */}
                    <div className="relative flex-1 overflow-hidden">
                        <img
                            src={IMAGES[activeImg]}
                            alt="room"
                            className="w-full h-full object-cover"
                        />

                        {/* Caption card — bottom-center of image */}
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-3 w-55">
                            <p className="text-[11px] font-bold text-primary uppercase tracking-wide">BED ROOM</p>
                            <p className="text-[10px] text-gray-600 mt-1 leading-snug">
                                Dreaming of a luxury bedroom? Find 50+ bedroom interior design ideas and makeover tips to turn your space into an elegant, dreamy sanctuary.
                            </p>
                        </div>

                        {/* Navigation arrows — bottom right of image */}
                        <div className="absolute bottom-3 right-3 flex gap-1">
                            <button
                                onClick={prev}
                                className="w-9 h-9 bg-primary flex items-center justify-center text-white hover:bg-primary/90"
                            >
                                <ChevronLeft size={18} strokeWidth={2} />
                            </button>
                            <button
                                onClick={next}
                                className="w-9 h-9 bg-primary flex items-center justify-center text-white hover:bg-primary/90"
                            >
                                <ChevronRight size={18} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    {/* Thumbnails strip */}
                    <div className="flex h-32.5 shrink-0">
                        {IMAGES.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className="flex-1 overflow-hidden relative"
                            >
                                <img src={src} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: accordion panel — 32% */}
                <div className="flex flex-col w-[32%] h-full bg-white overflow-y-auto">
                    {/* Close button */}
                    <div className="flex justify-end px-4 pt-4 pb-2">
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="text-gray-500 hover:text-gray-800 text-base leading-none"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Accordion sections */}
                    <div className="flex flex-col px-6">
                        {SECTIONS.map((section) => {
                            const isOpen = openSection === section.title;
                            return (
                                <div key={section.title} className="border-b border-gray-200">
                                    <button
                                        className="w-full flex items-center justify-between py-4 text-left"
                                        onClick={() => toggleSection(section.title)}
                                    >
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-800">
                                            {section.title}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp size={16} className="text-gray-500 shrink-0" />
                                        ) : (
                                            <ChevronDown size={16} className="text-gray-500 shrink-0" />
                                        )}
                                    </button>

                                    {isOpen && section.items.length > 0 && (
                                        <ul className="pb-4 space-y-2">
                                            {section.items.map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-[12px] text-gray-700 leading-snug">
                                                    <span className="text-gray-500 shrink-0">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
