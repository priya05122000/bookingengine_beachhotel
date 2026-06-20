"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { typography } from "@/src/lib/typography";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full hidden lg:flex  flex-col lg:w-[50%] lg:h-screen lg:sticky lg:top-0">
          <div className="relative h-62 overflow-hidden sm:h-87 lg:flex-1">
            <img
              src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
              alt="The Beach Hotel"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-42 shrink-0 px-8 py-8 font-arizona">
            <Link
              href="https://thebeachhotel.in/"
              className=" text-xs uppercase tracking-[0.15em] text-dark-gray hover:underline underline-offset-2"
              aria-label="Go to homepage"
            >
              The Beach Hotel
            </Link>

            <h3
              className={`max-w-md ${typography.textLg} mt-3 leading-normal capitalize text-dark-gray`}
            >
              More than a destination, a place to pause, connect and belong.
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-xs text-dark-gray">
              <div className="flex items-center gap-2">
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`}
                  className="hover:underline"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
                <span className="text-dark-gray">|</span>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/terms-and-conditions`}
                  className="hover:underline"
                  aria-label="Terms and Conditions"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="relative flex flex-1 items-center justify-center px-6  ">
          {/* Top controls */}
          <div className="absolute top-4 right-4 z-50 font-arizona flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md cursor-pointer px-3 py-2 text-sm text-dark-gray hover:underline underline-offset-2"
            >
              Back
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
