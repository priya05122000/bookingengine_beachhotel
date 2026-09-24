"use client";

import React from "react";
import { PackageItem } from "./types";
import PackageList, { Counter, QtyState } from "./PackageList";
import PriceSidebar from "./PriceSidebar";
import RoomDetailsModal from "./RoomDetailsModal";
import { typography } from "@/src/lib/typography";
import {
  Flower2,
  Sofa,
  Wifi,
  ChevronUp,
  ChevronDown,
  X,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { parsePrice, formatINR } from "@/src/lib/priceUtils";
import { useModalClose } from "@/src/hooks/useModalClose";

const ADULTS_PER_ROOM = 2;
const CHILDREN_PER_ROOM = 3;
const MAX_CHILD_AGE = 17;
const FULL_ROOM_CHILD_AGE_LIMIT = 14;
// Shared width for the Rooms, Adults, Children and child age controls
const FIELD_WIDTH = "w-32 md:w-26 lg:w-32";
// FIELD_WIDTH from sm up only, so the mobile grid cell sets the width below sm
const FIELD_WIDTH_SM_UP = "sm:w-32 md:w-26 lg:w-32";
// Mobile compact table: Adults | Children under a ROOM heading
const MOBILE_ROW = "grid grid-cols-2 items-center gap-3";

type RoomGuests = { adults: number; children: number; ages: (string | null)[] };

const newRoomGuests = (): RoomGuests => ({ adults: 1, children: 0, ages: [] });

// A room may hold 3 children only if every child is under FULL_ROOM_CHILD_AGE_LIMIT
const isRoomInvalid = (g: RoomGuests) =>
  g.children === CHILDREN_PER_ROOM &&
  g.ages
    .slice(0, g.children)
    .some((a) => a != null && Number(a) >= FULL_ROOM_CHILD_AGE_LIMIT);

type Props = {
  showPackages: boolean;
  setShowPackages: (v: boolean) => void;
  onEdit: () => void;
};

export default function SelectRoomSection({
  showPackages: _showPackages,
  setShowPackages: _setShowPackages,
  onEdit,
}: Props) {
  const [showDetails, setShowDetails] = React.useState(false);
  const [selected, setSelected] = React.useState<
    (PackageItem & {
      rooms: number;
      adults: number;
      children: number;
    })[]
  >([]);
  const [openQtyFor, setOpenQtyFor] = React.useState<string | null>(null);
  const [openPackagesFor, setOpenPackagesFor] = React.useState<string | null>(
    null
  );
  const [openRoomQtyFor, setOpenRoomQtyFor] = React.useState<string | null>(
    null
  );
  const [roomQty, setRoomQty] = React.useState<Record<string, QtyState>>({});
  const [roomGuests, setRoomGuests] = React.useState<
    Record<string, RoomGuests[]>
  >({});
  const [roomCounts, setRoomCounts] = React.useState<Record<string, number>>(
    {}
  );
  const [openRoomChildAge, setOpenRoomChildAge] = React.useState<string | null>(
    null
  );
  const [promo, setPromo] = React.useState("");
  const [showPriceSheet, setShowPriceSheet] = React.useState(false);
  const { closing: closingSheet, triggerClose: closePriceSheet } =
    useModalClose({
      onClose: () => setShowPriceSheet(false),
    });

  function openPriceSheet() {
    setShowPriceSheet(true);
  }

  const totalAmount = React.useMemo(
    () => selected.reduce((sum, s) => sum + parsePrice(s.price), 0),
    [selected]
  );

  React.useEffect(() => {
    document.body.style.overflow = showPriceSheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPriceSheet]);

  const rooms = [
    {
      id: "r1",
      image: "/images/Rectangle.png",
      name: "ECONOMY",
      subtitle: "SEA VIEW & SUNSET VIEW",
      availableRooms: 3,
      amenities: [
        { icon: "Flower2", label: "BALCONY" },
        { icon: "Sofa", label: "WALKOUT SPACE" },
        { icon: "Wifi", label: "FREE WIFI" },
      ],
      price: "INR 8,999",
      packages: [
        {
          id: "r1-p1",
          title: "ECONOMY",
          subtitle: "SEA VIEW",
          price: "INR 6,578",
          details: "Breakfast Included",
          availableRooms: 2,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 5,574.58" }],
            tax: "INR 1,003.42",
            total: "INR 6,578.00",
          },
        },
        {
          id: "r1-p2",
          title: "ROOM ONLY",
          subtitle: "SEA VIEW",
          price: "INR 5,200",
          details: "No Meals",
          availableRooms: 1,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 4,406.78" }],
            tax: "INR 793.22",
            total: "INR 5,200.00",
          },
        },
        {
          id: "r1-p3",
          title: "NON REFUNDABLE",
          subtitle: "SEA VIEW",
          price: "INR 4,999",
          details: "Breakfast Included",
          availableRooms: 0,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 4,236.44" }],
            tax: "INR 762.56",
            total: "INR 4,999.00",
          },
        },
      ] as PackageItem[],
    },
    {
      id: "r2",
      image: "/images/Rectangle.png",
      name: "DELUXE",
      subtitle: "OCEAN VIEW & GARDEN VIEW",
      availableRooms: 0,
      amenities: [
        { icon: "Flower2", label: "PRIVATE TERRACE" },
        { icon: "Sofa", label: "LIVING AREA" },
        { icon: "Wifi", label: "FREE WIFI" },
      ],
      price: "INR 12,999",
      packages: [
        {
          id: "r2-p1",
          title: "DELUXE B&B",
          subtitle: "OCEAN VIEW",
          price: "INR 10,578",
          details: "Breakfast Included",
          availableRooms: 0,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 8,964.41" }],
            tax: "INR 1,613.59",
            total: "INR 10,578.00",
          },
        },
        {
          id: "r2-p2",
          title: "ROOM ONLY",
          subtitle: "OCEAN VIEW",
          price: "INR 9,200",
          details: "No Meals",
          availableRooms: 0,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 7,796.61" }],
            tax: "INR 1,403.39",
            total: "INR 9,200.00",
          },
        },
        {
          id: "r2-p3",
          title: "NON REFUNDABLE",
          subtitle: "OCEAN VIEW",
          price: "INR 8,500",
          details: "Breakfast Included",
          availableRooms: 0,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 7,203.39" }],
            tax: "INR 1,296.61",
            total: "INR 8,500.00",
          },
        },
      ] as PackageItem[],
    },
    {
      id: "r3",
      image: "/images/Rectangle.png",
      name: "SUITE",
      subtitle: "PANORAMIC SEA VIEW",
      availableRooms: 1,
      amenities: [
        { icon: "Flower2", label: "PRIVATE POOL" },
        { icon: "Sofa", label: "LOUNGE SPACE" },
        { icon: "Wifi", label: "FREE WIFI" },
      ],
      price: "INR 18,999",
      packages: [
        {
          id: "r3-p1",
          title: "SUITE FULL BOARD",
          subtitle: "PANORAMIC VIEW",
          price: "INR 16,578",
          details: "All Meals Included",
          availableRooms: 1,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 14,049.15" }],
            tax: "INR 2,528.85",
            total: "INR 16,578.00",
          },
        },
        {
          id: "r3-p2",
          title: "ROOM ONLY",
          subtitle: "PANORAMIC VIEW",
          price: "INR 14,500",
          details: "No Meals",
          availableRooms: 0,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 12,288.14" }],
            tax: "INR 2,211.86",
            total: "INR 14,500.00",
          },
        },
        {
          id: "r3-p3",
          title: "NON REFUNDABLE",
          subtitle: "PANORAMIC VIEW",
          price: "INR 13,200",
          details: "Breakfast Included",
          availableRooms: 0,
          priceBreakdown: {
            entries: [{ label: "Jul 1", amount: "INR 11,186.44" }],
            tax: "INR 2,013.56",
            total: "INR 13,200.00",
          },
        },
      ] as PackageItem[],
    },
  ];

  // All room rows ever filled in for this room type, including ones hidden by
  // lowering the room count, so re-adding a room restores its guests and ages
  function getAllRoomGuests(roomTypeId: string, minLength = 1): RoomGuests[] {
    const all = roomGuests[roomTypeId] ?? [];
    return all.length >= minLength
      ? all
      : [
          ...all,
          ...Array.from({ length: minLength - all.length }, newRoomGuests),
        ];
  }

  function getRoomGuests(roomTypeId: string): RoomGuests[] {
    const count = roomCounts[roomTypeId] ?? 1;
    return getAllRoomGuests(roomTypeId, count).slice(0, count);
  }

  function setRoomCount(roomTypeId: string, count: number) {
    const all = getAllRoomGuests(roomTypeId, count);
    setRoomGuests((prev) => ({ ...prev, [roomTypeId]: all }));
    setRoomCounts((prev) => ({ ...prev, [roomTypeId]: count }));
  }

  function updateRoomGuests(
    roomTypeId: string,
    roomIndex: number,
    patch: Partial<RoomGuests>
  ) {
    const next = getAllRoomGuests(roomTypeId, roomIndex + 1).map((g, i) =>
      i === roomIndex ? { ...g, ...patch } : g
    );
    setRoomGuests((prev) => ({ ...prev, [roomTypeId]: next }));
  }

  function setChildAge(
    roomTypeId: string,
    roomIndex: number,
    childIndex: number,
    age: string
  ) {
    const ages = [...getRoomGuests(roomTypeId)[roomIndex].ages];
    ages[childIndex] = age;
    updateRoomGuests(roomTypeId, roomIndex, { ages });
  }

  function toggleRoomQty(roomId: string) {
    setOpenRoomQtyFor((prev) => (prev === roomId ? null : roomId));
  }

  function confirmRoomQty(room: {
    id: string;
    name: string;
    subtitle: string;
    price: string;
  }) {
    const guests = getRoomGuests(room.id);
    const totals = {
      rooms: guests.length,
      adults: guests.reduce((sum, g) => sum + g.adults, 0),
      children: guests.reduce((sum, g) => sum + g.children, 0),
    };
    // Totals seed the package picker
    setRoomQty((prev) => ({ ...prev, [room.id]: totals }));

    // Add the room at its "From" nightly rate to the price summary; choosing a
    // package for this room later replaces this line (see PackageList below)
    const nightly = parsePrice(room.price);
    addPackage(
      {
        id: room.id,
        title: room.name,
        subtitle: room.subtitle,
        details: `${room.price} x ${totals.rooms} Room${totals.rooms > 1 ? "s" : ""}`,
        price: `INR ${formatINR(nightly * totals.rooms)}`,
      },
      totals.rooms,
      totals.adults,
      totals.children
    );

    setOpenRoomQtyFor(null);
  }

  function addPackage(
    pkg: PackageItem,
    rooms: number,
    adults: number,
    children: number
  ) {
    setSelected((s) => {
      const exists = s.some((p) => p.id === pkg.id);
      const entry = { ...pkg, rooms, adults, children };
      return exists
        ? s.map((p) => (p.id === pkg.id ? entry : p))
        : [...s, entry];
    });
    setOpenQtyFor(null);
  }

  function removePackage(id: string) {
    setSelected((s) => s.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-105 pb-3 md:pb-0">
      {showDetails && (
        <RoomDetailsModal onClose={() => setShowDetails(false)} />
      )}
      {/* Top bar */}
      <div className="flex  flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between mb-6">
        <div
          className={`text-dark-gray font-arizona-sans-regular tracking-widest w-full ${typography.textXl}`}
        >
          22 JUN, 2026 - 22 JUN, 2026
        </div>

        <div className="flex items-center w-full font-arizona-sans-regular justify-between  sm:justify-end gap-3">
          <div
            className={`text-dark-gray text-xs lg:text-sm tracking-[.15em] `}
          >
            1 NIGHT | 1 ROOM , 2 ADULT
          </div>
          <button
            onClick={onEdit}
            className="text-xs lg:text-sm tracking-[.15em] uppercase  px-4 h-8 border border-primary text-primary rounded-xs cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid xl:grid-cols-[1fr_360px] gap-6 sm:gap-10 ">
        {/* Left: room cards + packages */}
        <div className="flex flex-col gap-6">
          {rooms.map((room) => {
            const amenityIcons: Record<string, React.ReactNode> = {
              Flower2: <Flower2 size={22} strokeWidth={1.5} />,
              Sofa: <Sofa size={22} strokeWidth={1.5} />,
              Wifi: <Wifi size={22} strokeWidth={1.5} />,
            };

            return (
              <div
                key={room.id}
                className="flex flex-col gap-6 bg-white p-3 shadow-[-1px_4px_4px_0px_#00000040]"
              >
                <div className="grid sm:grid-cols-12 gap-6">
                  <div className="relative md:col-span-8 shrink-0 rounded-xs overflow-hidden shadow-sm">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-40 sm:h-full object-cover"
                    />
                    <button
                      onClick={() => setShowDetails(true)}
                      className={`absolute top-4 right-4 backdrop-blur-md bg-accent/51 text-white ${typography.textSm} px-3 py-1 rounded cursor-pointer font-arizona-light`}
                    >
                      View Details
                    </button>
                  </div>

                  <div className="md:col-span-4">
                    <div className="font-arizona-sans-regular space-y-2">
                      <div
                        className={`${typography.textXl} tracking-widest mt-1`}
                      >
                        {room.name}
                      </div>
                      <div className="tracking-[0.15em] text-dark-gray mt-1 text-[10px] lg:text-xs">
                        {room.subtitle}
                      </div>

                      <ul className="mt-4 mb-4 md:mb-10 tracking-[0.15em] space-y-4  text-dark-gray text-[10px] lg:text-xs">
                        {room.amenities.map((amenity) => (
                          <li
                            key={amenity.label}
                            className="flex items-center gap-2"
                          >
                            <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs">
                              {amenityIcons[amenity.icon]}
                            </span>
                            {amenity.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tracking-[.04em]">
                      <div className="text-[13px] text-sm text-dark-gray font-arizona-light">
                        From
                      </div>
                      <div
                        className={`text-[28px] md:text-[36px] font-arizona-regular`}
                      >
                        {room.price}
                        <span className="text-[15px] lg:text-base font-arizona-light text-dark-gray">
                          /night
                        </span>
                      </div>
                      <div className="text-[11px] lg:text-xs font-arizona-light text-dark-gray">
                        subject to GST and charges
                      </div>
                    </div>
                    <div className="mt-4 text-[11px] lg:text-xs font-arizona-light text-dark-gray">
                      ( Only {room.availableRooms} room
                      {room.availableRooms !== 1 ? "s" : ""} available in this
                      category. )
                    </div>
                    {room.availableRooms === 0 ? (
                      <button
                        disabled
                        className="mt-4 bg-gray-200 text-gray-400 px-4 h-10 rounded-xs font-arizona-sans-regular uppercase text-xs lg:text-sm tracking-[0.15em] cursor-not-allowed"
                      >
                        Rooms Unavailable
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleRoomQty(room.id)}
                        className="mt-4 bg-primary text-white px-4 py-1 rounded-xs font-arizona-sans-regular uppercase text-xs lg:text-sm tracking-[0.15em] cursor-pointer"
                      >
                        Add Room
                      </button>
                    )}
                  </div>
                </div>

                {openRoomQtyFor === room.id &&
                  (() => {
                    const guests = getRoomGuests(room.id);
                    const hasInvalidRoom = guests.some(isRoomInvalid);
                    return (
                      <div className="rounded-xs text-sm tracking-[.15em]">
                        <div className="flex items-center justify-between mb-4">
                          <h4
                            className={`text-base lg:text-xl font-arizona-sans-regular tracking-widest text-primary ${typography.textBase}`}
                          >
                            ROOMS &amp; GUESTS
                          </h4>
                          <button
                            aria-label="Close"
                            className="text-dark-gray text-lg leading-none cursor-pointer"
                            onClick={() => setOpenRoomQtyFor(null)}
                          >
                            ×
                          </button>
                        </div>
                        <div>
                          <div className="w-full">
                            <div className="mt-1 border border-gray-200 rounded-md px-3">
                              {/* Same stacked counter and width as Adults/Children:
                                  half the row on mobile, FIELD_WIDTH from sm up */}
                              <div className={`${MOBILE_ROW} sm:flex py-2 border-b border-gray-100`}>
                                <div className={FIELD_WIDTH_SM_UP}>
                                  <Counter
                                    stacked
                                    label="Rooms"
                                    value={guests.length}
                                    min={1}
                                    max={room.availableRooms}
                                    onInc={() =>
                                      setRoomCount(room.id, guests.length + 1)
                                    }
                                    onDec={() =>
                                      setRoomCount(room.id, guests.length - 1)
                                    }
                                  />
                                </div>
                              </div>
                              {guests.map((g, r) => {
                                const fullRoom =
                                  g.children === CHILDREN_PER_ROOM;
                                // A child aged 14+ caps the room at 2 children
                                const hasOlderChild = g.ages
                                  .slice(0, g.children)
                                  .some(
                                    (a) =>
                                      a != null &&
                                      Number(a) >= FULL_ROOM_CHILD_AGE_LIMIT
                                  );
                                const childCapReached =
                                  hasOlderChild &&
                                  g.children >= CHILDREN_PER_ROOM - 1;
                                return (
                                  <div
                                    key={r}
                                    className="py-2 border-b border-gray-100 last:border-b-0"
                                  >
                                    <div className="hidden sm:flex flex-wrap items-end gap-x-3 gap-y-1">
                                      <span className="w-full pt-1 text-xs font-arizona-sans-regular uppercase tracking-[.15em] text-primary">
                                        Room {r + 1}
                                      </span>
                                      <div className={FIELD_WIDTH}>
                                        <Counter
                                          stacked
                                          label="Adults"
                                          value={g.adults}
                                          min={1}
                                          max={ADULTS_PER_ROOM}
                                          onInc={() =>
                                            updateRoomGuests(room.id, r, {
                                              adults: g.adults + 1,
                                            })
                                          }
                                          onDec={() =>
                                            updateRoomGuests(room.id, r, {
                                              adults: g.adults - 1,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className={FIELD_WIDTH}>
                                        <Counter
                                          stacked
                                          label="Children"
                                          sublabel={`0 - ${MAX_CHILD_AGE}`}
                                          value={g.children}
                                          min={0}
                                          max={CHILDREN_PER_ROOM}
                                          incDisabled={childCapReached}
                                          onInc={() =>
                                            updateRoomGuests(room.id, r, {
                                              children: g.children + 1,
                                            })
                                          }
                                          onDec={() =>
                                            updateRoomGuests(room.id, r, {
                                              children: g.children - 1,
                                            })
                                          }
                                        />
                                      </div>
                                      {Array.from(
                                        { length: g.children },
                                        (_, c) => {
                                          const key = `${room.id}-${r}-${c}`;
                                          const age = g.ages[c];
                                          return (
                                            <div
                                              key={c}
                                              className={`${FIELD_WIDTH} flex flex-col gap-1.5 py-2`}
                                            >
                                              <span className="text-[10px] font-arizona-sans-regular text-dark-gray whitespace-nowrap uppercase">
                                                Child {c + 1}
                                              </span>
                                              <div className="relative">
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    setOpenRoomChildAge(
                                                      openRoomChildAge === key
                                                        ? null
                                                        : key
                                                    )
                                                  }
                                                  className="w-full h-7 flex items-center justify-between border border-primary bg-white px-2 text-sm text-dark-gray cursor-pointer"
                                                >
                                                  <span>
                                                    {age
                                                      ? `${age} ${
                                                          age === "1"
                                                            ? "yr"
                                                            : "yrs"
                                                        }`
                                                      : "Select"}
                                                  </span>
                                                  <ChevronDown
                                                    size={14}
                                                    className={`transition-transform ${
                                                      openRoomChildAge === key
                                                        ? "rotate-180"
                                                        : ""
                                                    }`}
                                                  />
                                                </button>
                                                {openRoomChildAge === key && (
                                                  <ul className="absolute top-full left-0 z-30 mt-1 w-full bg-white border border-primary shadow-sm max-h-48 overflow-y-auto">
                                                    {Array.from(
                                                      {
                                                        // With 3 children, only ages below the limit are allowed
                                                        length: fullRoom
                                                          ? FULL_ROOM_CHILD_AGE_LIMIT
                                                          : MAX_CHILD_AGE + 1,
                                                      },
                                                      (_, a) => (
                                                        <li
                                                          key={a}
                                                          onMouseDown={() => {
                                                            setChildAge(
                                                              room.id,
                                                              r,
                                                              c,
                                                              String(a)
                                                            );
                                                            setOpenRoomChildAge(
                                                              null
                                                            );
                                                          }}
                                                          className={`px-3 py-2 text-sm cursor-pointer  ${
                                                            age === String(a)
                                                              ? "bg-primary/10 font-medium"
                                                              : "text-dark-gray"
                                                          }`}
                                                        >
                                                          {a}{" "}
                                                          {a === 1
                                                            ? "yr"
                                                            : "yrs"}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>

                                    {/* Mobile: compact table row */}
                                    <div className="sm:hidden">
                                      <span className="block pt-1 pb-2 text-xs font-arizona-sans-regular uppercase tracking-[.15em] text-primary">
                                        Room {r + 1}
                                      </span>
                                      <div className={MOBILE_ROW}>
                                        <Counter
                                          stacked
                                          label="Adults"
                                          value={g.adults}
                                          min={1}
                                          max={ADULTS_PER_ROOM}
                                          onInc={() =>
                                            updateRoomGuests(room.id, r, {
                                              adults: g.adults + 1,
                                            })
                                          }
                                          onDec={() =>
                                            updateRoomGuests(room.id, r, {
                                              adults: g.adults - 1,
                                            })
                                          }
                                        />
                                        <Counter
                                          stacked
                                          label="Children"
                                          sublabel={`0 - ${MAX_CHILD_AGE}`}
                                          value={g.children}
                                          min={0}
                                          max={CHILDREN_PER_ROOM}
                                          incDisabled={childCapReached}
                                          onInc={() =>
                                            updateRoomGuests(room.id, r, {
                                              children: g.children + 1,
                                            })
                                          }
                                          onDec={() =>
                                            updateRoomGuests(room.id, r, {
                                              children: g.children - 1,
                                            })
                                          }
                                        />
                                      </div>
                                      {g.children > 0 && (
                                        <div
                                          // 1–2 children line up with the Adults/Children counters; 3 share the row
                                          className={`mt-1 grid gap-2 ${g.children === CHILDREN_PER_ROOM ? "grid-cols-3" : "grid-cols-2"}`}
                                        >
                                          {Array.from(
                                            { length: g.children },
                                            (_, c) => {
                                              // "m-" keeps mobile keys apart from the desktop dropdowns
                                              const key = `m-${room.id}-${r}-${c}`;
                                              const age = g.ages[c];
                                              return (
                                                <div
                                                  key={c}
                                                  className="flex flex-col gap-1.5 py-2"
                                                >
                                                  <span className="text-[10px] font-arizona-sans-regular uppercase tracking-[.15em] text-dark-gray">
                                                    Child {c + 1}
                                                  </span>
                                                  <div className="relative">
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        setOpenRoomChildAge(
                                                          openRoomChildAge === key
                                                            ? null
                                                            : key
                                                        )
                                                      }
                                                      className="w-full h-7 flex items-center justify-between border border-primary bg-white pl-2 pr-2 text-xs text-dark-gray cursor-pointer"
                                                    >
                                                      <span>
                                                        {age
                                                          ? `${age} ${age === "1" ? "yr" : "yrs"}`
                                                          : "Age"}
                                                      </span>
                                                      <ChevronDown
                                                        size={12}
                                                        className={`transition-transform ${openRoomChildAge === key ? "rotate-180" : ""}`}
                                                      />
                                                    </button>
                                                    {openRoomChildAge === key && (
                                                      <ul className="absolute top-full left-0 z-30 mt-1 w-full bg-white border border-primary shadow-sm max-h-48 overflow-y-auto overscroll-contain">
                                                        {Array.from(
                                                          {
                                                            // With 3 children, only ages below the limit are allowed
                                                            length: fullRoom
                                                              ? FULL_ROOM_CHILD_AGE_LIMIT
                                                              : MAX_CHILD_AGE + 1,
                                                          },
                                                          (_, a) => (
                                                            <li
                                                              key={a}
                                                              onClick={() => {
                                                                setChildAge(
                                                                  room.id,
                                                                  r,
                                                                  c,
                                                                  String(a)
                                                                );
                                                                setOpenRoomChildAge(
                                                                  null
                                                                );
                                                              }}
                                                              className={`px-2 py-2 text-xs cursor-pointer hover:bg-primary/10 ${age === String(a) ? "bg-primary/10 font-medium" : "text-dark-gray"}`}
                                                            >
                                                              {a}{" "}
                                                              {a === 1 ? "yr" : "yrs"}
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    )}
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    {fullRoom && (
                                      <p className="text-[10px] font-arizona-sans-regular tracking-wide mt-1 text-red-500">
                                        {isRoomInvalid(g)
                                          ? `${CHILDREN_PER_ROOM} children are allowed in a room only when all are below ${FULL_ROOM_CHILD_AGE_LIMIT} years. With a child aged ${FULL_ROOM_CHILD_AGE_LIMIT}+, only ${
                                              CHILDREN_PER_ROOM - 1
                                            } children can stay in this room — add another room or reduce children.`
                                          : `If ${CHILDREN_PER_ROOM} children are selected, all ${CHILDREN_PER_ROOM} children must be under ${FULL_ROOM_CHILD_AGE_LIMIT} years old.`}
                                      </p>
                                    )}
                                    {!fullRoom && childCapReached && (
                                      <p className="text-[10px] font-arizona-sans-regular tracking-wide mt-1 text-red-500">
                                        A child aged {FULL_ROOM_CHILD_AGE_LIMIT}
                                        + is selected, so this room can have
                                        only {CHILDREN_PER_ROOM - 1} children.
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                            <p className="text-[10px] text-dark-gray font-arizona-sans-regular tracking-wide">
                              A valid ID proof is required for each child at the
                              time of check-in.
                            </p>
                            <button
                              disabled={hasInvalidRoom}
                              className="self-end shrink-0 px-4 py-1 bg-primary text-white rounded-xs text-sm cursor-pointer uppercase tracking-[.15em] font-arizona-sans-regular disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                              onClick={() => confirmRoomQty(room)}
                            >
                              Add Room
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                {openPackagesFor === room.id && (
                  <PackageList
                    packages={room.packages}
                    selected={selected}
                    openQtyFor={openQtyFor}
                    setOpenQtyFor={setOpenQtyFor}
                    addPackage={(pkg, rooms, adults, children) => {
                      // A chosen package replaces the room's "From" rate line
                      removePackage(room.id);
                      addPackage(pkg, rooms, adults, children);
                    }}
                    defaultQty={roomQty[room.id]}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Login card — mobile only (desktop sees it inside PriceSidebar) */}
        <div className="xl:hidden bg-white shadow-[1px_4px_4px_0px_#00000040] p-3">
          <div className="bg-primary/4 p-4 rounded-xs">
            <div className="text-xs font-arizona-sans-regular tracking-widest mb-3">
              <Link
                href="/signin"
                className="mr-1 text-xs underline underline-offset-4 text-primary cursor-pointer"
              >
                LOGIN
              </Link>
              or
              <Link
                href="/signup"
                className="ml-1 text-xs underline underline-offset-4 text-primary cursor-pointer"
              >
                SIGN UP
              </Link>
            </div>
            <ul className="text-xs tracking-wide text-dark-gray space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-accent">
                  <CheckCheck className="w-4 h-4" />
                </span>
                Get access to Secret Deals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">
                  <CheckCheck className="w-4 h-4" />
                </span>
                Earn member benefits
              </li>
            </ul>
          </div>
        </div>

        {/* Right: sidebar — desktop only */}
        <div className="hidden xl:block sticky top-20 self-start">
          <PriceSidebar
            selected={selected}
            removePackage={removePackage}
            promo={promo}
            setPromo={setPromo}
          />
        </div>
      </div>

      {/* Mobile slide-up sheet */}
      {showPriceSheet && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/50 xl:hidden cursor-pointer ${
              closingSheet ? "animate-fade-out" : "animate-fade-in"
            }`}
            onClick={closePriceSheet}
          />
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 xl:hidden bg-white rounded-t-2xl shadow-[0_-4px_24px_0_rgba(0,0,0,0.18)] flex flex-col max-h-[80vh] ${
              closingSheet ? "animate-slide-down" : "animate-slide-up"
            }`}
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 shrink-0">
              <div className="flex flex-col">
                <span className="text-[10px] font-arizona-sans-regular tracking-widest text-dark-gray uppercase">
                  Price Details
                </span>
                <span className="text-base font-arizona-regular text-primary tracking-widest">
                  &#8377; {formatINR(totalAmount)}
                </span>
              </div>
              <button
                onClick={closePriceSheet}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
                aria-label="Close price details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <PriceSidebar
                selected={selected}
                removePackage={removePackage}
                promo={promo}
                setPromo={setPromo}
                hideLoginCard
              />
            </div>
          </div>
        </>
      )}

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 xl:hidden bg-white border-t border-gray-200 shadow-[0_-2px_8px_0_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between px-4 py-2 gap-3">
          <button
            type="button"
            onClick={openPriceSheet}
            className="flex items-center gap-2 cursor-pointer min-w-0 flex-1"
            aria-label="View price details"
          >
            <div className="flex flex-col items-baseline">
              <span className="text-[10px] font-arizona-sans-regular tracking-widest text-dark-gray uppercase">
                Total
              </span>
              <div className="text-lg font-arizona-regular text-primary tracking-widest flex items-center gap-1">
                <span>&#8377; {formatINR(totalAmount)}</span>
                <ChevronUp className="w-4 h-4 text-primary shrink-0" />
              </div>
            </div>
          </button>
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("search:check-availability", {
                  detail: { step: 2 },
                })
              )
            }
            className={`shrink-0 h-10 px-6 rounded-xs font-arizona-sans-regular tracking-widest text-xs uppercase ${
              selected.length > 0
                ? "bg-primary text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}
