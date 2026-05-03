"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function FloatingPaths() {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5} -${189 + i * 6}C-${380 - i * 5} -${189 + i * 6} -${312 - i * 5} ${216 - i * 6} ${152 - i * 5} ${343 - i * 6}C${616 - i * 5} ${470 - i * 6} ${684 - i * 5} ${875 - i * 6} ${684 - i * 5} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <svg className="w-full h-full text-indigo-400" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
            transition={{ duration: 20 + path.id * 0.5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

function StatCounter({ end, label }: { end: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseInt(end.replace(/\D/g, ""));
    const steps = 60;
    const increment = numeric / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center">
      <div className="text-4xl md:text-5xl font-display text-white mb-1">
        {count}{end.includes("+") ? "+" : end.includes("%") ? "%" : ""}
        {end.includes("h") ? "h" : ""}
      </div>
      <div className="text-sm text-indigo-300 font-light">{label}</div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 overflow-hidden">
      <FloatingPaths />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-900/50 backdrop-blur-sm border border-indigo-700/50 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-light text-indigo-200">Available for new clients</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-6 leading-tight tracking-tight">
          Turn AI into your{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            sharpest advantage
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-indigo-200 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          Strategy, implementation, and custom AI products — built for small businesses ready to move faster than everyone else.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <a href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-950 rounded-full font-medium hover:shadow-xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
            Book a free audit <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-500/50 rounded-full font-light text-white hover:bg-indigo-900/30 transition-all duration-300">
            See services
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <StatCounter end="3+" label="Projects Shipped" />
          <StatCounter end="48h" label="Response Time" />
          <StatCounter end="100%" label="Remote Friendly" />
        </motion.div>
      </div>
    </section>
  );
}
