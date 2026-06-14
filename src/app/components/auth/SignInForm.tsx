"use client";

import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import InputField from "./InputField";

type Step = "email" | "password";

function EmailStep({
  email,
  onEmailChange,
}: {
  email: string;
  onEmailChange: (v: string) => void;
}) {
  return (
    <>
      <div className="mb-6">
        <InputField
          id="email"
          type="email"
          label="Enter Email"
          placeholder="Email id"
          value={email}
          onChange={onEmailChange}
          required
          ariaLabel="Email"
          rightSlot={<User size={18} className="text-gray-500" />}
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-deep-blue h-10 text-sm tracking-wider text-white"
      >
        Continue
      </button>
    </>
  );
}

function PasswordStep({
  email,
  password,
  onPasswordChange,
  onBack,
  showPassword,
  toggleShowPassword,
}: {
  email: string;
  password: string;
  onPasswordChange: (v: string) => void;
  onBack: () => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}) {
  return (
    <>
      <div className="mb-6">
        <label className="mb-2 block text-sm text-deep-blue">Email</label>

        <div className="relative">
          <div className="border-b border-deep-blue pb-3 pr-10 text-sm text-gray-400">
            {email}
          </div>

          <User size={18} className="absolute right-1 top-0 text-gray-500" />
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-2 w-full text-right text-xs text-deep-blue"
        >
          Change
        </button>
      </div>

      <div className="mb-6">
        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
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
      </div>

      <button
        type="submit"
        className="w-full bg-deep-blue py-4 text-sm tracking-wider text-white"
      >
        Login
      </button>
    </>
  );
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = useCallback(() => {
    setShowPassword((s) => !s);
  }, []);

  const handleBackToEmail = useCallback(() => {
    setStep("email");
    setPassword("");
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (step === "email") {
        if (email.trim()) {
          setStep("password");
        }
        return;
      }

      // step === "password" -> call login API
      // TODO: replace with real login call
      console.log("Logging in with", { email, password });
    },
    [step, email, password]
  );

  return (
    <div className="w-full max-w-125">
      <h1 className="mb-12 hidden text-center text-2xl font-semibold uppercase tracking-[0.25em] text-deep-blue lg:block">
        The Beach Hotel
      </h1>

      <p className="mb-8 text-center text-xs uppercase tracking-[0.15em] text-gray-500 lg:hidden">
        Welcome Back
      </p>

      <form onSubmit={handleSubmit}>
        {step === "email" ? (
          <EmailStep email={email} onEmailChange={setEmail} />
        ) : (
          <PasswordStep
            email={email}
            password={password}
            onPasswordChange={setPassword}
            onBack={handleBackToEmail}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        )}
      </form>

      <p className="mt-6 text-center text-xs text-gray-500">
        Don't Have An Account?{" "}
        <Link href="/signup" className="text-deep-blue hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}