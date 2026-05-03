"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-indigo-950/90 backdrop-blur-xl border-b border-indigo-800/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-display text-2xl text-white tracking-tight">
          Zira<span className="text-indigo-400">.</span>AI
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-light text-indigo-200">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a
          href="#contact"
          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-sm font-medium text-white hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300"
        >
          Book a call
        </a>
      </div>
    </motion.nav>
  );
}
