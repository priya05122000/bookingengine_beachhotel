import { typography } from '@/src/lib/typography';
import { Minus, Plus, X } from "lucide-react";
import { useState } from 'react';

export interface Room {
    rooms: number;
    adults: number;
    children: number;
}

interface RoomsAndGuestsProps {
    rooms: Room[];
    setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
    iataOpen: boolean;
    setIataOpen: React.Dispatch<React.SetStateAction<boolean>>;
    iataCode: string;
    setIataCode: React.Dispatch<React.SetStateAction<string>>;
    onCheckAvailability: () => void;
}

function Counter({
    label,
    sublabel,
    value,
    min,
    incDisabled,
    onInc,
    onDec,
}: {
    label: string;
    sublabel?: string;
    value: number;
    min: number;
    incDisabled?: boolean;
    onInc: () => void;
    onDec: () => void;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-xs lg:text-sm  font-arizona-sans-regular uppercase tracking-[.15em] text-dark-gray ">{label}</p>
                {sublabel && <p className="text-[10px] lg:text-xs text-silver font-arizona-sans-regular tracking-[0.15em]">{sublabel}</p>}
            </div>
            <div className="flex items-center gap-3 border border-primary font-arizona" >
                <button
                    onClick={onDec}
                    disabled={value <= min}
                    className={`w-7 h-7 flex items-center ${typography.textLg}  justify-center text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray transition-colors`}
                >
                    <Minus size={12} />
                </button>
                <span className={`text-sm text-primary w-4 text-center  ${typography.textLg}`}>{value}</span>
                <button
                    onClick={onInc}
                    disabled={incDisabled}
                    className={`w-7 h-7  flex items-center justify-center text-primary cursor-pointer hover:bg-gray transition-colors ${typography.textLg} disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                    <Plus size={12} />
                </button>
            </div>
        </div>
    );
}

const GUESTS_PER_ROOM = 4;
const MAX_ROOMS = 4;

export default function RoomsAndGuests({
    rooms,
    setRooms,
    iataOpen,
    setIataOpen,
    iataCode,
    setIataCode,
    onCheckAvailability,
}: RoomsAndGuestsProps) {
    const updateRoom = (
        index: number,
        field: keyof Room,
        delta: number
    ) => {
        setRooms((prev) =>
            prev.map((r, i) => {
                if (i !== index) return r;
                const newValue = r[field] + delta;
                const minValue = field === "adults" ? 1 : 0;
                if (newValue < minValue) return r;

                if (field === "rooms") {
                    const newMax = newValue * GUESTS_PER_ROOM;
                    const currentTotal = r.adults + r.children;
                    if (currentTotal > newMax) {
                        const newChildren = Math.max(0, newMax - r.adults);
                        const newAdults = Math.max(1, newMax - newChildren);
                        return { ...r, rooms: newValue, adults: newAdults, children: newChildren };
                    }
                    return { ...r, rooms: newValue };
                }

                if ((field === "adults" || field === "children") && delta > 0) {
                    const maxGuests = r.rooms * GUESTS_PER_ROOM;
                    const newTotal =
                        (field === "adults" ? newValue : r.adults) +
                        (field === "children" ? newValue : r.children);
                    if (newTotal > maxGuests) return r;
                }

                return { ...r, [field]: newValue };
            })
        );
    };

    const removeRoom = (index: number) => {
        setRooms((prev) => prev.filter((_, i) => i !== index));
    };


    const handleCheckAvailability = () => {
        onCheckAvailability();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    // promo code state (fixes undefined `promo` used in the input)
    const [promo, setPromo] = useState<string>('');


    return (
        <div className="border border-gray p-4 md:p-5 h-full flex flex-col">
            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2">
                {rooms.map((room, i) => (
                    <div key={i} className="mb-4">
                        {/* <div className="flex items-center justify-between mb-1">
                            <p className={`${typography.textLg} uppercase tracking-[0.04em]  text-dark-gray font-arizona-light`}>
                                Room {i + 1}
                            </p>

                            {rooms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRoom(i)}
                                    aria-label={`Remove room ${i + 1}`}
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-silver hover:text-red-500 transition-colors cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div> */}

                        {(() => {
                            const maxGuests = room.rooms * GUESTS_PER_ROOM;
                            const totalGuests = room.adults + room.children;
                            const atGuestLimit = totalGuests >= maxGuests;
                            const atRoomLimit = room.rooms >= MAX_ROOMS;
                            return (
                                <>
                                    <Counter
                                        label="Rooms"
                                        value={room.rooms}
                                        min={1}
                                        incDisabled={atRoomLimit}
                                        onInc={() => updateRoom(i, 'rooms', 1)}
                                        onDec={() => updateRoom(i, 'rooms', -1)}
                                    />

                                    {atRoomLimit && (
                                        <p className="text-[10px]  text-red-500 font-arizona-sans-regular tracking-widest mb-1">
                                            Secure your stay soon — only {MAX_ROOMS} rooms are still available.
                                        </p>
                                    )}

                                    <Counter
                                        label="Adults"
                                        value={room.adults}
                                        min={1}
                                        incDisabled={atGuestLimit}
                                        onInc={() => updateRoom(i, 'adults', 1)}
                                        onDec={() => updateRoom(i, 'adults', -1)}
                                    />

                                    <Counter
                                        label="Children"
                                        sublabel="0-12 Years"
                                        value={room.children}
                                        min={0}
                                        incDisabled={atGuestLimit}
                                        onInc={() => updateRoom(i, 'children', 1)}
                                        onDec={() => updateRoom(i, 'children', -1)}
                                    />

                                    {atGuestLimit && (
                                        <p className="mt-1 text-[10px] font-arizona-sans-regular tracking-widest text-red-500">
                                            No additional guests can be accommodated ({room.rooms} room{room.rooms > 1 ? "s" : ""} × {GUESTS_PER_ROOM} persons per room).
                                        </p>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                ))}

                {/* Add Room */}
                {/* <button
                    onClick={() =>
                        setRooms(prev => [...prev, { adults: 1, children: 0 }])
                    }
                    className="text-sm uppercase tracking-widest text-dark-gray font-semibold  mt-3"
                >
                    Add Another Room +
                </button> */}

                {/* IATA Code */}
                <div className="mt-4 pt-3">
                    {/* <button
                        onClick={() => setIataOpen(o => !o)}
                        className="flex items-center justify-between w-full text-sm uppercase tracking-widest text-dark-gray font-semibold"
                    >
                        <span>IATA Code</span>

                        <span
                            className={`transition-transform duration-200 ${iataOpen ? 'rotate-180' : ''
                                }`}
                        >
                            <ChevronDown size={14} />
                        </span>
                    </button> */}

                    {/* <label className="text-sm text-dark-gray mb-1 block">Promo Code</label> */}
                    <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Promo Code"
                        className="flex-1 w-full border-b border-black/35 py-2 text-xs lg:text-sm  font-arizona-sans-regular   text-dark-gray focus:outline-0"
                    />

                    {iataOpen && (
                        <input
                            type="text"
                            value={iataCode}
                            onChange={e => setIataCode(e.target.value)}
                            placeholder="Enter IATA code"
                            className="mt-3 w-full border-b border-gray bg-transparent text-xs text-dark-gray outline-none pb-1 placeholder:text-silver tracking-wider"
                        />
                    )}
                </div>
            </div>

            {/* Fixed CTA */}
            <div className="pt-4 mt-auto bg-white">
                <button onClick={handleCheckAvailability}
                    className={`w-full bg-primary text-white uppercase tracking-[0.15em]  h-10 rounded-xs  hover:bg-primary transition-colors font-arizona-sans-regular text-xs lg:text-sm cursor-pointer`}>
                    Check Availability
                </button>
            </div>
        </div>
    );
}
