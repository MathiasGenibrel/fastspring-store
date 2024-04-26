import { RefObject, useEffect } from "react";

export const IS_MAC = navigator.userAgent.toLowerCase().includes("mac");

export const useSearchShortcut = (
  inputRef: RefObject<HTMLInputElement | null>,
) => {
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (!inputRef.current) return;

      const metaKey = IS_MAC ? event.metaKey : event.ctrlKey;

      // ⌘ + K or ctrl + K depending on the OS
      if (metaKey && event.key === "k") {
        inputRef.current.focus();
      }
    });

    return () => document.removeEventListener("keydown", () => {});
  }, []);
};
