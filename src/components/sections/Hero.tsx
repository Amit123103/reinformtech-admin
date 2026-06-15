"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { fadeUp } from "@/lib/animations";

const backgroundImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
];

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-4 lg:pt-24 lg:pb-6 bg-[var(--color-background)] overflow-hidden flex flex-col justify-start">
      {/* Subtle Tech Background Image */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-multiply">
        {backgroundImages.map((src, index) => (
          <img 
            key={src}
            src={src} 
            alt="Technology Background" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>
      
      {/* Premium Glowing Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-30 pointer-events-none mix-blend-normal z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#E5989B] rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D58386] rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center pt-8">
        {/* Top scrolling heading */}
        <AnimateOnScroll variants={fadeUp} delay={0.05} className="w-full max-w-[100vw] overflow-hidden relative select-none mb-10 py-2">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-4 w-max animate-scroll-right">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center px-2">
                {["Custom SaaS Platforms", "Enterprise Web Apps", "Native iOS & Android", "Cloud Infrastructures", "UI/UX System Design", "AI & Workflow Automation"].map((text, idx) => (
                  <div key={idx} className="px-6 py-3 rounded-xl bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] shadow-sm text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase hover:scale-105 hover:bg-[var(--color-surface)] hover:shadow-md transition-all duration-300">
                    {text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variants={fadeUp} delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
            <span className="text-xs font-semibold tracking-wide text-[var(--color-secondary)] uppercase">
              Digital Product Studio
            </span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variants={fadeUp} delay={0.2}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-primary)] text-balance mb-6 max-w-3xl mx-auto leading-tight">
            Handcrafted digital tools for growing teams.
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll variants={fadeUp} delay={0.3}>
          <p className="text-base md:text-lg text-[var(--color-muted)] text-balance mb-10 max-w-xl mx-auto leading-relaxed">
            We're a small, dedicated team of builders. We write clean code, design simple interfaces, and actually care about the products we make for you. No corporate jargon, just good software.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll variants={fadeUp} delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Button 
              size="md" 
              className="w-full sm:w-auto shadow-md"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project
            </Button>
            <Button 
              size="md" 
              variant="outline" 
              className="w-full sm:w-auto border-[var(--color-border)] bg-[var(--color-background)]"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Services
            </Button>
          </div>
        </AnimateOnScroll>

        {/* Scrolling Marquees */}
        <AnimateOnScroll variants={fadeUp} delay={0.45} className="w-full overflow-hidden relative select-none">
          {/* Fading edges for the marquee */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex flex-col gap-4">
            {/* Top row - Right to Left */}
            <div className="flex gap-4 w-max animate-scroll-left">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center px-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "GraphQL", "AWS", "Figma", "Docker"].map((tech) => (
                    <div key={tech} className="px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-secondary)] whitespace-nowrap shadow-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Bottom row - Left to Right */}
            <div className="flex gap-4 w-max animate-scroll-right">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center px-2">
                  {["Vercel", "Stripe", "Prisma", "Supabase", "Redis", "Framer Motion", "Jest", "Cypress", "OpenAI", "Cloudflare"].map((tech) => (
                    <div key={tech} className="px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-secondary)] whitespace-nowrap shadow-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>


      </Container>
    </section>
  );
}
