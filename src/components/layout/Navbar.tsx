"use client";

import { CalendarDays, LogOut, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside (needed for touch devices)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  function handleLogout() {
    setShowLogoutModal(false);
    router.push("/signin");
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="py-2 bg-white shadow-[-1px_3px_4px_0px_#00000040] flex items-center justify-between px-3 sm:px-6 lg:px-12">

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md cursor-pointer px-2 sm:px-3 py-2 text-sm text-dark-gray hover:underline underline-offset-2 shrink-0"
          >
            Back
          </button>

          <a
            href="https://thebeachhotel.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src="/images/toplogo.svg"
              alt="The Beach Hotel"
              width={200}
              height={40}
              priority
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
            />
          </a>

          <div
            ref={dropdownRef}
            className="relative shrink-0"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-1 text-sm text-primary font-semibold h-10 cursor-pointer select-none px-1"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <User className="w-5 h-5 shrink-0" />
              <span className="">Roshima</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full pt-2 w-44 z-50">
                <div className="absolute right-4 top-0.5 w-3 h-3 border-l border-t rotate-45 z-10 bg-white border-gray-200" />
                <div className="relative bg-white border border-gray-200 rounded-sm shadow-md overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500">Welcome, Roshima</p>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <CalendarDays className="w-4 h-4" />
                    My Bookings
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); setShowLogoutModal(true); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="relative bg-white rounded-md shadow-lg px-6 py-6 sm:px-8 sm:py-8 w-full max-w-75 sm:max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
              aria-label="Close cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mt-2 font-arizona-regular">Are you sure?</h2>
            <p className="text-sm mt-3 leading-snug text-primary">
              Are you sure you want to logout?<br />This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 sm:px-8 py-2 rounded-sm border border-dark-gray text-dark-gray text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-8 sm:px-10 py-2 rounded-sm bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
