"use client";

import React from "react";
import { PackageItem } from "./types";
import { X } from "lucide-react";
import Link from "next/link";

type SelectedPackage = PackageItem & { adults: number; children: number };

type Props = {
  selected: SelectedPackage[];
  removePackage: (id: string) => void;
  promo: string;
  setPromo: (s: string) => void;
};

function parsePrice(priceStr: string) {
  // extracts digits from strings like "INR 6,578" -> 6578
  const digits = (priceStr || "").replace(/[^\d]/g, "");
  const n = Number(digits || 0);
  return isNaN(n) ? 0 : n;
}

function formatINR(n: number) {
  return n.toLocaleString("en-IN");
}

function PriceLineItem({
  item,
  onRemove,
}: {
  item: SelectedPackage;
  onRemove: (id: string) => void;
}) {
  const guestLabel = `${item.adults} Adult${item.adults > 1 ? "s" : ""}${item.children > 0 ? ` · ${item.children} Child${item.children > 1 ? "ren" : ""}` : ""}`;

  return (
    <div key={item.id} className="border-b last:border-b-0 pb-2">
      <div className="flex items-stretch justify-between ">
        <div className=" flex-1 ">
          <div className="font-medium text-sm">{item.title}</div>
          <div className="text-xs text-primary">{item.subtitle}</div>
          <div className="text-xs text-dark-gray mt-1">{item.details}</div>
          <div className="text-xs text-dark-gray mt-1">{guestLabel}</div>
        </div>

        <div className=" flex flex-col text-end justify-between  ">
          <button
            className="self-end cursor-pointer text-dark-gray hover:text-red-500"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title}`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-sm">
            &#8377; {formatINR(parsePrice(item.price))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PriceSidebar({
  selected,
  removePackage,
  promo,
  setPromo,
}: Props) {
  const basePrice = selected.reduce((sum, s) => sum + parsePrice(s.price), 0);
  const hotelTaxes = 0; // placeholder; replace with real calculation
  const total = basePrice + hotelTaxes;

  const roomCount = selected.length;
  const nights = 0; // placeholder — use real nights when available

  return (
    <div className="space-y-3 bg-white p-3 shadow-[1px_4px_4px_0px_#00000040] rounded">
      <div className="bg-light-white rounded-xs shadow-[1px_4px_4px_0px_#00000040] p-4">
        {/* <h4 className="text-sm font-semibold text-dark-gray mb-4">PRICE BREAKUP</h4> */}

        {selected.length > 0 ? (
          <div className="space-y-3 mb-3">
            {selected.map((s) => (
              <PriceLineItem key={s.id} item={s} onRemove={removePackage} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-dark-gray flex items-center justify-between py-3">
            <div>
              <div className="text-sm">Base Price</div>
              <div className="text-xs text-dark-gray">
                {roomCount} Room{roomCount !== 1 ? "s" : ""} x {nights} Nights
              </div>
            </div>
            <div>&#8377; {formatINR(basePrice)}</div>
          </div>
        )}

        <div className="text-sm border-t py-3 text-dark-gray flex items-center justify-between">
          <div>Hotel Taxes</div>
          <div>&#8377; {formatINR(hotelTaxes)}</div>
        </div>

        <div className="border-t-3 border-black pt-2 flex items-center justify-between">
          <div className="text-sm font-medium text-[#1b2b7a]">
            Total amount to be paid
          </div>
          <div className="text-lg font-bold text-[#1b2b7a]">
            &#8377; {formatINR(total)}
          </div>
        </div>

        {selected.length > 0 && (
          <>
            <div className="mt-4">
              <label className="text-sm font-arizona text-dark-gray mb-1 block">
                Promo Code
              </label>
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="KJ676"
                className="flex-1 w-full border-b border-black/35 py-2 text-sm  text-dark-gray focus:outline-0"
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
                className="w-full bg-[#1b2b7a] text-white px-4 h-10 rounded-xs text-sm font-semibold cursor-pointer"
              >
                PROCEED
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-light-white rounded-xs shadow-[1px_4px_4px_0px_#00000040] p-4">
        <div className="text-sm font-semibold  mb-3 block">
          <Link href="/signin" className="mr-1 underline underline-offset-4 text-primary hover:text-primary transition-colors cursor-pointer">LOGIN</Link>
          or
          <Link href="/signup" className="ml-1 underline underline-offset-4 text-primary hover:text-primary transition-colors cursor-pointer">
            SIGN UP
          </Link>
        </div>

        <ul className="text-sm text-dark-gray space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">✓</span>
            Get access to Secret Deals
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">✓</span>
            Earn member benefits
          </li>
        </ul>
      </div>
    </div>
  );
}
