"use client";

import { motion } from "framer-motion";

export function AnimatedLine() {
  return (
    <div className="w-full relative py-2 flex items-center overflow-hidden pointer-events-none">
      {/* Base track */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[var(--color-border)]/50" />
      
      {/* Moving Technical Beam (Left to Right) */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 flex items-center h-[2px] w-1/3 md:w-1/4"
        animate={{
          left: ["-30%", "130%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Tail gradient */}
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-[var(--color-primary)] opacity-70" />
        {/* Head Glowing Dot */}
        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_2px_var(--color-primary)] flex-shrink-0 -ml-1 z-10" />
      </motion.div>

      {/* Moving Technical Beam (Right to Left) */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 flex items-center flex-row-reverse h-[2px] w-1/4 md:w-1/5"
        animate={{
          right: ["-30%", "130%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: 1.5
        }}
      >
        {/* Tail gradient */}
        <div className="w-full h-full bg-gradient-to-l from-transparent via-[var(--color-accent)] to-[var(--color-accent)] opacity-60" />
        {/* Head Glowing Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_1px_var(--color-accent)] flex-shrink-0 -mr-1 z-10" />
      </motion.div>

      {/* Occasional data packets (fast short burst) */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 flex items-center h-[1px] w-12"
        animate={{
          left: ["-10%", "110%"]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
          repeatDelay: 3
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent to-[var(--color-primary)] opacity-90" />
        <div className="w-[3px] h-[3px] bg-white rounded-full flex-shrink-0" />
      </motion.div>
    </div>
  );
}
