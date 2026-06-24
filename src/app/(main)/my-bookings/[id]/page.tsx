"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Section from "@/src/components/common/Section";
import { bookings } from "@/src/lib/dummyBookings";
import ManageBookingDetails from "./_components/ManageBookingDetails";
import Link from "next/link";

export default function ManageBookingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // Local copy of bookings so cancellation updates are reflected immediately
  const [localBookings, setLocalBookings] = useState(() => [...bookings]);

  const booking = localBookings.find((b) => b.id === id);

  // Keep localBookings in sync when navigating between detail pages
  useEffect(() => {
    setLocalBookings([...bookings]);
  }, [id]);

  function handleCancel(reason: string) {
    // Update the shared bookings array
    const target = bookings.find((b) => b.id === id);
    if (target) {
      target.status = "cancelled";
      target.cancellationReason = reason;
    }
    // Navigate to My Bookings with cancelled tab
    router.push("/my-bookings?tab=cancelled");
  }

  if (!booking) {
    return (
      <Section>
        <div className="mt-14 sm:my-20 py-16 text-center">
          <p className="text-sm font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
            Booking not found
          </p>
          <p className="text-xs font-arizona-light text-dark-gray mt-2">
            The reservation you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/my-bookings"
            className="inline-block mt-6 bg-primary text-white px-6 h-10 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest leading-10 hover:opacity-90 transition-opacity"
          >
            Back to My Bookings
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <ManageBookingDetails booking={booking} onCancel={handleCancel} />
    </Section>
  );
}
