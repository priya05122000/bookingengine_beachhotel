"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { User } from "lucide-react";

interface VerifyUserProps {
  email: string;
  onVerified: () => void;
}

const VerifyUser = ({ email, onVerified }: VerifyUserProps) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
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
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
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
      onVerified();
    } else {
      alert("Invalid Code");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Link href="https://thebeachhotel.in/">
        <Image
          src="/images/logo.png"
          alt="The Beach Hotel"
          width={200}
          height={40}
          className="mb-8 mx-auto h-20 xl:h-full  object-contain"
          style={{ width: "auto" }}
        />
      </Link>

      <div>
        <label className="mb-2 block text-sm text-primary font-arizona">
          Email
        </label>

        <div className="relative">
          <div className="border-b border-primary pb-3 pr-10 text-sm text-dark-gray">
            {email}
          </div>

          <User size={18} className="absolute right-1 top-0 text-dark-gray" />
        </div>
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="mt-3 text-sm text-dark-gray/50">
            We have sent code to your Email
            <span className="font-medium text-primary ml-1">{email}</span>
          </p>
        </div>

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
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
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
            <button type="button" className="text-primary hover:underline">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
