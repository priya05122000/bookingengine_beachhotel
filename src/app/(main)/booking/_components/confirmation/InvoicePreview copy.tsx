
'use client';

import { Globe } from 'lucide-react';
import React, { forwardRef } from 'react';

type Props = {
    // add any props you need later (e.g., invoice data)
};

const InvoicePreview = forwardRef<HTMLDivElement, Props>((_props, ref) => {
    return (
        <div
            ref={ref}
            className="p-6 font-sans"
            style={{
                backgroundColor: '#ffffff',
                color: '#1f2937',
            }}
        >
            {/* Header */}
            <div className=" mb-5">
                <div className="flex items-start justify-between gap-4 bg-amber-400">
                    <div className='relative'>
                        <div
                            style={{
                                width: '100%',
                                height: '100px',
                                position: 'relative',
                            }}
                        >
                            <img
                                src="/images/logo.png"
                                alt="Hotel Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                    <div
                        className="inline-flex h-10 justify-center items-center px-4 font-bold rounded-xs bg-primary font-arizona-sans-regular tracking-widest text-xs text-white"
                    >
                        INVOICE
                    </div>
                </div>
                {/*
                <div className="text-xs lg:text-sm uppercase font-bold mt-3 text-primary font-arizona-sans-regular tracking-wider">
                    Hotel Name
                </div> */}

                <div className="mt-2 grid grid-cols-2  items-end gap-6">
                    <div className="text-sm leading-snug" style={{ color: '#6b7280' /* text-gray-500 */ }}>
                        Beach Rd, Kanniyakumari, Tamil Nadu 629702, India <br />
                        +91 54678 98765 <br />
                        <span className='inline-flex items-center gap-2 '>
                            <Globe className='w-4 h-4'/> https://thebeachhotel.in/

                        </span>
                    </div>

                    <div className=" text-sm" style={{ color: '#374151' /* text-gray-700 */ }}>
                        <div><strong>Invoice No:</strong> 45145</div>
                        <div><strong>Invoice Date:</strong> 31-03-2019</div>
                    </div>
                </div>
            </div>

            {/* Guest & Room details */}
            <div className="mb-5 gap-6">
                <div className="text-sm uppercase font-bold mt-3 text-primary font-arizona-sans-regular tracking-wider">
                    Guest Details:
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className="text-xs leading-relaxed" style={{ color: '#374151' /* text-gray-700 */ }}>
                        <div>Name: Nuva Rey</div>
                        <div>Address: 123 Ocean View St., Beachville, CA 90210</div>  <div>Phone: +91 65478 98756</div>
                        <div>Email: nuvaray26@gmail.com</div>
                    </div>
                    <div className="w-1/3 text-xs" style={{ color: '#374151' /* text-gray-700 */ }}>
                        <div><strong>Room No:</strong> [Room No]</div>
                        <div><strong>Room Type:</strong> king bed economy</div>
                        <div><strong>Room Rate:</strong> &#8377; 6,000</div>
                    </div>
                </div>

                <table className="w-1/2 border-collapse text-sm mt-4">
                    <thead>
                        <tr>
                            <th className=" py-2"></th>
                            <th className="px-2 py-2 text-center">Date</th>
                            <th className="px-2 py-2 text-center">Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className=''>
                            <th
                                scope="row"
                                className=" py-2 text-left font-medium"
                            >
                                Check-in
                            </th>
                            <td
                                className="border-b  px-2  py-2 text-center"
                                style={{ borderColor: '#d1d5db' /* border-gray-300 */ }}
                            >
                                29-03-2019
                            </td>
                            <td
                                className="border-b text-center px-2  py-2"
                                style={{ borderColor: '#d1d5db' /* border-gray-300 */ }}
                            >
                                09:00 a.m
                            </td>
                        </tr>

                        <tr>
                            <th
                                scope="row"
                                className=" py-2 text-left font-medium"
                            >
                                Check-Out
                            </th>
                            <td
                                className="border-b px-2  py-2 text-center"
                                style={{ borderColor: '#d1d5db' /* border-gray-300 */ }}
                            >
                                29-03-2019
                            </td>
                            <td
                                className="border-b text-center px-2 py-2"
                                style={{ borderColor: '#d1d5db' /* border-gray-300 */ }}
                            >
                                09:00 a.m
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Charges table */}
            <table className="w-full border-collapse mb-3">
                <thead>
                    <tr className="text-left bg-primary text-white">
                        <th className="px-2 py-2 text-sm text-center" >Date</th>
                        <th className="px-2 py-2 text-sm">Description</th>
                        <th className="px-2 py-2 text-sm text-center">No of Nights</th>
                        <th className="px-2 py-2 text-sm text-center">Price</th>
                        <th className="px-2 py-2 text-sm text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-2 py-2 text-center border-b text-xs" style={{ borderColor: '#e5e7eb' /* border-gray-200 */ }}>
                            30-03-2019
                        </td>

                        <td className="px-2 py-2 text-xs border-b" style={{ backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' /* bg-gray-100, border-gray-200 */ }}>
                            Room Charges
                        </td>

                        <td className="px-2 py-2 text-center text-xs border-b" style={{ borderColor: '#e5e7eb' /* border-gray-200 */ }}>
                            2
                        </td>

                        <td className="px-2 py-2 text-xs border-b text-center" style={{ backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' /* bg-gray-100, border-gray-200 */ }}>
                            $150.00
                        </td>

                        <td className="px-2 py-2 text-xs border-b text-center" style={{ borderColor: '#e5e7eb' /* border-gray-200 */ }}>
                            $300.00
                        </td>
                    </tr>

                    {Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index}>
                            <td className="h-8 border-b" style={{ borderColor: '#e5e7eb' /* border-gray-200 */ }}></td>

                            <td className='border-b' style={{ borderColor: '#e5e7eb', backgroundColor: '#f3f4f6' /* border-gray-200, bg-gray-100 */ }}></td>

                            <td className='border-b' style={{ borderColor: '#e5e7eb' /* border-gray-200 */ }}></td>

                            <td className='border-b' style={{ borderColor: '#e5e7eb', backgroundColor: '#f3f4f6' /* border-gray-200, bg-gray-100 */ }}></td>

                            <td className='border-b' style={{ borderColor: '#e5e7eb' /* border-gray-200 */ }}></td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan={3}></td>

                        <td className="px-2 py-2 text-xs  ">
                            Sub Total
                        </td>

                        <td className="px-2 py-2  text-xs text-center ">
                            $300.00
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>


                        <td className="px-2 py-2 text-xs  ">
                            Tax
                        </td>

                        <td className="px-2 py-2   text-xs text-center ">
                            $300.00
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>


                        <td className="px-2 py-2  text-xs  ">
                            Advance Paid
                        </td>

                        <td className="px-2 py-2 text-xs text-center">
                            $300.00
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>

                        <td className="px-2 py-2 text-xs font-bold bg-primary text-white">
                            Total Due
                        </td>

                        <td className="px-2 py-2 text-xs font-bold text-center bg-primary text-white">
                            $115.00
                        </td>
                    </tr>


                </tbody>
            </table>

            <div className="mt-6">
                <div className="flex flex-row justify-between gap-8">

                    <div className="flex flex-row gap-4 w-1/2">

                        {/* Payment Info */}
                        <div className="flex-1 text-xs" style={{ color: '#374151' /* text-gray-700 */ }}>
                            <h5 className="font-semibold text-sm mb-2" style={{ color: '#111827' /* text-gray-800 */ }}>
                                Payment Info:
                            </h5>

                            <div className="text-xs leading-relaxed" style={{ color: '#4b5563' /* text-gray-600 */ }}>
                                <div>Account: Jhone Doe</div>
                                <div>A/C Name: Jhon</div>
                                <div>Bank Details: Bank Jhone</div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="block w-px mx-2" style={{ backgroundColor: '#d1d5db' /* bg-gray-300 */ }}></div>

                        {/* Terms & Condition */}
                        <div className="flex-1 text-xs" style={{ color: '#374151' /* text-gray-700 */ }}>
                            <h5 className="font-semibold text-sm mb-2" style={{ color: '#111827' /* text-gray-800 */ }}>
                                Terms &amp; Condition
                            </h5>

                            <p className="text-xs leading-relaxed" style={{ color: '#4b5563' /* text-gray-600 */ }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed diam nonummy.
                            </p>
                        </div>
                    </div>

                    {/* Account Manager */}
                    <div className="w-1/3 text-xs text-right pr-8" style={{ color: '#374151' /* text-gray-700 */ }}>
                        <div className="uppercase text-[11px] tracking-widest" style={{ color: '#6b7280' /* text-gray-500 */ }}>
                            Account Manager
                        </div>

                        <div className="mt-2 flex flex-col items-end">
                            <div className="text-2xl italic font-medium" style={{ color: '#111827' /* text-gray-800 */ }}>
                                John doe
                            </div>

                            <div className="mt-1 uppercase text-xs font-semibold" style={{ color: '#4b5563' /* text-gray-600 */ }}>
                                JHON DOE
                            </div>
                        </div>
                    </div>

                </div>

                {/* Questions / contact */}
                <div className="mt-6  pt-4">
                    <h6 className="text-sm font-semibold mb-1">Questions?</h6>
                    <p className="text-xs" style={{ color: '#4b5563' /* text-gray-600 */ }}>
                        Email us at <a style={{ color: '#3b82f6' /* text-primary -> blue-500 */ }} href="mailto:info@yourwebsite.com">info@yourwebsite.com</a>
                        <br />
                        or call us at <span className="font-medium">1-234-567-890</span>
                    </p>
                </div>
            </div>
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';
export default InvoicePreview;
