"use client";

import { useState } from "react";

interface BookingsFilterProps {
  roomType: string;
  month: string;
  year: string;
  years: string[];
  onRoomTypeChange: (v: string) => void;
  onMonthChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onClear: () => void;
}

const ROOM_TYPES = ["All Rooms", "Economy Room", "Deluxe Room", "Premier Room", "Bay Suite"];
const MONTHS = [
  "All Months",
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const selectClass =
  "appearance-none border border-primary text-primary text-xs pl-3 pr-7 h-9 rounded-xs font-arizona-sans-regular bg-white cursor-pointer focus:outline-none  w-36";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center">
      {children}
      <span className="pointer-events-none absolute right-2 mr-1 text-primary">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

function MobileSelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-primary/15 py-3 last:border-b-0">
      <span className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
        {label}
      </span>
      <div className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border border-primary text-primary text-xs pl-3 pr-7 h-8 rounded-xs font-arizona-sans-regular bg-white cursor-pointer focus:outline-none  w-36"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 text-primary">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function BookingsFilter({
  roomType,
  month,
  year,
  years,
  onRoomTypeChange,
  onMonthChange,
  onYearChange,
  onClear,
}: BookingsFilterProps) {
  const hasFilter = roomType !== "All Rooms" || month !== "All Months" || year !== "All Years";
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = [
    roomType !== "All Rooms",
    month !== "All Months",
    year !== "All Years",
  ].filter(Boolean).length;

  return (
    <div className="mb-6">
      {/* ── Desktop layout (sm+) ── */}
      <div className="hidden sm:flex flex-wrap items-center gap-3">
        <span className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
          Filter by:
        </span>

        <SelectWrapper>
          <select
            value={roomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            className={selectClass}
            aria-label="Filter by room type"
          >
            {ROOM_TYPES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <select
            value={month}
            onChange={(e) => onMonthChange(e.target.value)}
            className={selectClass}
            aria-label="Filter by month"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className={selectClass}
            aria-label="Filter by year"
          >
            {["All Years", ...years].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </SelectWrapper>

        {hasFilter && (
          <button
            onClick={onClear}
            className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray underline underline-offset-2 cursor-pointer hover:text-primary transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* ── Mobile layout (< sm) ── */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 border border-primary px-4 h-9 rounded-xs text-primary cursor-pointer w-full justify-between"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H13M3 6H11M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-arizona-sans-regular uppercase tracking-widest">
              Filters
            </span>
            {activeCount > 0 && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[10px] font-arizona-sans-regular leading-none">
                {activeCount}
              </span>
            )}
          </span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {mobileOpen && (
          <div className="mt-2 border border-primary/20 bg-white px-4 pt-1 pb-2">
            <MobileSelectRow
              label="Room Type"
              value={roomType}
              options={ROOM_TYPES}
              onChange={onRoomTypeChange}
            />
            <MobileSelectRow
              label="Month"
              value={month}
              options={MONTHS}
              onChange={onMonthChange}
            />
            <MobileSelectRow
              label="Year"
              value={year}
              options={["All Years", ...years]}
              onChange={onYearChange}
            />
            {hasFilter && (
              <button
                onClick={() => { onClear(); setMobileOpen(false); }}
                className="mt-3 w-full text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray underline underline-offset-2 cursor-pointer hover:text-primary transition-colors text-center"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
