"use client";

import { useEffect, useRef } from "react";

interface BookingStepBarProps {
    steps: string[];
    activeStep: number;
    enabledUpTo: number;
}

export default function BookingStepBar({ steps, activeStep, enabledUpTo }: BookingStepBarProps) {
    const navRef = useRef<HTMLElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const active = activeRef.current;
        if (!nav || !active) return;

        const navWidth = nav.offsetWidth;
        const activeLeft = active.offsetLeft;
        const activeWidth = active.offsetWidth;
        nav.scrollTo({ left: activeLeft - navWidth / 2 + activeWidth / 2, behavior: "smooth" });
    }, [activeStep]);

    const goToStep = (step: number) => {
        if (step > enabledUpTo) return;
        window.dispatchEvent(new CustomEvent('search:check-availability', { detail: { step } }));
    };

    return (
        <nav ref={navRef} className="flex overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4 border-b border-gray mb-8 whitespace-nowrap">
            {steps.map((step, i) => {
                const isEnabled = i <= enabledUpTo;
                const isActive = i === activeStep;

                return (
                    <button
                        key={i}
                        ref={isActive ? activeRef : undefined}
                        type="button"
                        onClick={() => goToStep(i)}
                        disabled={!isEnabled}
                        aria-current={isActive ? "step" : undefined}
                        className={`flex-none md:flex-1 min-w-30 text-center pb-3 px-4 uppercase tracking-[.08em] text-sm  text-wrap -mb-px transition-colors font-arizona-light
  ${isActive
                                ? "text-primary border-b-4  font-bold  border-primary"
                                : isEnabled
                                    ? "text-dark-gray border-b-4 border-black/14 hover:opacity-90 cursor-pointer"
                                    : "text-dark-gray/40 border-b-4 border-black/14 cursor-not-allowed"
                            }`}
                    >
                        {step}
                    </button>
                );
            })}
        </nav>
    );
}
