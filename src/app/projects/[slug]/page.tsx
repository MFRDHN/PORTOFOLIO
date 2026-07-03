"use client";
import { projectsData } from "@/data/projects";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGithub, FaArrowLeft, FaCode, FaEnvelope, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const project = projectsData.find((p) => p.slug === slug);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (!project) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-monument uppercase tracking-[0.5em]">
      Project Missing
    </div>
  );

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-red-600 overflow-x-hidden relative lg:cursor-none">
      
      {/*CUSTOM CURSOR*/}
      <motion.div 
        animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
        transition={{ type: "spring", damping: 35, stiffness: 250, mass: 0.5 }}
        className="fixed top-0 left-0 w-6 h-6 border border-red-600 rounded-full z-[999] pointer-events-none hidden lg:block mix-blend-difference"
      />

      {/* BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-red-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* NAV BAR */}
        <nav className="p-6 md:p-10 flex justify-between items-center sticky top-0 bg-black/40 backdrop-blur-xl z-50">
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-white/50 font-mono text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors"
          >

          </motion.button>
        </nav>

        {/* 3. HERO SECTION */}
        <section className="px-6 md:px-20 pt-16 md:pt-24 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.3em]">{project.category}</span>
            </div>
            
            <h1 className="font-monument text-3xl md:text-5xl lg:text-7xl uppercase leading-tight mb-10 tracking-tight max-w-5xl">
              {project.title}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <p className="text-white/70 text-lg md:text-2xl font-light leading-relaxed">
                  {project.desc}. This project is exclusively designed with meticulous attention to visual details and a modern user experience.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end items-start">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-4 py-2 border border-white/10 bg-white/[0.03] text-[9px] font-mono uppercase tracking-widest rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* FULL COLOR INFINITE SLIDER */}
        <section className="py-12 md:py-20 border-y border-white/5 overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 pr-4 md:pr-8"
          >
            {[...project.images, ...project.images].map((img, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 0.97 }}
                className="relative w-[320px] md:w-[700px] aspect-video flex-shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
              >
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-700" 
                  alt={`Project image ${i}`} 
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-6 px-6 md:px-20">
             <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em] animate-pulse">Auto-Scroll Gallery • Color Optimized</p>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="px-6 md:px-20 py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-monument text-xs uppercase tracking-widest text-white/30 mb-10">Interested in the code?</h4>
            <a 
              href={project.repoUrl} target="_blank"
              className="group relative inline-flex items-center gap-6 bg-white text-black px-12 py-6 rounded-full font-monument text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Github Repository</span>
              <FaGithub size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>
          </motion.div>
        </section>

        {/* FOOTER CARD */}
        <footer className="px-4 md:px-10 pb-10">
          <div className="bg-[#080808] rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-[-30%] right-[-10%] w-[400px] h-[400px] bg-red-600/5 blur-[120px] rounded-full transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] text-red-600 tracking-[0.5em] uppercase mb-8">— Contact</p>
                <h2 className="font-monument text-3xl md:text-6xl uppercase leading-[1.1]">
                  Let's Work <br />
                  <span className="text-white/20 hover:text-red-600 transition-colors duration-700 cursor-pointer">Together</span>
                </h2>
              </div>
              
              <div className="flex gap-4 md:gap-6">
                {[
                  { icon: <FaInstagram />, link: "https://www.instagram.com/_mf.ramadhan_?igsh=MW9lbTI2OWp1aDU0dg==" },
                  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/m-fajri-ramadhan-919058373/" },
                  { icon: <FaEnvelope />, link: "mailto:muhammadfajrirmdhn27@gmail.com" }
                ].map((social, i) => (
                  <motion.a 
                    key={i} 
                    href={social.link} 
                    whileHover={{ y: -10, borderColor: "#dc2626" }}
                    className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center border border-white/10 rounded-full text-xl md:text-2xl hover:text-red-600 transition-all duration-300 bg-white/[0.02]"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-24 md:mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                <span className="font-monument text-[9px] tracking-[0.8em] uppercase text-white/40">MFRDHN</span>
                <span className="font-mono text-[9px] text-white/20 uppercase">Create at 2026</span>
              </div>
              <div className="flex gap-8 font-mono text-[9px] uppercase tracking-widest text-white/30">
                <span 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Back to Top
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}