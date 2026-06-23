"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [arrowHighlight, setArrowHighlight] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.7 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${hidden ? " opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="py-2 bg-white shadow-[-1px_3px_4px_0px_#00000040] flex justify-end px-4 lg:px-12">
        <div
          className="relative mr-4"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="flex items-center gap-1 text-sm text-primary font-semibold h-10 cursor-pointer select-none">
            <User className="w-5 h-5" />
            Hi, Roshima
          </div>
          {dropdownOpen && (
            /* pt-2 creates invisible bridge so mouse can travel from trigger to menu */
            <div className="absolute right-0 top-full pt-2 w-44 z-50">
              {/* caret arrow pointing up */}
              <div className={`absolute right-4 top-0.5 w-3 h-3 border-l border-t rotate-45 z-10 transition-colors ${arrowHighlight ? "bg-primary border-primary" : "bg-white border-gray-200"}`} />
              <div className="relative bg-white border border-gray-200 rounded-sm shadow-md overflow-hidden">
                <Link
                  href="/profile"
                  onMouseEnter={() => setArrowHighlight(true)}
                  onMouseLeave={() => setArrowHighlight(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {}}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <Link
          href="/signin"
          className="text-sm text-primary border flex items-center border-primary rounded-xs px-2 h-10 hover:bg-primary hover:text-white transition cursor-pointer"
        >
          Login / Signup
        </Link> */}
      </div>
    </header>
  );
}
