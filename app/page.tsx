import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 antialiased">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CertificatesSection />
      <Footer />
    </main>
  );
}
