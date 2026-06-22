"use client";

import { useState } from "react";
import { ForgotPassForm } from "./_components/ForgotPassForm";
import VerifyUser from "./_components/VerifyUser";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<"verify" | "reset">("verify");
  const [email] = useState("example@example.com");

  return (
    <>
      {step === "verify" ? (
        <VerifyUser
          email={email}
          onVerified={() => setStep("reset")}
        />
      ) : (
        <ForgotPassForm email={email} />
      )}
    </>
  );
};

export default ForgotPasswordPage;
