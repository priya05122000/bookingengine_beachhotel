"use client";

import Link from "next/link";
import Image from "next/image";

const dummyUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 234-5678",
  dob: "1990-04-15",
  address: "42 Sunset Boulevard, Miami, FL 33101",
  memberSince: "January 2023",
};

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
  const initials = getInitials(dummyUser.name);

  return (
    <div className="w-full max-w-md py-8">
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

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-arizona-sans-regular tracking-wider">
            {initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-base font-arizona-sans-regular tracking-widest text-dark-gray uppercase truncate">
            {dummyUser.name}
          </h1>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-(--accent)/20 text-primary font-arizona tracking-wider">
            Member since {dummyUser.memberSince}
          </span>
        </div>
      </div>

      <div className="border-t border-primary/10 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8">
        <ProfileField label="Full Name" value={dummyUser.name} />
        <ProfileField label="Email" value={dummyUser.email} />
        <ProfileField label="Phone Number" value={dummyUser.phone} />
        <ProfileField label="Date of Birth" value={dummyUser.dob} />
        <div className="sm:col-span-2">
          <ProfileField label="Address" value={dummyUser.address} />
        </div>
      </div>

      <Link
        href="/profile/edit"
        className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/90 transition-colors"
      >
        Edit Profile
      </Link>
    </div>
  );
}
