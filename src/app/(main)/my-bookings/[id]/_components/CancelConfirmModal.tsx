"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useModalClose } from "@/src/hooks/useModalClose";

interface CancelConfirmModalProps {
  reason: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelConfirmModal({ reason, onClose, onConfirm }: CancelConfirmModalProps) {
  const { closing, triggerClose: handleClose } = useModalClose({ onClose });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-9999 bg-black/60 flex items-center justify-center ${closing ? "animate-fade-out" : "animate-fade-in"}`}
      onClick={handleClose}
    >
      <div
        className="bg-white max-w-xs sm:max-w-sm mx-4 rounded-xs shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-arizona-sans-regular uppercase tracking-widest text-primary">
            Confirm Cancellation
          </h2>
          <p className="text-xs font-arizona-light text-dark-gray leading-relaxed">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </p>
          {reason && (
            <p className="text-xs font-arizona-sans-regular text-dark-gray bg-gray-50 px-3 py-2 rounded-xs">
              Reason: <span className="text-primary">{reason}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 border border-primary text-primary h-9 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer hover:bg-primary/4 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white h-9 rounded-xs text-xs font-arizona-sans-regular uppercase tracking-widest cursor-pointer hover:bg-red-600 transition-colors"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
