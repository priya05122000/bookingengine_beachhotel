
'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { PackageItem } from './types';
import { typography } from '@/src/lib/typography';

function Counter({
    label,
    sublabel,
    value,
    min,
    max,
    incDisabled,
    onInc,
    onDec,
}: {
    label: string;
    sublabel?: string;
    value: number;
    min: number;
    max: number;
    incDisabled?: boolean;
    onInc: () => void;
    onDec: () => void;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-xs font-arizona-sans-regular uppercase tracking-[.15em] text-dark-gray">{label}</p>
                {sublabel && <p className="text-[10px] text-silver font-arizona-sans-regular tracking-[0.15em]">{sublabel}</p>}
            </div>
            <div className="flex items-center gap-3 border border-primary font-arizona">
                <button
                    onClick={onDec}
                    disabled={value <= min}
                    className="w-7 h-7 flex items-center justify-center text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray transition-colors"
                >
                    <Minus size={12} />
                </button>
                <span className="text-sm text-primary w-4 text-center">{value}</span>
                <button
                    onClick={onInc}
                    disabled={value >= max || incDisabled}
                    className="w-7 h-7 flex items-center justify-center text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray transition-colors"
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
    addPackage: (pkg: PackageItem, rooms: number, adults: number, children: number) => void;
};

export type SelectedPackage = PackageItem & {
    rooms: number;
    adults: number;
    children: number;
};

type QtyState = { rooms: number; adults: number; children: number };

export default function PackageList({
    packages,
    selected,
    openQtyFor,
    setOpenQtyFor,
    addPackage,
}: Props) {
    const [qty, setQty] = useState<Record<string, QtyState>>({});

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

    function guestLabel(rooms: number, adults: number, children: number) {
        if (rooms === 0 && adults === 0) return '';
        return `${rooms} Room${rooms > 1 ? 's' : ''} · ${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? ` · ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;
    }

    return (
        <div className=" rounded-xs  pt-6">
            <h4 className={`text-base lg:text-xl font-arizona-sans-regular tracking-widest  text-primary mb-4 ${typography.textBase}`}>CHOOSE A PACKAGE</h4>

            <div className="space-y-6">
                {packages.map((pkg) => {
                    const committedPkg = selected.find((p) => p.id === pkg.id);
                    const liveQty = getQty(pkg.id);
                    const isOpen = openQtyFor === pkg.id;

                    // While popup is open show live counter values; after Add Room show committed values
                    const displayRooms = isOpen ? liveQty.rooms : (committedPkg?.rooms ?? liveQty.rooms);
                    const displayAdults = isOpen ? liveQty.adults : (committedPkg?.adults ?? liveQty.adults);
                    const displayChildren = isOpen ? liveQty.children : (committedPkg?.children ?? liveQty.children);

                    return (
                        <div key={pkg.id} className="border-b last:border-b-0 pb-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5 items-center relative">
                            <div className='space-y-1 font-arizona-sans-regular'>
                                <div className={`text-xs lg:text-sm  tracking-widest uppercase`}>{pkg.title}</div>
                                <div className="tracking-[0.15em] text-dark-gray mt-1 text-[10px] lg:text-xs">{pkg.subtitle}</div>
                                <div className="text-[13px] lg:text-sm backdrop-blur-md bg-silver/30 p-1 text-black inline-block font-arizona-light">{pkg.details}</div>
                                <div className="mt-2 text-[11px] lg:text-xs font-arizona-light text-dark-gray">
                                    ( {pkg.availableRooms ?? 0} room{(pkg.availableRooms ?? 0) !== 1 ? 's' : ''} available )
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <div className="relative inline-block group font-arizona-regular">
                                    <div className={`text-[36px]`}>{pkg.price}</div>
                                    <div className="text-xs text-dark-gray underline cursor-help">Details</div>
                                    <div className="absolute top-full right-0 z-20 mt-2 w-64 bg-white border border-primary/32 rounded-xs p-2 text-xs lg:text-sm shadow-[-1px_4px_4px_0px_#00000040] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity  text-dark-gray space-y-1">
                                        {pkg.priceBreakdown ? (
                                            <>
                                                {pkg.priceBreakdown.entries.map((entry, i) => (
                                                    <div key={i} className="flex justify-between  ">
                                                        <span >{entry.label}</span>
                                                        <span>{entry.amount}</span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between items-end  ">
                                                    <span >Tax &amp; Service<br />Charges</span>
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
                                                {pkg.subtitle && <div className=" text-dark-gray">{pkg.subtitle}</div>}
                                                {pkg.details && <div className="mt-2 ">{pkg.details}</div>}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs text-dark-gray text-[13px] lg:text-sm">
                                    {guestLabel(displayRooms, displayAdults, displayChildren)}
                                </div>
                            </div>
                            <div className='space-y-1 relative font-arizona-sans-regular'>
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
                                                setQty((prev) => ({ ...prev, [pkg.id]: { rooms: 1, adults: 1, children: 0 } }));
                                            }
                                            setOpenQtyFor(pkg.id);
                                        }}
                                    >
                                        Add Room
                                    </button>
                                )}
                                <div className='tracking-[.15em] text-xs lg:text-sm'>
                                    {isOpen && (
                                        <div className="absolute top-full right-0 z-20 w-56 bg-white border border-primary/32 rounded-xs px-4 pb-4 pt-2 text-sm shadow-[-1px_4px_4px_0px_#00000040]">
                                            <button
                                                aria-label="Close"
                                                className="text-dark-gray text-end w-full mb-1 hover:text-dark-gray text-lg leading-none cursor-pointer"
                                                onClick={() => setOpenQtyFor(null)}
                                            >
                                                ×
                                            </button>

                                            {(() => {
                                                const maxRooms = pkg.availableRooms ?? 1;
                                                const maxGuests = liveQty.rooms * 4;
                                                const atRoomLimit = liveQty.rooms >= maxRooms;
                                                const atGuestLimit = liveQty.adults + liveQty.children >= maxGuests;
                                                return (
                                                    <>
                                                        <Counter
                                                            label="Rooms"
                                                            value={liveQty.rooms}
                                                            min={1}
                                                            max={maxRooms}
                                                            onInc={() => setRoomsCount(pkg.id, liveQty.rooms + 1)}
                                                            onDec={() => setRoomsCount(pkg.id, liveQty.rooms - 1)}
                                                        />
                                                        {atRoomLimit && (
                                                            <p className="text-[10px] text-red-500 font-arizona-sans-regular tracking-widest mb-1">
                                                                Only {maxRooms} room{maxRooms > 1 ? 's' : ''} available for this package.
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
                                                            sublabel="0 - 8 yrs"
                                                            value={liveQty.children}
                                                            min={0}
                                                            max={liveQty.rooms * 4}
                                                            incDisabled={atGuestLimit}
                                                            onInc={() => setChildren(pkg.id, liveQty.children + 1)}
                                                            onDec={() => setChildren(pkg.id, liveQty.children - 1)}
                                                        />
                                                        {atGuestLimit && (
                                                            <p className="text-[10px] text-red-500 font-arizona-sans-regular tracking-widest mt-1">
                                                                Max {maxGuests} guest{maxGuests > 1 ? 's' : ''} for {liveQty.rooms} room{liveQty.rooms > 1 ? 's' : ''} (4 per room).
                                                            </p>
                                                        )}
                                                    </>
                                                );
                                            })()}

                                            <div className="flex justify-start mt-2">
                                                <button
                                                    className="px-4 py-1 bg-primary text-white rounded-xs text-sm cursor-pointer uppercase tracking-[.15em] font-arizona-sans-regular"
                                                    onClick={() => {
                                                        addPackage(pkg, liveQty.rooms, liveQty.adults, liveQty.children);
                                                        setOpenQtyFor(null);
                                                    }}
                                                >
                                                    Add Room
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div >
    );
}
