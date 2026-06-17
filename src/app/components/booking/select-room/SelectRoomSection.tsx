
'use client';

import React, { useEffect } from 'react';
import { PackageItem } from './types';
import PackageList from './PackageList';
import PriceSidebar from './PriceSidebar';
import RoomDetailsModal from './RoomDetailsModal';
import { typography } from '@/src/lib/typography';
import { Flower2, Sofa, Wifi } from 'lucide-react';

type Props = {
    showPackages: boolean;
    setShowPackages: (v: boolean) => void;
    onEdit: () => void;
};

export default function SelectRoomSection({
    showPackages,
    setShowPackages,
    onEdit,
}: Props) {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [showDetails, setShowDetails] = React.useState(false);
    const [selected, setSelected] = React.useState<
        (PackageItem & {
            adults: number;
            children: number;
        })[]
    >([]);
    const [openQtyFor, setOpenQtyFor] = React.useState<string | null>(null);
    const [promo, setPromo] = React.useState('');

    const packages: PackageItem[] = [
        { id: 'p1', title: 'ECONOMY', subtitle: 'SEA VIEW', price: 'INR 6,578', details: 'Breakfast Included' },
        { id: 'p2', title: 'ROOM ONLY', subtitle: 'SEA VIEW', price: 'INR 5,200', details: 'Breakfast Included' },
        { id: 'p3', title: 'NON REFUNDABLE', subtitle: 'SEA VIEW', price: 'INR 4,999', details: 'Breakfast Included' },
    ];

    function onSelectPackage() {
        setShowPackages(true);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    }

    useEffect(() => {
        // When showPackages becomes true (e.g. via EDIT), ensure UI scrolls into view
        if (showPackages) {
            setTimeout(() => {
                window.scrollTo({
                    top: 400,
                    behavior: "smooth",
                });
            }, 100);
        }
    }, [showPackages]);

    function addPackage(pkg: PackageItem, adults: number, children: number) {
        setSelected((s) => [...s, { ...pkg, adults, children }]);
        setOpenQtyFor(null);
    }

    function removePackage(id: string) {
        setSelected((s) => s.filter((p) => p.id !== id));
    }

    return (
        <div className="  min-h-105">
            {showDetails && <RoomDetailsModal onClose={() => setShowDetails(false)} />}
            {/* Top bar */}
            <div className="flex  flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between mb-6">
                <div className={`text-dark-gray  w-full ${typography.textBase}`}>
                    Fri, 22 JUN, 2026 - Fri, 22 JUN, 2026
                </div>

                <div className="flex items-center w-full justify-between  sm:justify-end gap-3">
                    <div className={`text-dark-gray ${typography.textBase}`}>
                        1NIGHT · 1ROOM · 2 ADULT</div>
                    <button
                        // onClick={() => setShowPackages(false)}
                        onClick={onEdit}
                        className="text-xs uppercase tracking-wide px-4 h-8 border border-primary text-primary rounded-xs "
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Main layout */}
            <div className="grid xl:grid-cols-[1fr_360px] gap-10 xl:gap-20">
                {/* Left: room card + packages */}
                <div className="flex flex-col gap-6">
                    <div className="grid sm:grid-cols-12 gap-6">
                        <div className="relative md:col-span-8  shrink-0 rounded-xs overflow-hidden shadow-sm">
                            <img
                                src="/images/Rectangle.png"
                                alt="room"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setShowDetails(true)}
                                className="absolute top-4 right-4 backdrop-blur-md bg-accent/51 text-white text-xs font-semibold px-3 py-1 rounded"
                            >
                                View Details
                            </button>
                        </div>

                        <div className="md:col-span-4">
                            <div className="">
                                <div className={`${typography.textLg} font-semibold mt-1`}>ECONOMY</div>
                                <div className="text-xs text-dark-gray mt-1">SEA VIEW & SUNSET VIEW </div>

                                <ul className="mt-4 mb-10 space-y-1 text-sm text-dark-gray">
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-4  rounded-full flex items-center justify-center text-xs"><Flower2 size={22} strokeWidth={1.5} /></span>
                                        BALCONY
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs">    <Sofa size={22} strokeWidth={1.5} />
                                        </span>
                                        WALKOUT SPACE
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-4  rounded-full flex items-center justify-center text-xs"><Wifi size={22} strokeWidth={1.5} />
                                        </span>
                                        FREE WIFI
                                    </li>
                                </ul>

                                <div className="text-sm text-dark-gray ">From</div>
                                <div className={`${typography.textThXl} font-extrabold`}>INR 8,999<span className="text-sm font-medium text-dark-gray">/Night</span></div>
                                <div className="text-xs text-dark-gray mt-1">subject to GST and charges</div>

                                <button
                                    onClick={onSelectPackage}
                                    className={`mt-2 bg-primary text-white px-4 h-10 rounded-xs  uppercase text-sm tracking-wide`}
                                >
                                    Select Package
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Choose package list (shown after clicking Select Package) */}
                    {showPackages && (
                        <PackageList
                            packages={packages}
                            selected={selected}
                            openQtyFor={openQtyFor}
                            setOpenQtyFor={setOpenQtyFor}
                            addPackage={addPackage}
                        />
                    )}
                </div>

                {/* Right: sidebar */}
                <div className="sticky top-32 self-start">
                    <PriceSidebar selected={selected} removePackage={removePackage} promo={promo} setPromo={setPromo} />
                </div>
            </div>
        </div>
    );
}
