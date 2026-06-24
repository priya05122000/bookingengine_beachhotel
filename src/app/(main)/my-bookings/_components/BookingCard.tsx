"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CalendarDays, BedDouble, Clock } from "lucide-react";
import { Booking, BookingStatus } from "@/src/lib/dummyBookings";
import { downloadInvoice } from "@/src/app/(main)/booking/_components/confirmation/invoicePdf";
import InvoicePreview from "@/src/app/(main)/booking/_components/confirmation/InvoicePreview";

const statusConfig: Record<BookingStatus, { label: string; classes: string }> = {
  upcoming: {
    label: "Upcoming",
    classes: "bg-pale-green text-light-green border border-light-green",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-50 text-red-500 border border-red-300",
  },
  completed: {
    label: "Completed",
    classes: "bg-primary/4 text-primary border border-primary",
  },
};

export default function BookingCard({ booking }: { booking: Booking }) {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const { label, classes } = statusConfig[booking.status];

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadInvoice(invoiceRef);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="bg-white shadow-[-1px_4px_4px_0px_#00000040] p-4 sm:p-5">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Left: main info */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
            <p className="text-xs font-arizona-sans-regular tracking-widest uppercase text-dark-gray">
              Ref No:&nbsp;
              <span className="text-primary font-bold">{booking.reference}</span>
            </p>
            <span
              className={`text-[10px] font-arizona-sans-regular uppercase tracking-widest px-2 py-0.5 rounded-full ${classes}`}
            >
              {label}
            </span>
          </div>

          <div className="space-y-1">
            {booking.rooms.map((room, i) => (
              <p
                key={i}
                className="text-sm font-arizona-sans-regular text-primary tracking-wide"
              >
                {room.type} – {room.view}&ensp;
                <span className="text-primary text-xs font-arizona-regular block lg:inline">
                  ({room.count} Room{room.count !== 1 ? "s" : ""} | {" "}
                  {room.adults} Adult{room.adults !== 1 ? "s" : ""}
                  {room.children > 0 && ` & ${room.children} Child${room.children !== 1 ? "ren" : ""}`})
                </span>
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-dark-gray font-arizona-light">
              <CalendarDays size={13} />
              <span>
                {booking.checkIn} &rarr; {booking.checkOut}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-dark-gray font-arizona-light">
              <Clock size={13} />
              <span>{booking.nights} Night{booking.nights !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-dark-gray font-arizona-light">
              <BedDouble size={13} />
              <span>{booking.roomType}</span>
            </div>
          </div>

          {booking.cancellationReason && (
            <p className="text-xs text-red-400 font-arizona-light">
              Reason: {booking.cancellationReason}
            </p>
          )}
        </div>

        {/* Right: amount + actions */}
        <div className="flex flex-col items-start sm:items-end gap-3 sm:min-w-40">
          <div className="sm:text-right">
            <p className="text-[10px] font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
              Total Amount Paid
            </p>
            <p className="text-base font-arizona-regular font-bold text-primary tracking-wide">
              {booking.totalAmount}
            </p>
            <p className="text-[10px] text-dark-gray font-arizona-light">
              Booked on {booking.bookedOn}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/my-bookings/${booking.id}`}
              className="bg-primary text-white px-4 h-8 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest flex items-center hover:opacity-90 transition-opacity"
            >
              Manage
            </Link>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="border border-primary text-primary px-4 h-8 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer hover:bg-primary/4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? "Downloading..." : "Download Invoice"}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden invoice for PDF */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: 0, width: "794px" }}
      >
        <InvoicePreview ref={invoiceRef} />
      </div>
    </div>
  );
}
