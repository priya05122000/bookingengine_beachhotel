
'use client';

import { Globe, MapPin, Phone } from 'lucide-react';
import React, { forwardRef } from 'react';

type Props = {
    // add any props you need later (e.g., invoice data)
};

const InvoicePreview = forwardRef<HTMLDivElement, Props>((_props, ref) => {
    return (
        <div ref={ref} className="p-6 font-sans space-y-8 bg-white text-gray-800">

            {/* Header */}

            <div className="flex items-start justify-between gap-4 ">
                <div className="relative">
                    <div className="w-full h-25 relative">
                        <img
                            src="/images/logo.png"
                            alt="Hotel Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="inline-flex h-10 justify-center items-center px-4 font-bold rounded-xs bg-primary font-arizona-sans-regular tracking-widest text-xs text-white">
                    INVOICE
                </div>
            </div>

            <div className=" text-sm font-arizona-light  grid grid-cols-2 items-end gap-10 tracking-wide  ">
                <div className="space-y-2">
                    <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4" /> Beach Rd, Kanniyakumari,<br/> Tamil Nadu 629702, India
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> +91 54678 98765
                    </p>
                    <p className="flex items-center gap-2">
                        <Globe className="w-4 h-4" /> https://thebeachhotel.in/
                    </p>
                </div>

                <div className=" space-y-1 ">
                    <div><strong>Invoice No :</strong> 45145</div>
                    <div><strong>Invoice Date :</strong> 31-03-2019</div>
                </div>
            </div>


            {/* Guest & Room details */}
            <div className=" gap-6 ">
                <div className="text-base mb-4 uppercase font-bold text-primary font-arizona-sans-regular tracking-wider">
                    Guest Details:
                </div>
                <div className="grid grid-cols-2 gap-10 font-arizona-light tracking-wide text-sm" >
                    <div className='space-y-1'>
                        <div><strong>Name :</strong> Nuva Rey</div>
                        <div><strong>Address :</strong> 123 Ocean View St., Beachville, CA 90210</div>
                        <div><strong>Phone : </strong> +91 65478 98756</div>
                        <div><strong>Email : </strong>nuvaray26@gmail.com</div>
                    </div>
                    <div className="space-y-1 ">
                        <div><strong>Room No :</strong> 121</div>
                        <div><strong>Room Type :</strong> king bed economy</div>
                        <div><strong>Room Rate :</strong> &#8377; 6,000</div>
                    </div>
                </div>
            </div>
            <div className="gap-6 ">

                <table className="w-1/2 border-collapse text-sm ">
                    <thead>
                        <tr>
                            <th className="py-2"></th>
                            <th className="px-2 py-2 font-arizona-sans-regular text-center">Date</th>
                            <th className="px-2 py-2 text-center font-arizona-sans-regular ">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="py-2 text-left font-arizona-sans-regular ">
                                Check-in
                            </th>
                            <td className="border-b border-gray-300 px-2 py-2 text-center text-xs">
                                29-03-2019
                            </td>
                            <td className="border-b border-gray-300 text-center px-2 py-2 text-xs">
                                09:00 a.m
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="py-2 text-left font-arizona-sans-regular ">
                                Check-Out
                            </th>
                            <td className="border-b border-gray-300 px-2 py-2 text-center text-xs">
                                29-03-2019
                            </td>
                            <td className="border-b border-gray-300 text-center px-2 py-2 text-xs">
                                09:00 a.m
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Charges table */}
            <table className="w-full border-collapse  ">
                <thead>
                    <tr className="text-center bg-primary text-white font-arizona-sans-regular tracking-wider text-xs  uppercase">
                        <th className="px-2 py-2  ">Date</th>
                        <th className="px-2 py-2 ">Description</th>
                        <th className="px-2 py-2 ">No of Nights</th>
                        <th className="px-2 py-2  ">Price</th>
                        <th className="px-2 py-2  ">Total</th>
                    </tr>
                </thead>
                <tbody className='font-arizona-light tracking-wide'>
                    <tr className='text-xs'>
                        <td className="px-2 py-2 text-center border-b border-gray-200 ">
                            30-03-2019
                        </td>
                        <td className="px-2 py-2  border-b border-gray-200 bg-gray-100">
                            Room Charges
                        </td>
                        <td className="px-2 py-2 text-center  border-b border-gray-200">
                            2
                        </td>
                        <td className="px-2 py-2  border-b border-gray-200 text-center bg-gray-100">
                            $150.00
                        </td>
                        <td className="px-2 py-2  border-b border-gray-200 text-center">
                            $300.00
                        </td>
                    </tr>

                    {Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index}>
                            <td className="h-8 border-b border-gray-200"></td>
                            <td className="border-b border-gray-200 bg-gray-100"></td>
                            <td className="border-b border-gray-200"></td>
                            <td className="border-b border-gray-200 bg-gray-100"></td>
                            <td className="border-b border-gray-200"></td>
                        </tr>
                    ))}

                    <tr className='text-xs'>
                        <td colSpan={3}></td>
                        <td className="px-2 py-2 text-sm">Sub Total</td>
                        <td className="px-2 py-2  text-center">$300.00</td>
                    </tr>
                    <tr className='text-xs'>
                        <td colSpan={3}></td>
                        <td className="px-2 py-2 text-sm">Tax</td>
                        <td className="px-2 py-2  text-center">$300.00</td>
                    </tr>
                    <tr className='text-xs'>
                        <td colSpan={3}></td>
                        <td className="px-2 py-2 text-sm">Advance Paid</td>
                        <td className="px-2 py-2  text-center">$300.00</td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td className="px-2 py-2 text-xs font-bold bg-primary uppercase tracking-widest text-white ">
                            Total
                        </td>
                        <td className="px-2 py-2 text-xs font-bold text-center bg-primary text-white">
                            $115.00
                        </td>
                    </tr>
                </tbody>
            </table>

                <div className="flex flex-row justify-between gap-8">

                    <div className="flex flex-row gap-2  w-2/3">

                        {/* Payment Info */}
                        <div className="flex-1 ">
                            <div className="text-sm mb-4 uppercase font-bold text-primary font-arizona-sans-regular tracking-wider">
                                Payment Info
                            </div>
                            <div className="text-sm space-y-1 font-arizona-light  tracking-wide ">
                                <div><b>Account :</b> Jhone Doe</div>
                                <div><b>A/C Name :</b> Jhon</div>
                                <div><b>Bank Details :</b> Bank Jhone</div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="block w-px mx-2 bg-gray-300"></div>

                        {/* Terms & Condition */}
                        <div className="flex-1  ">
                            <div className="text-sm mb-4 uppercase font-bold text-primary font-arizona-sans-regular tracking-wider">
                                Terms &amp; Condition
                            </div>
                            <p className="text-sm font-arizona-light tracking-wide">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed diam nonummy.
                            </p>
                        </div>
                    </div>

                    {/* Account Manager */}
                    <div className="w-1/3 text-xs text-right ">
                        <div className="uppercase font-arizona-sans-regular text-xs tracking-widest mb-4">
                            Account Manager
                        </div>
                        <div className=" flex flex-col items-end font-arizona-light">
                            <div className="text-2xl italic  ">
                                John doe
                            </div>
                            <div className="mt-1 uppercase text-xs font-semibold ">
                                JHON DOE
                            </div>
                        </div>
                    </div>

                </div>




            {/* Questions / contact */}
            <div className="pt-10 space-y-1  text-sm font-arizona-light tracking-wide   ">
                <div className="font-bold ">Questions?</div>
                <p className=" ">
                    Email us at{' '}
                    <a className="text-blue-500" href="mailto:info@yourwebsite.com">
                        info@yourwebsite.com
                    </a>
                    <br />
                    or call us at <span className="font-medium">1-234-567-890</span>
                </p>
            </div>
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';
export default InvoicePreview;
