import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "@/src/app/(auth)/_components/InputField";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePasswordVisibility } from "@/src/hooks/usePasswordVisibility";

type Props = { onBack: () => void };

export default function ChangePasswordForm({ onBack }: Props) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showPassword: showCurrent, toggle: toggleCurrent } = usePasswordVisibility();
  const { showPassword: showNew, toggle: toggleNew } = usePasswordVisibility();
  const { showPassword: showConfirm, toggle: toggleConfirm } = usePasswordVisibility();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(true);
    setTimeout(() => onBack(), 1500);
  }

  function EyeToggle({
    show,
    onToggle,
    label,
  }: {
    show: boolean;
    onToggle: () => void;
    label: string;
  }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={show}
        aria-label={label}
        className="text-dark-gray/60 hover:text-primary transition-colors cursor-pointer"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto ">
      {/* <Link href="https://thebeachhotel.in/">
        <Image
          src="/images/logo.png"
          alt="The Beach Hotel"
          width={200}
          height={40}
          className="mb-8 mx-auto h-20 xl:h-full  object-contain"
          style={{ width: "auto" }}
        />
      </Link> */}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {error && (
          <p className="text-sm text-red-600" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-light-green" role="status">
            Password updated successfully. Redirecting…
          </p>
        )}

        {/* <InputField
          id="current-password"
          name="currentPassword"
          label="Current Password"
          type={showCurrent ? "text" : "password"}
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Enter current password"
          required
          rightSlot={
            <EyeToggle
              show={showCurrent}
              onToggle={() => setShowCurrent((s) => !s)}
              label={
                showCurrent ? "Hide current password" : "Show current password"
              }
            />
          }
        /> */}

        <div>
          <InputField
            id="password"
            type={showCurrent ? "text" : "password"}
            label="Current Password"
            placeholder="Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            required
            ariaLabel="Password"
            rightSlot={
              <EyeToggle
                show={showCurrent}
                onToggle={toggleCurrent}
                label={
                  showCurrent ? "Hide current password" : "Show current password"
                }
              />
            }
          />
          <button
            type="button"
            onClick={() => router.push("/forgotpassword")}
            className="mt-2 w-full text-right text-xs text-primary cursor-pointer hover:underline"
          >
            Forget Password?
          </button>
        </div>

        <InputField
          id="new-password"
          name="newPassword"
          label="New Password"
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Min. 8 characters"
          required
          rightSlot={
            <EyeToggle
              show={showNew}
              onToggle={toggleNew}
              label={showNew ? "Hide new password" : "Show new password"}
            />
          }
        />

        <InputField
          id="confirm-password"
          name="confirmPassword"
          label="Confirm New Password"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Repeat new password"
          required
          rightSlot={
            <EyeToggle
              show={showConfirm}
              onToggle={toggleConfirm}
              label={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
            />
          }
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 h-10 bg-primary text-white text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Update Password
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-10 border border-primary text-primary text-xs tracking-[0.15em] font-arizona-sans-regular uppercase cursor-pointer hover:bg-primary/5 transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </form>
    </div>
  );
}
