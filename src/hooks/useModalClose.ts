"use client";

import { useState } from "react";
import { MODAL_ANIMATION_MS } from "@/src/lib/constants";

interface UseModalCloseOptions {
    onClose: () => void;
    durationMs?: number;
}

export function useModalClose({ onClose, durationMs = MODAL_ANIMATION_MS }: UseModalCloseOptions) {
    const [closing, setClosing] = useState(false);

    function triggerClose() {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, durationMs);
    }

    return { closing, triggerClose };
}
