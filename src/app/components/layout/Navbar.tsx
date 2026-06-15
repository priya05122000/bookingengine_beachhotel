"use client";

import Link from "next/link";

export default function Navbar() {
    return (

        <header className="fixed top-0 left-0 z-50 w-full ">

            <div className="py-2 bg-white flex justify-end px-4 lg:px-12 ">
                <Link
                    href="/signin"
                    className="text-sm text-primary border flex items-center border-primary rounded-xs  px-4 h-10 hover:bg-primary  hover:text-white transition"
                >
                    Login / Signup
                </Link>
            </div>
            <div className="bg-primary relative h-16 flex items-center justify-center">
                {/* Center Logo Text */}
                <Link href="/" className="text-center">
                    <h1 className="text-white uppercase tracking-[0.25em] text-2xl font-serif">
                        The Beach Hotel
                    </h1>
                </Link>
            </div>
        </header>
    );
}