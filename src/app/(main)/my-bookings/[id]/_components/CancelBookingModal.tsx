"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useModalClose } from "@/src/hooks/useModalClose";
import { useState } from "react";

const REASONS = [
  "Change of plans",
  "Found a better option",
  "Medical emergency",
  "Work / travel conflict",
  "Other",
];

interface CancelBookingModalProps {
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export default function CancelBookingModal({ onClose, onSubmit }: CancelBookingModalProps) {
  const [selected, setSelected] = useState("");
  const [otherText, setOtherText] = useState("");
  const { closing, triggerClose: handleClose } = useModalClose({ onClose });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const finalReason = selected === "Other" ? otherText.trim() : selected;
  const canSubmit = selected !== "" && (selected !== "Other" || otherText.trim() !== "");

  return (
    <div
      className={`fixed inset-0 z-9999 bg-black/60 flex items-center justify-center mb-0 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
      onClick={handleClose}
    >
      <div
        className="bg-white max-w-xs sm:max-w-md mx-4 rounded-xs shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-sm sm:text-base font-arizona-sans-regular uppercase tracking-widest text-primary">
            Cancel Booking
          </h2>
          <button
            onClick={handleClose}
            className="text-dark-gray hover:text-primary transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm font-arizona-light text-dark-gray">
            Please tell us why you&apos;re cancelling so we can improve your experience.
          </p>

          <div className="space-y-3">
            {REASONS.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="cancel-reason"
                  value={reason}
                  checked={selected === reason}
                  onChange={() => setSelected(reason)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-sm font-arizona-sans-regular text-dark-gray group-hover:text-primary transition-colors">
                  {reason}
                </span>
              </label>
            ))}
          </div>

          {selected === "Other" && (
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Please describe your reason..."
              rows={3}
              className="w-full border border-primary text-xs font-arizona-light text-primary px-3 py-2 resize-none focus:outline-none placeholder:text-dark-gray/50"
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="border border-primary text-primary px-5 h-9 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer hover:bg-primary/4 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => canSubmit && onSubmit(finalReason)}
            disabled={!canSubmit}
            className="bg-primary text-white px-5 h-9 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
