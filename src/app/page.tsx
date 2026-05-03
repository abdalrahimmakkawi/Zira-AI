import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import ContactForm from "@/components/landing/ContactForm";

export default function Home() {
  return (
    <main className="bg-indigo-950">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <ContactForm />
      <footer className="py-10 px-6 border-t border-indigo-800/30 bg-indigo-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl text-white">Zira<span className="text-indigo-400">.</span>AI</div>
          <p className="text-indigo-500 text-sm font-light">© {new Date().getFullYear()} Zira AI · Solo AI Consulting</p>
          <div className="flex gap-6 text-sm text-indigo-400">
            <a href="mailto:hello@zira.ai" className="hover:text-white transition-colors">hello@zira.ai</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
