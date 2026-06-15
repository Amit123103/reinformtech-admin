"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { HeartPulse, Landmark, ShoppingBag, Building2, GraduationCap, Truck } from "lucide-react";

const industries = [
  {
    title: "Healthcare & MedTech",
    description: "HIPAA-compliant platforms, telemedicine apps, and patient management systems.",
    icon: HeartPulse,
  },
  {
    title: "Finance & FinTech",
    description: "Secure banking portals, crypto trading platforms, and payment gateways.",
    icon: Landmark,
  },
  {
    title: "Retail & E-Commerce",
    description: "Scalable online stores, inventory management, and custom marketplaces.",
    icon: ShoppingBag,
  },
  {
    title: "Real Estate & PropTech",
    description: "Property listing platforms, virtual tour integrations, and CRM tools.",
    icon: Building2,
  },
  {
    title: "Education & EdTech",
    description: "E-learning platforms, student portals, and virtual classroom software.",
    icon: GraduationCap,
  },
  {
    title: "Logistics & Supply Chain",
    description: "Fleet tracking, warehouse management, and delivery routing apps.",
    icon: Truck,
  },
];

export function Industries() {
  const [activeCard, setActiveCard] = useState(-1);

  // Automatically cycle through cards for the flip animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % industries.length);
    }, 2500); // 2.5s per card

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-12 lg:pt-16 pb-24 lg:pb-32 bg-[var(--color-background)] overflow-hidden">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Industries"
            title="Domains we serve"
            description="We build specialized software solutions tailored to the unique challenges and regulatory requirements of your specific industry."
            className="mb-16"
          />
        </AnimateOnScroll>

        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const isActive = activeCard === index;
              return (
                <AnimateOnScroll key={industry.title} variants={fadeUp}>
                  <div 
                    className="group h-[220px] w-full [perspective:1000px]"
                    onMouseEnter={() => setActiveCard(-1)} // Pause auto-animation when user hovers
                  >
                    <div className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] shadow-sm hover:shadow-xl rounded-xl ${
                      isActive ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
                    }`}>
                      
                      {/* Front of the Flashcard */}
                      <Card className="absolute inset-0 h-full w-full [backface-visibility:hidden] border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col items-center justify-center text-center p-6 m-0">
                        <div className={`w-16 h-16 rounded-2xl border border-[var(--color-border)] flex items-center justify-center mb-4 shadow-sm transition-colors duration-500 ${
                          isActive ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-background)] group-hover:bg-[var(--color-primary)]'
                        }`}>
                          <industry.icon className={`w-8 h-8 transition-colors duration-500 ${
                            isActive ? 'text-[var(--color-background)]' : 'text-[var(--color-primary)] group-hover:text-[var(--color-background)]'
                          }`} />
                        </div>
                        <CardTitle className="text-xl">{industry.title}</CardTitle>
                      </Card>

                      {/* Back of the Flashcard */}
                      <Card className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex flex-col items-center justify-center text-center p-6 m-0 text-white shadow-inner">
                        <CardDescription className="text-sm md:text-base leading-relaxed text-white/95 font-medium">
                          {industry.description}
                        </CardDescription>
                      </Card>

                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
