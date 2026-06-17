"use client";

import React, { useState } from "react";
import { Wifi, UtensilsCrossed, Percent } from "lucide-react";
import { typography } from "@/src/lib/typography";
import Link from "next/link";
import CountryDropdown from "./CountryDropdown";

export default function GuestPaymentSection() {
  const [country, setCountry] = useState("");

  return (
    <div className=" py-8">
      <div className="  flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* ── Left column ── */}
        <div className="space-y-5 w-full">
          {/* Guest Information */}
          <div className="border border-primary bg-white ">
            <div className="flex items-center justify-between  p-5">
              <h3
                className={`${typography.textBase} font-bold tracking-widest text-dark-gray uppercase`}
              >
                Guest Information
              </h3>
              <Link href="/sigin">
                <button className="text-sm text-dark-gray border border-primary px-3 py-1 rounded-xs cursor-pointer">
                  Sign in
                </button>
              </Link>
            </div>
            <hr className="border-primary " />

            <form className="space-y-4 p-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full border border-primary px-3 py-2 text-sm text-dark-gray placeholder-gray-400 focus:outline-none"
                  placeholder="First name"
                />
                <input
                  className="w-full border border-primary px-3 py-2 text-sm text-dark-gray placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <CountryDropdown value={country} onChange={setCountry} />
                {/* Phone with prefix */}
                <div className="flex border border-primary">
                  <span className="flex items-center px-3 text-sm text-dark-gray  shrink-0">
                    +91
                  </span>
                  <input
                    className="flex-1 px-2 py-2 text-sm text-dark-gray placeholder-gray-400 focus:outline-none"
                    placeholder="967856 45783"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Special request */}
                <textarea
                  className="w-full border border-primary px-3 py-2 text-sm text-dark-gray placeholder-gray-400 focus:outline-none resize-none h-24"
                  placeholder="Special request"
                />
              </div>

              {/* Promo line */}
              <p className="text-center text-sm text-light-green font-medium">
                Book your stay before the prices go up!
              </p>

              {/* Terms */}
              <div className="flex items-center justify-center gap-2">
                <input type="checkbox" id="terms" className="mt-0.5 shrink-0" />
                <label
                  htmlFor="terms"
                  className="text-sm text-dark-gray leading-snug font-arizona"
                >
                  By completing this reservation you are accepting our{" "}
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/terms-and-conditions`}
                    className="text-primary underline cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </Link>
                </label>
              </div>
            </form>
          </div>

          {/* Available Add Ons */}
          <div className="border border-primary bg-white ">
            <h4
              className={`${typography.textBase} font-bold tracking-widest text-dark-gray uppercase p-5`}
            >
              Available Add Ons
            </h4>

            <hr className="border-primary " />

            <div className="p-5">
              <p className="text-sm text-dark-gray leading-relaxed mb-4">
                Enjoy A Delightful Stay At Unbelievable Prices At Our Rooms That
                Come With A Host Of Amenities. Check In Time: 14:00 Hrs Check
                Out Time: 11:00 AM
              </p>

              <h5
                className={`${typography.textTwoXl} font-bold text-primary mb-2`}
              >
                Cancellation Rules
              </h5>
              <p className="text-sm text-dark-gray leading-relaxed mb-5">
                If Cancellation Is Done 2 Or More Days Prior To Arrival, Then
                Full Amount Will Be Refunded. If Cancellation Is Done Within 48
                Hours Of Arrival, Then Full Amount Will Be Charged.
              </p>

              <h6 className="text-sm font-semibold text-dark-gray mb-3">
                Inclusions
              </h6>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-dark-gray">
                  <Wifi size={16} className="text-dark-gray shrink-0" />
                  Free Wifi
                </li>
                <li className="flex items-center gap-3 text-sm text-dark-gray">
                  <UtensilsCrossed
                    size={16}
                    className="text-dark-gray shrink-0"
                  />
                  Breakfast Included For 2 Guest
                </li>
                <li className="flex items-center gap-3 text-sm text-dark-gray">
                  <Percent size={16} className="text-dark-gray shrink-0" />
                  15% Discount On FnB
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Right column: summary card ── */}
        <aside className="w-full shadow-[-1px_4px_4px_0px_#00000040] lg:sticky lg:top-32 lg:self-start">
          <div className="bg-white shadow-sm">
            {/* Room image */}
            <img
              src="/images/Rectangle.png"
              alt="room"
              className="w-full h-36 object-cover"
            />

            {/* Card body */}
            <div className="p-4">
              {/* Title row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-dark-gray tracking-wide">
                    ECONOMY
                  </p>
                  <p className="text-sm text-dark-gray mt-0.5">SEA VIEW</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // dispatch single event to move to Select Room and open packages
                    window.dispatchEvent(
                      new CustomEvent("search:check-availability", {
                        detail: {
                          step: 1,
                          showPackages: true,
                        },
                      }),
                    );
                  }}
                  className="text-xs text-primary cursor-pointer hover:border-b border-primary py-0.5 shrink-0"
                >
                  EDIT
                </button>
              </div>

              {/* Dates */}
              <div className="flex items-start justify-between mt-3">
                <p className="text-sm text-primary font-medium">
                  Fri, 22 JUN, 2026 – Fri, 22 JUN, 2026
                </p>
                <button
                  type="button"
                  onClick={() => {
                    // dispatch single event to move to Select Room and open packages
                    window.dispatchEvent(
                      new CustomEvent("search:check-availability", {
                        detail: {
                          step: 0,
                          showPackages: true,
                        },
                      }),
                    );
                  }}
                  className="text-xs text-primary cursor-pointer hover:border-b border-primary py-0.5 shrink-0"
                >
                  EDIT
                </button>
              </div>
              <div className="text-sm text-dark-gray mt-1 flex gap-1.5">
                <span>1NIGHT </span>
                <span>|</span>
                <span> 1ROOM </span>
                <span>|</span>
                <span> 2ADULT</span>
              </div>

              {/* Pricing */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-dark-gray line-through">
                    &#8377; 15,308
                  </span>
                  <span className="text-xs text-dark-gray uppercase tracking-wide">
                    Per Night:
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-sm font-semibold text-dark-gray">
                    &#8377; 11,571
                  </span>
                  <span className="text-xs text-dark-gray">+</span>
                  <span className="text-xs text-dark-gray">&#8377; 2,417</span>
                  <span className="text-xs text-dark-gray uppercase tracking-wide">
                    Taxes &amp; Fees
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-gray-700">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Total
                  </span>
                  <span className="text-sm font-extrabold text-primary">
                    INR <span className="text-lg">82,45,678</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Book Now */}
        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("search:check-availability", {
                detail: { step: 3 },
              }),
            )
          }
          className="w-full sm:w-[320px] bg-primary text-white h-10 rounded-xs text-xs font-semibold tracking-wide cursor-pointer"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
