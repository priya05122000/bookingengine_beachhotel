"use client";

import Link from "next/link";

export default function Navbar() {
    return (

        <header className="fixed top-0 left-0 z-50 w-full ">

            <div className="py-2 bg-white flex justify-end px-0 md:px-4 lg:px-12 ">
                <Link
                    href="/signin"
                    className="text-sm text-deep-blue border border-primary/30 px-4 py-2 hover:bg-primary  hover:text-primary transition"
                >
                    Login / Signup
                </Link>
            </div>
            <div className="bg-deep-blue relative h-16 flex items-center justify-center">

                {/* Center Logo Text */}
                <Link href="/" className="text-center">
                    <h1 className="text-white uppercase tracking-[0.25em] text-2xl font-serif">
                        The Beach Hotel
                    </h1>
                </Link>

                {/* Login Button */}

            </div>
        </header>
    );
}