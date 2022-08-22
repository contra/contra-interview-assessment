import React, { useEffect } from "react";

interface useHotKeyProps {
  key: string;
  useCmdKey?: boolean;
  useAltKey?: boolean;
  dependencies?: any[];
  useShiftKey?: boolean;
  action: (e: React.KeyboardEvent) => void;
}

const useHotKey = ({
  key = "Enter",
  action,
  dependencies = [],
  useShiftKey = false,
  useCmdKey = false,
  useAltKey = false,
} : useHotKeyProps) => {
  const handleKeyDown = (e : React.KeyboardEvent) => {
    if (useShiftKey && !e.shiftKey) return;

    if (useCmdKey && !e.metaKey) return;

    if (useAltKey && !e.altKey) return;

    if (key === e.key || key === e.code) {
      action(e);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, dependencies);

  return null;
};

export default useHotKey;