import { useState } from "react";

export default function usePasswordVisibility() {
  const [visibility, setVisibility] = useState({
    password: false,
    newPassword: false,
    confirm: false,
  });

  const toggleSetVisibility = (key) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return {
    visibility,
    toggleSetVisibility,
  };
}
