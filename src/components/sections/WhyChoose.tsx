"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { fadeUp } from "@/lib/animations";
import { Users, Zap, ShieldCheck, HeartHandshake } from "lucide-react";

const pillars = [
  {
    title: "Experienced Team",
    description: "Senior engineers and designers with a track record of delivering at scale.",
    stat: "10+",
    statLabel: "Years Avg Experience",
    icon: Users,
  },
  {
    title: "Fast Delivery",
    description: "Agile methodologies that get your product to market faster without sacrificing quality.",
    stat: "40%",
    statLabel: "Faster Time-to-Market",
    icon: Zap,
  },
  {
    title: "Transparent Process",
    description: "Clear communication, regular updates, and no black boxes. You're involved every step.",
    stat: "100%",
    statLabel: "Code Visibility",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Support",
    description: "We don't just ship and run. We partner with you to maintain and scale your application.",
    stat: "24/7",
    statLabel: "Dedicated Support",
    icon: HeartHandshake,
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

export function WhyChoose() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 bg-[var(--color-surface)] border-y border-[var(--color-border)] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content & Bento Grid */}
          <div className="flex flex-col gap-12">
            <AnimateOnScroll className="flex flex-col items-start text-left max-w-xl">
              <SectionHeading
                eyebrow="Why Choose ReInformTech"
                title="Why work with us?"
                description="We're builders at heart. We don't just write code; we care about the success of your business. Here's what you can expect when you partner with us."
                align="left"
                className="mb-8"
              />
              <div className="flex justify-start items-center gap-6 mt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[var(--color-primary)] mb-1">98%</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Client Retention</span>
                </div>
                <div className="w-px h-12 bg-[var(--color-border)] mx-2" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[var(--color-primary)] mb-1">200+</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Projects Shipped</span>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variants={fadeUp} className="w-full overflow-hidden relative select-none">
              {/* Fading edges for the marquee */}
              <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex gap-6 w-max animate-scroll-right">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-6 items-stretch px-3">
                    {pillars.map((pillar) => (
                      <div 
                        key={pillar.title} 
                        className="w-[280px] p-6 flex flex-col bg-[var(--color-background)] hover:bg-[var(--color-background)]/80 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/50 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center mb-4">
                          <pillar.icon className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-[var(--color-muted)] mb-4 text-xs leading-relaxed flex-grow whitespace-normal">
                          {pillar.description}
                        </p>
                        <div className="pt-3 border-t border-[var(--color-border)]/50 mt-auto">
                          <div className="text-xl font-bold text-[var(--color-primary)] mb-1">{pillar.stat}</div>
                          <div className="text-[9px] font-bold text-[var(--color-muted)] uppercase tracking-wider">{pillar.statLabel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Orbital Image Carousel */}
          <div className="hidden lg:flex justify-center items-center relative h-[600px]">
            
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-4 border-[var(--color-background)] shadow-2xl z-20 overflow-hidden bg-[var(--color-surface)] [clip-path:circle(50%)] [transform:translate3d(-50%,-50%,0)]">
              {galleryImages.map((src, idx) => (
                <img 
                  key={src}
                  src={src}
                  alt="Team collaboration"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                  }`}
                  style={{ objectPosition: 'center', minHeight: '100%', minWidth: '100%' }}
                />
              ))}
            </div>

            {/* Orbiting Track */}
            <div className="relative w-[500px] h-[500px] rounded-full border border-dashed border-[var(--color-border)] animate-spin-slow z-10">
              {galleryImages.map((src, index) => {
                const angle = index * (360 / galleryImages.length);
                return (
                  <div 
                    key={src}
                    className="absolute top-1/2 left-1/2 w-0 h-0"
                    style={{ transform: `rotate(${angle}deg) translateY(-250px)` }}
                  >
                    <div style={{ transform: `rotate(-${angle}deg)` }}>
                      <div className="w-20 h-20 -ml-10 -mt-10 animate-spin-slow-reverse">
                        <div 
                          className={`w-full h-full rounded-full border-4 shadow-lg overflow-hidden transition-all duration-500 cursor-pointer [clip-path:circle(50%)] ${
                            index === activeIndex 
                              ? "border-[var(--color-primary)] scale-125 z-30" 
                              : "border-[var(--color-background)] opacity-60 hover:opacity-100 z-20"
                          }`}
                          onClick={() => setActiveIndex(index)}
                        >
                          <img src={src} alt="Thumbnail" className="w-full h-full object-cover" style={{ objectPosition: 'center', minHeight: '100%', minWidth: '100%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
