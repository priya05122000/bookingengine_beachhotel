'use client';

import React, { forwardRef } from 'react';

type Props = {
    // add any props you need later (e.g., invoice data)
};

const InvoicePreview = forwardRef<HTMLDivElement, Props>((_props, ref) => {
    return (
        <div
            ref={ref}
            className="mt-10 border p-6 font-sans max-w-3xl mx-auto"
            style={{
                backgroundColor: '#ffffff',
                color: '#1f2937',
            }}
        >
            {/* Header */}
            <div className=" mb-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                            H
                        </div>
                        <div className="text-lg font-bold text-teal-500">Hotel Name</div>
                    </div>

                    <div className="inline-block bg-teal-500 text-white py-2 px-2 font-bold rounded">INVOICE</div>
                </div>

                <div className="mt-6 grid grid-cols-2  items-end gap-6">
                    <div className="text-xs text-gray-500 leading-snug">
                        [Address] <br />
                        [Phone Number] <br />
                        [Website Address]
                    </div>

                    <div className=" text-sm text-gray-700">
                        <div><strong>Invoice No:</strong> 45145</div>
                        <div><strong>Invoice Date:</strong> 31-03-2019</div>
                    </div>
                </div>
            </div>

            {/* Guest & Room details */}
            <div className="mb-5 gap-6">
                <div className="text-sm text-teal-500 font-bold mb-1">Guest Details:</div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className="text-xs text-gray-700 leading-relaxed">
                        <div>Name: Nuva rey</div>
                        <div>Address: [Address]</div>
                        <div>Phone: +91 65478 98756</div>
                        <div>Email: nuvaray26@gmail.com</div>
                    </div>
                    <div className="w-1/3 text-xs text-gray-700">
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
                            <td className="border-b  border-gray-300 px-2  py-2 text-center">
                                29-03-2019
                            </td>
                            <td className="border-b text-center border-gray-300 px-2  py-2">
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
                            <td className="border-b border-gray-300 px-2  py-2 text-center">
                                29-03-2019
                            </td>
                            <td className="border-b text-center border-gray-300 px-2 py-2">
                                09:00 a.m
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Charges table */}
            <table className="w-full border-collapse mb-3">
                <thead>
                    <tr className="bg-teal-500 text-white text-left">
                        <th className="px-2 py-2 text-sm text-center" >Date</th>
                        <th className="px-2 py-2 text-sm">Description</th>
                        <th className="px-2 py-2 text-sm text-center">No of Nights</th>
                        <th className="px-2 py-2 text-sm text-center">Price</th>
                        <th className="px-2 py-2 text-sm text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-2 py-2 text-center border-b border-gray-200 text-xs">
                            30-03-2019
                        </td>

                        <td className="px-2 py-2 border-b border-gray-200 text-xs bg-gray-100">
                            Room Charges
                        </td>

                        <td className="px-2 py-2 text-center border-b border-gray-200 text-xs ">
                            2
                        </td>

                        <td className="px-2 py-2 border-b border-gray-200 text-xs text-center bg-gray-100">
                            $150.00
                        </td>

                        <td className="px-2 py-2 border-b border-gray-200 text-xs text-center">
                            $300.00
                        </td>
                    </tr>

                    {Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index}>
                            <td className="h-8 border-b border-gray-200"></td>

                            <td className="border-b border-gray-200 bg-gray-100"></td>

                            <td className="border-b border-gray-200 "></td>

                            <td className="border-b border-gray-200 bg-gray-100"></td>

                            <td className="border-b border-gray-200"></td>
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


                        <td className="px-2 py-2 bg-teal-200  text-xs  ">
                            Total Due
                        </td>

                        <td className="px-2 py-2 bg-teal-200 text-xs text-center">
                            $115.00
                        </td>
                    </tr>


                </tbody>
            </table>

            <div className="mt-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-8">

                    <div className="flex flex-col  sm:flex-row gap-4 sm:w-1/2">

                        {/* Payment Info */}
                        <div className="flex-1 text-xs text-gray-700">
                            <h5 className="font-semibold text-sm text-gray-800 mb-2">
                                Payment Info:
                            </h5>

                            <div className="text-xs text-gray-600 leading-relaxed">
                                <div>Account: Jhone Doe</div>
                                <div>A/C Name: Jhon</div>
                                <div>Bank Details: Bank Jhone</div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px bg-gray-300 mx-2"></div>

                        {/* Terms & Condition */}
                        <div className="flex-1 text-xs text-gray-700">
                            <h5 className="font-semibold text-sm text-gray-800 mb-2">
                                Terms &amp; Condition
                            </h5>

                            <p className="text-xs text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed diam nonummy.
                            </p>
                        </div>
                    </div>

                    {/* Account Manager */}
                    <div className="sm:w-1/3 text-xs text-gray-700 text-left sm:text-right">
                        <div className="uppercase text-[11px] text-gray-500 tracking-widest">
                            Account Manager
                        </div>

                        <div className="mt-2 flex flex-col items-start sm:items-end">
                            <div className="text-2xl italic font-medium text-gray-800">
                                John doe
                            </div>

                            <div className="mt-1 uppercase text-xs font-semibold text-gray-600">
                                JHON DOE
                            </div>
                        </div>
                    </div>

                </div>

                {/* Questions / contact */}
                <div className="mt-6  pt-4">
                    <h6 className="text-sm font-semibold mb-1">Questions?</h6>
                    <p className="text-xs text-gray-600">
                        Email us at <a className="text-primary" href="mailto:info@yourwebsite.com">info@yourwebsite.com</a>
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