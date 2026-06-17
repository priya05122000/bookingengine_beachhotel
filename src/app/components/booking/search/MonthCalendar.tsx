import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMockPrice } from '@/src/lib/mockPrices';



interface MonthCalendarProps {
    year: number;
    month: number;
    checkIn: Date | null;
    checkOut: Date | null;
    today: Date;
    onDayClick: (date: Date) => void;

    showPrev?: boolean;
    showNext?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
    prevDisabled?: boolean;
    isDesktopSecondMonth?: boolean;
}


// ================= CONSTANTS =================
const MONTH_NAMES = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];
const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// ================= HELPERS =================
function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
    const firstDay = new Date(year, month, 1);
    // align Monday as first column
    const offset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

type CellState = 'past' | 'checkIn' | 'checkOut' | 'inRange' | 'normal' | 'disabled';

function getCellState(
    date: Date,
    today: Date,
    checkIn: Date | null,
    checkOut: Date | null,
    selectingCheckOut?: boolean,
    maxCheckoutDate?: Date | null
): CellState {
    if (date < today) return 'past';
    if (checkIn && isSameDay(date, checkIn)) return 'checkIn';
    if (checkOut && isSameDay(date, checkOut)) return 'checkOut';
    if (checkIn && checkOut && date > checkIn && date < checkOut) return 'inRange';

    // When selecting checkout only allow dates from checkIn up to maxCheckoutDate
    if (selectingCheckOut && checkIn) {
        if (date < checkIn) return 'disabled';
        if (maxCheckoutDate && date > maxCheckoutDate) return 'disabled';
    }

    return 'normal';
}

// ================= PRESENTATIONAL: DayCell =================
function DayCell({ date, state, price, onClick }: {
    date: number;
    state: CellState;
    price: number | null;
    onClick: () => void;
}) {
    const base = 'flex flex-col items-center justify-center h-14 w-full select-none';

    if (state === 'past') {
        return (
            <div className={`${base} cursor-default`}>
                <span className="text-sm text-silver/50">{date}</span>
            </div>
        );
    }

    if (state === 'disabled') {
        return (
            <div className={`${base} cursor-not-allowed opacity-60`}>
                <span className="text-sm text-silver/40">{date}</span>
            </div>
        );
    }

    if (state === 'checkIn') {
        return (
            <div className={`${base} bg-primary cursor-pointer `} onClick={onClick}>
                <span className="text-white text-xs font-semibold">{date}</span>
                {price !== null && (
                    <span className=" text-white  text-[10px] leading-none mt-0.5">{'\u20B9'}{price}</span>
                )}
            </div>
        );
    }

    if (state === 'checkOut') {
        return (
            <div className={`${base} bg-primary cursor-pointer`} onClick={onClick}>
                <span className="text-white text-xs font-semibold">{date}</span>
                <span className="text-[10px] text-white/80 leading-none mt-0.5">Check out</span>
            </div>
        );
    }

    if (state === 'inRange') {
        return (
            <div className={`${base}  cursor-pointer `} onClick={onClick}>
                <span className="text-dark-gray text-xs font-medium">{date}</span>
                {price !== null && (
                    <span className="text-[10px] text-primary/60 leading-none mt-0.5">{'\u20B9'}{price}</span>
                )}
            </div>
        );
    }

    return (
        <div className={`${base} cursor-pointer hover:bg-gray transition-colors text-xs`} onClick={onClick}>
            <span className="text-dark-gray font-medium">{date}</span>
            {price !== null && (
                <span className=" text-silver text-[10px] leading-none mt-0.5">{'\u20B9'}{price}</span>
            )}
        </div>
    );
}

// ================= COMPONENT =================

export default function MonthCalendar({
    year,
    month,
    checkIn,
    checkOut,
    today,
    onDayClick,
    showPrev,
    showNext,
    onPrev,
    onNext,
    prevDisabled,
}: MonthCalendarProps) {
    // hide months before the current month (including earlier months in same year)
    if (
        year < today.getFullYear() ||
        (year === today.getFullYear() && month < today.getMonth())
    ) {
        return null;
    }

    const days = getCalendarDays(year, month);

    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 px-2">
                <button
                    onClick={onPrev}
                    disabled={prevDisabled}
                    className={`
            h-8 w-8 flex items-center justify-center
            transition-colors
            ${showPrev
                            ? prevDisabled
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:text-primary cursor-pointer"
                            : "invisible"
                        }
        `}
                >
                    <ChevronLeft size={16} />
                </button>

                <p className="flex-1 text-center text-primary uppercase tracking-widest text-sm font-semibold">
                    {MONTH_NAMES[month]} {year}
                </p>

                <button
                    onClick={onNext}
                    className={`
        h-8 w-8 flex items-center justify-center
        transition-colors
        ${showNext ? "hover:text-primary cursor-pointer" : "invisible"}
    `}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
                {DAY_HEADERS.map((d, i) => (
                    <div key={i} className="text-center  text-sm text-dark-gray tracking-wider h-10">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {days.map((date, i) => {
                    if (!date) return <div key={i} className="h-10" />;
                    const state = getCellState(date, today, checkIn, checkOut);
                    const price = getMockPrice(date);
                    return (
                        <DayCell
                            key={i}
                            date={date.getDate()}
                            state={state}
                            price={price}
                            onClick={() => state !== 'past' && onDayClick(date)}
                        />
                    );
                })}
            </div>
        </div>
    );
}