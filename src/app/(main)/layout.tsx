import React from "react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";


export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />

            <main className="pt-14 ">
                {children}
            </main>

            <Footer />
        </>
    );
}