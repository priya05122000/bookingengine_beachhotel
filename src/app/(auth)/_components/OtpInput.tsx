"use client";

import { useOtp } from "@/src/hooks/useOtp";
import { DEMO_OTP } from "@/src/lib/constants";

interface OtpInputProps {
  onVerify: (code: string) => void;
  verifyLabel?: string;
}

export default function OtpInput({
  onVerify,
  verifyLabel = "Verify Account",
}: OtpInputProps) {
  const { otp, inputRefs, value, handleChange, handleKeyDown, handlePaste } =
    useOtp();

  return (
    <div className="mt-6">
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
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") { onVerify(value); return; }
                handleKeyDown(index, e);
              }}
            onPaste={index === 0 ? handlePaste : undefined}
            className="
                            h-8
                            w-12
                            sm:w-16
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
        Demo Code: {DEMO_OTP}
      </p>

      <button
        type="button"
        onClick={() => onVerify(value)}
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
        {verifyLabel}
      </button>

      <p className="mt-4 text-center text-xs text-dark-gray">
        Didn&apos;t receive code?{" "}
        <button type="button" className="text-primary hover:underline">
          Resend
        </button>
      </p>
    </div>
  );
}
