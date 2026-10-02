import { useEffect, useState } from "react";
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let id: number | undefined;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setN((c) => { if (c >= text.length) { window.clearInterval(id); return c; } return c + 1; });
      }, speed);
    }, startDelay);
    return () => { window.clearTimeout(start); window.clearInterval(id); };
  }, [text, speed, startDelay]);
  return { displayed: text.slice(0, n), done: n >= text.length };
}
