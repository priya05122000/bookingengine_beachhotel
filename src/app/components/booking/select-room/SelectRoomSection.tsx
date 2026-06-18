
'use client';

import React from 'react';
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
    showPackages: _showPackages,
    setShowPackages: _setShowPackages,
    onEdit,
}: Props) {
    const [showDetails, setShowDetails] = React.useState(false);
    const [selected, setSelected] = React.useState<
        (PackageItem & {
            adults: number;
            children: number;
        })[]
    >([]);
    const [openQtyFor, setOpenQtyFor] = React.useState<string | null>(null);
    const [openPackagesFor, setOpenPackagesFor] = React.useState<string | null>(null);
    const [promo, setPromo] = React.useState('');

    const rooms = [
        {
            id: 'r1',
            image: '/images/Rectangle.png',
            name: 'ECONOMY',
            subtitle: 'SEA VIEW & SUNSET VIEW',
            amenities: [
                { icon: 'Flower2', label: 'BALCONY' },
                { icon: 'Sofa', label: 'WALKOUT SPACE' },
                { icon: 'Wifi', label: 'FREE WIFI' },
            ],
            price: 'INR 8,999',
            packages: [
                {
                    id: 'r1-p1', title: 'ECONOMY', subtitle: 'SEA VIEW', price: 'INR 6,578', details: 'Breakfast Included',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 5,574.58' }],
                        tax: 'INR 1,003.42',
                        total: 'INR 6,578.00',
                    },
                },
                {
                    id: 'r1-p2', title: 'ROOM ONLY', subtitle: 'SEA VIEW', price: 'INR 5,200', details: 'No Meals',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 4,406.78' }],
                        tax: 'INR 793.22',
                        total: 'INR 5,200.00',
                    },
                },
                {
                    id: 'r1-p3', title: 'NON REFUNDABLE', subtitle: 'SEA VIEW', price: 'INR 4,999', details: 'Breakfast Included',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 4,236.44' }],
                        tax: 'INR 762.56',
                        total: 'INR 4,999.00',
                    },
                },
            ] as PackageItem[],
        },
        {
            id: 'r2',
            image: '/images/Rectangle.png',
            name: 'DELUXE',
            subtitle: 'OCEAN VIEW & GARDEN VIEW',
            amenities: [
                { icon: 'Flower2', label: 'PRIVATE TERRACE' },
                { icon: 'Sofa', label: 'LIVING AREA' },
                { icon: 'Wifi', label: 'FREE WIFI' },
            ],
            price: 'INR 12,999',
            packages: [
                {
                    id: 'r2-p1', title: 'DELUXE B&B', subtitle: 'OCEAN VIEW', price: 'INR 10,578', details: 'Breakfast Included',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 8,964.41' }],
                        tax: 'INR 1,613.59',
                        total: 'INR 10,578.00',
                    },
                },
                {
                    id: 'r2-p2', title: 'ROOM ONLY', subtitle: 'OCEAN VIEW', price: 'INR 9,200', details: 'No Meals',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 7,796.61' }],
                        tax: 'INR 1,403.39',
                        total: 'INR 9,200.00',
                    },
                },
                {
                    id: 'r2-p3', title: 'NON REFUNDABLE', subtitle: 'OCEAN VIEW', price: 'INR 8,500', details: 'Breakfast Included',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 7,203.39' }],
                        tax: 'INR 1,296.61',
                        total: 'INR 8,500.00',
                    },
                },
            ] as PackageItem[],
        },
        {
            id: 'r3',
            image: '/images/Rectangle.png',
            name: 'SUITE',
            subtitle: 'PANORAMIC SEA VIEW',
            amenities: [
                { icon: 'Flower2', label: 'PRIVATE POOL' },
                { icon: 'Sofa', label: 'LOUNGE SPACE' },
                { icon: 'Wifi', label: 'FREE WIFI' },
            ],
            price: 'INR 18,999',
            packages: [
                {
                    id: 'r3-p1', title: 'SUITE FULL BOARD', subtitle: 'PANORAMIC VIEW', price: 'INR 16,578', details: 'All Meals Included',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 14,049.15' }],
                        tax: 'INR 2,528.85',
                        total: 'INR 16,578.00',
                    },
                },
                {
                    id: 'r3-p2', title: 'ROOM ONLY', subtitle: 'PANORAMIC VIEW', price: 'INR 14,500', details: 'No Meals',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 12,288.14' }],
                        tax: 'INR 2,211.86',
                        total: 'INR 14,500.00',
                    },
                },
                {
                    id: 'r3-p3', title: 'NON REFUNDABLE', subtitle: 'PANORAMIC VIEW', price: 'INR 13,200', details: 'Breakfast Included',
                    priceBreakdown: {
                        entries: [{ label: 'Jul 1', amount: 'INR 11,186.44' }],
                        tax: 'INR 2,013.56',
                        total: 'INR 13,200.00',
                    },
                },
            ] as PackageItem[],
        },
    ];

    function togglePackages(roomId: string) {
        setOpenPackagesFor((prev) => (prev === roomId ? null : roomId));
    }

    // useEffect(() => {
    //     if (showPackages) {
    //         setTimeout(() => {
    //             window.scrollTo({
    //                 top: 400,
    //                 behavior: "smooth",
    //             });
    //         }, 100);
    //     }
    // }, [showPackages]);

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
                <div className={`text-dark-gray font-arizona-sans-regular tracking-widest w-full ${typography.textXl}`}>
                    Fri, 22 JUN, 2026 - Fri, 22 JUN, 2026
                </div>

                <div className="flex items-center w-full font-arizona-sans-regular justify-between  sm:justify-end gap-3">
                    <div className={`text-dark-gray text-xs lg:text-sm tracking-[.15em] `}>
                        1 NIGHT | 1 ROOM , 2 ADULT</div>
                    <button
                        // onClick={() => setShowPackages(false)}
                        onClick={onEdit}
                        className="text-xs lg:text-sm tracking-[.15em] uppercase  px-4 h-8 border border-primary text-primary rounded-xs cursor-pointer"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Main layout */}
            <div className="grid xl:grid-cols-[1fr_360px] gap-10 xl:gap-20">
                {/* Left: room cards + packages */}
                <div className="flex flex-col gap-6">
                    {rooms.map((room) => {
                        const amenityIcons: Record<string, React.ReactNode> = {
                            Flower2: <Flower2 size={22} strokeWidth={1.5} />,
                            Sofa: <Sofa size={22} strokeWidth={1.5} />,
                            Wifi: <Wifi size={22} strokeWidth={1.5} />,
                        };

                        return (
                            <div key={room.id} className="flex flex-col gap-6">
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
                                            <div className={`${typography.textXl} tracking-widest mt-1`}>{room.name}</div>
                                            <div className="tracking-[0.15em] text-dark-gray mt-1 text-[10px] lg:text-xs">{room.subtitle}</div>

                                            <ul className="mt-4 mb-10 tracking-[0.15em] space-y-4 text-sm text-dark-gray text-[10px] lg:text-xs">
                                                {room.amenities.map((amenity) => (
                                                    <li key={amenity.label} className="flex items-center gap-2">
                                                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs">
                                                            {amenityIcons[amenity.icon]}
                                                        </span>
                                                        {amenity.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="tracking-[.04em]">
                                            <div className="text-[13px] text-sm text-dark-gray font-arizona-light">From</div>
                                            <div className={`text-[36px] font-arizona-regular`}>{room.price}<span className="text-[15px] lg:text-base font-arizona-light text-dark-gray">/night</span></div>
                                            <div className="text-[11px] lg:text-xs font-arizona-light text-dark-gray">subject to GST and charges</div>
                                        </div>
                                        <button
                                            onClick={() => togglePackages(room.id)}
                                            className={`mt-4 bg-primary text-white px-4 h-10 rounded-xs font-arizona-sans-regular uppercase text-xs lg:text-sm tracking-[0.15em] cursor-pointer`}
                                        >
                                            Select Packages
                                        </button>
                                    </div>
                                </div>

                                {openPackagesFor === room.id && (
                                    <PackageList
                                        packages={room.packages}
                                        selected={selected}
                                        openQtyFor={openQtyFor}
                                        setOpenQtyFor={setOpenQtyFor}
                                        addPackage={addPackage}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right: sidebar */}
                <div className="sticky top-32 self-start">
                    <PriceSidebar selected={selected} removePackage={removePackage} promo={promo} setPromo={setPromo} />
                </div>
            </div>
        </div>
    );
}
