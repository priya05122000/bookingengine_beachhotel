// ...existing code...
import React from "react";
import BookingStepBar from "./BookingStepBar";
import { typography } from "@/src/lib/typography";
import Image from "next/image";

type Props = {
    steps: string[];
    activeStep: number;
    enabledUpTo: number;
    children: React.ReactNode;
};

export default function BookingShell({
    steps,
    activeStep,
    enabledUpTo,
    children,
}: Props) {
    return (

        <>
            {activeStep === 0 && (
                <Image
                    src="/images/Rectangle.png"
                    alt='banner'
                    width={1600}
                    height={900}
                    className='w-full h-64 object-cover mb-10 sm:mb-20'
                />
            )}

            <div className=" bg-primary/4 p-4 md:p-10">
                <h1
                    className={`text-center  text-primary uppercase font-arizona mb-8 md:mb-12 ${typography.textFoXl}`}
                >
                    Book Your Stay
                </h1>

                <BookingStepBar
                    steps={steps}
                    activeStep={activeStep}
                    enabledUpTo={enabledUpTo}
                />

                {children}
            </div>
        </>


    );
}
// ...existing code...