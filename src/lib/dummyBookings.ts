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

export const bookings: Booking[] = [
  {
    id: "bk001",
    reference: "LB4567854",
    status: "upcoming",
    guestName: "Nuva Rey",
    email: "nuvaray26@gmail.com",
    phone: "+91 65478 98756",
    checkIn: "Sun, 22 Jun 2026",
    checkOut: "Wed, 25 Jun 2026",
    nights: 3,
    rooms: [{ type: "Premier Room", view: "Sea View", count: 2, adults: 2, children: 2 }],
    totalAmount: "INR 8,300",
    roomType: "Premier Room",
    bookedOn: "10 Jun 2026",
    priceBreakdown: {
      rooms: "6,000",
      offer: "600",
      offerPercent: "10%",
      extras: "700",
      taxes: "1,000",
      total: "8,300",
    },
  },
  {
    id: "bk002",
    reference: "LB4891023",
    status: "upcoming",
    guestName: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 98765 43210",
    checkIn: "Fri, 04 Jul 2026",
    checkOut: "Mon, 07 Jul 2026",
    nights: 3,
    rooms: [{ type: "Bay Suite", view: "Sea View", count: 1, adults: 2, children: 0 }],
    totalAmount: "INR 15,750",
    roomType: "Bay Suite",
    bookedOn: "15 Jun 2026",
    priceBreakdown: {
      rooms: "13,500",
      offer: "1,350",
      offerPercent: "10%",
      extras: "600",
      taxes: "1,500",
      total: "15,750",
    },
  },
  {
    id: "bk003",
    reference: "LB3301847",
    status: "upcoming",
    guestName: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 77654 32109",
    checkIn: "Sat, 19 Jul 2026",
    checkOut: "Tue, 22 Jul 2026",
    nights: 3,
    rooms: [
      { type: "Economy Room", view: "Sunset View", count: 1, adults: 1, children: 0 },
      { type: "Deluxe Room", view: "Sea View", count: 1, adults: 2, children: 1 },
    ],
    totalAmount: "INR 12,480",
    roomType: "Economy Room",
    bookedOn: "20 Jun 2026",
    priceBreakdown: {
      rooms: "10,800",
      offer: "1,080",
      offerPercent: "10%",
      extras: "360",
      taxes: "1,200",
      total: "12,480",
    },
  },
  {
    id: "bk004",
    reference: "LB2290563",
    status: "completed",
    guestName: "Nuva Rey",
    email: "nuvaray26@gmail.com",
    phone: "+91 65478 98756",
    checkIn: "Mon, 05 May 2026",
    checkOut: "Thu, 08 May 2026",
    nights: 3,
    rooms: [{ type: "Premier Room", view: "Sea View", count: 1, adults: 2, children: 0 }],
    totalAmount: "INR 9,100",
    roomType: "Premier Room",
    bookedOn: "20 Apr 2026",
    priceBreakdown: {
      rooms: "7,800",
      offer: "780",
      offerPercent: "10%",
      extras: "500",
      taxes: "900",
      total: "9,100",
    },
  },
  {
    id: "bk005",
    reference: "LB1178924",
    status: "completed",
    guestName: "Nuva Rey",
    email: "nuvaray26@gmail.com",
    phone: "+91 65478 98756",
    checkIn: "Fri, 14 Mar 2026",
    checkOut: "Sun, 16 Mar 2026",
    nights: 2,
    rooms: [{ type: "Economy Room", view: "Sea View", count: 1, adults: 2, children: 1 }],
    totalAmount: "INR 5,200",
    roomType: "Economy Room",
    bookedOn: "01 Mar 2026",
    priceBreakdown: {
      rooms: "4,400",
      offer: "440",
      offerPercent: "10%",
      extras: "200",
      taxes: "520",
      total: "5,200",
    },
  },
  {
    id: "bk006",
    reference: "LB9982341",
    status: "cancelled",
    guestName: "Nuva Rey",
    email: "nuvaray26@gmail.com",
    phone: "+91 65478 98756",
    checkIn: "Thu, 02 Apr 2026",
    checkOut: "Sat, 04 Apr 2026",
    nights: 2,
    rooms: [{ type: "Bay Suite", view: "Sea View", count: 1, adults: 2, children: 0 }],
    totalAmount: "INR 11,200",
    roomType: "Bay Suite",
    bookedOn: "18 Mar 2026",
    cancellationReason: "Change of plans",
    priceBreakdown: {
      rooms: "9,600",
      offer: "960",
      offerPercent: "10%",
      extras: "400",
      taxes: "960",
      total: "11,200",
    },
  },
  {
    id: "bk007",
    reference: "LB8864120",
    status: "completed",
    guestName: "Nuva Rey",
    email: "nuvaray26@gmail.com",
    phone: "+91 65478 98756",
    checkIn: "Sat, 10 Jan 2026",
    checkOut: "Mon, 12 Jan 2026",
    nights: 2,
    rooms: [{ type: "Deluxe Room", view: "Sunset View", count: 2, adults: 4, children: 0 }],
    totalAmount: "INR 16,400",
    roomType: "Deluxe Room",
    bookedOn: "28 Dec 2025",
    priceBreakdown: {
      rooms: "14,000",
      offer: "1,400",
      offerPercent: "10%",
      extras: "800",
      taxes: "1,600",
      total: "16,400",
    },
  },
];
