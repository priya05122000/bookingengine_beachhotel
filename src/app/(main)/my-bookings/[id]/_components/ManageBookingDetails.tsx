"use client";

import { useRef, useState } from "react";
import {
  X,
  CheckCircle2,
  CalendarDays,
  Clock,
  BedDouble,
  User,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Booking } from "@/src/lib/dummyBookings";
import { typography } from "@/src/lib/typography";
import { downloadInvoice } from "@/src/app/(main)/booking/_components/confirmation/invoicePdf";
import InvoicePreview from "@/src/app/(main)/booking/_components/confirmation/InvoicePreview";
import CancelBookingModal from "./CancelBookingModal";
import CancelConfirmModal from "./CancelConfirmModal";

interface ManageBookingDetailsProps {
  booking: Booking;
  onCancel: (reason: string) => void;
}

const statusConfig = {
  upcoming: {
    banner: "bg-pale-green border-l-4 border-light-green",
    iconBg: "bg-light-green",
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
    badge: "bg-pale-green text-light-green border border-light-green",
    label: "Upcoming",
    title: "Booking Confirmed",
    subtitle: "Your reservation is active. We look forward to welcoming you.",
  },
  completed: {
    banner: "bg-primary/4 border-l-4 border-primary",
    iconBg: "bg-primary",
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
    badge: "bg-primary/4 text-primary border border-primary",
    label: "Completed",
    title: "Stay Completed",
    subtitle:
      "Thank you for staying with us. We hope you had a wonderful time.",
  },
  cancelled: {
    banner: "bg-red-50 border-l-4 border-red-400",
    iconBg: "bg-red-400",
    icon: <X className="w-5 h-5 text-white" />,
    badge: "bg-red-50 text-red-500 border border-red-300",
    label: "Cancelled",
    title: "Booking Cancelled",
    subtitle: "This reservation has been cancelled.",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
      {children}
    </p>
  );
}

