import { useEffect, useState } from "react";
import LaunchA from "../components/Launch/LaunchA";
import LaunchB from "../components/Launch/LaunchB";

export default function LaunchScreen() {
  const [changeLayout, setChangeLayout] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setChangeLayout(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return changeLayout ? <LaunchB /> : <LaunchA />;
}
