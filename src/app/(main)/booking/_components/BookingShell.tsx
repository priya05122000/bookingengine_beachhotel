
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
                <>

                    <div className=" flex justify-center">
                        <Image
                            src="/images/logo.png"
                            alt='banner'
                            width={300}
                            height={150}
                            className='w-auto h-full object-cover  mb-10 '
                        />
                    </div>


                    <Image
                        src="/images/Rectangle.png"
                        alt='banner'
                        width={1600}
                        height={900}
                        className='w-full h-64 object-cover '
                    />
                </>

            )}

            <div className=" bg-primary/4 p-6 md:p-10 mt-14 sm:mt-20">
                <h1
                    className={`text-center tracking-[.08em] text-primary  uppercase font-arizona-regular mb-8 md:mb-12 ${typography.textFoXl}`}
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
