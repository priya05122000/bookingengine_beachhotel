// ...existing code...
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMockPrice } from '@/src/lib/mockPrices';
import { typography } from '@/src/lib/typography';
import { isSameDay } from '@/src/lib/dateUtils';

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

    // reusable options
    selectingCheckOut?: boolean;
    maxCheckoutDate?: Date | null;
    className?: string;
}

// ================= CONSTANTS =================
const MONTH_NAMES = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];
const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// ================= HELPERS =================
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

// ================= STYLES (reusable pieces) =================
const styles = {
    dayBase: 'flex flex-col items-center justify-center h-14 w-full select-none font-arizona-light text-center',
    interactive: 'cursor-pointer hover:bg-gray transition-colors',
    primaryBg: 'bg-primary hover:bg-primary',
    primaryText: 'text-white ',
    dateDefault: 'text-dark-gray text-[11px] lg:text-sm ',
    datePast: 'text-[11px] lg:text-sm  text-silver/50',
    dateDisabled: 'text-[11px] lg:text-sm  text-silver/40',
    priceSmall: 'text-[11px]   leading-none mt-0.5',
    priceMuted: 'text-silver',
    pricePrimaryMuted: 'text-primary/60',
};

// ================= PRESENTATIONAL: DayCell (kept in-file) =================
function DayCell({ date, state, price, onClick, ariaLabel }: {
    date: number;
    state: CellState;
    price: number | null;
    onClick: () => void;
    ariaLabel?: string;
}) {
    const base = styles.dayBase;

    if (state === 'past') {
        return (
            <div className={`${base} cursor-default`} aria-label={ariaLabel}>
                <span className={styles.datePast}>{date}</span>
            </div>
        );
    }

    if (state === 'disabled') {
        return (
            <div className={`${base} cursor-not-allowed opacity-60`} aria-label={ariaLabel}>
                <span className={styles.dateDisabled}>{date}</span>
            </div>
        );
    }

    if (state === 'checkIn') {
        return (
            <div className={`${base} ${styles.primaryBg} ${styles.interactive}`} onClick={onClick} aria-label={ariaLabel}>
                <span className={styles.primaryText + ' text-[11px] lg:text-sm'}>{date}</span>
                {price !== null && (
                    <span className={styles.primaryText + ' ' + styles.priceSmall}>{'\u20B9'}{price}</span>
                )}
            </div>
        );
    }

    if (state === 'checkOut') {
        return (
            <div className={`${base} ${styles.primaryBg} ${styles.interactive}`} onClick={onClick} aria-label={ariaLabel}>
                <span className={styles.primaryText + ' text-[11px] lg:text-sm'}>{date}</span>
                <span className={styles.primaryText + ' ' + styles.priceSmall}>Check out</span>
            </div>
        );
    }

    if (state === 'inRange') {
        return (
            <div className={`${base} ${styles.interactive}`} onClick={onClick} aria-label={ariaLabel}>
                <span className={styles.dateDefault}>{date}</span>
                {price !== null && (
                    <span className={styles.pricePrimaryMuted + ' ' + styles.priceSmall}>{'\u20B9'}{price}</span>
                )}
            </div>
        );
    }

    // normal
    return (
        <div className={`${base} ${styles.interactive}`} onClick={onClick} aria-label={ariaLabel}>
            <span className={styles.dateDefault}>{date}</span>
            {price !== null && (
                <span className={styles.priceMuted + ' ' + styles.priceSmall}>{'\u20B9'}{price}</span>
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
    selectingCheckOut,
    maxCheckoutDate,
    className,
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
        <div className={`flex-1 min-w-0 ${className ?? ''}`}>
            <div className="flex items-center justify-between mb-6 px-2">
                <button
                    onClick={onPrev}
                    disabled={prevDisabled}
                    aria-label="previous-month"
                    className={`h-8 w-8 flex items-center justify-center transition-colors ${showPrev
                        ? prevDisabled
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:text-primary cursor-pointer"
                        : "invisible"
                        }`}
                >
                    <ChevronLeft size={16} />
                </button>

                <p className={`flex-1 text-center font-arizona-light text-primary uppercase tracking-widest ${typography.textLg}`}>
                    {MONTH_NAMES[month]} {year}
                </p>

                <button
                    onClick={onNext}
                    aria-label="next-month"
                    className={`h-8 w-8 flex items-center justify-center transition-colors ${showNext ? "hover:text-primary cursor-pointer" : "invisible"}`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
                {DAY_HEADERS.map((d, i) => (
                    <div key={i} className={`text-center font-arizona-light ${typography.textSm} text-dark-gray tracking-wider h-10`}>
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {days.map((date, i) => {
                    if (!date) return <div key={i} className="h-10" />;
                    const state = getCellState(date, today, checkIn, checkOut, selectingCheckOut, maxCheckoutDate);
                    const price = getMockPrice(date);
                    return (
                        <DayCell
                            key={i}
                            date={date.getDate()}
                            state={state}
                            price={price}
                            onClick={() => state !== 'past' && state !== 'disabled' && onDayClick(date)}
                            ariaLabel={`${MONTH_NAMES[month]} ${date.getDate()} ${year}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
// ...existing code...