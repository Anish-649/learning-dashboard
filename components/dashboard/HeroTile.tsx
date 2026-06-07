"use client";

import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

interface HeroTileProps {
  name: string;
  streak: number;
  index?: number;
}

export function HeroTile({ name, streak, index = 0 }: HeroTileProps) {
  const hours = new Date().getHours();
  const greeting =
    hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening";

  return (
    <BentoCard className="h-48 md:h-52" glowColor="violet" index={index}>
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Decorative circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-accent-violet/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-accent-cyan/08"
      />

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Top: greeting */}
        <div>
          <p className="text-white/50 text-sm font-body mb-1">{greeting}</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
              {name}
            </span>
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Bottom: streak */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-4 py-2"
          >
            <Flame className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-xl font-display font-bold">{streak}</p>
              <p className="text-[10px] text-white/40 leading-none">day streak</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-4 py-2"
          >
            <Star className="w-5 h-5 text-accent-cyan" />
            <div>
              <p className="text-xl font-display font-bold">2,450</p>
              <p className="text-[10px] text-white/40 leading-none">XP earned</p>
            </div>
          </motion.div>
        </div>
      </div>
    </BentoCard>
  );
}
