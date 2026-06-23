"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { typography } from "@/src/lib/typography";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "../../profile/edit/_components/ChangePasswordForm";

type View = "profile" | "changePassword";

const dummyUser = {
  name: "Roshima",
  email: "roshima@gmail.com",
  phone: "+1 (555) 234-5678",
  dob: "1990-04-15",
  address: "42 Sunset Boulevard, Miami, FL 33101",
  memberSince: "January 2023",
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className={`uppercase  ${typography.textXl} font-arizona-sans-regular font-medium  tracking-widest text-dark-gray uppercase truncate `}>
      {title}
    </h3>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start py-2.5 border-b border-gray-100 last:border-0">
      <span className="w-52 shrink-0   text-xs uppercase tracking-[0.15em] text-primary font-arizona-regular font-semibold mb-1">{label}</span>
      <span className="text-sm text-dark-gray font-arizona-light">{value || ""}</span>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-primary font-arizona-regular font-semibold mb-1">
        {label}
      </p>
      <p className="text-sm text-dark-gray font-arizona-light">{value}</p>
    </div>
  );
}

export default function ProfileView() {
  const [view, setView] = useState<View>("profile");
  const router = useRouter();

  if (view === "changePassword") {
    return <ChangePasswordForm onBack={() => setView("profile")} />;
  }

  return (
    <div className="w-full max-w-xl py-8 px-4 space-y-8 bg-primary/4 mx-auto  shadow-[-1px_4px_4px_0px_#00000040] rounded-md">
      {/* <Link href="https://thebeachhotel.in/">
        <Image
          src="/images/logo.png"
          alt="The Beach Hotel"
          width={200}
          height={40}
          className="mb-8 mx-auto h-20 xl:h-full object-contain"
          style={{ width: "auto" }}
        />
      </Link> */}

      {/* Edit button */}
      <div className="flex justify-between ">
        <SectionHeading title="Personal Information" />
        <Link
          href="/profile/edit"
          className="inline-flex items-center justify-center   text-primary text-xs tracking-[0.12em] font-arizona uppercase cursor-pointer  transition-colors underline underline-offset-2"
        >
          Edit
        </Link>
        {/* <Link
          href="/profile/edit"
          className="inline-flex items-center justify-center h-8 px-5 bg-primary text-white text-xs tracking-[0.12em] font-arizona uppercase cursor-pointer hover:bg-primary/90 transition-colors rounded-sm"
        >
          Edit
        </Link> */}

      </div>

      <hr className="opacity-10" />

      {/* Personal Information */}
      {/* <div >
        <InfoRow label="Full Name" value={dummyUser.name} />
        <InfoRow label="Email" value={dummyUser.email} />
        <InfoRow label="Date of Birth" value={dummyUser.dob} />

        <InfoRow label="Address" value={dummyUser.address} />
        <InfoRow label="Phone Number" value={dummyUser.phone} />

        <InfoRow label="Member Since" value={dummyUser.memberSince} />

      </div> */}

      <div className=" gap-x-6 space-y-5 ">
        <ProfileField label="Full Name" value={dummyUser.name} />
        <ProfileField label="Email" value={dummyUser.email} />
        <ProfileField label="Phone Number" value={dummyUser.phone} />
        <ProfileField label="Date of Birth" value={dummyUser.dob} />
        <div className="sm:col-span-2">
          <ProfileField label="Address" value={dummyUser.address} />
        </div>
      </div>


      {/* <div className="inline-flex gap-3 justify-between ">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="h-10 flex-1 border border-primary text-primary text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/5 transition-colors px-4"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 flex-1 bg-primary text-white text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/90 transition-colors text-nowrap px-4"
        >
          Save Changes
        </button>
      </div> */}

      <hr className="opacity-10" />

      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-primary font-arizona-regular font-semibold mb-1">
              Password
            </p>
            <p className="text-sm text-dark-gray font-arizona-light">**********</p>
          </div>
          <button
            type="button"
            onClick={() => setView("changePassword")}
            className="inline-flex items-center justify-center text-primary text-xs tracking-[0.12em] font-arizona uppercase cursor-pointer transition-colors underline underline-offset-2"
          >
            Change
          </button>
        </div>

      </div>

    </div>
  );
}
