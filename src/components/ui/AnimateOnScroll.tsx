"use client";

import * as React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimateOnScroll({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
}: AnimateOnScrollProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  // If there's a custom delay, we need to inject it into the visible variant's transition
  const modifiedVariants = React.useMemo(() => {
    if (!delay || !variants.visible) return variants;

    return {
      ...variants,
      visible: {
        ...(variants.visible as object),
        transition: {
          ...(variants.visible as any).transition,
          delay,
        },
      },
    };
  }, [variants, delay]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={modifiedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
