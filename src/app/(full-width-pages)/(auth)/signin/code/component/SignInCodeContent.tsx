"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function SignInCodeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "me***@hr.com";

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (
        index: number,
        value: string
    ) => {
        if (!/^\d*$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value.slice(-1);

        setOtp(updatedOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 5);

        if (!pastedData) return;

        const updatedOtp = ["", "", "", "", ""];

        pastedData.split("").forEach((digit, index) => {
            updatedOtp[index] = digit;
        });

        setOtp(updatedOtp);
    };

    const handleVerify = () => {
        const enteredOtp = otp.join("");

        if (enteredOtp === "52010") {
            alert("Verification Successful");
            router.push("/booking");
        } else {
            alert("Invalid Code");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center">
                    <h1 className="font-arizona text-[32px] text-primary">
                        Code Verification
                    </h1>

                    <p className="mt-3 text-sm text-dark-gray/50">
                        We have sent code to your Email{" "}
                        <span className="font-medium text-primary">
                            {email}
                        </span>
                    </p>
                </div>

                <div className="mt-10">
                    <label className="mb-4 block text-base font-medium text-primary">
                        Code Verification
                    </label>

                    <div className="flex justify-between gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(index, e)
                                }
                                onPaste={
                                    index === 0
                                        ? handlePaste
                                        : undefined
                                }
                                className="
                                    h-8
                                    w-16
                                    rounded-xs
                                    border
                                    border-gray-200
                                    bg-white
                                    text-center
                                    text-base
                                    shadow-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                "
                            />
                        ))}
                    </div>

                    <p className="mt-3 text-center text-xs text-primary">
                        Demo Code: 52010
                    </p>

                    <button
                        type="button"
                        onClick={handleVerify}
                        className="
                            mt-6
                            h-10
                            w-full
                            rounded-xs
                            bg-primary
                            text-xs
                            font-medium
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >
                        Verify Account
                    </button>

                    <p className="mt-4 text-center text-xs text-dark-gray">
                        Didn't receive code?{" "}
                        <button
                            type="button"
                            className="text-primary hover:underline"
                        >
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}