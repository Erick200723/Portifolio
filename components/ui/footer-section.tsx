'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navegação',
    links: [
      { title: 'Sobre Mim', href: '#sobre' },
      { title: 'Projetos', href: '#projetos' },
      { title: 'Certificações', href: '#certificados' },
      { title: 'Contato', href: '#contato' },
    ],
  },
  {
    label: 'Projetos',
    links: [
      { title: 'Sofia IA', href: 'https://sofiaapp.com.br/', external: true },
      { title: 'CINTEDI', href: 'https://cintedi.com/', external: true },
      { title: 'ClassFlow', href: '#projetos' },
    ],
  },
  {
    label: 'Social',
    links: [
      {
        title: 'GitHub',
        href: 'https://github.com/Erick200723',
        external: true,
        icon: IconBrandGithub,
      },
      {
        title: 'LinkedIn',
        href: 'https://linkedin.com/in/erick-gabriel23',
        external: true,
        icon: IconBrandLinkedin,
      },
      {
        title: 'Email',
        href: 'mailto:erick2007gabriel23@gmail.com',
        icon: Mail,
      },
    ],
  },
];

const contactButtons = [
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    value: 'github.com/Erick200723',
    href: 'https://github.com/Erick200723',
  },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    value: '/in/erick-gabriel23',
    href: 'https://linkedin.com/in/erick-gabriel23',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'erick2007gabriel23@gmail.com',
    href: 'mailto:erick2007gabriel23@gmail.com',
  },
];

export function Footer() {
  return (
    <footer
      id="contato"
      className="relative w-full overflow-hidden border-t border-white/10 bg-black/40 bg-[radial-gradient(35%_128px_at_50%_0%,rgb(255_255_255/0.08),transparent)]"
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur" />

      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-4">
            <p className="text-lg font-bold tracking-tight text-white">
              Erick Gabriel
            </p>
            <p className="max-w-sm text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              Pronto para escalar sua infraestrutura?
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
              Vamos conversar sobre alta disponibilidade, tempo real e
              arquiteturas que aguentam o mundo real.
            </p>
          </AnimatedContainer>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {section.label}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-400">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          {...(link.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="inline-flex items-center transition-all duration-300 hover:text-white"
                        >
                          {link.icon && <link.icon className="me-1.5 size-4" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        <AnimatedContainer delay={0.4}>
          <div className="mt-12 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {contactButtons.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-neutral-200 transition-colors hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
              >
                <link.icon className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-hover:text-white" />
                <span className="flex flex-col items-start leading-tight sm:items-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {link.label}
                  </span>
                  <span className="max-w-[220px] truncate text-[13px]">
                    {link.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </AnimatedContainer>

        <p className="mt-12 text-center text-xs uppercase tracking-[0.25em] text-neutral-600">
          Erick Gabriel — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
