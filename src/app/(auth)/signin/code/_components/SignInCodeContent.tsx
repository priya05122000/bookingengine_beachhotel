"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "@/src/app/(auth)/_components/OtpInput";
import { DEMO_OTP } from "@/src/lib/constants";

export default function SignInCodeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "me***@hr.com";

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

                <div className="mt-14">
                    <OtpInput
                        onVerify={(code) => {
                            if (code === DEMO_OTP) {
                                alert("Verification Successful");
                                router.push("/booking");
                            } else {
                                alert("Invalid Code");
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
