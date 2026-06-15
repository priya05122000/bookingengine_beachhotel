// ...existing code...
"use client";

import { useEffect, useState } from "react";
import SearchForm from "../booking/search/SearchForm";
import BookingShell from "./BookingShell";
import SelectRoomSection from "../booking/select-room/SelectRoomSection";
import GuestPaymentSection from "../booking/guest-payment/GuestPaymentSection";
import ConfirmationSection from "../booking/confirmation/ConfirmationSection";
import { X } from "lucide-react";

const STEPS = [
    "Search",
    "Select Room",
    "Guest & Credit Card Information",
    "Confirmation",
];

export default function FilterSection() {
    const [activeStep, setActiveStep] = useState(0);
    const [showPackages, setShowPackages] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);

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

    // enable steps up to the current activeStep (initially only 0/Search enabled)
    const enabledUpTo = activeStep;

    return (

        <>
            {showSearchPopup && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowSearchPopup(false)}
                    />

                    <div className="relative bg-white w-[95vw] h-[90vh] max-w-300  overflow-y-auto rounded-sm p-5">

                        {/* Header */}
                        {/* <div className=" z-10 flex items-center justify-between "> */}
                        {/* <h2 className="text-2xl font-semibold tracking-wide uppercase">
                                Edit Booking
                            </h2> */}

                        <button
                            onClick={() => setShowSearchPopup(false)}
                            className="leading-none cursor-pointer absolute top-3 right-5 hover:opacity-70"
                        >
                            <X className="w-5 h-5"/>
                        </button>
                        {/* </div> */}

                        <div className="pt-5">
                            <SearchForm />
                        </div>
                    </div>
                </div>
            )}


            <BookingShell steps={STEPS} activeStep={activeStep} enabledUpTo={enabledUpTo}>
                {activeStep === 0 && (
                    <SearchForm />
                )}
                {activeStep === 1 && (
                    <SelectRoomSection
                        showPackages={showPackages}
                        setShowPackages={setShowPackages}
                        onEdit={() => setShowSearchPopup(true)}
                    />
                )}

                {activeStep === 2 && (
                    <GuestPaymentSection />
                )}

                {activeStep === 3 && (
                    <ConfirmationSection />
                )}
            </BookingShell>

        </>

    );
}
// ...existing code...