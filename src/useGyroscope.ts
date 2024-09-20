import { useCallback, useEffect, useState } from "preact/hooks";

export function useGyroscope() {
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(90);

  const onOrientation = useCallback(
    ({ alpha, beta, gamma }: DeviceOrientationEvent) => {
      setAlpha(alpha || -1);
      setBeta(beta || -1);
      setGamma(gamma || -1);
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, []);

  return [alpha, beta, gamma];
}
