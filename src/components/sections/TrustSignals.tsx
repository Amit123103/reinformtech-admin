import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Award, ShieldCheck, Cpu, Target } from "lucide-react";

const stats = [
    { label: "Years of Experience", value: "8+", icon: <Award className="w-5 h-5" /> },
  { label: "Projects Delivered", value: "150+", icon: <Target className="w-5 h-5" /> },
  { label: "Client Retention", value: "98%", icon: <ShieldCheck className="w-5 h-5" /> },
  { label: "Technologies Mastered", value: "25+", icon: <Cpu className="w-5 h-5" /> },
];

export function TrustSignals() {
  return (
    <section className="py-8 lg:py-10 border-y border-[var(--color-border)] bg-[var(--color-background)]">
      <Container>
        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-0">
            {stats.map((stat, index) => (
              <AnimateOnScroll 
                key={index} 
                variants={fadeUp} 
                className={`relative flex flex-col items-center justify-center text-center px-2 md:px-6 
                  ${index !== stats.length - 1 ? "md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-16 md:after:w-px md:after:bg-[var(--color-border)]" : ""}
                `}
              >
                <div className="text-[var(--color-accent)] mb-3 bg-[var(--color-surface)] p-2 rounded-full border border-[var(--color-border)]">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">{stat.label}</div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-[var(--color-border)] text-center">
            <AnimateOnScroll variants={fadeUp}>
              <p className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-widest mb-8">
                Industry Certifications & Partnerships
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock Certification Logos */}
                <div className="font-bold text-xl flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--color-text)] rounded-sm inline-block"></span> AWS Select Tier
                </div>
                <div className="font-bold text-xl flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border-4 border-[#00d8ff] inline-block"></span> React Native Partner
                </div>
                <div className="font-bold text-xl flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#0052cc] rounded-sm inline-block"></span> Atlassian Certified
                </div>
                <div className="font-bold text-xl flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#336791] rounded-sm inline-block"></span> ISO 27001
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
