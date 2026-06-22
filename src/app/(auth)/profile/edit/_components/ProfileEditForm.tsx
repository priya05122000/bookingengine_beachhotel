"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputField from "@/src/app/(auth)/_components/InputField";
import ChangePasswordForm from "./ChangePasswordForm";
import { useRouter } from "next/navigation";

type View = "edit" | "changePassword";

const dummyUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 234-5678",
  dob: "1990-04-15",
  address: "42 Sunset Boulevard, Miami, FL 33101",
  memberSince: "January 2023",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileEditForm() {
  const [view, setView] = useState<View>("edit");
  const router = useRouter();

  const [name, setName] = useState(dummyUser.name);
  const [email, setEmail] = useState(dummyUser.email);
  const [phone, setPhone] = useState(dummyUser.phone);
  const [dob, setDob] = useState(dummyUser.dob);
  const [address, setAddress] = useState(dummyUser.address);

  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (view === "changePassword") {
    return <ChangePasswordForm onBack={() => setView("edit")} />;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaveSuccess(false);

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !dob.trim() ||
      !address.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  return (
    <div className="w-full max-w-md py-8">
      <Link href="https://thebeachhotel.in/">
        <Image
          src="/images/logo.png"
          alt="The Beach Hotel"
          width={200}
          height={40}
          className="mb-6 mx-auto h-15 xl:h-30  object-contain"
          style={{ width: "auto" }}
        />
      </Link>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-arizona-sans-regular tracking-widest text-dark-gray uppercase">
          Edit Profile
        </h2>
        <button
          type="button"
          onClick={() => setView("changePassword")}
          className="ml-2 text-primary font-arizona-sans-regular text-sm hover:underline cursor-pointer"
        >
          Change Password
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {error && (
          <p className="text-sm text-red-600" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {saveSuccess && (
          <p className="text-sm text-light-green" role="status">
            Changes saved successfully.
          </p>
        )}

        <InputField
          id="name"
          name="name"
          label="Full Name"
          value={name}
          onChange={setName}
          placeholder="Your full name"
          required
        />

        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="your@email.com"
          required
        />

        <InputField
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="+1 (555) 000-0000"
          required
        />

        <InputField
          id="dob"
          name="dob"
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={setDob}
          required
        />

        <InputField
          id="address"
          name="address"
          label="Address"
          value={address}
          onChange={setAddress}
          placeholder="Your address"
          required
        />

        {/* Actions */}
        <div className="pt-2 space-y-3">
          <div className="flex gap-3 justify-between">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="h-10 flex-1 border border-primary text-primary text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 flex-1 bg-primary text-white text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
