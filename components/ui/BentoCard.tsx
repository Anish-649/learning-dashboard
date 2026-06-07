"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  index?: number;
}

const glowMap = {
  cyan: "hover:shadow-[0_0_30px_rgba(0,212,255,0.15),0_0_1px_rgba(0,212,255,0.3)]",
  violet:
    "hover:shadow-[0_0_30px_rgba(124,58,237,0.2),0_0_1px_rgba(124,58,237,0.4)]",
  emerald:
    "hover:shadow-[0_0_30px_rgba(16,185,129,0.15),0_0_1px_rgba(16,185,129,0.3)]",
  amber:
    "hover:shadow-[0_0_30px_rgba(245,158,11,0.15),0_0_1px_rgba(245,158,11,0.3)]",
  rose: "hover:shadow-[0_0_30px_rgba(244,63,94,0.15),0_0_1px_rgba(244,63,94,0.3)]",
};

const borderGlowMap = {
  cyan: "hover:border-accent-cyan/30",
  violet: "hover:border-accent-violet/40",
  emerald: "hover:border-accent-emerald/30",
  amber: "hover:border-accent-amber/30",
  rose: "hover:border-accent-rose/30",
};

export function BentoCard({
  children,
  className,
  glowColor = "cyan",
  index = 0,
}: BentoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={cn(
        "relative rounded-2xl bg-bg-card border border-border-subtle",
        "transition-[border-color,box-shadow] duration-300",
        "overflow-hidden noise",
        glowMap[glowColor],
        borderGlowMap[glowColor],
        className
      )}
    >
      {children}
    </motion.article>
  );
}
