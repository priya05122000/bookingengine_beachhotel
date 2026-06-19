"use client";

import { useEffect, useState } from "react";
import SearchForm from "./search/SearchForm";
import BookingShell from "./BookingShell";
import SelectRoomSection from "./select-room/SelectRoomSection";
import GuestPaymentSection from "./guest-payment/GuestPaymentSection";
import ConfirmationSection from "./confirmation/ConfirmationSection";
import { X } from "lucide-react";
import { flushSync } from "react-dom";

const STEPS = [
    "Search",
    "Select Room",
    "Guest Information",
    "Confirmation",
];

export default function FilterSection() {
    const [activeStep, setActiveStep] = useState(0);
    const [showPackages, setShowPackages] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent;

            // Ensure the popup DOM is removed immediately
            flushSync(() => {
                setShowSearchPopup(false);
            });

            const step =
                typeof ce.detail?.step === "number"
                    ? ce.detail.step
                    : 1;

            // Apply step change synchronously as well to avoid race conditions
            flushSync(() => {
                setActiveStep(step);
            });

            if (ce.detail?.showPackages === true) {
                setShowPackages(true);
            }
        };

        window.addEventListener(
            "search:check-availability",
            handler as EventListener
        );

        return () => {
            window.removeEventListener(
                "search:check-availability",
                handler as EventListener
            );
        };
    }, []);

    // Close popup and scroll to top whenever step changes
    useEffect(() => {
        if (activeStep > 0) {
            setShowSearchPopup(false);
        }
        if (activeStep !== 1) {
            setShowPackages(false);
        }
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [activeStep]);

    const enabledUpTo = activeStep;

    return (
        <>
            {showSearchPopup && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowSearchPopup(false)}
                    />

                    <div className="relative bg-white w-[95vw] h-[90vh] max-w-300 overflow-y-auto rounded-sm p-5">
                        <button
                            onClick={() => setShowSearchPopup(false)}
                            className="absolute top-3 right-5 cursor-pointer hover:opacity-70"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="pt-5">
                            <SearchForm />
                        </div>
                    </div>
                </div>
            )}

            <BookingShell
                steps={STEPS}
                activeStep={activeStep}
                enabledUpTo={enabledUpTo}
            >
                {activeStep === 0 && <SearchForm />}

                {activeStep === 1 && (
                    <SelectRoomSection
                        showPackages={showPackages}
                        setShowPackages={setShowPackages}
                        onEdit={() => setShowSearchPopup(true)}
                    />
                )}

                {activeStep === 2 && <GuestPaymentSection />}

                {activeStep === 3 && <ConfirmationSection />}
            </BookingShell>
        </>
    );
}