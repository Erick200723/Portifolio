"use client";

import { useState } from "react";
import Image from "next/image";
import CircularSplitRoll from "@/components/ui/circular-split-roll";
import { ImageModal } from "@/components/ui/image-modal";
import { CERTIFICATES } from "@/lib/constants";
import { Award, ExternalLink } from "lucide-react";

export function CertificatesSection() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  return (
    <section id="certificados" className="w-full pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-neutral-300">
          <Award className="h-3.5 w-3.5" />
          Formação
        </span>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Certificações e Background Acadêmico
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
          Unindo a base sólida da engenharia e academia com as tecnologias
          mais modernas do mercado.
        </p>
      </div>

      <CircularSplitRoll
        items={CERTIFICATES.filter((cert) => Boolean(cert.thumb)).map(
          (cert) => ({
            id: cert.title,
            title: cert.shortTitle,
            image: cert.thumb as string,
            alt: cert.title,
          })
        )}
        onImageClick={(item) => {
          const cert = CERTIFICATES.find((c) => c.thumb === item.image);
          if (cert?.thumb) {
            setSelectedImage({ src: cert.thumb, alt: cert.title });
          }
        }}
        radius={420}
        cardSize={220}
        sectionHeight={70}
      />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CERTIFICATES.map((cert) => (
            <article
              key={cert.title}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors"
            >
                <button
                  type="button"
                  onClick={() =>
                    cert.thumb &&
                    setSelectedImage({ src: cert.thumb, alt: cert.title })
                  }
                  aria-label={`Ampliar certificado ${cert.title}`}
                  className="relative aspect-video w-full cursor-pointer overflow-hidden bg-black/40"
                >
                  {cert.thumb ? (
                    <Image
                      src={cert.thumb}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-800">
                      <Award className="h-8 w-8 text-neutral-600" />
                      <span className="px-4 text-center font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                        Imagem em breve
                      </span>
                    </span>
                  )}
                </button>
              <div className="p-6">
                <h3 className="text-base font-semibold leading-snug text-white">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-300">
                  {cert.institution}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  {cert.year ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
                      {cert.year}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-600">
                      Arquivo em atualização
                    </span>
                  )}
                  {cert.pdf ? (
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
                    >
                      Ver certificado
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={selectedImage !== null}
        imageUrl={selectedImage?.src ?? ""}
        altText={selectedImage?.alt ?? ""}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
