"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ElegantCarouselSlide {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

interface ElegantCarouselProps {
  slides: ElegantCarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * ElegantCarousel — carrossel elegante em Tailwind puro.
 * Imagens sobrepostas com transição de opacidade, autoplay com pausa
 * no hover, setas, dots e contador.
 */
export function ElegantCarousel({
  slides,
  autoPlay = true,
  interval = 5000,
  className,
}: ElegantCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // No mobile o toque dispara mouseenter sem mouseleave: a pausa por hover
  // só vale para dispositivos com mouse de verdade.
  const hoverCapable = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;

  useEffect(() => {
    hoverCapable.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  useEffect(() => {
    if (!autoPlay || paused || total < 2) return;
    timer.current = setTimeout(() => go(1), interval);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, autoPlay, paused, interval, go, total]);

  if (total === 0) return null;
  const slide = slides[index];

  return (
    <div
      onMouseEnter={() => {
        if (hoverCapable.current) setPaused(true);
      }}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 shadow-2xl",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full">
        {slides.map((s, i) => (
          <div
            key={s.imageUrl}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "z-10 opacity-100" : "z-0 opacity-0"
            )}
          >
            <Image
              src={s.imageUrl}
              alt={s.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlay para legibilidade do texto */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

        {/* Texto do slide ativo */}
        <div
          key={slide.imageUrl}
          className="absolute inset-x-0 bottom-0 z-30 p-5 animate-in fade-in slide-in-from-bottom-3 duration-500 sm:p-6"
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: slide.accent }}
          >
            {slide.subtitle}
          </p>
          <h4 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {slide.title}
          </h4>
          <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-relaxed text-neutral-300">
            {slide.description}
          </p>
        </div>

        {/* Contador (oculto no mobile para leitura limpa) */}
        <span className="absolute right-4 top-4 z-30 hidden rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold tracking-widest text-white backdrop-blur-md sm:block">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Setas (ocultas no mobile para leitura limpa) */}
        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label="Slide anterior"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/80 sm:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo slide"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/80 sm:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {/* Dots */}
      {total > 1 ? (
        <div className="flex items-center justify-center gap-2 bg-black/40 px-4 py-3">
          {slides.map((s, i) => (
            <button
              key={s.imageUrl}
              type="button"
              aria-label={`Ir para o slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8" : "w-2.5 bg-white/20 hover:bg-white/40"
              )}
              style={i === index ? { backgroundColor: slide.accent } : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ElegantCarousel;
