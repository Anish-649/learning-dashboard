"use client";

import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Course } from "@/types";

// Map icon names to accent colors
const colorMap: Record<string, { bg: string; text: string; bar: string }> = {
  Code: { bg: "rgba(0,212,255,0.1)", text: "#00d4ff", bar: "#00d4ff" },
  Database: { bg: "rgba(124,58,237,0.1)", text: "#7c3aed", bar: "#7c3aed" },
  Globe: { bg: "rgba(16,185,129,0.1)", text: "#10b981", bar: "#10b981" },
  Cpu: { bg: "rgba(245,158,11,0.1)", text: "#f59e0b", bar: "#f59e0b" },
  BookOpen: { bg: "rgba(244,63,94,0.1)", text: "#f43f5e", bar: "#f43f5e" },
};

function getColors(iconName: string) {
  const key = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  return (
    colorMap[key] ?? { bg: "rgba(0,212,255,0.1)", text: "#00d4ff", bar: "#00d4ff" }
  );
}

interface CourseTileProps {
  course: Course;
  index: number;
}

export function CourseTile({ course, index }: CourseTileProps) {
  const colors = getColors(course.icon_name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-2xl bg-bg-card border border-border-subtle p-5 overflow-hidden group transition-[border-color,box-shadow] duration-300 noise"
      style={{
        ["--hover-border" as string]: `${colors.text}44`,
      }}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, ${colors.bg} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: colors.bg }}
        >
          <DynamicIcon
            name={course.icon_name}
            className="w-5 h-5"
            style={{ color: colors.text }}
          />
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display font-semibold text-base leading-snug text-white/90 group-hover:text-white transition-colors">
            {course.title}
          </h3>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/40">Progress</span>
            <span
              className="text-xs font-mono font-medium"
              style={{ color: colors.text }}
            >
              {course.progress}%
            </span>
          </div>
          <ProgressBar value={course.progress} color={colors.bar} />
        </div>
      </div>
    </motion.article>
  );
}
