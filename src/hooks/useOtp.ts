"use client";

import { useRef, useState } from "react";

const OTP_LENGTH = 5;

export function useOtp() {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    function handleChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value.slice(-1);
        setOtp(updated);
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        if (!digits) return;
        const updated = Array(OTP_LENGTH).fill("");
        digits.split("").forEach((d, i) => { updated[i] = d; });
        setOtp(updated);
    }

    const value = otp.join("");

    return { otp, inputRefs, value, handleChange, handleKeyDown, handlePaste };
}
