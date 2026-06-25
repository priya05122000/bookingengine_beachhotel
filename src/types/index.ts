export type BookingStatus = "upcoming" | "cancelled" | "completed";

export type BookingRoom = {
  type: string;
  view: string;
  count: number;
  adults: number;
  children: number;
};

export type Booking = {
  id: string;
  reference: string;
  status: BookingStatus;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: BookingRoom[];
  totalAmount: string;
  roomType: string;
  bookedOn: string;
  cancellationReason?: string;
  priceBreakdown: {
    rooms: string;
    offer: string;
    offerPercent: string;
    extras: string;
    taxes: string;
    total: string;
  };
};
