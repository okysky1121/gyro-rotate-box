import { render } from "preact";
import {
  StrictMode,
  useEffect,
  useMemo,
  useRef,
} from "preact/compat";
import { useGyroscope } from "./useGyroscope";

import "./box.css";

const toRadian = (deg: number) => (deg * Math.PI) / 180;

export function App() {
  const [alpha, beta, gamma] = useGyroscope();
  const box = useRef<HTMLDivElement>(null);

  const [_x, y, _z] = useMemo(
    () => [alpha, beta, gamma].map(toRadian),
    [alpha, beta, gamma],
  );
  const cos = useMemo(() => Math.cos(y), [y]);

  const transform = useMemo(
    () => `translate(-50%, -50%) rotate3d(0, 0, ${cos}, ${alpha}deg)`,
    [alpha, cos],
  );

  useEffect(() => {
    if (!box.current) return;
    box.current.style.transform = transform;
  }, [alpha]);

  return (
    <StrictMode>
      <div id="box" ref={box}></div>
    </StrictMode>
  );
}

render(<App />, document.body);
