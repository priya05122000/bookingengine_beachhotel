"use client";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import OtpInput from "@/src/app/(auth)/_components/OtpInput";
import { DEMO_OTP } from "@/src/lib/constants";

interface VerifyUserProps {
  email: string;
  onVerified: () => void;
}

const VerifyUser = ({ email, onVerified }: VerifyUserProps) => {
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

        <OtpInput
          onVerify={(code) => {
            if (code === DEMO_OTP) onVerified();
            else alert("Invalid Code");
          }}
        />
      </div>
    </div>
  );
};

export default VerifyUser;
