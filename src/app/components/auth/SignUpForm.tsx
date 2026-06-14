"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import InputField from "./InputField";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const toggleShowPassword = useCallback(() => {
        setShowPassword((s) => !s);
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);

            if (!fullName.trim() || !email.trim() || !mobile.trim() || !password) {
                setError("Please fill out all required fields.");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            // TODO: replace with real signup API call
            console.log("Registering user", { fullName, email, mobile, password });
        },
        [fullName, email, mobile, password, confirmPassword]
    );

    return (
        <div className="w-full max-w-125">
            <h1 className="mb-8 text-center text-2xl font-semibold uppercase tracking-[0.25em] text-deep-blue">
                The Beach Hotel
            </h1>

            <p className="mb-4 text-center text-xl font-semibold uppercase text-silver">
                Create Account
            </p>


            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {error && (
                    <p className="text-sm text-red-600" role="alert" aria-live="polite">
                        {error}
                    </p>
                )}

                <InputField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    value={fullName}
                    onChange={setFullName}
                    placeholder="Enter your name"
                    required
                    ariaLabel="Full name"
                />

                <InputField
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Email id"
                    required
                    ariaLabel="Email address"
                />

                <InputField
                    id="mobile"
                    name="mobile"
                    label="Mobile Number"
                    type="tel"
                    value={mobile}
                    onChange={setMobile}
                    placeholder="+91 Enter your mobile number"
                    required
                    ariaLabel="Mobile number"
                />

                <InputField
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                    required
                    ariaLabel="Password"
                    rightSlot={
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="text-gray-500"
                            aria-pressed={showPassword}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                />

                <InputField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Confirm password"
                    required
                    ariaLabel="Confirm password"
                />

                <button
                    type="submit"
                    className="mt-4 w-full bg-deep-blue h-10 text-sm tracking-wider text-white"
                >
                    Register
                </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500">
                Already Have An Account?{" "}
                <Link href="/signin" className="text-deep-blue hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}