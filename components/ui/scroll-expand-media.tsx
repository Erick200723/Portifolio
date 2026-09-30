"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  mediaType?: "image" | "video";
  title?: string;
  date?: string;
  scrollToExpand?: string;
  posterSrc?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ScrollExpandMedia({
  mediaSrc,
  mediaType = "image",
  title,
  date,
  scrollToExpand,
  posterSrc,
  children,
  className,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Media sai pequena/arredondada no centro e expande para full-bleed
  const mediaWidth = useTransform(scrollYProgress, [0, 0.6], ["55vw", "100vw"]);
  const mediaHeight = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["55vh", "100vh"]
  );
  const borderRadius = useTransform(scrollYProgress, [0, 0.6], [32, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.6], [0.95, 1]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.45, 0.75], [60, 0]);

  useEffect(() => {
    if (mediaType === "video") {
      const t = setTimeout(() => setIsVideoLoaded(true), 300);
      return () => clearTimeout(t);
    }
  }, [mediaType]);

  const isVideo = mediaType === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(mediaSrc);

  return (
    <section ref={sectionRef} className={cn("relative h-[250vh] bg-transparent", className)}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Media central que expande com o scroll */}
        <div className="relative flex flex-1 items-center justify-center px-4 pt-20">
          <motion.div
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius,
              scale: mediaScale,
            }}
            className="relative max-h-[85vh] max-w-full overflow-hidden shadow-[0_0_80px_-20px_rgba(255,255,255,0.25)]"
          >
            {isVideo ? (
              <>
                {/* Fallback gradiente animado enquanto o vídeo carrega */}
                <div
                  className={cn(
                    "absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e293b,#0a0a0a_70%)] transition-opacity duration-700",
                    isVideoLoaded ? "opacity-0" : "opacity-100 animate-pulse"
                  )}
                />
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className="h-full w-full object-cover"
                />
              </>
            ) : (
              <>
                {/* Gradiente animado por baixo da imagem */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e293b,#0a0a0a_70%)]" />
                <img
                  src={mediaSrc}
                  alt={title ?? "Media hero"}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              </>
            )}

            {/* Overlay escuro sleek */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-[#0a0a0a]/60" />

            {/* Título sobre a mídia */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="absolute inset-0 mx-auto flex w-full flex-col items-center justify-center px-6 text-center"
            >
              {date ? (
                <span className="mb-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-md">
                  {date}
                </span>
              ) : null}
              {title ? (
                <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-7xl">
                  {title}
                </h1>
              ) : null}
              {scrollToExpand ? (
                <motion.p
                  style={{ opacity: hintOpacity }}
                  className="mt-8 flex flex-col items-center justify-center gap-3 text-center text-sm font-medium uppercase tracking-[0.3em] text-neutral-400"
                >
                  {scrollToExpand}
                  <span className="mx-auto block h-10 w-px animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
                </motion.p>
              ) : null}
            </motion.div>
          </motion.div>
        </div>

        {/* Conteúdo pós-scroll (revelado após a expansão) */}
        {children ? (
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-6 pb-10"
          >
            <div className="pointer-events-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
              {children}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default ScrollExpandMedia;
