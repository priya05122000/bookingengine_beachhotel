"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Section from "@/src/components/common/Section";
import { bookings, BookingStatus } from "@/src/lib/dummyBookings";
import BookingsTabBar from "./_components/BookingsTabBar";
import BookingsFilter from "./_components/BookingsFilter";
import BookingCard from "./_components/BookingCard";
import { typography } from "@/src/lib/typography";

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export default function MyBookingsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [roomTypeFilter, setRoomTypeFilter] = useState("All Rooms");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [yearFilter, setYearFilter] = useState("All Years");

  const availableYears = useMemo(() => {
    const years = new Set(
      bookings.map((b) => new Date(b.checkIn.replace(/^[A-Za-z]+,\s/, "")).getFullYear().toString())
    );
    return Array.from(years).sort();
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab") as BookingStatus | null;
    if (tab && ["upcoming", "cancelled", "completed"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Re-derive counts each render so cancellations from the detail page are reflected
  const counts = {
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (b.status !== activeTab) return false;
      if (roomTypeFilter !== "All Rooms" && b.roomType !== roomTypeFilter) return false;
      const checkInDate = new Date(b.checkIn.replace(/^[A-Za-z]+,\s/, ""));
      if (monthFilter !== "All Months") {
        if (checkInDate.getMonth() !== MONTH_NAMES.indexOf(monthFilter)) return false;
      }
      if (yearFilter !== "All Years") {
        if (checkInDate.getFullYear().toString() !== yearFilter) return false;
      }
      return true;
    });
  }, [activeTab, roomTypeFilter, monthFilter, yearFilter]);

  return (
    <Section>
      <div className="mt-14 sm:my-20 bg-primary/4 p-6 md:p-10">
        <div className="mb-8">
          <h1
            className={`${typography.textFoXl} font-arizona-sans-regular uppercase tracking-[.08em] text-primary`}
          >
            My Bookings
          </h1>
          <p className="text-xs lg:text-sm font-arizona-light text-dark-gray mt-1">
            View and manage all your reservations at The Beach Hotel.
          </p>
        </div>

        <BookingsTabBar
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setRoomTypeFilter("All Rooms");
            setMonthFilter("All Months");
            setYearFilter("All Years");
          }}
          counts={counts}
        />

        <BookingsFilter
          roomType={roomTypeFilter}
          month={monthFilter}
          year={yearFilter}
          years={availableYears}
          onRoomTypeChange={setRoomTypeFilter}
          onMonthChange={setMonthFilter}
          onYearChange={setYearFilter}
          onClear={() => {
            setRoomTypeFilter("All Rooms");
            setMonthFilter("All Months");
            setYearFilter("All Years");
          }}
        />

        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm font-arizona-sans-regular uppercase tracking-widest text-dark-gray">
              No {activeTab} bookings found
            </p>
            <p className="text-xs font-arizona-light text-dark-gray mt-2">
              {activeTab === "upcoming"
                ? "You have no upcoming reservations. Book your next stay today."
                : "No bookings match your current filters."}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
