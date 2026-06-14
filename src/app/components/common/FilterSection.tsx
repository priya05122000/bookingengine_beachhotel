// ...existing code...
"use client";

import { useEffect, useState } from "react";
import SearchForm from "../booking/search/SearchForm";
import BookingShell from "./BookingShell";
import SelectRoomSection from "../booking/select-room/SelectRoomSection";
import GuestPaymentSection from "../booking/guest-payment/GuestPaymentSection";
import ConfirmationSection from "../booking/confirmation/ConfirmationSection";

const STEPS = [
    "Search",
    "Select Room",
    "Guest & Credit Card Information",
    "Confirmation",
];

export default function FilterSection() {
    const [activeStep, setActiveStep] = useState(0);
    const [showPackages, setShowPackages] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent;
            const step = typeof ce.detail?.step === "number" ? ce.detail.step : 1;

            // Update active step
            setActiveStep(step);

            // If event requests packages to be shown, ensure parent state is updated
            if (ce.detail?.showPackages === true) {
                setShowPackages(true);
            }
        };

        window.addEventListener("search:check-availability", handler as EventListener);
        return () =>
            window.removeEventListener("search:check-availability", handler as EventListener);
    }, []);

    return (
        <BookingShell steps={STEPS} activeStep={activeStep}>

            {activeStep === 0 && (
                <SearchForm />
            )}

            {activeStep === 1 && (
                <SelectRoomSection showPackages={showPackages} setShowPackages={setShowPackages} />
            )}

            {activeStep === 2 && (
                <GuestPaymentSection />
            )}

            {activeStep === 3 && (
                <ConfirmationSection />
            )}
        </BookingShell>
    );
}
// ...existing code...