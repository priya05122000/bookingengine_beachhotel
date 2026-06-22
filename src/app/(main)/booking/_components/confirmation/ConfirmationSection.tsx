"use client";

import { typography } from "@/src/lib/typography";
import { useRef, useState } from "react";
import InvoicePreview from "./InvoicePreview";
import { downloadInvoice } from "./invoicePdf";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ConfirmationSection() {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  async function handleDownloadInvoice() {
    setDownloading(true);
    try {
      await downloadInvoice(invoiceRef);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="py-8">
      <div className=" mx-auto space-y-6">
        {/* ── Top confirmation banner ── */}
        <div className="bg-pale-green border border-light-green px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Left: checkmark + message */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-light-green flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2
                className={`${typography.textThXl} font-arizona-sans-regular text-primary leading-snug`}
              >
                Your Booking Is Confirmed
              </h2>
              <p className="text-xs lg:text-sm font-arizona-light text-dark-gray mt-1">
                Let the charm of the coastline and luxurious comforts set the stage for an unforgettable stay.
              </p>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden sm:block w-px self-stretch bg-light-green" />

          {/* Right: booking reference */}
          <div className="sm:pl-6 ">
            <p className="text-xs font-arizona-light text-dark-gray tracking-wide">
              Booking reference
            </p>
            <p
              className={` font-arizona-regular tracking-wider font-bold text-primary leading-tight mt-0.5 ${typography.textTwoXl}`}
            >
              LB4567854
            </p>
            <p className="text-xs font-arizona-light text-dark-gray mt-1">
              A confirmation email has been sent to
              <br />
              thebeachhotel@gmail.com
            </p>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="flex  flex-col lg:grid lg:grid-cols-[1fr_300px] gap-5 items-start">
          {/* Left: Booking Details */}
          <div className="w-full overflow-hidden lg:sticky lg:top-32 lg:self-start">
            <div className="px-8 py-8 border border-primary bg-white">
              <h3
                className={`${typography.textXl} font-arizona-sans-regular tracking-widest text-dark-gray uppercase mb-8`}
              >
                Booking Details
              </h3>
              <div className="w-full xl:w-2/3">
                {/* Row 1: GUEST | CHECK-IN | CHECK-OUT */}
                <div className="grid sm:grid-cols-3 gap-6 font-arizona-sans-regular text-xs lg:text-sm">
                  <div>
                    <p className=" text-dark-gray uppercase tracking-widest mb-2">
                      Guest
                    </p>
                    <p className="  text-primary">Nuva rey</p>
                  </div>
                  <div>
                    <p className=" text-dark-gray uppercase tracking-widest mb-2">
                      Check - In
                    </p>
                    <p className="  text-primary">Sun, 22 May 2026</p>
                    <p className=" text-dark-gray mt-1">From 6:00 pm</p>
                  </div>
                  <div>
                    <p className="text-dark-gray uppercase tracking-widest mb-2">
                      Check - Out
                    </p>
                    <p className=" text-primary">Mon, 23 May 2026</p>
                    <p className="text-dark-gray mt-1">by 6:00 pm</p>
                  </div>

                  <div>
                    <p className="text-dark-gray uppercase tracking-widest mb-2">
                      Your Reservation
                    </p>
                    <p className=" text-primary">
                      3 nights, 1<br />
                      apartment
                    </p>
                  </div>
                  <div>
                    <p className="text-dark-gray uppercase tracking-widest mb-2">
                      Phone
                    </p>
                    <p className=" text-primary">+91 65478 98756</p>
                  </div>
                  <div>
                    <p className=" text-dark-gray uppercase tracking-widest mb-2">
                      Email
                    </p>
                    <p className="text-primary">nuvaray26@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom strip */}
            <div className="bg-white border border-primary px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
              <div>
                <p
                  className={`${typography.textBase} font-arizona-sans-regular tracking-widest text-dark-gray uppercase `}
                >
                  Planning another reservation?
                </p>
                <p className="text-xs lg:text-sm font-arizona-light text-dark-gray mt-1">
                  Start your booking today.
                </p>
              </div>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("search:check-availability", {
                      detail: {
                        step: 0,
                        showPackages: false,
                      },
                    }),
                  );
                }}
                className=" bg-primary text-white px-4 h-10 rounded-xs text-xs lg:text-sm font-arizona-sans-regular tracking-widest cursor-pointer"
              >
                Reserve Now
              </button>
            </div>
          </div>

          {/* Right: Reservation & Price summary */}
          <aside className="space-y-4 w-full bg-white shadow-[-1px_4px_4px_0px_#00000040] ">
            {/* Reservation Summery */}
            <div className="p-3">
              <h4
                className={`${typography.textBase} font-bold text-primary mb-4 font-arizona-light tracking-wider`}
              >
                Reservation Summery
              </h4>
              <div className="bg-light-white font-arizona-sans-regular shadow-[-1px_4px_4px_0px_#00000040]  p-4 space-y-4">
                {/* Check-in / Check-out */}
                <div className="grid grid-cols-2 gap-4  ">
                  <div className="space-y-1">
                    <p className="text-dark-gray uppercase tracking-widest text-xs lg:text-sm">
                      Check - In
                    </p>
                    <p className="text-xs text-primary">Mon, 23 May 2026</p>
                    <p className="text-dark-gray mt-0.5 text-xs">
                      From 6:00 pm
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-dark-gray uppercase tracking-widest  text-xs lg:text-sm">
                      Check - Out
                    </p>
                    <p className="text-primary text-xs">Mon, 23 May 2026</p>
                    <p className="text-dark-gray mt-0.5 text-xs">by 6:00 pm</p>
                  </div>
                </div>
                {/* Total Length of Stay */}
                <div className="space-y-1">
                  <p className="text-dark-gray uppercase tracking-widest  text-xs lg:text-sm">
                    Total Length Of Stay
                  </p>
                  <p
                    className={`${typography.textBase} font-bold text-primary`}
                  >
                    5 Days
                  </p>
                </div>
                {/* You Selected */}
                <div className="space-y-1">
                  <p className="text-dark-gray uppercase tracking-widest text-xs lg:text-sm">
                    You Selected
                  </p>
                  <div className="space-y-1">
                    <p
                      className={`${typography.textBase} font-bold text-primary`}
                    >
                      Premier Room - Sea View  ( 2 )
                    </p>
                    <p className="text-xs bg-silver/30 p-1 inline-block text-black">
                      Breakfast Included
                    </p>
                    <p
                      className={`${typography.textBase} font-bold text-primary`}
                    >
                      Bay Suite - Sea View
                    </p>
                    <p className="text-xs bg-silver/30 p-1 inline-block text-black">
                      Breakfast Included
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Summery */}
              <div className="bg-light-white shadow-[-1px_4px_4px_0px_#00000040] p-4 space-y-4 mt-3 ">
                <h4
                  className={`${typography.textBase} font-bold text-primary mb-4 font-arizona-light tracking-wider`}
                >
                  Price Summary
                </h4>

                <div className="space-y-4 text-xs lg:text-sm">
                  <div className="flex justify-between  text-dark-gray">
                    <div className="flex flex-col">
                      <span>Rooms</span>
                      <span className="text-dark-gray">(1 Day x 2 Nights)</span>
                    </div>

                    <span>&#8377; 6,000</span>
                  </div>

                  <div className="flex justify-between text-dark-gray ">
                    <div className="flex flex-col">
                      <span>Offer</span>
                      <span className="text-dark-gray">(10% off)</span>
                    </div>

                    <span>&#8377; 600</span>
                  </div>

                  <div className="flex justify-between text-dark-gray">
                    <span>Extras</span>
                    <span>&#8377; 700</span>
                  </div>

                  <div className="flex justify-between  text-dark-gray ">
                    <span>Taxes & Fees</span>
                    <span>&#8377; 1000</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-gray-700 text-base lg:text-lg font-arizona-light tracking-[0.04em] text-primary">
                  <span>Total Amount Paid</span>
                  <span>&#8377; 8300</span>
                </div>
              </div>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={handleDownloadInvoice}
                  disabled={downloading}
                  className="w-full bg-primary text-white px-4 h-10 rounded-xs text-xs lg:text-sm font-arizona-sans-regular uppercase tracking-widest cursor-pointer"
                >
                  {downloading ? "Downloading Invoice..." : "Download Invoice"}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Explore More ── */}
        <div className="bg-white px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-5 sm:gap-5 gap-4 items-stretch">
            <div className="shadow-[-1px_4px_4px_0px_#00000040] sm:col-span-2 ">
              <Image
                src="/images/invitationstay.jpg"
                alt={`explore-1`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                loading="eager"
                priority
              />
            </div>
            <div className="col-span-3 font-arizona-sans-regular h-full flex">
              <div className="sm:col-span-3 w-full flex flex-col justify-between sm:p-4">
                <div>
                  <p
                    className={`${typography.textXl} font-arizona-sans-regular text-primary leading-snug`}
                  >
                    An Invitation to Stay
                  </p>
                  <p className={`${typography.textFoXl} font-arizona-light font-semibold text-justify mt-2`}>
                    At the southernmost tip of India, in the timeless coastal
                    setting of Kanniyakumari, discover a stay unlike any other.
                    Where three oceans converge and endless blue waters frame
                    every moment, refined comforts, exceptional hospitality and
                    a profound sense of place come together to create a stay
                    that lingers long after you leave.
                  </p>
                </div>

                <div className="mt-4">
                  <button className=" bg-primary text-white px-4 h-10 rounded-xs text-xs lg:text-sm font-arizona-sans-regular tracking-widest cursor-pointer flex items-center">
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: "794px",
          }}
        >
          <InvoicePreview ref={invoiceRef} />
        </div>
      </div>
    </div>
  );
}
