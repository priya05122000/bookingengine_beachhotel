interface BookingStepBarProps {
    steps: string[];
    activeStep: number;
    enabledUpTo: number;
}

export default function BookingStepBar({ steps, activeStep, enabledUpTo }: BookingStepBarProps) {
    const goToStep = (step: number) => {
        if (step > enabledUpTo) return;
        window.dispatchEvent(new CustomEvent('search:check-availability', { detail: { step } }));
    };

    return (
        <nav className="flex overflow-x-auto overflow-y-hidden -mx-4 px-4 border-b border-gray mb-8 whitespace-nowrap">
            {steps.map((step, i) => {
                const isEnabled = i <= enabledUpTo;
                const isActive = i === activeStep;

                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => goToStep(i)}
                        disabled={!isEnabled}
                        aria-current={isActive ? "step" : undefined}
                        className={`flex-none md:flex-1 min-w-30 text-center pb-3 px-4 uppercase tracking-wider md:tracking-widest text-sm font-semibold -mb-px transition-colors
  ${isActive
                                ? "text-primary border-b-4 border-primary"
                                : isEnabled
                                    ? "text-dark-gray border-b-4 border-black/54 hover:opacity-90 cursor-pointer"
                                    : "text-dark-gray/40 border-b-4 border-black/54 cursor-not-allowed"
                            }`}
                    >
                        {step}
                    </button>
                );
            })}
        </nav>
    );
}
