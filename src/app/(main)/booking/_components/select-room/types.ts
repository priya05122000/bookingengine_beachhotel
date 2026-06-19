export type PriceBreakdownEntry = {
    label: string;
    amount: string;
};

export type PackageItem = {
    id: string;
    title: string;
    subtitle?: string;
    price: string;
    details?: string;
    availableRooms?: number;
    priceBreakdown?: {
        entries: PriceBreakdownEntry[];
        tax: string;
        total: string;
    };
};