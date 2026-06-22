"use client";

import React, { useState } from "react";
import { Wifi, UtensilsCrossed, Percent } from "lucide-react";
import { typography } from "@/src/lib/typography";
import Link from "next/link";
import CountryDropdown from "./CountryDropdown";

export default function GuestPaymentSection() {
  const [country, setCountry] = useState("");

  const [promo, setPromo] = useState<string>('');


  return (
    <div className="py-8">
      <div className="  flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* ── Left column ── */}
        <div className="space-y-5 w-full">
          {/* Guest Information */}
          <div className="border border-primary bg-white ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-10  p-5">
              <h3
                className={`${typography.textXl} font-arizona-sans-regular tracking-widest text-dark-gray uppercase `}
              >
                Guest Information
              </h3>

              <div className="flex gap-4 items-center">
                <p className="text-xs lg:text-sm tracking-[0.04em] text-dark-gray  ">
                  Login to prefill traveller details and get access to secret deals
                </p>
                <Link href="/signin">
                  <button className="text-xs lg:text-sm text-dark-gray border border-primary px-3 text-nowrap py-1 font-arizona-sans-regular rounded-xs cursor-pointer">
                    Sign in
                  </button>
                </Link>
              </div>

            </div>
            <hr className="border-primary " />

            <form className=" p-5 text-xs lg:text-sm">
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className="w-full border border-primary px-3 py-2 text-sm text-dark-gray placeholder-gray-400 focus:outline-none"
                    placeholder="Name"
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
              </div>

              {/* Promo line */}
              <p className="text-center text-xs  text-green-500 font-arizona-light mt-8  tracking-wider mb-2">
                Book your stay before the prices go up!
              </p>

              {/* Terms */}
              <div className="flex items-start text-xs lg:text-sm font-arizona-light  justify-center gap-2">
                <input type="checkbox" id="terms" className="mt-0.5 shrink-0" />
                <label
                  htmlFor="terms"
                  className="text-dark-gray tracking-wider leading-snug font-arizona"
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
              className={`${typography.textXl} font-arizona-sans-regular tracking-widest text-dark-gray uppercase p-5`}
            >
              Available Add Ons
            </h4>

            <hr className="border-primary " />

            <div className="p-5">
              <p className="text-xs lg:text-sm tracking-[0.04em] text-dark-gray leading-relaxed mb-4">
                Enjoy A Delightful Stay At Unbelievable Prices At Our Rooms That
                Come With A Host Of Amenities. Check In Time: 14:00 Hrs Check
                Out Time: 11:00 AM
              </p>

              <h5
                className={`${typography.textXl} font-arizona-sans-regular text-primary mb-2`}
              >
                Cancellation Rules
              </h5>
              <p className="text-xs lg:text-sm tracking-[0.04em] text-dark-gray leading-relaxed mb-4">
                If Cancellation Is Done 2 Or More Days Prior To Arrival, Then
                Full Amount Will Be Refunded. If Cancellation Is Done Within 48
                Hours Of Arrival, Then Full Amount Will Be Charged.
              </p>

              <h6 className=" text-sm lg:text-base  font-arizona-sans-regular text-primary mb-3">
                Inclusions
              </h6>

              <ul className="space-y-3 font-arizona-sans-regular  text-xs">
                <li className="flex items-center gap-3  text-dark-gray">
                  <Wifi size={16} className="text-dark-gray shrink-0" />
                  Free Wifi
                </li>
                <li className="flex items-center gap-3  text-dark-gray">
                  <UtensilsCrossed
                    size={16}
                    className="text-dark-gray shrink-0"
                  />
                  Breakfast Included For 2 Guest
                </li>
                <li className="flex items-center gap-3 text-dark-gray">
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
                <div className="space-y-1">
                  <p className="text-dark-gray uppercase font-arizona-sans-regular tracking-widest text-xs lg:text-sm">
                    Rooms Selected
                  </p>
                  <div className="space-y-1 tracking-wider">
                    <p
                      className={`${typography.textBase} font-semibold text-primary`}
                    >
                      Premier Room - Sea View
                      <span className="text-[10px] block">( 2 Rooms | 2 Adults & 2 Children )</span>
                    </p>
                    <p className="text-xs bg-silver/30 p-1 inline-block text-black">
                      Breakfast Included
                    </p>
                    <p
                      className={`${typography.textBase} font-semibold text-primary`}
                    >
                      Bay Suite - Sea View
                      <span className="text-[10px] block">( 1 Room | 2 Adults )</span>
                    </p>
                    <p className="text-xs bg-silver/30 p-1 inline-block text-black">
                      Breakfast Included
                    </p>
                  </div>
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
                  className="text-xs lg:text-sm font-arizona-sans-regular text-primary cursor-pointer  underline underline-offset-2 py-0.5 shrink-0"
                >
                  EDIT
                </button>
              </div>

              {/* Dates */}
              <div className="flex items-start justify-between my-3 border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-4 ">
                  <div className="space-y-1">
                    <p className="text-dark-gray uppercase font-arizona-sans-regular tracking-widest text-xs lg:text-sm">
                      Check - In
                    </p>
                    <p className="text-xs text-primary">Mon, 23 May 2026</p>
                    <p className="text-dark-gray mt-0.5 text-xs">
                      From 6:00 pm
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-dark-gray uppercase font-arizona-sans-regular tracking-widest  text-xs lg:text-sm">
                      Check - Out
                    </p>
                    <p className="text-primary text-xs">Mon, 23 May 2026</p>
                    <p className="text-dark-gray mt-0.5 text-xs">by 6:00 pm</p>
                  </div>
                </div>
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
                  className="text-xs lg:text-sm font-arizona-sans-regular text-primary cursor-pointer  underline underline-offset-2 py-0.5 shrink-0"
                >
                  EDIT
                </button>
              </div>



              <div className="text-xs  border-t border-gray-100 font-arizona-sans-regular text-dark-gray mt-3 flex flex-wrap gap-1.5 pt-3">
                <span>2 NIGHT </span>
                <span>|</span>
                <span> 3 ROOM </span>
                <span>|</span>
                <span> 4 ADULT</span>
                <span>|</span>
                <span> 2 CHILDREN</span>
              </div>

              {/* Pricing */}
              <div className="mt-3 pt-3 border-t border-gray-100 font-arizona-light">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm text-dark-gray">&#8377; 15,308</span>
                  <span className="text-xs text-dark-gray uppercase tracking-wide">
                    Room Charges
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-1 mt-1">
                  <span className="text-sm text-dark-gray">&#8377; 3,571</span>
                  <span className="text-xs text-dark-gray uppercase tracking-wide">
                    Others
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-1 mt-1">
                  <span className="text-sm text-dark-gray">&#8377; 11,571</span>
                  <span className="text-xs text-dark-gray uppercase tracking-wide">
                    Taxes &amp; Fees
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-300 font-arizona-light">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm text-dark-gray line-through font-semibold">
                      &#8377; 15,308
                    </span>
                    <span className="text-xs text-dark-gray uppercase tracking-wide">
                      Total Charges
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 py-4">
                    {/* <p className="text-sm text-dark-gray">- &#8377; 1407</p>
                    <div className="flex flex-col items-end">
                      <p className="text-xs text-dark-gray uppercase tracking-wide">
                        Promo code (csrs10)
                      </p>
                      <p className="text-[10px] text-left text-dark-gray">
                        10% off on total charges
                      </p>
                    </div> */}

                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Promo Code"
                      className="flex-1 w-full border-b border-black/35  h-8 text-xs lg:text-sm  font-arizona-sans-regular   text-dark-gray focus:outline-0"
                    />

                    <button

                      className=" bg-primary text-white h-8 rounded-xs text-xs px-4 font-arizona-sans-regular tracking-widest cursor-pointer"
                    >
                      Apply
                    </button>


                  </div>
                  <div className="flex items-baseline justify-between gap-2 pt-1">
                    <p className="text-sm text-dark-gray">- &#8377; 907</p>
                    <div className="flex flex-col items-end">
                      <p className="text-xs text-dark-gray uppercase tracking-wide">
                        Other Offers and Discounts
                      </p>
                      <p className="text-[10px] text-left text-dark-gray">
                        3% off on total charges
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-gray-700 text-base lg:text-lg font-arizona-light tracking-[0.04em]">
                  <span className="text-primary uppercase tracking-wide">
                    Total
                  </span>
                  <span className=" text-primary">
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
          className="w-full sm:w-[320px] bg-primary text-white h-10 rounded-xs text-xs lg:text-sm font-arizona-sans-regular tracking-widest cursor-pointer"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
