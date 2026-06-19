"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRIES } from "@/src/lib/countries";

interface CountryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CountryDropdown({
  value,
  onChange,
  className = "",
}: CountryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedName = COUNTRIES.find((c) => c.code === value)?.name ?? "";

  // While open, input shows the search query; when closed, shows the selected country name
  const inputValue = open ? search : selectedName;

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center border border-primary bg-white">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder="Country"
          onFocus={() => {
            setSearch("");
            setOpen(true);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          className="w-full px-3 py-2 text-sm text-dark-gray placeholder-gray-400 focus:outline-none bg-transparent"
        />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault(); // prevent input blur so outside-click doesn't fire first
            setOpen((prev) => {
              if (!prev) inputRef.current?.focus();
              else setSearch("");
              return !prev;
            });
          }}
          className="shrink-0 mr-3 focus:outline-none cursor-pointer"
        >
          <ChevronDown
            size={14}
            className={`text-dark-gray transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <ul className="absolute z-50 w-full bg-white border border-primary shadow-sm max-h-48 lg:max-h-53 xl:max-h-48 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <li
                key={c.code}
                onMouseDown={() => {
                  onChange(c.code);
                  setSearch("");
                  setOpen(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 ${
                  value === c.code ? "bg-primary/10 font-medium" : "text-dark-gray"
                }`}
              >
                {c.name}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-gray-400">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
