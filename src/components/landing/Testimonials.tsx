"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const testimonials = [
  { quote: "Our admin team was drowning in manual work. Zira AI automated our entire intake process in a week. We saved 20+ hours per month immediately.", author: "Khalid M.", role: "Operations Director, Services Firm", initials: "KM" },
  { quote: "We had no idea where to start with AI. The strategy session alone was worth it — we finally had a clear plan instead of chasing every trend.", author: "Sara A.", role: "Founder, E-commerce Brand", initials: "SA" },
  { quote: "The custom platform Zira built replaced three separate tools we were paying for. ROI was visible within the first month.", author: "Tariq N.", role: "CEO, EdTech Startup", initials: "TN" },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-slate-900 to-violet-950">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs font-medium tracking-widest text-indigo-400 uppercase mb-3">Social proof</p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Client Success</h2>
          <p className="text-indigo-300 font-light text-lg">Built for businesses that can&apos;t afford to wait.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-indigo-900/30 backdrop-blur-xl border border-indigo-700/30 rounded-2xl p-8">
              <CheckCircle2 className="w-6 h-6 text-violet-400 mb-5" />
              <p className="text-indigo-100 font-light text-base italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.author}</div>
                  <div className="text-indigo-400 text-xs font-light">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
