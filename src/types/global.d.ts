declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        options?: Record<string, unknown>
      ) => void;
    };
  }
}

export {};
