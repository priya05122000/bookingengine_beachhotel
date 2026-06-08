"use client";

import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState<"email" | "password">("email");
    const [email, setEmail] = useState("");

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === "email" && email.trim()) {
            setStep("password");
            return;
        }
        // Login API call here
    };

    return (
        <div className="min-h-screen bg-[#f3f3f3]">

            <div className="flex min-h-screen flex-col lg:flex-row">
                {/* Left Side — hidden on mobile, visible on lg+ */}
                <div className="hidden lg:flex lg:w-[45%] lg:flex-col lg:h-screen lg:sticky lg:top-0">
                    {/* Image */}
                    <div className="relative flex-1 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
                            alt="The Beach Hotel"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Bottom Content */}
                    <div className="h-[170px] shrink-0 bg-[#f3f3f3] px-8 py-8">
                        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-gray-500">
                            Exclusive Offers
                        </p>
                        <h3 className="max-w-md text-[18px] leading-[1.5] text-[#2d2d2d]">
                            Hotel Facilities Are Designated Spaces And Services Designed To
                            Enhance The Guest Experience,
                        </h3>
                    </div>
                </div>

                {/* Mobile Hero Image — visible only on small screens */}
                <div className="relative h-52 w-full overflow-hidden sm:h-64 lg:hidden">
                    <img
                        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
                        alt="The Beach Hotel"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#172983]/40" />
                    <h1 className="absolute inset-0 flex items-center justify-center text-center text-2xl font-semibold uppercase tracking-[0.25em] text-white sm:text-3xl">
                        The Beach Hotel
                    </h1>
                </div>

                {/* Right Side — Form */}
                <div className="flex flex-1 items-start justify-center px-6 py-10 sm:px-10 sm:py-16 lg:items-center lg:py-10">
                    <div className="w-full max-w-[420px]">
                        {/* Title — hidden on mobile (shown in hero), shown on lg */}
                        <h1 className="hidden text-center text-[30px] font-semibold uppercase tracking-[0.25em] text-[#172983] lg:block">
                            The Beach Hotel
                        </h1>


                        {/* Right Side — Form */}
                        <div className="flex flex-1 items-start justify-center px-6 py-10 sm:px-10 sm:py-16 lg:items-center lg:py-10">
                            <div className="w-full max-w-[340px]">
                                <div className="relative border-b border-gray-300 pb-4">
                                    <h2 className="text-center text-2xl font-normal text-[#666666]">
                                        Create An Account
                                    </h2>
                                </div>

                                <form className="mt-6 space-y-4">
                                    {/* Name */}
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="h-[40px] w-full border border-[#7171dd] bg-white px-3 text-xs outline-none placeholder:text-[#4b4bbf]"
                                    />

                                    {/* Email */}
                                    <input
                                        type="email"
                                        placeholder="Enter your email id"
                                        className="h-[40px] w-full border border-[#7171dd] bg-white px-3 text-xs outline-none placeholder:text-[#4b4bbf]"
                                    />

                                    {/* Phone */}
                                    <div className="flex h-[40px] border border-[#7171dd] bg-white">
                                        <div className="flex items-center px-3 text-xs text-[#172983]">
                                            +91
                                        </div>

                                        <input
                                            type="tel"
                                            placeholder="Enter your contact number"
                                            className="flex-1 px-2 text-xs outline-none placeholder:text-[#4b4bbf]"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="h-[40px] w-full border border-[#7171dd] bg-white px-3 pr-10 text-xs outline-none placeholder:text-[#4b4bbf]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </div>

                                    {/* Confirm Password */}
                                    <input
                                        type="password"
                                        placeholder="Enter your password again"
                                        className="h-[40px] w-full border border-[#7171dd] bg-white px-3 text-xs outline-none placeholder:text-[#4b4bbf]"
                                    />

                                    {/* Register Button */}
                                    <button
                                        type="submit"
                                        className="h-[40px] w-full bg-[#09099d] text-[12px] font-medium text-white transition hover:opacity-90"
                                    >
                                        Register
                                    </button>
                                </form>

                                {/* Footer */}
                                <div className="mt-5 border-t border-gray-300 pt-4 text-center">
                                    <p className="text-[14px] text-[#666666]">
                                        Already A Member?{" "}
                                        <Link
                                            href="/signin"
                                            className="text-[#09099d] hover:underline"
                                        >
                                            Login Here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>



                        {/* Mobile Exclusive Offers note */}
                        <div className="mt-10 border-t border-gray-200 pt-8 lg:hidden">
                            <p className="mb-2 text-center text-xs uppercase tracking-[0.15em] text-gray-400">
                                Exclusive Offers
                            </p>
                            <p className="text-center text-[13px] leading-relaxed text-[#2d2d2d]">
                                Hotel Facilities Are Designated Spaces And Services Designed To
                                Enhance The Guest Experience
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}