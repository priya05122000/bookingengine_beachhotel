"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ForgotPassFormProps {
  email: string;
}
import { Eye, EyeOff, User } from "lucide-react";
import InputField from "../../_components/InputField";
import { usePasswordVisibility } from "@/src/hooks/usePasswordVisibility";

export const ForgotPassForm = ({ email }: ForgotPassFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showPassword, toggle: toggleShowPassword } = usePasswordVisibility();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!password || !confirmPassword) {
      setError("Please fill out all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Handle password reset logic here

    
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

      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:space-y-6"
        noValidate
      >
        {error && (
          <p className="text-sm text-red-600" role="alert" aria-live="polite">
            {error}
          </p>
        )}

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

        <InputField
          id="password"
          name="password"
          label="New Password"
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
              className="text-dark-gray"
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
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm password"
          required
          ariaLabel="Confirm password"
          rightSlot={
            <button
              type="button"
              onClick={toggleShowPassword}
              className="text-dark-gray"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <button
          type="submit"
          className="mt-4 w-full bg-primary h-10 text-sm tracking-wider text-white"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
