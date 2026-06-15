"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { supabase } from '@/lib/supabase/client';

const fallbackTestimonials = [
  {
    message: "ReInformTech didn't just build our SaaS platform; they fundamentally improved our product architecture. Their engineers operate like an extension of our own team, delivering a resilient microservices backend that handles our 1M+ active users flawlessly.",
    name: "Sarah Jenkins",
    company: "Quantum Health",
  },
  {
    message: "The quality of code and attention to detail in the UI design is unmatched. They delivered a complex real-time analytics platform on time and under budget. We've seen a 40% increase in user engagement since the launch.",
    name: "David Chen",
    company: "ScaleMetrics",
  },
  {
    message: "Working with ReInformTech was a breath of fresh air. Complete transparency, zero ego, and a clear focus on driving business value. They successfully migrated our legacy monolith to Next.js and Go in record time.",
    name: "Elena Rodriguez",
    company: "FlowState Enterprise",
  },
];

export function Testimonials() {
  const [realTestimonials, setRealTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
      
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (!error && data && data.length > 0) {
          setRealTestimonials(data);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:testimonials:section')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, (payload) => {
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const displayTestimonials = realTestimonials.length > 0 ? realTestimonials : fallbackTestimonials;

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Client Success"
            title="Trusted by industry leaders."
            align="center"
            className="mb-16"
          />
        </AnimateOnScroll>

        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <AnimateOnScroll key={testimonial.id || index} variants={fadeUp}>
                <Card className="h-full flex flex-col justify-between bg-[var(--color-background)] hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-8 flex flex-col h-full">
                    {/* Quote Icon */}
                    <svg className="w-8 h-8 text-[var(--color-border)] mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    
                    <p className="text-base text-[var(--color-text)] mb-8 font-medium leading-relaxed flex-grow">
                      "{testimonial.message}"
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-4 border-t border-[var(--color-border)] pt-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] font-bold">
                          {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : "C"}
                        </div>
                        <div className="flex-grow">
                          <div className="font-bold text-[var(--color-text)] text-sm">{testimonial.name}</div>
                          {testimonial.company && (
                            <div className="text-xs text-[var(--color-muted)] font-medium">{testimonial.company}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
