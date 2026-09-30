"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoCarouselProps {
  images: string[];
  alt?: string;
  /** Tempo de cada foto em ms (padrão: 5000) */
  interval?: number;
  className?: string;
}

/**
 * PhotoCarousel — carrossel de fotos com transição suave de opacidade.
 * As imagens se alternam automaticamente a cada `interval` ms.
 */
export function PhotoCarousel({
  images,
  alt = "Foto",
  interval = 5000,
  className,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [total, interval]);

  if (total === 0) return null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {images.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === index ? "z-10 opacity-100" : "z-0 opacity-0"
          )}
        >
          <Image
            src={src}
            alt={`${alt} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority={i === 0}
          />
        </div>
      ))}

      {total > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Mostrar foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full backdrop-blur-md transition-all duration-300",
                i === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default PhotoCarousel;
