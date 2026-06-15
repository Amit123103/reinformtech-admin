import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    title: "FinTech Dashboard Redesign",
    client: "GlobalPay Inc.",
    category: "UX/UI & Frontend",
    metrics: [
      { label: "Increase in conversion", value: "+45%" },
      { label: "Faster load time", value: "3x" },
    ],
    imageGradient: "from-orange-500 to-amber-600",
  },
  {
    title: "Healthcare Patient Portal",
    client: "MediCare Plus",
    category: "Full Stack Development",
    metrics: [
      { label: "Active users", value: "10k+" },
      { label: "Reduction in support tickets", value: "-30%" },
    ],
    imageGradient: "from-yellow-400 to-orange-500",
  },
];

export function CaseStudies() {
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <AnimateOnScroll className="max-w-2xl">
            <SectionHeading
              eyebrow="Case Studies"
              title="Work we're proud of"
              description="Take a look at some of the recent projects we've handcrafted and shipped for our clients."
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <a href="#" className="inline-flex items-center gap-2 font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
              View all work <ArrowRight className="w-4 h-4" />
            </a>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <AnimateOnScroll key={study.title} variants={fadeUp} className="group cursor-pointer">
                <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
                  {/* Image Placeholder */}
                  <div className={`h-64 w-full bg-gradient-to-br ${study.imageGradient} p-8 flex items-center justify-center overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    {/* Mockup visual */}
                    <div className="w-full max-w-sm h-48 bg-white/10 backdrop-blur-md rounded-t-lg border-x border-t border-white/20 shadow-2xl translate-y-8 group-hover:translate-y-4 transition-transform duration-500 flex flex-col">
                      <div className="h-6 border-b border-white/10 flex items-center px-3 gap-1.5">
                         <div className="w-2 h-2 rounded-full bg-white/30" />
                         <div className="w-2 h-2 rounded-full bg-white/30" />
                         <div className="w-2 h-2 rounded-full bg-white/30" />
                      </div>
                      <div className="p-4 flex flex-col gap-3 flex-1 opacity-50">
                        <div className="h-4 w-1/3 bg-white/20 rounded" />
                        <div className="h-2 w-full bg-white/10 rounded" />
                        <div className="h-2 w-5/6 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-semibold text-[var(--color-primary)]">{study.client}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-muted)]" />
                      <span className="text-sm text-[var(--color-muted)]">{study.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-6 group-hover:text-[var(--color-accent)] transition-colors">
                      {study.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--color-border)]">
                      {study.metrics.map((metric, i) => (
                        <div key={i}>
                          <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">{metric.value}</div>
                          <div className="text-xs text-[var(--color-muted)]">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
