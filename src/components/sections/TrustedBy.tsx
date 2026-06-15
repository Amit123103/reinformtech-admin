import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const logos = [
  { name: "Acme Corp", id: 1 },
  { name: "GlobalTech", id: 2 },
  { name: "Quantum", id: 3 },
  { name: "Vertex", id: 4 },
  { name: "Pulse", id: 5 },
  { name: "Nebula", id: 6 },
];

export function TrustedBy() {
  return (
    <section className="py-12 border-y border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
      <Container>
        <AnimateOnScroll>
          <p className="text-center text-sm font-medium text-[var(--color-muted)] mb-8 uppercase tracking-widest">
            Trusted by innovative teams worldwide
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 lg:gap-x-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {logos.map((logo) => (
              <div key={logo.id} className="flex items-center justify-center">
                {/* SVG placeholders for logos to look professional */}
                <svg className="h-8 text-[var(--color-primary)] opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="40" rx="4" fill="currentColor" fillOpacity="0.05" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" letterSpacing="-0.02em">{logo.name}</text>
                </svg>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
