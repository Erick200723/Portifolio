import { PhotoCarousel } from "@/components/ui/photo-carousel";
import { CORE_STACK_IMG, STACK_BADGES } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Coluna Esquerda (Texto) */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-neutral-300">
            Sobre Mim
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Quem sou eu
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Desenvolvedor focado em resolver gargalos reais de performance e
            infraestrutura. Atualmente graduando e envolvido em projetos pela
            UEPB e IFPB. Minha abordagem une a lógica da engenharia elétrica
            com a arquitetura de software escalável.
          </p>
        </div>

        {/* Coluna Direita (Foto) */}
        <div className="flex flex-col gap-6">
          <PhotoCarousel
            images={["/imgs/foto2.jpeg", "/imgs/foto3.jpeg"]}
            alt="Erick Gabriel — foto de perfil"
            interval={5000}
            className="w-full max-w-sm mx-auto h-[28rem] bg-neutral-800 rounded-2xl border border-neutral-700"
          />

          {/* Stack Técnica — Galeria visual de badges */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Stack Técnica
            </h3>
            <div className="flex flex-col gap-4">
              <img
                src={CORE_STACK_IMG.src}
                alt={CORE_STACK_IMG.alt}
                loading="lazy"
                className="max-w-full"
              />
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {STACK_BADGES.map((badge) => (
                  <img
                    key={badge.name}
                    src={badge.src}
                    alt={badge.name}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
