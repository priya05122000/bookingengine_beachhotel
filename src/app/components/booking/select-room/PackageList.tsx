
'use client';

import { useState } from 'react';
import { PackageItem } from './types';
import { typography } from '@/src/lib/typography';

type Props = {
    packages: PackageItem[];
    selected: SelectedPackage[];
    openQtyFor: string | null;
    setOpenQtyFor: (id: string | null) => void;
    addPackage: (pkg: PackageItem, adults: number, children: number) => void;
};

export type SelectedPackage = PackageItem & {
    adults: number;
    children: number;
};

type QtyState = { adults: number; children: number };

export default function PackageList({
    packages,
    selected,
    openQtyFor,
    setOpenQtyFor,
    addPackage,
}: Props) {
    const [qty, setQty] = useState<Record<string, QtyState>>({});

    function getQty(id: string): QtyState {
        return qty[id] ?? { adults: 1, children: 0 };
    }

    function setAdults(id: string, n: number) {
        setQty((prev) => ({ ...prev, [id]: { ...getQty(id), adults: n } }));
    }

    function setChildren(id: string, n: number) {
        setQty((prev) => ({ ...prev, [id]: { ...getQty(id), children: n } }));
    }

    function guestLabel(adults: number, children: number) {
        return `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? ` · ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;
    }

    return (
        <div className=" rounded-xs  pt-6">
            <h4 className={`text-base lg:text-xl font-arizona-sans-regular tracking-widest  text-primary mb-4 ${typography.textBase}`}>CHOOSE A PACKAGE</h4>

            <div className="space-y-6">
                {packages.map((pkg) => {
                    const committedPkg = selected.find((p) => p.id === pkg.id);
                    const liveQty = getQty(pkg.id);
                    const isOpen = openQtyFor === pkg.id;

                    // While popup is open show live dropdown values; after Add Room show committed values
                    const displayAdults = isOpen ? liveQty.adults : (committedPkg?.adults ?? liveQty.adults);
                    const displayChildren = isOpen ? liveQty.children : (committedPkg?.children ?? liveQty.children);

                    return (
                        <div key={pkg.id} className="border-b last:border-b-0 pb-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5 items-center relative">
                            <div className='space-y-1 font-arizona-sans-regular'>
                                <div className={`text-xs lg:text-sm  tracking-widest uppercase`}>{pkg.title}</div>
                                <div className="tracking-[0.15em] text-dark-gray mt-1 text-[10px] lg:text-xs">{pkg.subtitle}</div>
                                <div className="text-[13px] lg:text-sm backdrop-blur-md bg-silver/30 p-1 text-black inline-block font-arizona-light">{pkg.details}</div>
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
                                    {guestLabel(displayAdults, displayChildren)}
                                </div>
                            </div>
                            <div className='space-y-1 relative font-arizona-sans-regular'>
                                <button
                                    className="bg-primary uppercase border tracking-[.15em] text-white px-3 py-1 rounded-xs text-xs lg:text-sm cursor-pointer"
                                    onClick={() => setOpenQtyFor(pkg.id)}
                                >
                                    Add Room
                                </button>
                                <div className='tracking-[.15em] text-xs lg:text-sm'>
                                    {isOpen && (
                                        <div className="absolute top-full right-0 z-20 w-48 bg-white border border-primary/32 rounded-xs px-4 pb-4 pt-2 text-sm shadow-[-1px_4px_4px_0px_#00000040]">
                                            <button
                                                aria-label="Close"
                                                className="text-dark-gray text-end w-full mb-3 hover:text-dark-gray text-lg leading-none cursor-pointer"
                                                onClick={() => setOpenQtyFor(null)}
                                            >
                                                ×
                                            </button>

                                            <div className="flex items-start justify-between mb-2">
                                                <div className="text-xs font-semibold uppercase">Adults</div>

                                                <select
                                                    value={liveQty.adults}
                                                    onChange={(e) => setAdults(pkg.id, Number(e.target.value))}
                                                    className="w-10 border border-primary/32  px-1 py-1 text-sm"
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                </select>
                                            </div>

                                            <div className="mb-3 flex items-start justify-between ">
                                                <div>
                                                    <div className="text-xs font-semibold uppercase text-dark-gray ">Children</div>
                                                    <span className="text-xs font-normal text-dark-gray">0 - 8 yrs</span>
                                                </div>

                                                <select
                                                    value={liveQty.children}
                                                    onChange={(e) => setChildren(pkg.id, Number(e.target.value))}
                                                    className="w-10 border border-primary/32 px-1 py-1 text-sm"
                                                >
                                                    <option value={0}>0</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                </select>
                                            </div>

                                            <div className="flex justify-start">
                                                <button
                                                    className="px-4 py-1 bg-primary text-white rounded-xs text-sm cursor-pointer"
                                                    onClick={() => {
                                                        addPackage(pkg, liveQty.adults, liveQty.children);
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
