"use client";

import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import InputField from "../../_components/InputField";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Step = "email" | "password";

function EmailStep({
  email,
  onEmailChange,
  onSignInWithCode,
}: {
  email: string;
  onEmailChange: (v: string) => void;
  onSignInWithCode: () => void;
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
      <div >
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

      <div>
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
        <Link
          href="/booking"
          className="w-full bg-primary h-10 text-sm tracking-wider text-white cursor-pointer inline-flex items-center justify-center"
          aria-label="Login"
        >
          Login
        </Link>

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

  const handleSignInWithCode = useCallback(async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    localStorage.setItem("demoOtp", "52010");

    router.push(
      `/signin/code?email=${encodeURIComponent(email)}`
    );
  }, [email, router]);

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
    // add `import Image from "next/image"` at the top of the file

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


      {/* <p className="mb-8 text-center text-xs uppercase tracking-[0.15em] text-dark-gray lg:hidden">
        Welcome Back
      </p> */}

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        {step === "email" ? (
          <EmailStep email={email} onEmailChange={setEmail} onSignInWithCode={handleSignInWithCode} />
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