function SectionValue({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs lg:text-sm font-arizona-sans-regular text-primary">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-primary/10 my-5" />;
}

export default function ManageBookingDetails({
  booking,
  onCancel,
}: ManageBookingDetailsProps) {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingReason, setPendingReason] = useState("");

  const cfg = statusConfig[booking.status];

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadInvoice(invoiceRef);
    } finally {
      setDownloading(false);
    }
  }

  function handleReasonSubmit(reason: string) {
    setPendingReason(reason);
    setShowCancelModal(false);
    setShowConfirmModal(true);
  }

  function handleConfirmCancel() {
    setShowConfirmModal(false);
    onCancel(pendingReason);
  }

  return (
    <div className="mt-14 sm:my-20 bg-primary/4 p-6 md:p-10 space-y-6">
      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1
            className={`${typography.textFoXl} font-arizona-sans-regular uppercase tracking-[.08em] text-primary`}
          >
            Manage Booking
          </h1>
          <p className="text-xs font-arizona-light text-dark-gray mt-1">
            Ref No:&nbsp;
            <span className="font-arizona-sans-regular font-bold text-primary tracking-wider text-sm">
              {booking.reference}
            </span>
            &ensp;·&ensp;Booked on {booking.bookedOn}
          </p>
        </div>

        <span
          className={`self-start sm:self-auto text-[10px] font-arizona-sans-regular uppercase tracking-widest px-3 py-1 ${cfg.badge}`}
        >
          {cfg.label}
        </span>
      </div>

      {/* ── Main content grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_320px] gap-5 items-start">
        {/* ── Left column ── */}
        <div className="space-y-4">
          {/* Stay details card */}
          <div className="bg-white shadow-[-1px_4px_4px_0px_#00000040] p-5 sm:p-6 mb-0 lg:mb-4">
            <h2 className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray mb-5">
              Stay Details
            </h2>

            {/* Check-in / Check-out timeline */}
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 mb-1 sm:mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_40px_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-0 sm:gap-0 w-full">
                {/* Check-in */}
                <div className="flex-1 bg-primary/4 px-5 py-4 mb-1 sm:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays size={13} className="text-dark-gray" />
                    <SectionLabel>Check - In</SectionLabel>
                  </div>
                  <SectionValue>{booking.checkIn}</SectionValue>
                  <p className="text-[10px] font-arizona-light text-dark-gray mt-0.5">
                    From 6:00 pm
                  </p>
                </div>
                {/* Arrow divider */}
                <div className="hidden sm:flex items-center justify-center bg-primary/4 text-primary text-lg font-light select-none shrink-0">
                  &#8594;
                </div>
                {/* Check-out */}
                <div className="flex-1 bg-primary/4 px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays size={13} className="text-dark-gray" />
                    <SectionLabel>Check - Out</SectionLabel>
                  </div>
                  <SectionValue>{booking.checkOut}</SectionValue>
                  <p className="text-[10px] font-arizona-light text-dark-gray mt-0.5">
                    By 6:00 pm
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="hidden sm:flex flex-col items-center justify-center w-24 bg-primary text-white px-3 py-4 shrink-0">
                <Clock size={14} className="mb-1 opacity-80" />
                <p className="text-lg font-arizona-regular font-bold leading-none">
                  {booking.nights}
                </p>
                <p className="text-[9px] font-arizona-sans-regular uppercase tracking-widest mt-0.5 opacity-80">
                  Night{booking.nights !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Duration pill (mobile only) */}
            <div className="sm:hidden flex items-center gap-2 text-xs font-arizona-sans-regular text-primary mb-5 bg-primary/4 px-3 py-2">
              <Clock size={13} />
              <span>
                {booking.nights} Night{booking.nights !== 1 ? "s" : ""}
              </span>
            </div>

            <Divider />

            {/* Rooms */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <BedDouble size={13} className="text-dark-gray" />
                <SectionLabel>Rooms Selected</SectionLabel>
              </div>
              <div className="space-y-3">
                {booking.rooms.map((room, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs lg:text-sm font-arizona-sans-regular text-primary tracking-wide">
                        {room.type} – {room.view}
                      </p>
                      <p className="text-[11px] font-arizona-light text-dark-gray mt-0.5">
                        {room.count} Room{room.count !== 1 ? "s" : ""} |{" "}
                        {room.adults} Adult{room.adults !== 1 ? "s" : ""}
                        {room.children > 0 &&
                          ` & ${room.children} Child${room.children !== 1 ? "ren" : ""}`}
                      </p>
                    </div>
                    <span className="text-[10px] font-arizona-light bg-silver/30 text-dark-gray px-2 py-0.5 whitespace-nowrap shrink-0">
                      Breakfast Incl.
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* Guest info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User size={12} className="text-dark-gray" />
                  <SectionLabel>Guest</SectionLabel>
                </div>
                <SectionValue>{booking.guestName}</SectionValue>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={12} className="text-dark-gray" />
                  <SectionLabel>Phone</SectionLabel>
                </div>
                <SectionValue>{booking.phone}</SectionValue>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={12} className="text-dark-gray" />
                  <SectionLabel>Email</SectionLabel>
                </div>
                <SectionValue>{booking.email}</SectionValue>
              </div>
            </div>
          </div>

          {/* Cancel strip — hidden on mobile, shown on lg+ */}
          {booking.status === "upcoming" && (
            <div className="hidden lg:flex bg-white shadow-[-1px_4px_4px_0px_#00000040] px-5 py-4 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
                  Need to Cancel?
                </p>
                <p className="text-[11px] font-arizona-light text-dark-gray mt-0.5">
                  Cancellation requests are processed immediately.
                </p>
              </div>
              <button
                onClick={() => setShowCancelModal(true)}
                className="self-start sm:self-auto border border-red-400 text-red-500 px-5 h-9 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer hover:bg-red-50 transition-colors whitespace-nowrap"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>

        {/* ── Right column: Price summary ── */}
        <aside className="bg-white shadow-[-1px_4px_4px_0px_#00000040] p-5">
          <h2 className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray mb-5">
            Price Summary
          </h2>

          <div className="space-y-3 text-xs lg:text-sm">
            <div className="flex justify-between text-dark-gray">
              <div>
                <p>Rooms</p>
                <p className="text-[10px] font-arizona-light">
                  ({booking.nights} Night{booking.nights !== 1 ? "s" : ""})
                </p>
              </div>
              <span className="font-arizona-sans-regular">
                &#8377; {booking.priceBreakdown.rooms}
              </span>
            </div>

            <div className="flex justify-between text-dark-gray">
              <div>
                <p>Offer</p>
                <p className="text-[10px] font-arizona-light">
                  ({booking.priceBreakdown.offerPercent} off)
                </p>
              </div>
              <span className="font-arizona-sans-regular text-light-green">
                &#8722; &#8377; {booking.priceBreakdown.offer}
              </span>
            </div>

            <div className="flex justify-between text-dark-gray">
              <p>Extras</p>
              <span className="font-arizona-sans-regular">
                &#8377; {booking.priceBreakdown.extras}
              </span>
            </div>

            <div className="flex justify-between text-dark-gray">
              <p>Taxes &amp; Fees</p>
              <span className="font-arizona-sans-regular">
                &#8377; {booking.priceBreakdown.taxes}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/20 flex items-center justify-between">
            <p className="text-sm font-arizona-sans-regular uppercase tracking-widest text-primary">
              Total Paid
            </p>
            <p
              className={`${typography.textTwoXl} font-arizona-regular font-bold text-primary`}
            >
              &#8377; {booking.priceBreakdown.total}
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-primary text-white h-10 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <Download size={13} />
            {downloading ? "Downloading..." : "Download Invoice"}
          </button>
        </aside>

        {/* Cancel strip — mobile only, after price summary */}
        {booking.status === "upcoming" && (
          <div className="lg:hidden bg-white shadow-[-1px_4px_4px_0px_#00000040] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:mt-5">
            <div>
              <p className="text-xs font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
                Need to Cancel?
              </p>
              <p className="text-[11px] font-arizona-light text-dark-gray mt-0.5">
                Cancellation requests are processed immediately.
              </p>
            </div>
            <button
              onClick={() => setShowCancelModal(true)}
              className="self-start sm:self-auto border border-red-400 text-red-500 px-5 h-9 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>

      {/* ── Cancel modals ── */}
      {showCancelModal && (
        <CancelBookingModal
          onClose={() => setShowCancelModal(false)}
          onSubmit={handleReasonSubmit}
        />
      )}
      {showConfirmModal && (
        <CancelConfirmModal
          reason={pendingReason}
          onClose={() => {
            setShowConfirmModal(false);
            setShowCancelModal(true);
          }}
          onConfirm={handleConfirmCancel}
        />
      )}

      {/* Hidden invoice for PDF */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "794px",
        }}
      >
        <InvoicePreview ref={invoiceRef} />
      </div>
    </div>
  );
}
