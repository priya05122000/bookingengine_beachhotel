'use client';

import { Globe, MapPin, Phone } from 'lucide-react';
import React, { forwardRef } from 'react';

type Props = object;

// ── shared class tokens ──────────────────────────────────────────────────────

const cls = {
    body:    'font-arizona-light tracking-wide',
    header:  'font-arizona-sans-regular tracking-wider',
    icon:    'w-4 h-4 shrink-0',
    cell:    'px-2 py-2',
    // table cell variants
    td:      'px-2 py-2 border-b border-gray-200',
    tdC:     'px-2 py-2 border-b border-gray-200 text-center',
    tdS:     'px-2 py-2 border-b border-gray-200 bg-gray-100',
    tdSC:    'px-2 py-2 border-b border-gray-200 bg-gray-100 text-center',
} as const;

// ── sub-sections ─────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${cls.header} text-sm uppercase font-bold text-primary mb-4`}>
            {children}
        </div>
    );
}

function InvoiceHeader() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="h-25 relative">
                    <img src="/images/logo.png" alt="Hotel Logo" className="h-full w-auto object-contain" />
                </div>
                <div className={`${cls.header} inline-flex h-10 items-center px-4 bg-primary text-white text-xs font-bold tracking-widest rounded-xs`}>
                    INVOICE
                </div>
            </div>

            <div className={`${cls.body} grid grid-cols-2 items-end gap-10 text-sm`}>
                <div className="space-y-2">
                    <p className="flex items-start gap-2">
                        <MapPin className={`${cls.icon} mt-0.5`} />
                        Beach Rd, Kanniyakumari,<br /> Tamil Nadu 629702, India
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone className={cls.icon} /> +91 54678 98765
                    </p>
                    <p className="flex items-center gap-2">
                        <Globe className={cls.icon} /> https://thebeachhotel.in/
                    </p>
                </div>
                <div className="space-y-1">
                    <div><strong>Invoice No :</strong> 45145</div>
                    <div><strong>Invoice Date :</strong> 31-03-2019</div>
                </div>
            </div>
        </div>
    );
}

