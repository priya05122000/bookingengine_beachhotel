"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHidden(entry.isIntersecting),
            { threshold: 0.7 }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${hidden ? " opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="py-2 bg-white shadow-[-1px_3px_4px_0px_#00000040] flex justify-end px-4 lg:px-12">
                <Link
                    href="/signin"
                    className="text-sm text-primary border flex items-center border-primary rounded-xs px-2 h-10 hover:bg-primary hover:text-white transition cursor-pointer"
                >
                    Login / Signup
                </Link>
            </div>
            {/* <div className="bg-primary relative h-10">
                <Link
                    href="https://thebeachhotel.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer absolute bottom-0 left-1/2 -translate-x-1/2"
                >
                    <Image
                        src="/images/navbar_logo.svg"
                        alt="The Beach Hotel"
                        width={220}
                        height={48}
                        className="object-contain"
                        // style={{ width: "auto" }}
                    />
                </Link>
            </div> */}
        </header>
    );
}