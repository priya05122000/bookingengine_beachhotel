export function getMockPrice(date: Date): number | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return null;

    const dayOfYear = Math.floor(
        (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const prices = [880, 930, 950, 1020, 1100, 780, 860, 990, 1050, 870, 1180, 1280];
    return prices[dayOfYear % prices.length];
}
