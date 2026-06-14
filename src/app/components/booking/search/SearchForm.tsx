// ...existing code...
'use client';

import React, { useMemo, useState } from 'react';
import DatesOfStay from './DatesOfStay';
import RoomsAndGuests, { Room } from './RoomsAndGuests';

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

function formatDate(date: Date | null) {
    if (!date) return '—';
    return date.toLocaleDateString('en-GB', DATE_FORMAT);
}

function calcDuration(checkIn: Date | null, checkOut: Date | null) {
    if (!checkIn || !checkOut) return '—';

    const nights = Math.round(
        (checkOut.getTime() - checkIn.getTime()) / 86400000
    );

    return `${nights + 1}D, ${nights}N`;
}

export default function SearchForm() {
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const [calendarStart, setCalendarStart] = useState<Date>(() => {
        const d = new Date();
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    });

    const [checkIn, setCheckIn] = useState<Date | null>(() => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date;
    });

    const [checkOut, setCheckOut] = useState<Date | null>(() => {
        const date = new Date();
        date.setDate(date.getDate() + 15);
        return date;
    });

    const [selectingCheckOut, setSelectingCheckOut] = useState(false);

    const [rooms, setRooms] = useState<Room[]>([
        {
            adults: 1,
            children: 0,
        },
    ]);

    const [iataOpen, setIataOpen] = useState(false);
    const [iataCode, setIataCode] = useState("");

    function isSameDay(a: Date, b: Date) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    const handleDayClick = (date: Date) => {
        if (
            !selectingCheckOut ||
            (checkIn && (isSameDay(date, checkIn) || date < checkIn))
        ) {
            setCheckIn(date);
            setCheckOut(null);
            setSelectingCheckOut(true);
        } else {
            setCheckOut(date);
            setSelectingCheckOut(false);
        }
    };

    const handlePrev = () => {
        setCalendarStart(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() - 1,
                    1
                )
        );
    };

    const handleNext = () => {
        setCalendarStart(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() + 1,
                    1
                )
        );
    };

    const handleCheckAvailability = () => {
        // notify parent (FilterSection) to advance step
        window.dispatchEvent(new CustomEvent('search:check-availability', { detail: { step: 1 } }));
    };

    return (
        <div className="bg-white border border-primary">
            {/* ================= MOBILE ================= */}
            <div className="lg:hidden">
                {/* Dates */}
                <section>
                    <div className="border-b border-[#ddd] px-4 py-6">
                        <h3 className="uppercase tracking-[0.15em] text-lg font-medium mb-6">
                            Dates Of Stay
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <p className="text-xs uppercase tracking-[0.15em] text-dark-gray mb-1">
                                    Check-In
                                </p>
                                <p className="text-sm">{formatDate(checkIn)}</p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.15em] text-dark-gray mb-1">
                                    Check-Out
                                </p>
                                <p className="text-sm">{formatDate(checkOut)}</p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.15em] text-dark-gray mb-1">
                                    Duration
                                </p>
                                <p className="text-sm">{calcDuration(checkIn, checkOut)}</p>
                            </div>
                        </div>
                    </div>

                    <DatesOfStay
                        calendarStart={calendarStart}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        today={today}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        onDayClick={handleDayClick}
                    />
                </section>

                {/* Rooms */}
                <section className="border-t border-[#ddd]">
                    <div className="px-4 py-6 border-b border-[#ddd]">
                        <h3 className="uppercase tracking-[0.15em] text-lg font-medium">
                            Rooms & Guests
                        </h3>
                    </div>

                    <RoomsAndGuests
                        rooms={rooms}
                        setRooms={setRooms}
                        iataOpen={iataOpen}
                        setIataOpen={setIataOpen}
                        iataCode={iataCode}
                        setIataCode={setIataCode}
                        onCheckAvailability={handleCheckAvailability}
                    />
                </section>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden lg:block">
                {/* Header */}
                <div className="grid grid-cols-[1fr_320px] border-b border-primary ">
                    {/* Dates Header */}
                    <div className="border-r border-primary px-8 py-6 ">
                        <div className="grid  grid-cols-2 items-center">
                            <h3 className="uppercase tracking-[0.15em] text-xl font-medium  whitespace-nowrap">
                                Dates Of Stay
                            </h3>

                            <div className="grid grid-cols-3 gap-12  w-full">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.15em] text-dark-gray mb-1">
                                        Check-In
                                    </p>
                                    <p className="text-sm">{formatDate(checkIn)}</p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.15em] text-dark-gray mb-1">
                                        Check-Out
                                    </p>
                                    <p className="text-sm">{formatDate(checkOut)}</p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.15em] text-dark-gray mb-1">
                                        Duration
                                    </p>
                                    <p className="text-sm">{calcDuration(checkIn, checkOut)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rooms Header */}
                    <div className="px-8 py-6 flex items-center">
                        <h3 className="uppercase tracking-[0.15em]  text-xl font-medium">
                            Rooms & Guests
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-[1fr_320px]">
                    <div className="border-r border-primary">
                        <DatesOfStay
                            calendarStart={calendarStart}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            today={today}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onDayClick={handleDayClick}
                        />
                    </div>

                    <div className="h-136">
                        <RoomsAndGuests
                            rooms={rooms}
                            setRooms={setRooms}
                            iataOpen={iataOpen}
                            setIataOpen={setIataOpen}
                            iataCode={iataCode}
                            setIataCode={setIataCode}
                            onCheckAvailability={handleCheckAvailability}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
// ...existing code...