import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />

            <main className="pt-28 ">
                {children}
            </main>

            <Footer />
        </>
    );
}