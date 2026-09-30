import { Cpu, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ElegantCarouselSlide } from "@/components/ui/elegant-carousel";

/* ---------- Stack Técnica ---------- */

export interface StackBadge {
  name: string;
  src: string;
}

export const STACK_BADGES: StackBadge[] = [
  {
    name: "Fastify",
    src: "https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white",
  },
  {
    name: "Zod",
    src: "https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white",
  },
  {
    name: "Tauri",
    src: "https://img.shields.io/badge/Tauri-24C8DB?style=flat-square&logo=tauri&logoColor=white",
  },
  {
    name: "Nginx",
    src: "https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white",
  },
  {
    name: "Vite",
    src: "https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white",
  },
  {
    name: "TailwindCSS",
    src: "https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white",
  },
  {
    name: "AWS S3",
    src: "https://img.shields.io/badge/AWS_S3-569A31?style=flat-square&logo=amazons3&logoColor=white",
  },
];

export const CORE_STACK_IMG = {
  src: "https://skillicons.dev/icons?i=ts,nodejs,express,prisma,postgres,mysql,docker,react&theme=dark",
  alt: "Core Stack",
} as const;

/* ---------- Projetos ---------- */

export interface OtherProject {
  icon: LucideIcon;
  title: string;
  problem: string;
  description: string;
  tags: string[];
}

export const OTHER_PROJECTS: OtherProject[] = [
  {
    icon: Layers,
    title: "ClassFlow",
    problem: "Multi-tenant & isolamento de dados",
    description:
      "Plataforma educacional multi-tenant com isolamento lógico por escola, rate limits por tenant e filas para processamento de notas em lote sem degradar o tempo de resposta.",
    tags: ["Multi-tenant", "Rate Limits", "Filas"],
  },
  {
    icon: Cpu,
    title: "CINTEDI",
    problem: "Infra & disponibilidade",
    description:
      "Sistema acadêmico com foco em infraestrutura resiliente: deploy containerizado, health checks, backups automatizados do PostgreSQL e observabilidade básica de ponta a ponta.",
    tags: ["Docker", "PostgreSQL", "Infra"],
  },
];

/* ---------- Certificados ---------- */

export interface Certificate {
  shortTitle: string;
  title: string;
  institution: string;
  year: string;
  pdf?: string;
  thumb?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    shortTitle: "Mobile Dev",
    title: "Mobile Developer Bootcamp",
    institution: "DIO · meutudo",
    year: "2025",
    pdf: "/certificados/CerificadoMobileDeveloper.pdf",
    thumb: "/certificados/thumbs/CerificadoMobileDeveloper.png",
  },
  {
    shortTitle: "HTML/CSS/JS",
    title: "MasterGeeks 01 · HTML, CSS e JavaScript",
    institution: "SuperGeeks",
    year: "2024",
    pdf: "/certificados/CertificadoMAstergeaks.pdf",
    thumb: "/certificados/thumbs/CertificadoMAstergeaks.png",
  },
  {
    shortTitle: "React",
    title: "Convenções e Qualidade de Código React",
    institution: "DIO",
    year: "2026",
    pdf: "/certificados/CertificadosDIO.pdf",
    thumb: "/certificados/thumbs/CertificadosDIO.png",
  },
  {
    shortTitle: "Python USP",
    title: "Python · Programa Paideia",
    institution: "USP · LASSU-USP",
    year: "2025",
    pdf: "/certificados/certificadoDigital.pdf",
    thumb: "/certificados/thumbs/certificadoDigital.png",
  },
  {
    shortTitle: "OpenStack",
    title: "O Mundo Open Source do OpenStack",
    institution: "Even3",
    year: "2026",
    pdf: "/certificados/cf3e5112-ac4f-420d-bb31-6fb7ff583c7f.pdf",
    thumb: "/certificados/thumbs/cf3e5112-ac4f-420d-bb31-6fb7ff583c7f.png",
  },
  {
    shortTitle: "Linux",
    title: "Linux Essentials",
    institution: "IFPB · Cisco Networking Academy",
    year: "2026",
    pdf: "/certificados/Linux_Essentials_certificate_leandro-gabriel-academico-ifpb-edu-br_4aaebe9d-8624-46e0-9a20-0a1d22f5cb6b.pdf",
    thumb:
      "/certificados/thumbs/Linux_Essentials_certificate_leandro-gabriel-academico-ifpb-edu-br_4aaebe9d-8624-46e0-9a20-0a1d22f5cb6b.png",
  },
];

/* ---------- Slides dos carrosséis ---------- */

export const SOFIA_SLIDES: ElegantCarouselSlide[] = [
  {
    title: "Dashboard Administrativo",
    subtitle: "Visão multi-tenant",
    description:
      "Painel da rede com unidades, tokens e links de acesso por clínica.",
    accent: "#34d399",
    imageUrl: "/imgs/sofia/Captura%20de%20Tela%20(2529).png",
  },
  {
    title: "Relatórios em Tempo Real",
    subtitle: "Analytics da operação",
    description:
      "Senhas geradas, atendimentos finalizados e fluxo de pacientes por unidade.",
    accent: "#22d3ee",
    imageUrl: "/imgs/sofia/Captura%20de%20Tela%20(2530).png",
  },
  {
    title: "Totem de Autoatendimento",
    subtitle: "Edge na recepção",
    description:
      "Retirada de senhas no totem com impressão térmica local via agente Rust.",
    accent: "#a78bfa",
    imageUrl: "/imgs/sofia/Captura%20de%20Tela%20(2539).png",
  },
];

export const CINTEDI_SLIDES: ElegantCarouselSlide[] = [
  {
    title: "Portal do Evento",
    subtitle: "VI CINTEDI 2027",
    description:
      "Homepage do congresso internacional de educação inclusiva.",
    accent: "#fbbf24",
    imageUrl: "/imgs/cintedi/Captura%20de%20Tela%20(2522).png",
  },
  {
    title: "Inscrições e Pagamentos",
    subtitle: "Checkout por lotes",
    description:
      "Valores online e presencial com processamento de pagamentos por lote.",
    accent: "#fb923c",
    imageUrl: "/imgs/cintedi/Captura%20de%20Tela%20(2523).png",
  },
  {
    title: "Painel Administrativo",
    subtitle: "Gestão do evento",
    description:
      "Visão geral de inscrições, modalidades e exportação de relatórios.",
    accent: "#f87171",
    imageUrl: "/imgs/cintedi/Captura%20de%20Tela%20(2525).png",
  },
];
