import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erick Gabriel | Full-Stack & Infraestrutura Edge",
  description:
    "Engenharia de Software além do CRUD. Alta Disponibilidade, WebSockets e Multi-Tenant.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      style={{ backgroundColor: "#0a0a0a", colorScheme: "dark" }}
    >
      <body
        className="min-h-full flex flex-col bg-[#0a0a0a] text-neutral-100 antialiased"
      >
        {children}
      </body>
    </html>
  );
}
