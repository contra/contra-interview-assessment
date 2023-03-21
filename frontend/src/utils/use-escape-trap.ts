import { useCallback, useEffect } from "react";

export const useEscapeKeyListener = (callback: () => void) => {
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
        callback();
    }
  }, [callback]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
}