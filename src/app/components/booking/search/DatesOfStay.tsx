import MonthCalendar from './MonthCalendar';

interface DatesOfStayProps {
    calendarStart: Date;
    checkIn: Date | null;
    checkOut: Date | null;
    today: Date;
    onPrev: () => void;
    onNext: () => void;
    onDayClick: (date: Date) => void;
}

// ================= CONSTANTS =================
const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

// ================= HELPERS =================
function formatDate(date: Date | null): string {
    if (!date) return '—';
    return date.toLocaleDateString('en-GB', DATE_FORMAT);
}

function calcDuration(checkIn: Date | null, checkOut: Date | null): string {
    if (!checkIn || !checkOut) return '—';
    const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000);
    return `${nights + 1}D, ${nights}N`;
}

// ================= COMPONENT =================

export default function DatesOfStay({
    calendarStart,
    checkIn,
    checkOut,
    today,
    onPrev,
    onNext,
    onDayClick,
}: DatesOfStayProps) {
    const leftYear = calendarStart.getFullYear();
    const leftMonth = calendarStart.getMonth();
    const rightDate = new Date(leftYear, leftMonth + 1, 1);
    const rightYear = rightDate.getFullYear();
    const rightMonth = rightDate.getMonth();

    // disable prev if calendarStart is the current month or earlier
    const prevDisabled =
        calendarStart.getFullYear() < today.getFullYear() ||
        (calendarStart.getFullYear() === today.getFullYear() &&
            calendarStart.getMonth() <= today.getMonth());

    return (
        <div className=' h-full flex flex-col justify-between'>
            {/* Dual calendar with nav arrows */}
            <div className="flex items-start gap-1 p-3 md:p-6">

                <MonthCalendar
                    year={leftYear}
                    month={leftMonth}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    today={today}
                    onDayClick={onDayClick}
                    showPrev
                    onPrev={onPrev}
                    prevDisabled={prevDisabled}
                />

                <div className="hidden md:block w-px self-stretch mx-2" />

                <div className="hidden md:block flex-1">
                    <MonthCalendar
                        year={rightYear}
                        month={rightMonth}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        today={today}
                        onDayClick={onDayClick}
                        showNext
                        onNext={onNext}
                    />
                </div>
            </div>

            <p className="mt-4 text-[10px] text-silver p-3  md:p-6 tracking-wider">Rates shown in S$</p>
        </div>
    );
}