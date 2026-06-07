"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/BentoCard";
import { Activity } from "lucide-react";

// Generate mock activity data for last 12 weeks
function generateActivity() {
  const days: { count: number; date: string }[] = [];
  const now = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().split("T")[0],
      count: Math.random() > 0.4 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  return days;
}

const activityData = generateActivity();

function getColor(count: number) {
  if (count === 0) return "bg-white/04";
  if (count === 1) return "bg-accent-cyan/20";
  if (count === 2) return "bg-accent-cyan/40";
  if (count === 3) return "bg-accent-cyan/60";
  return "bg-accent-cyan/90";
}

export function ActivityTile({ index = 3 }: { index?: number }) {
  const totalSessions = activityData.reduce((sum, d) => sum + d.count, 0);

  return (
    <BentoCard className="h-full min-h-[280px]" glowColor="emerald" index={index}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent-emerald" />
            <span className="font-display text-sm font-semibold text-white/70">
              Activity
            </span>
          </div>
          <span className="font-mono text-xs text-white/30">
            {totalSessions} sessions
          </span>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-0.5 flex-wrap">
          {activityData.map((day, i) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.003,
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-all duration-200 hover:scale-125`}
              title={`${day.date}: ${day.count} sessions`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className="text-xs text-white/30">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getColor(level)}`}
            />
          ))}
          <span className="text-xs text-white/30">More</span>
        </div>
      </div>
    </BentoCard>
  );
}
