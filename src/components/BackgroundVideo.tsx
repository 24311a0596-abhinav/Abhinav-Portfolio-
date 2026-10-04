import { useEffect, useRef } from "react";
import BlinkingBackdrop from "./BlinkingBackdrop";
const SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

export default function BackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let prevX: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !video.duration) { prevX = e.clientX; return; }
      if (prevX === null) prevX = e.clientX;
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      const target = video.currentTime + (delta / window.innerWidth) * 0.8 * video.duration;
      video.currentTime = Math.min(Math.max(target, 0), video.duration);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const sync = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true; video.loop = true;
        video.play().catch(() => {});
      } else { video.autoplay = false; video.loop = false; video.pause(); }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div className="order-first lg:order-none relative lg:fixed lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full h-[66svh] sm:h-[72svh] md:h-[80svh] lg:h-full bg-transparent">
      <video
        ref={ref} src={SRC} muted playsInline preload="auto"
        className="w-full h-full object-cover object-[75%_center] lg:object-right-bottom lg:w-[64%] lg:ml-auto lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]"
      />
      <BlinkingBackdrop />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/80 to-transparent lg:hidden" />
    </div>
  );
}
