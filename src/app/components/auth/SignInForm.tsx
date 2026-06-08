"use client";

import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignInForm() {
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
      {/* Top Right Button */}
      <div className="fixed top-4 right-4 z-50 sm:top-5 sm:right-5">
        <button className="border border-[#172983] px-4 py-1.5 text-xs tracking-wider text-[#172983] transition hover:bg-[#172983] hover:text-white sm:px-5">
          Sign in
        </button>
      </div>

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
            <p className="mb-3 text-[11px] uppercase tracking-[0.15em] text-gray-500">
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
            <h1 className="mb-12 hidden text-center text-[30px] font-semibold uppercase tracking-[0.25em] text-[#172983] lg:block">
              The Beach Hotel
            </h1>

            {/* Mobile subtitle */}
            <p className="mb-8 text-center text-[11px] uppercase tracking-[0.15em] text-gray-500 lg:hidden">
              Welcome Back
            </p>

            <form onSubmit={handleContinue}>
              {/* EMAIL STEP */}
              {step === "email" && (
                <>
                  <div className="mb-6">
                    <label className="mb-3 block text-[13px] text-[#172983]">
                      Enter Email
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border-0 border-b border-[#172983] bg-transparent pb-3 pr-10 text-sm outline-none placeholder:text-gray-300"
                      />

                      <User
                        size={18}
                        className="absolute right-1 top-1 text-gray-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full bg-[#172983] py-4 text-sm tracking-wider text-white transition hover:opacity-90"
                  >
                    Continue
                  </button>
                </>
              )}

              {/* PASSWORD STEP */}
              {step === "password" && (
                <>
                  {/* Email Display */}
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-[13px] text-[#172983]">
                        Enter Email
                      </label>

                      <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="text-[11px] text-[#172983]"
                      >
                        Change
                      </button>
                    </div>

                    <div className="border-b border-[#172983] pb-3 text-sm text-gray-400">
                      {email}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <label className="mb-3 block text-[13px] text-[#172983]">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        className="w-full border-0 border-b border-[#172983] bg-transparent pb-3 pr-10 text-sm outline-none placeholder:text-gray-300"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#172983] py-4 text-sm tracking-wider text-white transition hover:opacity-90"
                  >
                    Login
                  </button>

                  {/* Divider */}
                  <div className="my-5 text-center text-[11px] uppercase text-gray-400">
                    OR
                  </div>

                  {/* Sign In With Code */}
                  <button
                    type="button"
                    className="w-full border border-[#172983] py-4 text-sm tracking-wider text-[#172983] transition hover:bg-[#172983] hover:text-white"
                  >
                    Sign in with a code
                  </button>
                </>
              )}
            </form>

            <p className="mt-6 text-center text-xs text-gray-500">
              Don't Have An Account?{" "}
              <Link
                href="/signup"
                className="text-[#172983] hover:underline"
              >
                Register
              </Link>
            </p>

            {/* Mobile Exclusive Offers note */}
            <div className="mt-10 border-t border-gray-200 pt-8 lg:hidden">
              <p className="mb-2 text-center text-[11px] uppercase tracking-[0.15em] text-gray-400">
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