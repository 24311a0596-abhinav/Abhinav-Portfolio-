import { useEffect, useRef } from "react";
const SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

export default function BackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  // Desktop: scrub with horizontal mouse movement
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

  // Mobile/tablet: autoplay loop
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
    <div className="order-last lg:order-none relative lg:fixed lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video ref={ref} src={SRC} muted playsInline preload="auto" className="w-full h-full object-cover object-right lg:object-right-bottom lg:w-[64%] lg:ml-auto lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]" />
    </div>
  );
}
