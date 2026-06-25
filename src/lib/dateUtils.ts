export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
};

export function formatDate(date: Date | null): string {
    if (!date) return "—";
    return date.toLocaleDateString("en-GB", DATE_FORMAT);
}

export function calcDuration(checkIn: Date | null, checkOut: Date | null): string {
    if (!checkIn || !checkOut) return "—";
    const nights = Math.round(
        (checkOut.getTime() - checkIn.getTime()) / 86400000
    );
    return `${nights + 1}D, ${nights}N`;
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}
