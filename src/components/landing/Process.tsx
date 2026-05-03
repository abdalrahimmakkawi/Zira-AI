"use client";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Free AI Audit", desc: "30-min call. I map your business against AI opportunities and give honest feedback — no pitch." },
  { num: "02", title: "Scoped Proposal", desc: "Clear scope, fixed price, defined timeline. No hourly billing surprises." },
  { num: "03", title: "Build & Deploy", desc: "Fast execution with modern AI tooling. You get updates throughout — not a black-box handoff." },
  { num: "04", title: "Handoff & Support", desc: "Full docs, team training, and 30 days of support included. Retainer available after." },
];

export default function Process() {
  return (
    <section id="process" className="py-28 px-6 bg-gradient-to-b from-indigo-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs font-medium tracking-widest text-indigo-400 uppercase mb-3">How it works</p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Simple. Fast. No fluff.</h2>
          <p className="text-indigo-300 font-light text-lg">Four steps from first conversation to live results.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-indigo-900/20 border border-indigo-800/30 rounded-2xl p-8">
              <div className="font-display text-6xl text-violet-500/30 mb-4 leading-none">{step.num}</div>
              <h3 className="font-display text-xl text-white mb-3">{step.title}</h3>
              <p className="text-indigo-300 font-light text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
