"use client";

import { useEffect, useRef } from "react";
import { BookingStatus } from "@/src/lib/dummyBookings";

const TABS: { label: string; value: BookingStatus }[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Completed", value: "completed" },
];

interface BookingsTabBarProps {
  activeTab: BookingStatus;
  onChange: (tab: BookingStatus) => void;
  counts: Record<BookingStatus, number>;
}

export default function BookingsTabBar({ activeTab, onChange, counts }: BookingsTabBarProps) {
  const navRef = useRef<HTMLElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const activeBtn = activeButtonRef.current;
    if (!nav || !activeBtn) return;
    const navCenter = nav.offsetWidth / 2;
    const btnCenter = activeBtn.offsetLeft + activeBtn.offsetWidth / 2;
    nav.scrollTo({ left: btnCenter - navCenter, behavior: "smooth" });
  }, [activeTab]);

  return (
    <nav ref={navRef} className="flex overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4 border-b border-gray mb-8 whitespace-nowrap">
      {TABS.map(({ label, value }) => {
        const isActive = value === activeTab;
        return (
          <button
            key={value}
            ref={isActive ? activeButtonRef : undefined}
            type="button"
            onClick={() => onChange(value)}
            aria-current={isActive ? "page" : undefined}
            className={`flex-none md:flex-1 min-w-30 text-center pb-3 px-4 uppercase tracking-[.08em] text-sm text-wrap -mb-px transition-colors font-arizona-light ${
              isActive
                ? "text-primary border-b-4 font-bold border-primary"
                : "text-dark-gray border-b-4 border-black/14 hover:opacity-90 cursor-pointer"
            }`}
          >
            {label}
            {isActive && (
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-primary text-white">
                {counts[value]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
