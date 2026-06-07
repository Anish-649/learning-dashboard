"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Hours This Week", value: "12.4", unit: "hrs", icon: Clock, color: "text-accent-cyan" },
  { label: "Courses Active", value: "4", unit: "", icon: BookOpen, color: "text-accent-violet" },
  { label: "Goals Hit", value: "87", unit: "%", icon: Target, color: "text-accent-emerald" },
  { label: "Weekly Growth", value: "+23", unit: "%", icon: TrendingUp, color: "text-accent-amber" },
];

export function StatsRow({ index = 1 }: { index?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 h-full">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: (index + i * 0.05) * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="relative rounded-2xl bg-bg-card border border-border-subtle p-4 overflow-hidden group transition-[border-color] duration-300 hover:border-white/15 noise"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-8 h-8 rounded-lg bg-white/05 flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold">
              {stat.value}
              <span className="text-sm font-normal text-white/40 ml-0.5">
                {stat.unit}
              </span>
            </p>
            <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
