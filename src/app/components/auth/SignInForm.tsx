"use client";

import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import InputField from "./InputField";
import { useRouter } from "next/navigation";

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
      <div className="mb-4">
        <InputField
          id="email"
          type="email"
          label="Enter Email"
          placeholder="Email id"
          value={email}
          onChange={onEmailChange}
          required
          ariaLabel="Email"
          rightSlot={<User size={18} className="text-dark-gray" />}
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-primary h-10 text-sm tracking-wider text-white cursor-pointer"
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
  onSignInWithCode
}: {
  email: string;
  password: string;
  onPasswordChange: (v: string) => void;
  onBack: () => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  onSignInWithCode: () => void; // added type

}) {
  return (
    <>
      <div className="mb-4">
        <label className="mb-2 block text-sm text-primary font-arizona">Email</label>

        <div className="relative">
          <div className="border-b border-primary pb-3 pr-10 text-sm text-dark-gray">
            {email}
          </div>

          <User size={18} className="absolute right-1 top-0 text-dark-gray" />
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-2 w-full text-right text-xs text-primary cursor-pointer"
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
              className="text-dark-gray cursor-pointer"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-primary h-10 text-sm tracking-wider text-white cursor-pointer"
        >
          Login
        </button>

        <div className="my-5 flex items-center justify-center">
          <span className="text-xs text-dark-gray uppercase">OR</span>
        </div>

        <button
          type="button"
          onClick={onSignInWithCode}
          className="w-full border border-primary h-10 text-sm tracking-wider text-primary hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Sign in with a code
        </button>
      </div>
    </>
  );
}

export default function SignInForm() {
  const router = useRouter(); // added router
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


  const handleSignInWithCode = useCallback(() => {
    // navigate to a code-based sign-in page (create this route or adjust as needed)
    router.push("/signin/code");
  }, [router]);

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
      <h1 className="mb-12 hidden text-center text-2xl font-semibold uppercase tracking-[0.25em] text-primary lg:block">
        The Beach Hotel
      </h1>

      {/* <p className="mb-8 text-center text-xs uppercase tracking-[0.15em] text-dark-gray lg:hidden">
        Welcome Back
      </p> */}

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
            onSignInWithCode={handleSignInWithCode} // pass handler

          />
        )}
      </form>

      <p className="mt-6 text-center text-sm text-dark-gray">
        Don't Have An Account?{" "}
        <Link href="/signup" className="text-primary hover:underline cursor-pointer">
          Register
        </Link>
      </p>
    </div>
  );
}