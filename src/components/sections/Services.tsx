"use client";

import { useState, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Code2, Smartphone, Layout, Cloud, Bot, Palette, Check } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Custom Software",
    description: "We build software that actually works the way your team does. No bloated features, just tools designed to fix your specific bottlenecks.",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Web Development",
    description: "Fast, reliable websites built with modern tools. We focus on clean code so your site stays quick and doesn't break.",
    icon: Layout,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mobile App Development",
    description: "Apps that your customers will actually enjoy using, whether they're on an iPhone or an Android.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "UI/UX Design",
    description: "We design interfaces that make sense. If your users need a manual to figure out your software, we haven't done our job.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cloud Solutions",
    description: "We set up your servers and infrastructure so they don't crash when you finally get that big spike in traffic.",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI & Automation",
    description: "We write scripts to handle the boring, repetitive tasks so your team can focus on the real work.",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function Services() {
  const [activeService, setActiveService] = useState(services[0]);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} id="services" className="relative pt-8 lg:pt-10 pb-12 lg:pb-16 bg-[var(--color-background)] overflow-hidden">
      {/* Animated Parallax Background Elements */}
      <motion.div 
        style={{ y: yParallax }} 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-surface)] rounded-full blur-[100px] opacity-50 pointer-events-none -mr-40 -mt-40 z-0"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]) }} 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[120px] opacity-5 pointer-events-none -ml-40 -mb-40 z-0"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Details */}
          <div className="flex flex-col gap-8">
            <AnimateOnScroll className="flex flex-col items-start text-left">
              <SectionHeading
                eyebrow="Our Services"
                title="What we do best"
                description="We don't just write code; we solve complex problems. We build custom software solutions tailored perfectly to your unique business bottlenecks. Our team of expert developers, designers, and strategists work closely with you from concept to deployment. Whether you need a sleek mobile app, a robust web platform, or intelligent AI automation, we have the skills and the track record to deliver excellence."
                align="left"
              />
              <div className="mt-8 flex flex-col gap-5">
                {[
                  "Tailored, custom solutions",
                  "End-to-end development cycle",
                  "Focus on scalable architecture",
                  "User-centric UI/UX design"
                ].map((point, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shadow-sm group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-300 relative overflow-hidden">
                      {/* Animated border effect on hover for list items */}
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-accent)_360deg)] animate-[spin_2s_linear_infinite] opacity-0 group-hover:opacity-100"></div>
                      <div className="relative z-10 w-2 h-2 rounded-full bg-[var(--color-accent)] group-hover:bg-white transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-[var(--color-primary)]">{point}</span>
                  </motion.div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Cards & Orbit */}
          <div className="flex flex-col">
            
            {/* Mobile Grid View (Hidden on large screens) */}
            <AnimateOnScroll variants={staggerContainer} className="lg:hidden">
              <div className="grid sm:grid-cols-2 gap-6">
                {services.map((service) => (
                  <AnimateOnScroll key={service.title} variants={fadeUp}>
                    <Card className="h-full group relative overflow-hidden border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-all duration-700 ease-in-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/90 to-[var(--color-surface)]/60"></div>
                      </div>
                      <CardHeader className="relative z-10 pt-8">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-500">
                          <service.icon className="w-6 h-6 text-[var(--color-accent)] group-hover:text-white transition-colors duration-500" />
                        </div>
                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 pb-8">
                        <CardDescription className="text-sm leading-relaxed text-[var(--color-muted)] group-hover:text-[var(--color-primary)]/80 transition-colors duration-300">
                          {service.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Desktop Orbital View (Hidden on mobile) */}
            <div className="hidden lg:flex justify-center items-center py-20 relative min-h-[600px]">
              
              {/* Central Information Hub with Colorful Animated Border */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full z-20 transition-all duration-500 group cursor-pointer hover:scale-105 flex items-center justify-center">
                {/* Spinning colorful gradient background */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,#ff0080,#7928ca,#ff0080)] animate-[spin_4s_linear_infinite]"></div>
                
                {/* Inner Content Area */}
                <div className="absolute inset-1 rounded-full bg-[var(--color-surface)] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 z-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                     <AnimatePresence mode="popLayout">
                       <motion.img 
                         key={activeService.title} 
                         src={activeService.image} 
                         alt={activeService.title} 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="w-full h-full object-cover" 
                       />
                     </AnimatePresence>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeService.title}
                      className="relative z-10 flex flex-col items-center w-full"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="w-14 h-14 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center mb-3 shadow-sm"
                      >
                        <activeService.icon className="w-7 h-7 text-[#ff0080]" />
                      </motion.div>
                      
                      <motion.h3 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-lg font-bold mb-2 text-[var(--color-primary)]"
                      >
                        {activeService.title}
                      </motion.h3>
                      
                      <motion.p 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                        className="text-xs text-[var(--color-muted)] leading-relaxed"
                      >
                        {activeService.description}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Orbiting Track */}
              <div className="relative w-[500px] h-[500px] rounded-full border border-dashed border-[var(--color-border)] animate-spin-slow group z-10 hover:border-solid transition-all duration-500">
                {services.map((service, index) => {
                   const angle = index * 60;
                   return (
                     <div 
                       key={service.title}
                       className="absolute top-1/2 left-1/2 w-0 h-0"
                       style={{ transform: `rotate(${angle}deg) translateY(-250px)` }}
                     >
                       <div style={{ transform: `rotate(-${angle}deg)` }}>
                         <div 
                           className="w-28 h-28 -ml-14 -mt-14 animate-spin-slow-reverse group-hover:[animation-play-state:paused]"
                           onMouseEnter={() => setActiveService(service)}
                         >
                            <div className={`w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden ${
                              activeService.title === service.title 
                                ? 'bg-[var(--color-primary)] border-[var(--color-primary)] scale-110 z-30 shadow-2xl' 
                                : 'bg-[var(--color-surface)] border-transparent z-20'
                            }`}>
                               {/* Animated Gradient Border for Orbit Nodes */}
                               {activeService.title !== service.title && (
                                 <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#7928ca,#ff0080,#7928ca)] animate-[spin_3s_linear_infinite] opacity-50 group-hover:opacity-100"></div>
                               )}
                               <div className={`absolute ${activeService.title !== service.title ? 'inset-[2px] bg-[var(--color-surface)]' : 'inset-0 bg-transparent'} rounded-[14px] z-0 transition-colors duration-500`}></div>
                               
                               <div className="relative z-10 flex flex-col items-center px-2">
                                 <service.icon className={`w-6 h-6 mb-2 transition-colors duration-500 ${
                                   activeService.title === service.title ? 'text-[var(--color-background)]' : 'text-[#ff0080]'
                                 }`} />
                                 <span className={`text-[10px] font-bold text-center leading-tight transition-colors duration-500 ${
                                   activeService.title === service.title ? 'text-[var(--color-background)]' : 'text-[var(--color-primary)]'
                                 }`}>
                                   {service.title}
                                 </span>
                               </div>
                            </div>
                         </div>
                       </div>
                     </div>
                   );
                })}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
