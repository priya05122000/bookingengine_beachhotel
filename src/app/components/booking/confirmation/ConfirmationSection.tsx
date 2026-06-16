'use client';

import { typography } from '@/src/lib/typography';
import React, { useRef, useState } from 'react';
import InvoicePreview from './InvoicePreview';
import { downloadInvoice } from './invoicePdf';


export default function ConfirmationSection() {
    const invoiceRef = useRef<HTMLDivElement | null>(null);

    const [showInvoicePreview, setShowInvoicePreview] = useState(false);

    async function handleDownloadInvoice() {
        await downloadInvoice(invoiceRef);
    }

    // async function handleDownloadInvoice() {
    //     if (!invoiceRef.current) {
    //         console.warn('Invoice element not mounted. Ensure hidden preview is rendered.');
    //         return;
    //     }
    //     await downloadInvoice(invoiceRef);
    // }

    return (
        <div className="py-8">
            <div className=" mx-auto space-y-6">

                {/* ── Top confirmation banner ── */}
                <div className="bg-pale-green border border-light-green px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Left: checkmark + message */}
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-light-green flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className={`${typography.textThXl} font-bold text-primary leading-snug`}>Your Booking Is Confirmed</h2>
                            <p className="text-xs text-dark-gray mt-1">
                                Thank you for choosing the beach hotel<br />
                                we look forward to hosting you
                            </p>
                        </div>
                    </div>

                    {/* Vertical divider */}
                    <div className="hidden sm:block w-px self-stretch bg-light-green" />

                    {/* Right: booking reference */}
                    <div className="sm:pl-6 ">
                        <p className="text-xs text-dark-gray tracking-wide">Booking reference</p>
                        <p className="text-2xl font-bold text-primary leading-tight mt-0.5">LB4567854</p>
                        <p className="text-xs text-dark-gray mt-1">
                            A confirmation email has been sent to<br />thebeachhotel@gmail.com
                        </p>
                    </div>
                </div>

                {/* ── Main grid ── */}
                <div className="flex  flex-col lg:grid lg:grid-cols-[1fr_300px] gap-5 items-start">

                    {/* Left: Booking Details */}
                    <div className="w-full overflow-hidden">
                        <div className="px-8 pt-8 pb-6 border border-primary bg-white">
                            <h3 className={`${typography.textThXl} font-bold text-dark-gray mb-8`}>Booking Details</h3>
                            <div className='w-2/3'>

                                {/* Row 1: GUEST | CHECK-IN | CHECK-OUT */}
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <div>
                                        <p className="text-xs text-dark-gray uppercase tracking-widest mb-2">Guest</p>
                                        <p className="text-sm font-semibold text-primary">Nuva rey</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-dark-gray uppercase tracking-widest mb-2">Check - In</p>
                                        <p className="text-sm font-semibold text-primary">Sun, 22 May 2026</p>
                                        <p className="text-xs text-dark-gray mt-1">From 6:00 pm</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-dark-gray uppercase tracking-widest mb-2">Check - Out</p>
                                        <p className="text-sm font-semibold text-primary">Mon, 23 May 2026</p>
                                        <p className="text-xs text-dark-gray mt-1">by 6:00 pm</p>
                                    </div>
                                </div>

                                {/* Row 2: YOUR RESERVATION | PHONE | EMAIL */}
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-xs text-dark-gray uppercase tracking-widest mb-2">Your Reservation</p>
                                        <p className="text-sm font-semibold text-primary">3 nights, 1<br />apartment</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-dark-gray uppercase tracking-widest mb-2">Phone</p>
                                        <p className="text-sm font-semibold text-primary">+91 65478 98756</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-dark-gray uppercase tracking-widest mb-2">Email</p>
                                        <p className="text-sm text-primary">nuvaray26@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom strip */}
                        <div className="bg-white border border-primary px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
                            <div>
                                <p className="text-sm font-bold text-dark-gray uppercase tracking-wide">
                                    Manage Your Booking N The Go
                                </p>
                                <p className="text-sm text-dark-gray mt-0.5">
                                    View modify or cancel your booking anytime
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    window.dispatchEvent(
                                        new CustomEvent("search:check-availability", {
                                            detail: {
                                                step: 0,
                                                showPackages: false,
                                            },
                                        })
                                    );
                                }}
                                className="bg-primary rounded-xs text-white px-5 h-10 text-sm font-semibold uppercase tracking-wide shrink-0"
                            >
                                Go To My Booking
                            </button>
                        </div>
                    </div>

                    {/* Right: Reservation & Price summary */}
                    <aside className="space-y-4 w-full bg-white shadow-[-1px_4px_4px_0px_#00000040]">

                        {/* Reservation Summery */}
                        <div className="p-2">
                            <h4 className={`${typography.textBase} font-bold text-primary mb-4`}>Reservation Summery</h4>
                            <div className="bg-light-white shadow-[-1px_4px_4px_0px_#00000040] p-4 space-y-4">
                                {/* Check-in / Check-out */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-dark-gray uppercase tracking-widest mb-1">Check - In</p>
                                        <p className="text-sm font-semibold text-primary">Mon, 23 May 2026</p>
                                        <p className="text-[10px] text-dark-gray mt-0.5">From 6:00 pm</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-dark-gray uppercase tracking-widest mb-1">Check - Out</p>
                                        <p className="text-sm font-semibold text-primary">Mon, 23 May 2026</p>
                                        <p className="text-[10px] text-dark-gray mt-0.5">by 6:00 pm</p>
                                    </div>
                                </div>
                                {/* Total Length of Stay */}
                                <div>
                                    <p className="text-[10px] text-dark-gray uppercase tracking-widest mb-1">Total Length Of Stay</p>
                                    <p className={`${typography.textBase} font-bold text-primary`}>5</p>
                                </div>
                                {/* You Selected */}
                                <div>
                                    <p className="text-[10px] text-dark-gray uppercase tracking-widest mb-1">You Selected</p>
                                    <p className="text-sm font-semibold text-primary">king bed economy</p>
                                </div>
                            </div>

                            {/* Price Summery */}
                            <div className="bg-light-white shadow-[-1px_4px_4px_0px_#00000040] p-4 space-y-4 mt-3 ">
                                <div className="">
                                    <h4 className={`${typography.textBase} font-bold text-primary mb-4`}>Price Summery</h4>

                                    <div className="flex justify-between text-sm text-dark-gray">
                                        <span>Rooms &amp; offer</span>
                                        <span>&#8377; 6,000</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-dark-gray">
                                        <span>Extras</span>
                                        <span>&#8377; 700</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
                                    <span className="text-sm font-semibold text-primary">Total amount  paid</span>
                                    <span className="text-sm font-bold text-primary">&#8377; 0000</span>
                                </div>

                            </div>
                            <div className="mt-3 flex gap-3">
                                <button
                                    onClick={() => setShowInvoicePreview(true)}
                                    className="flex-1 border border-primary text-primary h-10 rounded-xs text-xs font-bold uppercase tracking-widest"
                                >
                                    Preview Invoice
                                </button>

                                <button
                                    onClick={handleDownloadInvoice}
                                    className="flex-1 bg-primary text-white h-10 rounded-xs text-xs font-bold uppercase tracking-widest"
                                >
                                    Download Invoice
                                </button>
                            </div>
                        </div>



                    </aside>
                </div>

                {/* ── Explore More ── */}
                <div className="bg-white px-6 py-8">
                    <h3 className={`text-center ${typography.textThXl} font-bold text-primary mb-6`}>
                        Explore More For Your Hotel Room
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className='shadow-[-1px_4px_4px_0px_#00000040]'>
                                <img
                                    src="/images/Rectangle.png"
                                    alt={`explore-${i}`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-3">
                                    <p className="text-sm font-bold text-dark-gray">SPA &amp; WELLNESS</p>
                                    <p className="text-sm text-dark-gray mt-0.5">relax &amp; rejuvenate</p>
                                    <button className="text-sm text-primary mt-2">Explore →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ── PREVIEW MODAL ── opens when user clicks "Preview Invoice" */}
            {showInvoicePreview && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-sm shadow-lg">
                        <button
                            onClick={() => setShowInvoicePreview(false)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border rounded-full bg-white"
                        >
                            ✕
                        </button>
                        {/* No ref here — visual preview only, not used for PDF capture */}
                        <InvoicePreview />
                    </div>
                </div>
            )}

            {/* ── HIDDEN INVOICE ── always mounted off-screen so invoiceRef.current is never null */}
            {/* html2canvas needs a real DOM node with layout; display:none won't work */}
            <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', top: 0, width: '794px' /* ≈ A4 at 96 dpi */ }}
            >
                <InvoicePreview ref={invoiceRef} />
            </div>
        </div>
    );
}