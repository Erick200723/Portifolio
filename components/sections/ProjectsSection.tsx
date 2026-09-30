import { Compare } from "@/components/ui/compare";
import { ElegantCarousel } from "@/components/ui/elegant-carousel";
import {
  CINTEDI_SLIDES,
  OTHER_PROJECTS,
  SOFIA_SLIDES,
} from "@/lib/constants";
import {
  ArrowUpRight,
  ExternalLink,
  Printer,
  Radio,
  Server,
  ShieldCheck,
  Tv,
} from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projetos" className="mx-auto w-full max-w-6xl px-6 pb-24 sm:pb-32">
      <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-neutral-300">
        Projetos
      </span>
      <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Projetos de Alta Complexidade
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
        Não faço apenas telas — projeto arquiteturas distribuídas que
        resolvem problemas reais de escala, tempo real e borda.
      </p>

      {/* Card gigante — Sofia IA */}
      <article className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Projeto principal
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Sofia IA - Gestão Distribuída Cloud-to-Edge
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              Plataforma multi-tenant com WebSockets em tempo real, agente
              local em Rust (Tauri) para integração com impressoras térmicas
              e otimização extrema de CPU/RAM para Smart TVs legadas
              (Tizen/WebOS).
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-3">
                <Radio className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                WebSockets em tempo real com reconexão e fallback por tenant.
              </li>
              <li className="flex items-start gap-3">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                Agente local em Rust (Tauri) para impressão térmica sem
                depender da nuvem.
              </li>
              <li className="flex items-start gap-3">
                <Tv className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                Otimização extrema de CPU/RAM para Smart TVs legadas
                (Tizen/WebOS).
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Multi-tenant", "WebSockets", "Rust / Tauri", "Tizen / WebOS", "Edge"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <a
              href="https://sofiaapp.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-3.5 text-sm font-semibold text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-400/20 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Visitar sofiaapp.com.br
            </a>
          </div>

          <div className="flex items-center bg-black/40 p-6 sm:p-10">
            <ElegantCarousel slides={SOFIA_SLIDES} className="w-full" />
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/40 px-6 pb-8 pt-8 sm:px-10 sm:pb-10">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Antes × Depois — painel legado vs SOFIA
          </p>
          <Compare
            firstImage="/imgs/chamadorFeio.jpg"
            secondImage="/imgs/Chamas.png"
            slideMode="drag"
            className="aspect-[16/9] w-full"
          />
        </div>
      </article>

      {/* Card gigante — CINTEDI */}
      <article className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              Projeto em produção
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              CINTEDI - Plataforma de Congresso Internacional
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              Desenvolvimento e deploy de uma plataforma Fullstack para
              gestão de eventos acadêmicos, incluindo autenticação OTP,
              processamento de pagamentos, submissão e avaliação de artigos
              científicos.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-3">
                <Server className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                Gestão de infraestrutura com painéis, DNS e serviços de
                e-mail corporativo.
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                Arquitetura segura para transações e dados acadêmicos.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Fullstack", "OTP", "Pagamentos", "DNS", "Infra"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <a
              href="https://cintedi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-3.5 text-sm font-semibold text-amber-200 transition-colors hover:border-amber-400/60 hover:bg-amber-400/20 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Visitar cintedi.com
            </a>
          </div>

          <div className="flex items-center bg-black/40 p-6 sm:p-10">
            <ElegantCarousel slides={CINTEDI_SLIDES} className="w-full" />
          </div>
        </div>
      </article>

      {/* Cards menores */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {OTHER_PROJECTS.map((project) => (
          <article
            key={project.title}
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:p-10"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <project.icon className="h-6 w-6 text-neutral-200" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              {project.problem}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
