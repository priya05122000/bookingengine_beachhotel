"use client";

import React from "react";

type Props = {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
  onChange?: (v: string) => void;
  // slot rendered inside the input container positioned at the right (icon / button)
  rightSlot?: React.ReactNode;
};

export default function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  required,
  ariaLabel,
  className = "",
  onChange,
  rightSlot,
}: Props) {
  const baseInputClass =
    "w-full border-0 border-b border-primary bg-transparent pb-2 text-sm outline-none";

  // add right padding if there's a slot
  const inputClass = `${baseInputClass} ${rightSlot ? "pr-10" : ""} ${className}`;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm text-primary font-arizona">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputClass}
          aria-label={ariaLabel ?? label}
        />

        {rightSlot && <div className="absolute right-1 top-1">{rightSlot}</div>}
      </div>
    </div>
  );
}