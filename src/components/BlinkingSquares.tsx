import { useEffect, useRef } from "react";

export type Hole = { cx: number; cy: number; rx: number; ry: number };

export type BlinkingSquaresProps = {
  direction?: "right" | "left" | "top" | "bottom";
  gridSize?: number; squareSize?: number; fadeStart?: number; fadeEnd?: number; falloff?: number;
  minBrightness?: number; twinkleSpeed?: number; twinkleStrength?: number; intensity?: number; opacity?: number;
  squareColor?: string; backgroundColor?: string; dpr?: number;
  holes?: Hole[]; holeSoftness?: number;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hash = (n: number) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
function rgb(hex: string) {
  let s = hex.replace("#", "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  const n = parseInt(s, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function BlinkingSquares({
  direction = "right", gridSize = 52, squareSize = 0.57, fadeStart = 0.65, fadeEnd = 1, falloff = 1.25,
  minBrightness = 0.55, twinkleSpeed = 1.4, twinkleStrength = 0.94, intensity = 1, opacity = 1,
  squareColor = "#BB29FF", backgroundColor = "#000000", dpr = 1.5, holes, holeSoftness = 0.22,
}: BlinkingSquaresProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const holesKey = JSON.stringify(holes ?? []);

  useEffect(() => {
    const canvas = ref.current, ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const hs: Hole[] = JSON.parse(holesKey);
    const [r, g, b] = rgb(squareColor);
    let w = 1, h = 1, cols = 0, rows = 0, cell = 1, ratio = 1, raf = 0, last = 0;
    let lit = new Float32Array(0), base = new Float32Array(0), phase = new Float32Array(0), vis = new Float32Array(0);

    const layout = () => {
      const box = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, dpr);
      w = Math.max(1, box.width); h = Math.max(1, box.height);
      canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
      cell = Math.max(w, h) / clamp(gridSize, 8, 200);
      cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
      lit = new Float32Array(cols * rows); base = new Float32Array(cols * rows);
      phase = new Float32Array(cols * rows); vis = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x, px = (x + 0.5) / cols, py = (y + 0.5) / rows;
          const t = direction === "right" ? px : direction === "left" ? 1 - px : direction === "top" ? 1 - py : py;
          const d = Math.pow(clamp((t - fadeStart) / Math.max(0.001, fadeEnd - fadeStart)), falloff);
          lit[i] = hash(i + 1) < d ? 1 : 0;
          base[i] = minBrightness + (1 - minBrightness) * hash(i + 7919);
          phase[i] = hash(i + 104729) * Math.PI * 2;
          let v = 1;
          for (const hl of hs) {
            const dx = (((x + 0.5) * cell) / w - hl.cx) / hl.rx, dy = (((y + 0.5) * cell) / h - hl.cy) / hl.ry;
            const t2 = clamp((Math.sqrt(dx * dx + dy * dy) - 1) / Math.max(0.01, holeSoftness));
            v = Math.min(v, t2 * t2 * (3 - 2 * t2));
          }
          vis[i] = v;
        }
      }
    };

    const draw = (t: number) => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (backgroundColor === "transparent") ctx.clearRect(0, 0, w, h);
      else { ctx.fillStyle = backgroundColor; ctx.fillRect(0, 0, w, h); }
      const size = cell * clamp(squareSize, 0.05, 0.98), pad = (cell - size) / 2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          if (!lit[i] || vis[i] < 0.02) continue;
          const osc = 0.5 + 0.5 * Math.sin(t * twinkleSpeed * Math.PI * 2 + phase[i]);
          const a = clamp(base[i] * (1 - twinkleStrength + twinkleStrength * osc) * intensity) * vis[i];
          if (a < 0.01) continue;
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fillRect(x * cell + pad, y * cell + pad, size, size);
        }
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return;
      last = now;
      draw(now / 1000);
    };

    layout();
    draw(0);
    if (twinkleSpeed > 0) raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(() => { layout(); draw(twinkleSpeed > 0 ? performance.now() / 1000 : 0); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [direction, gridSize, squareSize, fadeStart, fadeEnd, falloff, minBrightness, twinkleSpeed, twinkleStrength, intensity, squareColor, backgroundColor, dpr, holesKey, holeSoftness]);

  return <canvas ref={ref} aria-hidden className="block h-full w-full" style={{ opacity }} />;
}
