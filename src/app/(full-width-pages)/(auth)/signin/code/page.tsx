"use client";

import { Suspense } from "react";
import SignInCodeContent from "./component/SignInCodeContent";

export default function SignInCodePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInCodeContent />
        </Suspense>
    );
}