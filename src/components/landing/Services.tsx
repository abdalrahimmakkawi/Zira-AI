"use client";
import { motion } from "framer-motion";
import { Zap, Code2, Rocket } from "lucide-react";

const services = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: "AI Strategy & Advisory",
    description: "A clear picture of where AI can move the needle in your business — and a roadmap to get there without wasted budget.",
    price: "From $200 / session",
    includes: ["AI opportunity audit", "Prioritized roadmap", "Tool recommendations"],
  },
  {
    icon: <Code2 className="w-7 h-7" />,
    title: "AI Implementation",
    description: "I set up and deploy AI tools, automations, and workflows inside your existing operations — so your team actually uses them.",
    price: "From $500 / project",
    includes: ["Workflow automation", "Tool integration", "Team training"],
  },
  {
    icon: <Rocket className="w-7 h-7" />,
    title: "Custom AI Products",
    description: "Bespoke AI-powered applications built from scratch — internal tools, client-facing platforms, or autonomous agent systems.",
    price: "From $2,000 / build",
    includes: ["Full-stack app build", "AI agent integration", "30-day support"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-indigo-950/60">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs font-medium tracking-widest text-indigo-400 uppercase mb-3">What I do</p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Services</h2>
          <p className="text-indigo-300 font-light text-lg max-w-md mx-auto">Three ways I make AI work for your business.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-8 hover:bg-indigo-900/40 hover:border-indigo-700/50 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="text-violet-400 mb-6">{svc.icon}</div>
              <h3 className="font-display text-xl text-white mb-3">{svc.title}</h3>
              <p className="text-indigo-200 font-light text-sm mb-6 leading-relaxed">{svc.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {svc.includes.map((item) => (
                  <span key={item} className="text-xs px-3 py-1 bg-indigo-800/40 text-indigo-300 rounded-full">{item}</span>
                ))}
              </div>
              <div className="inline-block px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm font-medium text-violet-300">
                {svc.price}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 bg-indigo-900/20 border border-indigo-800/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-medium tracking-widest text-violet-400 uppercase">Optional Add-on</span>
            <p className="text-white font-display text-lg mt-1">Monthly Retainer — $300–$800 / month</p>
          </div>
          <p className="text-indigo-300 font-light text-sm text-center md:text-right">Ongoing support, priority access, and continuous improvements.</p>
        </motion.div>
      </div>
    </section>
  );
}