function GuestDetails() {
    const checkRows = [
        { label: 'Check-in',  date: '29-03-2019', time: '09:00 a.m' },
        { label: 'Check-Out', date: '29-03-2019', time: '09:00 a.m' },
    ];

    return (
        <div>
            <SectionTitle>Guest Details</SectionTitle>

            <div className={`${cls.body} grid grid-cols-2 gap-10 text-sm`}>
                <div className="space-y-1">
                    <div><strong>Name :</strong> Nuva Rey</div>
                    <div><strong>Address :</strong> 123 Ocean View St., Beachville, CA 90210</div>
                    <div><strong>Phone :</strong> +91 65478 98756</div>
                    <div><strong>Email :</strong> nuvaray26@gmail.com</div>
                </div>
                <div className="space-y-1">
                    <div><strong>Room No :</strong> 121</div>
                    <div><strong>Room Type :</strong> King Bed Economy</div>
                    <div><strong>Room Rate :</strong> &#8377; 6,000</div>
                </div>
            </div>

            <table className="w-1/2 border-collapse text-sm mt-4">
                <thead>
                    <tr className={cls.header}>
                        <th className="py-2" />
                        <th className={`${cls.cell} text-center`}>Date</th>
                        <th className={`${cls.cell} text-center`}>Time</th>
                    </tr>
                </thead>
                <tbody className={`${cls.body} text-xs`}>
                    {checkRows.map(({ label, date, time }) => (
                        <tr key={label}>
                            <th scope="row" className={`${cls.header} py-2 text-left`}>{label}</th>
                            <td className={`${cls.td} text-center`}>{date}</td>
                            <td className={`${cls.td} text-center`}>{time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const FILLER_ROWS = 4;

const summaryRows = [
    { label: 'Sub Total',    value: 'Rs. 300.00' },
    { label: 'Tax',          value: 'Rs. 300.00' },
    { label: 'Advance Paid', value: 'Rs. 300.00' },
];

function ChargesTable() {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className={`${cls.header} bg-primary text-white text-xs text-center tracking-wider uppercase`}>
                    {['Date', 'Room Types', 'No of Nights', 'Price', 'Total'].map((h) => (
                        <th key={h} className={cls.cell}>{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={`${cls.body} text-xs`}>
                {/* Data row */}
                <tr>
                    <td className={cls.tdC}>30-03-2019</td>
                    <td className={cls.tdS}>Deluxe Room</td>
                    <td className={cls.tdC}>2</td>
                    <td className={cls.tdSC}>Rs. 150.00</td>
                    <td className={cls.tdC}>Rs. 300.00</td>
                </tr>

                {/* Filler rows */}
                {Array.from({ length: FILLER_ROWS }).map((_, i) => (
                    <tr key={i}>
                        <td className={`${cls.td} h-8`} />
                        <td className={cls.tdS} />
                        <td className={cls.td} />
                        <td className={cls.tdS} />
                        <td className={cls.td} />
                    </tr>
                ))}

                {/* Summary rows */}
                {summaryRows.map(({ label, value }) => (
                    <tr key={label}>
                        <td colSpan={3} />
                        <td className={cls.cell}>{label}</td>
                        <td className={`${cls.cell} text-center`}>{value}</td>
                    </tr>
                ))}

                {/* Total row */}
                <tr>
                    <td colSpan={3} />
                    <td className={`${cls.cell} font-bold uppercase tracking-widest bg-primary text-white`}>Total</td>
                    <td className={`${cls.cell} font-bold text-center bg-primary text-white`}>Rs. 115.00</td>
                </tr>
            </tbody>
        </table>
    );
}

function InvoiceFooter() {
    return (
        <div className="space-y-8">
            <div className="flex gap-8 justify-between">

                {/* Payment Info + Terms */}
                <div className="flex gap-4 w-2/3">
                    <div className="flex-1">
                        <SectionTitle>Payment Info</SectionTitle>
                        <div className={`${cls.body} text-sm space-y-1`}>
                            <div><strong>Account :</strong> Jhone Doe</div>
                            <div><strong>A/C Name :</strong> Jhon</div>
                            <div><strong>Bank Details :</strong> Bank Jhone</div>
                        </div>
                    </div>

                    <div className="w-px bg-gray-300 mx-2" />

                    <div className="flex-1">
                        <SectionTitle>Terms &amp; Condition</SectionTitle>
                        <p className={`${cls.body} text-sm`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy.
                        </p>
                    </div>
                </div>

                {/* Account Manager */}
                <div className={`${cls.body} w-1/3 text-right`}>
                    <div className={`${cls.header} text-xs uppercase tracking-widest mb-4`}>
                        Account Manager
                    </div>
                    <div className="text-2xl italic">John doe</div>
                    <div className="mt-1 text-xs uppercase font-semibold tracking-wide">JHON DOE</div>
                </div>
            </div>

            {/* Questions */}
            <div className={`${cls.body} text-sm space-y-1`}>
                <div className="font-bold">Questions?</div>
                <p>
                    Email us at{' '}
                    <a className="text-blue-500" href="mailto:info@yourwebsite.com">info@yourwebsite.com</a>
                    <br />
                    or call us at <span className="font-medium">1-234-567-890</span>
                </p>
            </div>
        </div>
    );
}

// ── main component ───────────────────────────────────────────────────────────

const InvoicePreview = forwardRef<HTMLDivElement, Props>((_props, ref) => {
    return (
        <div ref={ref} className="pt-10 px-10 pb-20 space-y-8 bg-white text-gray-800">
            <InvoiceHeader />
            <GuestDetails />
            <ChargesTable />
            <InvoiceFooter />
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';
export default InvoicePreview;
