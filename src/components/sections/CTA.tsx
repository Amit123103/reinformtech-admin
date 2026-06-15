import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[var(--color-primary)]">
      {/* Clean background with subtle tech image */}
      <div className="absolute inset-0 z-0 bg-[var(--color-primary)]">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Technology Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-overlay" 
        />
      </div>

      <Container className="relative z-10 text-center">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 max-w-3xl mx-auto text-balance">
            Let's build something you're proud of.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto text-balance">
            We don't do high-pressure sales. Let's just have a chat about what you're trying to build and see if we're a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-slate-100 shadow-xl">
              Say Hello
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-slate-400">
            No commitment required. We'll sign an NDA before our first call.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
