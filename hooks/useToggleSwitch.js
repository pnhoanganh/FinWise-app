import { useState, useCallback } from "react";

export default function useToggleSwitch(initialValue = false) {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, []);

  return [isEnabled, toggle];
}
