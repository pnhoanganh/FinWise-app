import { useEffect, useState } from "react";
import LaunchA from "./(screens)/Launch/LaunchA";
import LaunchB from "./(screens)/Launch/LaunchB";

export default function LaunchScreen() {
  const [changeLayout, setChangeLayout] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setChangeLayout(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return changeLayout ? <LaunchB /> : <LaunchA />;
}
