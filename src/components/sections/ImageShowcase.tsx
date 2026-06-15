"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { fadeUp } from "@/lib/animations";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const SHOWCASE_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    title: "Collaborative Planning",
    description: "We work closely with your team to align on strategy and establish clear, actionable project milestones."
  },
  {
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    title: "Agile Development",
    description: "Our engineers build scalable architectures using rapid iteration and modern, future-proof technologies."
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    title: "Design Workshops",
    description: "Creating intuitive interfaces through user-centric design workshops and comprehensive wireframing."
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    title: "Data-Driven Decisions",
    description: "Analyzing performance metrics to continuously optimize and scale your digital products."
  }
];

export function ImageShowcase() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // 3-second interval for sliding images
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SHOWCASE_SLIDES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-8 lg:pt-10 pb-12 lg:pb-16 bg-[var(--color-background)]" id="about">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Company Details */}
          <AnimateOnScroll variants={fadeUp} delay={0.1} className="flex flex-col justify-center pr-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-4 shadow-sm w-max">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
              <span className="text-[10px] font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                About Us
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-primary)] mb-4 leading-tight flex flex-wrap gap-x-2">
              {"Building the future of digital products.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-sm text-[var(--color-primary)]/80 font-medium leading-relaxed"
              >
                We are a dedicated team of digital craftsmen passionate about building scalable, high-performance software. Our mission is to transform complex business challenges into elegant, intuitive digital solutions.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm text-[var(--color-primary)]/80 font-medium leading-relaxed"
              >
                With years of experience across various industries, we combine cutting-edge technology with human-centric design. We don't just write code; we partner with you to understand your goals and deliver products that drive real growth and efficiency for your enterprise.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-6 items-center border-t border-[var(--color-border)] mt-8 pt-6"
            >
               <div className="flex flex-col">
                  <AnimatedCounter to={10} suffix="+" className="text-2xl font-extrabold text-[var(--color-primary)]" />
                  <span className="text-[10px] text-[var(--color-primary)]/70 uppercase tracking-widest font-bold mt-1">Years Experience</span>
               </div>
               <div className="w-px h-8 bg-[var(--color-border)]"></div>
               <div className="flex flex-col">
                  <AnimatedCounter to={150} suffix="+" duration={2.5} className="text-2xl font-extrabold text-[var(--color-primary)]" />
                  <span className="text-[10px] text-[var(--color-primary)]/70 uppercase tracking-widest font-bold mt-1">Projects Delivered</span>
               </div>
            </motion.div>
          </AnimateOnScroll>

          {/* Right Side: Interactive Showcase Card */}
          <div className="[perspective:1000px] w-full relative">
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: -3, rotateX: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full relative rounded-2xl border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)] flex flex-col overflow-hidden"
            >
              {/* Top part: Smaller Image */}
              <div className="w-full h-56 md:h-64 relative bg-slate-900 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.img 
                    key={currentSlideIndex}
                    src={SHOWCASE_SLIDES[currentSlideIndex].image} 
                    alt={SHOWCASE_SLIDES[currentSlideIndex].title} 
                    initial={{ opacity: 0, scale: 1.1, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/20 to-transparent pointer-events-none z-10"></div>
              </div>

              {/* Bottom part: Dynamic Details */}
              <div className="p-6 md:p-8 relative min-h-[160px] flex flex-col justify-center bg-[var(--color-surface)] z-20 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    className="flex flex-col pr-12"
                  >
                    <motion.h3 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-2"
                    >
                      {SHOWCASE_SLIDES[currentSlideIndex].title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                      className="text-xs md:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3"
                    >
                      {SHOWCASE_SLIDES[currentSlideIndex].description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>

                {/* Slide indicators moved to the bottom right of the text area */}
                <div className="absolute bottom-6 right-6 md:right-8 flex gap-2">
                  {SHOWCASE_SLIDES.map((_, index) => (
                    <div 
                      key={index} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === currentSlideIndex ? "w-6 bg-[var(--color-primary)]" : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-primary)]/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
