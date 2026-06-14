interface BookingStepBarProps {
    steps: string[];
    activeStep: number;
}

export default function BookingStepBar({ steps, activeStep }: BookingStepBarProps) {
    const goToStep = (step: number) => {
        window.dispatchEvent(new CustomEvent('search:check-availability', { detail: { step } }));
    };

    return (
        <nav className="flex border-b border-gray mb-8">
            {steps.map((step, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => goToStep(i)}
                    className={`flex-1 text-center pb-3 uppercase tracking-wider md:tracking-widest text-[9px] sm:text-xs md:text-sm font-semibold -mb-px transition-colors cursor-pointer
                        ${i === activeStep
                            ? 'text-deep-blue border-b-4 border-primary'
                            : 'text-dark-gray border-b-4 border-black/54'
                        }`}
                >
                    {step}
                </button>
            ))}
        </nav>
    );
}
