import { typography } from '@/src/lib/typography';
import { ChevronDown, Minus, Plus, X } from "lucide-react";
import { useState } from 'react';

export interface Room {
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
    onInc,
    onDec,
}: {
    label: string;
    sublabel?: string;
    value: number;
    min: number;
    onInc: () => void;
    onDec: () => void;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-sm uppercase tracking-widest text-dark-gray font-semibold">{label}</p>
                {sublabel && <p className="text-[9px] text-silver tracking-wider">{sublabel}</p>}
            </div>
            <div className="flex items-center gap-3 border border-primary" >
                <button
                    onClick={onDec}
                    disabled={value <= min}
                    className="w-7 h-7 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray transition-colors"
                >
                    <Minus size={12} />
                </button>
                <span className="text-sm text-primary w-4 text-center font-medium">{value}</span>
                <button
                    onClick={onInc}
                    className="w-7 h-7  flex items-center justify-center text-primary hover:bg-gray transition-colors"
                >
                    <Plus size={12} />
                </button>
            </div>
        </div>
    );
}

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
            prev.map((r, i) =>
                i === index
                    ? {
                        ...r,
                        [field]: Math.max(
                            field === "adults" ? 1 : 0,
                            r[field] + delta
                        ),
                    }
                    : r
            )
        );
    };

    const removeRoom = (index: number) => {
        setRooms((prev) => prev.filter((_, i) => i !== index));
    };



    // promo code state (fixes undefined `promo` used in the input)
    const [promo, setPromo] = useState<string>('');


    return (
        <div className="border border-gray p-4 md:p-5 h-full flex flex-col">
            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2">
                {rooms.map((room, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                            <p className="uppercase tracking-widest text-sm text-dark-gray font-semibold">
                                Room {i + 1}
                            </p>

                            {rooms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRoom(i)}
                                    aria-label={`Remove room ${i + 1}`}
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-silver hover:text-red-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <Counter
                            label="Adults"
                            value={room.adults}
                            min={1}
                            onInc={() => updateRoom(i, 'adults', 1)}
                            onDec={() => updateRoom(i, 'adults', -1)}
                        />

                        <Counter
                            label="Children"
                            sublabel="0-12 Years"
                            value={room.children}
                            min={0}
                            onInc={() => updateRoom(i, 'children', 1)}
                            onDec={() => updateRoom(i, 'children', -1)}
                        />
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
                        className="flex-1 w-full border-b border-black/35 py-2 text-sm  text-dark-gray focus:outline-0"
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
                <button onClick={onCheckAvailability}
                    className="w-full bg-primary text-white uppercase tracking-widest text-xs h-10 rounded-xs  hover:bg-primary transition-colors font-semibold">
                    Check Availability
                </button>
            </div>
        </div>
    );
}
