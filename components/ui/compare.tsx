"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CompareProps {
  firstImage: string;
  secondImage: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassName?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}

/**
 * Compare — estilo Aceternity UI.
 * Slider "antes/depois" por arrasto (pointer) ou hover.
 */
export function Compare({
  firstImage,
  secondImage,
  className,
  firstImageClassName,
  secondImageClassName,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(initialSliderPercentage);
  const [dragging, setDragging] = useState(false);
  const animationRef = useRef<number>(0);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.min(98, Math.max(2, pct)));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (slideMode === "drag") {
        setDragging(true);
        updateFromClientX(e.clientX);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }
    },
    [slideMode, updateFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (slideMode === "hover" || dragging) {
        updateFromClientX(e.clientX);
      }
    },
    [slideMode, dragging, updateFromClientX]
  );

  const stopDragging = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!autoplay) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) % autoplayDuration;
      const progress = elapsed / autoplayDuration;
      // vai-e-volta suave entre 10% e 90%
      const pct = 10 + 80 * (0.5 - 0.5 * Math.cos(progress * Math.PI * 2));
      setSliderX(pct);
      animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [autoplay, autoplayDuration]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      style={{ cursor: slideMode === "drag" ? "ew-resize" : "crosshair" }}
      className={cn(
        "relative w-full select-none overflow-hidden rounded-2xl border border-white/10",
        className
      )}
    >
      {/* Imagem de fundo (segunda) */}
      <img
        src={secondImage}
        alt="Depois"
        draggable={false}
        className={cn(
          "pointer-events-none block h-full w-full object-cover",
          secondImageClassName
        )}
      />

      {/* Imagem do topo (primeira) recortada pelo slider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderX}% 0 0)`,
        }}
      >
        <img
          src={firstImage}
          alt="Antes"
          draggable={false}
          className={cn(
            "pointer-events-none block h-full w-full object-cover",
            firstImageClassName
          )}
        />
      </div>

      {/* Linha + handle */}
      {showHandlebar ? (
        <div
          className="absolute inset-y-0 z-10"
          style={{ left: `calc(${sliderX}% - 1px)` }}
        >
          <div className="h-full w-[2px] bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.6)]" />
          <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-0.5 text-white">
              <span className="block h-4 w-[2px] rounded bg-current opacity-80" />
              <span className="block h-6 w-[2px] rounded bg-current" />
              <span className="block h-4 w-[2px] rounded bg-current opacity-80" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Labels */}
      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
        Antes
      </span>
      <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
        Depois
      </span>
    </div>
  );
}

export default Compare;
