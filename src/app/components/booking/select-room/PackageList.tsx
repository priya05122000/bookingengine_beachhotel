// ...existing code...
'use client';

import { PackageItem } from '../../../lib/types';
import { typography } from '@/src/app/lib/typography';

type Props = {
    packages: PackageItem[];
    openQtyFor: string | null;
    setOpenQtyFor: (id: string | null) => void;
    qtyAdults: number;
    setQtyAdults: (n: number) => void;
    qtyChildren: number;
    setQtyChildren: (n: number) => void;
    addPackage: (pkg: PackageItem) => void;
};

export default function PackageList({
    packages,
    openQtyFor,
    setOpenQtyFor,
    qtyAdults,
    setQtyAdults,
    qtyChildren,
    setQtyChildren,
    addPackage,
}: Props) {
    return (
        <div className=" rounded pt-6">
            <h4 className={`text-sm font-semibold text-primary mb-4 ${typography.textBase}`}>CHOOSE A PACKAGE</h4>

            <div className="space-y-6">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="border-b last:border-b-0 pb-4 flex items-center justify-between relative">
                        <div className='space-y-1'>
                            <div className={`${typography.textBase} font-semibold`}>{pkg.title}</div>
                            <div className="text-xs text-gray-500">{pkg.subtitle}</div>
                            <div className="text-xs text-gray-500">{pkg.details}</div>
                        </div>
                        <div className='space-y-1'>
                            <div className={`${typography.textBase} font-semibold`}>{pkg.price}</div>
                            <div className="text-xs text-gray-500">{pkg.subtitle}</div>
                            <div className="text-xs text-gray-500">{pkg.details}</div>
                        </div>
                        <div className='space-y-1 relative '>
                            
                            <button
                                className="bg-primary border  text-white px-3 py-1 rounded text-sm"
                                onClick={() => setOpenQtyFor(pkg.id)}
                            >
                                Add Room
                            </button>

                            <div >
                                {openQtyFor === pkg.id && (
                                    // popup UI replaced to match requested design
                                    <div className="absolute top-full  right-0 z-20 w-48 bg-white border border-primary/32 rounded-lg  px-4 pb-4 pt-2 text-sm shadow-[-1px_4px_4px_0px_#00000040]
">
                                        <button
                                            aria-label="Close"
                                            className="text-gray-400 text-end w-full mb-3 hover:text-gray-700 text-lg leading-none"
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
                                                <div className="text-xs font-semibold uppercase text-gray-600 ">Children</div>
                                                <span className="text-xs font-normal text-gray-400">0 - 8 yrs</span>
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
                                                className="px-4 py-1 bg-primary text-white rounded text-sm"
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
// ...existing code...