
'use client';

import { useState } from 'react';
import { PackageItem } from './types';
import { typography } from '@/src/lib/typography';

type Props = {
    packages: PackageItem[];
    selected: SelectedPackage[];
    openQtyFor: string | null;
    setOpenQtyFor: (id: string | null) => void;
    qtyAdults: number;
    setQtyAdults: (n: number) => void;
    qtyChildren: number;
    setQtyChildren: (n: number) => void;
    addPackage: (pkg: PackageItem) => void;
};

export type SelectedPackage = PackageItem & {
    adults: number;
    children: number;
};

export default function PackageList({
    packages,
    selected,
    openQtyFor,
    setOpenQtyFor,
    qtyAdults,
    setQtyAdults,
    qtyChildren,
    setQtyChildren,
    addPackage,
}: Props) {





    return (
        <div className=" rounded-xs  pt-6">
            <h4 className={`text-sm font-semibold text-primary mb-4 ${typography.textBase}`}>CHOOSE A PACKAGE</h4>

            <div className="space-y-6">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="border-b last:border-b-0 pb-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5 items-center relative">
                        <div className='space-y-1'>
                            <div className={`${typography.textBase} font-semibold uppercase`}>{pkg.title}</div>
                            <div className="text-xs text-dark-gray">{pkg.subtitle}</div>
                            <div className="text-xs backdrop-blur-md bg-accent/51 p-1 text-primary inline-block">{pkg.details}</div>
                        </div>
                        <div className='space-y-1'>
                            <div className="relative inline-block group">
                                <div className="text-xs text-dark-gray underline cursor-help">Details</div>

                                <div className="absolute top-full right-0 z-20 mt-2 w-64 bg-white border border-primary/32 rounded-xs px-3 py-2 text-sm shadow-[-1px_4px_4px_0px_#00000040] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                                    <div className="font-semibold mb-1">{pkg.title}:</div>
                                    <div className="text-xs text-dark-gray">{pkg.subtitle}</div>
                                    <div className="mt-2 text-xs">{pkg.details}</div>
                                </div>
                            </div>  <div className="text-xs text-dark-gray">
                                {(() => {
                                    const selectedPkg = selected.find((p) => p.id === pkg.id);

                                    if (!selectedPkg) return "1 Adult";

                                    return `${selectedPkg.adults} Adult${selectedPkg.adults > 1 ? "s" : ""
                                        }${selectedPkg.children > 0
                                            ? ` ${selectedPkg.children} Child${selectedPkg.children > 1 ? "ren" : ""
                                            }`
                                            : ""
                                        }`;
                                })()}
                            </div>
                        </div>
                        <div className='space-y-1 relative '>
                            <button
                                className="bg-primary border  text-white px-3 py-1 rounded-xs text-sm"
                                onClick={() => setOpenQtyFor(pkg.id)}
                            >
                                Add Room
                            </button>

                            <div >
                                {openQtyFor === pkg.id && (
                                    // popup UI replaced to match requested design
                                    <div className="absolute top-full  right-0 z-20 w-48 bg-white border border-primary/32 rounded-xs   px-4 pb-4 pt-2 text-sm shadow-[-1px_4px_4px_0px_#00000040]
">
                                        <button
                                            aria-label="Close"
                                            className="text-dark-gray text-end w-full mb-3 hover:text-dark-gray text-lg leading-none"
                                            onClick={() => setOpenQtyFor(null)}
                                        >
                                            ×
                                        </button>
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-xs font-semibold uppercase">Adults</div>

                                            <select
                                                value={qtyAdults}
                                                onChange={(e) => setQtyAdults(Number(e.target.value))}
                                                className="w-10 border border-primary/32  px-2 py-1 text-sm"
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
                                                value={qtyChildren}
                                                onChange={(e) => setQtyChildren(Number(e.target.value))}
                                                className="w-10 border border-primary/32 px-2 py-1 text-sm"
                                            >
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-start">
                                            <button
                                                className="px-4 py-1 bg-primary text-white rounded-xs text-sm"
                                                onClick={() => {
                                                    addPackage(pkg);
                                                    setOpenQtyFor(null);
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </div >
    );
}
