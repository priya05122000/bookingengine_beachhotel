"use client";

import { Suspense } from "react";
import SignInCodeContent from "./_components/SignInCodeContent";

export default function SignInCodePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInCodeContent />
        </Suspense>
    );
}