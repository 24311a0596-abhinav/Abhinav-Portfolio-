import { useEffect, useRef, useState } from "react";
import BlinkingSquares, { type Hole } from "./BlinkingSquares";

function useMedia(q: string) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

// Where his face glow sits on a laptop screen (px), plus the radius of the area kept free of squares.
const REF = { w: 2408, h: 1495, gx: 1610, gy: 523, rx: 215, ry: 340 };

export default function BlinkingBackdrop() {
  const desktop = useMedia("(min-width: 1024px)");
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const host = useRef<HTMLDivElement>(null);
  const [holes, setHoles] = useState<Hole[]>([]);

  useEffect(() => {
    const video = document.querySelector("video");
    if (!video) return;
    const calc = () => {
      const hr = host.current?.getBoundingClientRect(), vr = video.getBoundingClientRect();
      if (!hr || !hr.width || !vr.width) return;
      const vw = video.videoWidth || 1920, vh = video.videoHeight || 1080;
      const rs = Math.max((REF.w * 0.64) / vw, REF.h / vh), rdw = vw * rs, rdh = vh * rs;
      const fx = (REF.gx - REF.w + rdw) / rdw, fy = (REF.gy - REF.h + rdh) / rdh;
      const s = Math.max(vr.width / vw, vr.height / vh), dw = vw * s, dh = vh * s;
      const [px, py] = desktop ? [1, 1] : [0.75, 0.5];
      const gx = vr.left + (vr.width - dw) * px + fx * dw, gy = vr.top + (vr.height - dh) * py + fy * dh;
      const n = (v: number) => Math.round(v * 10000) / 10000;
      setHoles([{
        cx: n((gx - hr.left) / hr.width), cy: n((gy - hr.top) / hr.height),
        rx: n(((REF.rx / rdw) * dw) / hr.width), ry: n(((REF.ry / rdh) * dh) / hr.height),
      }]);
    };
    calc();
    video.addEventListener("loadedmetadata", calc);
    window.addEventListener("resize", calc);
    return () => {
      video.removeEventListener("loadedmetadata", calc);
      window.removeEventListener("resize", calc);
    };
  }, [desktop]);

  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0 mix-blend-darken">
      <BlinkingSquares
        direction={desktop ? "right" : "top"}
        gridSize={desktop ? 52 : 34}
        falloff={0.3}
        fadeStart={0.37}
        minBrightness={0.66}
        twinkleStrength={1}
        intensity={1.4000000000000001}
        squareColor="#4c9dff"
        backgroundColor="transparent"
        twinkleSpeed={still ? 0 : 0.35}
        holes={holes}
        holeSoftness={0.22}
      />
    </div>
  );
}
