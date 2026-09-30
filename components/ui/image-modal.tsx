"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

/**
 * ImageModal — Lightbox com zoom para visualização detalhada de imagens.
 * Fecha no botão X, no clique fora (backdrop) ou na tecla Escape.
 */
export function ImageModal({ isOpen, imageUrl, altText, onClose }: ImageModalProps) {
  const [zoom, setZoom] = useState(1);

  // Reseta o zoom sempre que o modal abre ou a imagem troca
  // (ajuste de estado durante o render — padrão recomendado pelo React).
  const dialogKey = isOpen ? imageUrl : null;
  const [prevKey, setPrevKey] = useState<string | null>(dialogKey);
  if (prevKey !== dialogKey) {
    setPrevKey(dialogKey);
    setZoom(1);
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 100) / 100));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, Math.round((z - ZOOM_STEP) * 100) / 100));
  }, []);

  const resetZoom = useCallback(() => setZoom(1), []);

  return (
    <AnimatePresence>
      {isOpen && imageUrl ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={altText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          {/* Botão X fixo */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar visualização"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-black/90"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
          >
            {/* Área da imagem (com scroll quando há zoom) */}
            <div className="relative h-[70vh] w-full overflow-auto sm:h-[75vh]">
              <div
                style={{ transform: `scale(${zoom})` }}
                className="flex h-full w-full origin-center items-center justify-center transition-transform duration-200 ease-out"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Barra de controles */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/60 px-4 py-3">
              <p className="max-w-[50%] truncate text-xs text-neutral-400 sm:text-sm">
                {altText}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label="Diminuir zoom"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15",
                    zoom <= MIN_ZOOM && "cursor-not-allowed opacity-40 hover:bg-white/5"
                  )}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-14 text-center font-mono text-xs text-neutral-300">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label="Aumentar zoom"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15",
                    zoom >= MAX_ZOOM && "cursor-not-allowed opacity-40 hover:bg-white/5"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Resetar zoom"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ImageModal;
