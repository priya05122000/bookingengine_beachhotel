export function parsePrice(priceStr: string): number {
    const digits = (priceStr || "").replace(/[^\d]/g, "");
    const n = Number(digits || 0);
    return isNaN(n) ? 0 : n;
}

export function formatINR(n: number): string {
    return n.toLocaleString("en-IN");
}
