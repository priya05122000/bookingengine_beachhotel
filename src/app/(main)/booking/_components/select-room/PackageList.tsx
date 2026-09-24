"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

//new
import { Minus, Plus, X, ChevronDown } from "lucide-react";
import { PackageItem } from "./types";
import { typography } from "@/src/lib/typography";

export function Counter({
  label,
  sublabel,
  value,
  min,
  max,
  incDisabled,
  stacked,
  inlineSublabel,
  controlClassName = "",
  onInc,
  onDec,
}: {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  incDisabled?: boolean;
  /** Label above the control instead of beside it */
  stacked?: boolean;
  /** Sublabel on the same line as the label */
  inlineSublabel?: boolean;
  /** Extra classes for the bordered −/+ box, e.g. a fixed width */
  controlClassName?: string;
  onInc: () => void;
  onDec: () => void;
}) {
  // In the fixed-height stacked box, fill only the space inside the border so
  // the hover background doesn't paint over it
  const btnHeight = stacked ? "h-full" : "h-7";
  return (
    <div
      className={`py-2 ${
        stacked ? "flex flex-col gap-1.5" : "flex items-center justify-between"
      }`}
    >
      <div
        className={
          stacked || inlineSublabel
            ? "flex items-baseline gap-2 whitespace-nowrap"
            : ""
        }
      >
        <p className="text-[10px] font-arizona-sans-regular uppercase tracking-[.15em] text-dark-gray">
          {label}
        </p>
        {sublabel && (
          <p className="text-[10px] text-silver font-arizona-sans-regular tracking-[0.15em]">
            ({sublabel})
          </p>
        )}
      </div>
      <div
        className={`flex items-center gap-3 border border-primary font-arizona ${
          stacked ? "w-full h-7 justify-between" : ""
        } ${controlClassName}`}
      >
        <button
          onClick={onDec}
          disabled={value <= min}
          className={`w-7 ${btnHeight} flex items-center justify-center text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray transition-colors`}
        >
          <Minus size={12} />
        </button>
        <span className="text-sm text-primary w-4 text-center">{value}</span>
        <button
          onClick={onInc}
          disabled={value >= max || incDisabled}
          className={`w-7 ${btnHeight} flex items-center justify-center text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray transition-colors`}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

type Props = {
  packages: PackageItem[];
  selected: SelectedPackage[];
  openQtyFor: string | null;
  setOpenQtyFor: (id: string | null) => void;
  addPackage: (
    pkg: PackageItem,
    rooms: number,
    adults: number,
    children: number
  ) => void;
  defaultQty?: QtyState;
};

export type SelectedPackage = PackageItem & {
  rooms: number;
  adults: number;
  children: number;
};

export type QtyState = { rooms: number; adults: number; children: number };

export default function PackageList({
  packages,
  selected,
  openQtyFor,
  setOpenQtyFor,
  addPackage,
  defaultQty,
}: Props) {
  const [qty, setQty] = useState<Record<string, QtyState>>({});

  //new
  const [childAges, setChildAges] = useState<Record<string, (string | null)[]>>(
    {}
  );

  const [openDetailsFor, setOpenDetailsFor] = useState<string | null>(null);

  //new
  const [openChildAge, setOpenChildAge] = useState<string | null>(null);

  function getQty(id: string): QtyState {
    return qty[id] ?? { rooms: 0, adults: 0, children: 0 };
  }

  function setRoomsCount(id: string, n: number) {
    setQty((prev) => ({ ...prev, [id]: { ...getQty(id), rooms: n } }));
  }

  function setAdults(id: string, n: number) {
    setQty((prev) => ({ ...prev, [id]: { ...getQty(id), adults: n } }));
  }

  function setChildren(id: string, n: number) {
    setQty((prev) => ({ ...prev, [id]: { ...getQty(id), children: n } }));
  }

  //new
  function setChildAge(id: string, index: number, age: string) {
    setChildAges((prev) => {
      const ages = [...(prev[id] ?? [])];
      ages[index] = age;

      return {
        ...prev,
        [id]: ages,
      };
    });
  }

  function guestLabel(rooms: number, adults: number, children: number) {
    if (rooms === 0 && adults === 0) return "";
    return `${rooms} Room${rooms > 1 ? "s" : ""} · ${adults} Adult${
      adults > 1 ? "s" : ""
    }${children > 0 ? ` · ${children} Child${children > 1 ? "ren" : ""}` : ""}`;
  }

  return (
    <div className=" rounded-xs">
      <h4
        className={`text-base lg:text-xl font-arizona-sans-regular tracking-widest  text-primary mb-4 ${typography.textBase}`}
      >
        CHOOSE A PACKAGE
      </h4>

      <div className="space-y-6">
        {packages.map((pkg) => {
          const committedPkg = selected.find((p) => p.id === pkg.id);
          const liveQty = getQty(pkg.id);
          const isOpen = openQtyFor === pkg.id;

          // While popup is open show live counter values; after Add Room show committed values
          const displayRooms = isOpen
            ? liveQty.rooms
            : committedPkg?.rooms ?? liveQty.rooms;
          const displayAdults = isOpen
            ? liveQty.adults
            : committedPkg?.adults ?? liveQty.adults;
          const displayChildren = isOpen
            ? liveQty.children
            : committedPkg?.children ?? liveQty.children;

          return (
            <div
              key={pkg.id}
              className="border-b last:border-b-0 pb-4 grid grid-cols-1 md:grid-cols-[0.5fr_1fr] gap-1 md:gap-5 items-center relative"
              onClick={() => setOpenDetailsFor(null)}
            >
              <div className="space-y-1 font-arizona-sans-regular">
                <div
                  className={`text-xs lg:text-sm  tracking-widest uppercase`}
                >
                  {pkg.title}
                </div>
                <div className="tracking-[0.15em] text-dark-gray mt-1 text-[10px] lg:text-xs">
                  {pkg.subtitle}
                </div>
                <div className="text-[13px] lg:text-sm backdrop-blur-md bg-silver/30 p-1 text-black inline-block font-arizona-light">
                  {pkg.details}
                </div>
                <div className="mt-2 text-[11px] lg:text-xs font-arizona-light text-dark-gray">
                  ( {pkg.availableRooms ?? 0} room
                  {(pkg.availableRooms ?? 0) !== 1 ? "s" : ""} available )
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
                <div className="space-y-1">
                  <div className="relative inline-block group font-arizona-regular">
                    <div className={`text-[26px] md:text-[36px]`}>
                      {pkg.price}
                    </div>
                    <div
                      className="text-xs text-dark-gray underline cursor-help"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDetailsFor(
                          openDetailsFor === pkg.id ? null : pkg.id
                        );
                      }}
                    >
                      Details
                    </div>
                    <div
                      className={`absolute top-full sm:right-0 z-20 mt-2 w-64 bg-white border border-primary/32 rounded-xs p-2 text-xs lg:text-sm shadow-[-1px_4px_4px_0px_#00000040] transition-opacity text-dark-gray space-y-1 ${
                        openDetailsFor === pkg.id
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      }`}
                    >
                      {pkg.priceBreakdown ? (
                        <>
                          {pkg.priceBreakdown.entries.map((entry, i) => (
                            <div key={i} className="flex justify-between  ">
                              <span>{entry.label}</span>
                              <span>{entry.amount}</span>
                            </div>
                          ))}
                          <div className="flex justify-between items-end  ">
                            <span>
                              Tax &amp; Service
                              <br />
                              Charges
                            </span>
                            <span>{pkg.priceBreakdown.tax}</span>
                          </div>
                          <div className="flex justify-between pt-1  border-t border-gray-300">
                            <span>Total</span>
                            <span>{pkg.priceBreakdown.total}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-semibold mb-1">{pkg.title}</div>
                          {pkg.subtitle && (
                            <div className=" text-dark-gray">
                              {pkg.subtitle}
                            </div>
                          )}
                          {pkg.details && (
                            <div className="mt-2 ">{pkg.details}</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-dark-gray text-[13px] lg:text-sm">
                    {guestLabel(displayRooms, displayAdults, displayChildren)}
                  </div>
                </div>
                <div className="space-y-1 relative font-arizona-sans-regular flex justify-end">
                  {pkg.availableRooms === 0 ? (
                    <button
                      disabled
                      className="bg-gray-200 uppercase border border-gray-300 tracking-[.15em] text-gray-400 px-3 py-1 rounded-xs text-xs lg:text-sm cursor-not-allowed"
                    >
                      No Rooms Left
                    </button>
                  ) : (
                    <button
                      className="bg-primary uppercase border tracking-[.15em] text-white px-3 py-1 rounded-xs text-xs lg:text-sm cursor-pointer"
                      onClick={() => {
                        if (!qty[pkg.id]) {
                          // Seed from the room-level selection, clamped to this package's availability
                          const rooms = Math.min(
                            defaultQty?.rooms ?? 1,
                            pkg.availableRooms ?? 1
                          );
                          const maxGuests = rooms * 4;
                          const adults = Math.min(
                            defaultQty?.adults ?? 1,
                            maxGuests
                          );
                          const children = Math.min(
                            defaultQty?.children ?? 0,
                            maxGuests - adults
                          );
                          setQty((prev) => ({
                            ...prev,
                            [pkg.id]: { rooms, adults, children },
                          }));
                        }
                        setOpenQtyFor(pkg.id);
                      }}
                    >
                      Add Room
                    </button>
                  )}

                  {/* Desktop dropdown */}
                  {isOpen &&
                    (() => {
                      const maxRooms = pkg.availableRooms ?? 1;
                      const maxGuests = liveQty.rooms * 4;
                      const atRoomLimit = liveQty.rooms >= maxRooms;
                      const atGuestLimit =
                        liveQty.adults + liveQty.children >= maxGuests;
                      return (
                        <div className="hidden md:block absolute top-full right-0 z-20 w-92 bg-white border border-primary/32 rounded-xs px-4 pb-4 pt-2 text-sm shadow-[-1px_4px_4px_0px_#00000040] tracking-[.15em]">
                          <button
                            aria-label="Close"
                            className="text-dark-gray text-end w-full mb-1 hover:text-dark-gray text-lg leading-none cursor-pointer"
                            onClick={() => setOpenQtyFor(null)}
                          >
                            ×
                          </button>
                          <Counter
                            label="Rooms"
                            value={liveQty.rooms}
                            min={1}
                            max={maxRooms}
                            onInc={() =>
                              setRoomsCount(pkg.id, liveQty.rooms + 1)
                            }
                            onDec={() =>
                              setRoomsCount(pkg.id, liveQty.rooms - 1)
                            }
                          />
                          {atRoomLimit && (
                            <p className="text-[10px] text-red-500 font-arizona-sans-regular tracking-widest mb-1">
                              Only {maxRooms} room{maxRooms > 1 ? "s" : ""}{" "}
                              available for this package.
                            </p>
                          )}
                          <Counter
                            label="Adults"
                            value={liveQty.adults}
                            min={1}
                            max={liveQty.rooms * 4}
                            incDisabled={atGuestLimit}
                            onInc={() => setAdults(pkg.id, liveQty.adults + 1)}
                            onDec={() => setAdults(pkg.id, liveQty.adults - 1)}
                          />
                          <Counter
                            label="Children"
                            sublabel="0 - 12"
                            value={liveQty.children}
                            min={0}
                            max={liveQty.rooms * 4}
                            incDisabled={atGuestLimit}
                            onInc={() =>
                              setChildren(pkg.id, liveQty.children + 1)
                            }
                            onDec={() =>
                              setChildren(pkg.id, liveQty.children - 1)
                            }
                          />

                          {atGuestLimit && (
                            <p className="text-[10px] text-red-500 font-arizona-sans-regular tracking-widest mt-1">
                              Max {maxGuests} guest{maxGuests > 1 ? "s" : ""}{" "}
                              for {liveQty.rooms} room
                              {liveQty.rooms > 1 ? "s" : ""} (4 per room).
                            </p>
                          )}

                          {/* New */}
                          {liveQty.children > 0 && (
                            <div className="mt-3 border-t border-gray-200 pt-3">
                              <p className="text-xs font-arizona-sans-regular uppercase tracking-[.15em] text-dark-gray mb-4">
                                Age of Children
                              </p>

                              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                {Array.from({ length: liveQty.children }).map(
                                  (_, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between gap-2"
                                    >
                                      <span className="text-xs font-arizona-sans-regular text-dark-gray">
                                        Child {index + 1}
                                      </span>

                                      {/* remove this */}
                                      {/* <select
                                      value={childAges[pkg.id]?.[index] ?? ""}
                                      onChange={(e) =>
                                        setChildAge(pkg.id, index, e.target.value)
                                      }
                                      className="w-24 h-9 border border-gray-300 rounded-md px-2 text-sm font-arizona-sans-regular bg-white"
                                    >
                                      <option value="">Select</option>

                                      {Array.from({ length: 18 }, (_, age) => (
                                        <option key={age} value={age}>
                                          {age} {age === 1 ? "yr" : "yrs"}
                                        </option>
                                      ))}
                                    </select> */}

                                      {/* new */}

                                      <div className="relative">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setOpenChildAge(
                                              openChildAge ===
                                                `${pkg.id}-${index}`
                                                ? null
                                                : `${pkg.id}-${index}`
                                            )
                                          }
                                          className="w-24 h-9 flex items-center justify-between border border-primary bg-white px-2 text-sm text-dark-gray cursor-pointer"
                                        >
                                          <span>
                                            {childAges[pkg.id]?.[index]
                                              ? `${childAges[pkg.id][index]} ${
                                                  childAges[pkg.id][index] ===
                                                  "1"
                                                    ? "yr"
                                                    : "yrs"
                                                }`
                                              : "Select"}
                                          </span>

                                          <ChevronDown
                                            size={14}
                                            className={`transition-transform ${
                                              openChildAge ===
                                              `${pkg.id}-${index}`
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                          />
                                        </button>

                                        {openChildAge ===
                                          `${pkg.id}-${index}` && (
                                          <ul className="absolute top-full left-0 z-50 mt-1 w-24 bg-white border border-primary shadow-sm max-h-48 overflow-y-auto">
                                            {Array.from(
                                              { length: 13 },
                                              (_, age) => (
                                                <li
                                                  key={age}
                                                  onMouseDown={() => {
                                                    setChildAge(
                                                      pkg.id,
                                                      index,
                                                      String(age)
                                                    );
                                                    setOpenChildAge(null);
                                                  }}
                                                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 ${
                                                    childAges[pkg.id]?.[
                                                      index
                                                    ] === String(age)
                                                      ? "bg-primary/10 font-medium"
                                                      : "text-dark-gray"
                                                  }`}
                                                >
                                                  {age}{" "}
                                                  {age === 1 ? "yr" : "yrs"}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>

                              <p className="text-[10px] text-dark-gray font-arizona-sans-regular tracking-wide my-4">
                                A valid ID proof is required for each child at
                                the time of check-in.
                              </p>
                            </div>
                          )}

                          <div className="flex justify-start mt-2">
                            <button
                              className="px-4 py-1 bg-primary text-white rounded-xs text-sm cursor-pointer uppercase tracking-[.15em] font-arizona-sans-regular"
                              onClick={() => {
                                addPackage(
                                  pkg,
                                  liveQty.rooms,
                                  liveQty.adults,
                                  liveQty.children
                                );
                                setOpenQtyFor(null);
                              }}
                            >
                              Add Room
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                  {/* Mobile slide-up sheet */}
                  {isOpen &&
                    typeof document !== "undefined" &&
                    createPortal(
                      (() => {
                        const maxRooms = pkg.availableRooms ?? 1;
                        const maxGuests = liveQty.rooms * 4;
                        const atRoomLimit = liveQty.rooms >= maxRooms;
                        const atGuestLimit =
                          liveQty.adults + liveQty.children >= maxGuests;
                        return (
                          <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
                            {/* backdrop */}
                            <div
                              className="absolute inset-0 bg-black/40"
                              onClick={() => setOpenQtyFor(null)}
                            />
                            {/* sheet */}
                            <div className="relative bg-white rounded-t-2xl px-6 pt-4 pb-8 font-arizona-sans-regular animate-slide-up">
                              <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-2">
                                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                                  {pkg.title}
                                </span>
                                <button
                                  aria-label="Close"
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer mb-1"
                                  onClick={() => setOpenQtyFor(null)}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <Counter
                                label="Rooms"
                                value={liveQty.rooms}
                                min={1}
                                max={maxRooms}
                                onInc={() =>
                                  setRoomsCount(pkg.id, liveQty.rooms + 1)
                                }
                                onDec={() =>
                                  setRoomsCount(pkg.id, liveQty.rooms - 1)
                                }
                              />
                              {atRoomLimit && (
                                <p className="text-[10px] text-red-500 tracking-widest mb-1">
                                  Only {maxRooms} room{maxRooms > 1 ? "s" : ""}{" "}
                                  available for this package.
                                </p>
                              )}
                              <Counter
                                label="Adults"
                                value={liveQty.adults}
                                min={1}
                                max={liveQty.rooms * 4}
                                incDisabled={atGuestLimit}
                                onInc={() =>
                                  setAdults(pkg.id, liveQty.adults + 1)
                                }
                                onDec={() =>
                                  setAdults(pkg.id, liveQty.adults - 1)
                                }
                              />
                              <Counter
                                label="Children"
                                sublabel="0 - 12"
                                value={liveQty.children}
                                min={0}
                                max={liveQty.rooms * 4}
                                incDisabled={atGuestLimit}
                                onInc={() =>
                                  setChildren(pkg.id, liveQty.children + 1)
                                }
                                onDec={() =>
                                  setChildren(pkg.id, liveQty.children - 1)
                                }
                              />

                              {atGuestLimit && (
                                <p className="text-[10px] text-red-500 tracking-widest mt-1">
                                  Max {maxGuests} guest
                                  {maxGuests > 1 ? "s" : ""} for {liveQty.rooms}{" "}
                                  room{liveQty.rooms > 1 ? "s" : ""} (4 per
                                  room).
                                </p>
                              )}

                              {/* new */}
                              {liveQty.children > 0 && (
                                <div className="mt-3 border-t border-gray-200 pt-3">
                                  <p className="text-xs font-arizona-sans-regular uppercase tracking-[.15em] text-dark-gray mb-4">
                                    Age of Children
                                  </p>

                                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    {Array.from({
                                      length: liveQty.children,
                                    }).map((_, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between gap-2"
                                      >
                                        <span className="text-xs font-arizona-sans-regular text-dark-gray">
                                          Child {index + 1}
                                        </span>

                                        <div className="relative">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setOpenChildAge(
                                                openChildAge ===
                                                  `${pkg.id}-${index}`
                                                  ? null
                                                  : `${pkg.id}-${index}`
                                              )
                                            }
                                            className="w-26 h-9 flex items-center justify-between border border-primary bg-white px-2 text-sm text-dark-gray cursor-pointer"
                                          >
                                            <span>
                                              {childAges[pkg.id]?.[index]
                                                ? `${
                                                    childAges[pkg.id][index]
                                                  } ${
                                                    childAges[pkg.id][index] ===
                                                    "1"
                                                      ? "yr"
                                                      : "yrs"
                                                  }`
                                                : "Select"}
                                            </span>

                                            <ChevronDown
                                              size={14}
                                              className={`transition-transform ${
                                                openChildAge ===
                                                `${pkg.id}-${index}`
                                                  ? "rotate-180"
                                                  : ""
                                              }`}
                                            />
                                          </button>

                                          {openChildAge ===
                                            `${pkg.id}-${index}` && (
                                            <ul className="absolute bottom-full left-0 z-[60] mb-1 w-24 bg-white border border-primary shadow-sm max-h-48 overflow-y-auto">
                                              {Array.from(
                                                { length: 13 },
                                                (_, age) => (
                                                  <li
                                                    key={age}
                                                    onMouseDown={() => {
                                                      setChildAge(
                                                        pkg.id,
                                                        index,
                                                        String(age)
                                                      );
                                                      setOpenChildAge(null);
                                                    }}
                                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 ${
                                                      childAges[pkg.id]?.[
                                                        index
                                                      ] === String(age)
                                                        ? "bg-primary/10 font-medium"
                                                        : "text-dark-gray"
                                                    }`}
                                                  >
                                                    {age}{" "}
                                                    {age === 1 ? "yr" : "yrs"}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <p className="text-[10px] text-dark-gray font-arizona-sans-regular tracking-wide mt-4">
                                    A valid ID proof is required for each child
                                    at the time of check-in.
                                  </p>
                                </div>
                              )}

                              <button
                                className="mt-4 w-full py-3 bg-primary text-white uppercase tracking-[.15em] text-sm cursor-pointer font-arizona-sans-regular"
                                onClick={() => {
                                  addPackage(
                                    pkg,
                                    liveQty.rooms,
                                    liveQty.adults,
                                    liveQty.children
                                  );
                                  setOpenQtyFor(null);
                                }}
                              >
                                Add Room
                              </button>
                            </div>
                          </div>
                        );
                      })(),
                      document.body
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
