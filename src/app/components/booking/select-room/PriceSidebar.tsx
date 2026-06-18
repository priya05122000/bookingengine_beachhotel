// ...existing code...
"use client";

import React, { useMemo } from "react";
import { PackageItem } from "./types";
import { Check, CheckCheck, X } from "lucide-react";
import Link from "next/link";
import { typography } from "@/src/lib/typography";

type SelectedPackage = PackageItem & { adults: number; children: number };

type Props = {
  selected: SelectedPackage[];
  removePackage: (id: string) => void;
  promo: string;
  setPromo: (s: string) => void;
};

/* Helpers */
function parsePrice(priceStr: string) {
  const digits = (priceStr || "").replace(/[^\d]/g, "");
  const n = Number(digits || 0);
  return isNaN(n) ? 0 : n;
}

function formatINR(n: number) {
  return n.toLocaleString("en-IN");
}

/* Class constants to reduce repetition */
const FONT = "text-xs lg:text-sm font-arizona-light tracking-widest";
const CARD =
  "bg-light-white rounded-xs shadow-[1px_4px_4px_0px_#00000040] p-4";

/* Small presentational component for each line item */
function PriceLineItem({
  item,
  onRemove,
}: {
  item: SelectedPackage;
  onRemove: (id: string) => void;
}) {
  const guestLabel = `${item.adults} Adult${item.adults > 1 ? "s" : ""}${item.children > 0 ? ` · ${item.children} Child${item.children > 1 ? "ren" : ""}` : ""
    }`;

  return (
    <div key={item.id} className="border-b last:border-b-0 pb-2">
      <div className="flex items-stretch justify-between">
        <div className="flex-1 space-y-1">
          <div className={`${FONT}`}>{item.title}</div>
          <div className={`${FONT} text-primary`}>{item.subtitle}</div>
          <div className={`${FONT} text-black mt-1 bg-silver/30 inline-block p-1  `}>{item.details}</div>
          <div className={`${FONT} text-dark-gray mt-1`}>{guestLabel}</div>
        </div>

        <div className="flex flex-col text-end justify-between">
          <button
            className="self-end cursor-pointer text-dark-gray hover:text-red-500"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title}`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className={`${FONT}`}>
            &#8377; {formatINR(parsePrice(item.price))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Main component */
export default function PriceSidebar({
  selected,
  removePackage,
  promo,
  setPromo,
}: Props) {
  const basePrice = useMemo(
    () => selected.reduce((sum, s) => sum + parsePrice(s.price), 0),
    [selected],
  );

  const hotelTaxes = 0; // placeholder
  const total = basePrice + hotelTaxes;
  const roomCount = selected.length;
  const nights = 0; // placeholder

  return (
    <div className="space-y-3 bg-white p-3 shadow-[1px_4px_4px_0px_#00000040] rounded">
      <div className={CARD}>
        {selected.length > 0 ? (
          <div className="space-y-3 mb-3">
            {selected.map((s) => (
              <PriceLineItem key={s.id} item={s} onRemove={removePackage} />
            ))}
          </div>
        ) : (
          <div className={`${FONT} text-dark-gray flex space-y-1 items-center justify-between py-3`}>
            <div className="space-y-1">
              <div className={FONT}>Base Price</div>
              <div className={`${FONT} text-dark-gray`}>
                {roomCount} Room{roomCount !== 1 ? "s" : ""} x {nights} Nights
              </div>
            </div>
            <div>&#8377; {formatINR(basePrice)}</div>
          </div>
        )}

        <div className={`${FONT} text-dark-gray border-t py-3 flex items-center justify-between`}>
          <div>Hotel Taxes</div>
          <div>&#8377; {formatINR(hotelTaxes)}</div>
        </div>

        <div className={`${typography.textLg} font-arizona-sans-regular border-t-3  border-black pt-2 flex items-center justify-between `}>
          <div className={` text-primary`}>Total</div>
          <div className="tracking-widest text-primary">
            &#8377; {formatINR(total)}
          </div>
        </div>

        {selected.length > 0 && (
          <>
            <div className="mt-4">
              <label className={`${FONT} text-dark-gray mb-1 block`}>Promo Code</label>
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="KJ676"
                className={`flex-1 w-full border-b border-black/35 py-2 ${FONT} text-dark-gray focus:outline-0`}
              />
            </div>

            <div className="mt-4">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("search:check-availability", {
                      detail: { step: 2 },
                    }),
                  )
                }
                className="w-full bg-primary text-white px-4 h-10 rounded-xs text-xs lg:text-sm font-arizona-sans-regular tracking-widest cursor-pointer"
              >
                PROCEED
              </button>
            </div>
          </>
        )}
      </div>

      <div className={CARD}>
        <div className={`${FONT} mb-3 block font-arizona-sans-regular`}>
          <Link href="/signin" className="mr-1 text-xs lg:text-sm underline underline-offset-4 text-primary hover:text-primary transition-colors cursor-pointer">
            LOGIN
          </Link>
          or
          <Link href="/signup" className="ml-1 text-xs lg:text-sm underline underline-offset-4 text-primary hover:text-primary transition-colors cursor-pointer">
            SIGN UP
          </Link>
        </div>

        <ul className={`text-xs lg:text-sm tracking-wide text-dark-gray space-y-2`}>
          <li className="flex items-center gap-2">
            <span className="text-accent"><CheckCheck className="w-4 h-4" /></span>
            Get access to Secret Deals
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent"><CheckCheck className="w-4 h-4" /></span>
            Earn member benefits
          </li>
        </ul>
      </div>
    </div >
  );
}
