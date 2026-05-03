"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 bg-violet-950">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-indigo-900/30 backdrop-blur-xl border border-indigo-700/30 rounded-3xl p-10">
          <div className="text-center mb-8">
            <p className="text-xs font-medium tracking-widest text-indigo-400 uppercase mb-3">Get started</p>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-3">Book your free AI audit</h2>
            <p className="text-indigo-300 font-light">30 minutes. No pitch. Just honest insight.</p>
          </div>

          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-medium text-lg">Request received!</p>
              <p className="text-indigo-300 font-light text-sm mt-2">I&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input type="text" placeholder="Your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700/30 rounded-xl text-white placeholder-indigo-500 focus:outline-none focus:border-violet-500 transition-colors text-sm" />
              <input type="email" placeholder="Work email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700/30 rounded-xl text-white placeholder-indigo-500 focus:outline-none focus:border-violet-500 transition-colors text-sm" />
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700/30 rounded-xl text-indigo-300 focus:outline-none focus:border-violet-500 transition-colors text-sm appearance-none">
                <option value="">Service interested in (optional)</option>
                <option value="strategy">AI Strategy & Advisory</option>
                <option value="implementation">AI Implementation</option>
                <option value="custom">Custom AI Product</option>
                <option value="retainer">Monthly Retainer</option>
              </select>
              <textarea placeholder="Tell me about your business and what you're trying to solve (optional)" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
                className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700/30 rounded-xl text-white placeholder-indigo-500 focus:outline-none focus:border-violet-500 transition-colors text-sm resize-none" />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button onClick={handleSubmit} disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-medium text-white hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Sending..." : (<>Request my free audit <ArrowRight className="w-4 h-4" /></>)}
              </button>
              <p className="text-center text-indigo-500 text-xs">Usually responds within 24 hours. No spam, ever.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
