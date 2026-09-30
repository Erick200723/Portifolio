import { ScrollExpandMedia } from "@/components/ui/scroll-expand-media";

export function HeroSection() {
  return (
    <ScrollExpandMedia
      mediaSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop"
      title="Erick Gabriel"
      date="Full-Stack & Infraestrutura Edge"
      scrollToExpand="Role para explorar"
    >
      <h2 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
        Engenharia de Software além do CRUD. Foco em Alta Disponibilidade,
        WebSockets e Multi-Tenant.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
        Construo plataformas distribuídas que sobrevivem ao mundo real:
        tempo real, borda e escala.
      </p>
    </ScrollExpandMedia>
  );
}
