"use client";

import { useCallback, useState } from "react";

export function usePasswordVisibility(initial = false) {
    const [showPassword, setShowPassword] = useState(initial);
    const toggle = useCallback(() => setShowPassword((s) => !s), []);
    return { showPassword, toggle };
}
