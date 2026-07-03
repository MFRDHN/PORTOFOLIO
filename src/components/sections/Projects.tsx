"use client";
<<<<<<< HEAD
import { motion } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen bg-[#020202] py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#950101]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#3e0000]/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Background scrolling text */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute whitespace-nowrap text-[10vh] md:text-[14vh] font-monument uppercase text-white/[0.03] pointer-events-none z-0 top-1/2 -translate-y-1/2"
      >
        <span>M.Fajri Ramadhan 2026 — Projects — Development — Design — Archived Works —&nbsp;</span>
        <span>M.Fajri Ramadhan 2026 — Projects — Development — Design — Archived Works —&nbsp;</span>
      </motion.div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-14 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-red-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-4 block"
        >
          (02) SELECTED
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-monument text-5xl md:text-7xl text-white uppercase leading-tight tracking-tight"
        >
          Archived<br />
          <span className="text-red-600 italic">Works</span>
        </motion.h2>
      </div>

      {/* Project Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {projectsData.slice(0, 4).map((project, index) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.97 }}
            className="group relative"
          >
            {/* Number Badge */}
            <div className="absolute -top-3 left-5 z-20 flex items-center gap-3">
              <span className="font-mono text-[10px] text-red-600 uppercase tracking-widest bg-[#020202] px-2.5 py-1 rounded-md border border-white/5">
                0{index + 1}
              </span>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest hidden sm:block">
                / {project.category}
              </span>
            </div>

            {/* Card */}
            <div className="relative h-[280px] md:h-[360px] overflow-hidden rounded-[20px] bg-[#080808] border border-white/5 transition-all duration-500 group-hover:border-red-600/50 group-hover:shadow-[0_0_60px_rgba(149,1,1,0.12)]">
              {/* Image */}
              <div className="absolute inset-0">
                <motion.img
                  src={project.images ? project.images[0] : (project as any).img}
                  className="w-full h-full object-cover"
                  alt={project.title}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <div className="mb-1.5 flex items-center gap-2 md:hidden">
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-monument text-xl md:text-2xl text-white uppercase leading-none mb-4">
                  {project.title}
                </h3>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl font-monument text-[8px] text-white uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all duration-300 backdrop-blur-md"
                  >
                    View Case <FiArrowUpRight className="text-xs" />
                  </Link>
                  {project.repoUrl && project.repoUrl !== "#" && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-white/10 rounded-xl text-white/50 hover:text-red-600 hover:border-red-600/50 transition-all duration-300 backdrop-blur-md"
                    >
                      <FiGithub className="text-base" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Hover Line */}
            <motion.div
              className="absolute -bottom-3 left-6 right-6 h-[2px] bg-red-600/80 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
            />
          </motion.div>
        ))}
      </div>

      {/* End of Archive CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 max-w-6xl mx-auto mt-12 md:mt-16 text-center"
      >
        <Link href="/projects" className="group inline-flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] group-hover:text-red-600 transition-colors duration-300">
            End of Archive
          </span>
          <span className="font-monument text-lg md:text-xl text-white/30 group-hover:text-white transition-colors duration-300 uppercase">
            Load More Experience
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-red-600 text-xl"
          >
            ↓
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
=======
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  
  if (!isMounted) return <section className="h-[500vh] bg-[#020202]" />;
  
  return <HorizontalScrollContent />;
}

function HorizontalScrollContent() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]), 
    { stiffness: 40, damping: 20 }
  );

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#020202]">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#020202]">
        
        {/* Glow Gradasi Crimson */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#950101]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#3e0000]/20 blur-[100px] rounded-full" />

        <motion.div 
          style={{ x: bgTextX }}
          className="absolute whitespace-nowrap text-[12vh] font-monument uppercase text-white/[0.03] pointer-events-none z-0"
        >
          <span>M.Fajri Ramadhan 2026 — Projects — Development — Design — Archived Works — </span>
          <span>M.Fajri Ramadhan 2026 — Projects — Development — Design — Archived Works — </span>
        </motion.div>

        {/* --- MAIN CONTENT LAYER --- */}
        <motion.div style={{ x }} className="flex gap-[6vw] px-[8vw] items-center relative z-10">
          
          {/* INTRO TITLE  */}
          <div className="flex-shrink-0 w-[350px] md:w-[500px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-4 block">
                (02) SELECTED
              </span>
              <h2 className="font-monument text-4xl md:text-6xl text-white uppercase leading-tight tracking-tight">
                Archived<br />
                <span className="text-red-600 italic">Works</span>
              </h2>
              <div className="w-12 h-[1px] bg-white/20 mt-8" />
            </motion.div>
          </div>

          {/* PROJECT CARDS */}
          {projectsData.slice(0, 4).map((project, index) => (
            <div key={project.id} className="flex-shrink-0 relative group">
              
              {/* Label */}
              <div className="absolute -top-8 left-2 flex items-center gap-3">
                <span className="font-mono text-[9px] text-red-600 uppercase tracking-widest">0{index + 1}</span>
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">/ Project Case</span>
              </div>

              {/* Box Kartu */}
              <div className="h-[450px] w-[350px] md:h-[550px] md:w-[450px] overflow-hidden rounded-[24px] bg-[#080808] border border-white/5 relative transition-all duration-500 group-hover:border-red-600/50 group-hover:shadow-[0_0_40px_rgba(149,1,1,0.1)]">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1 }}
                  src={project.images ? project.images[0] : (project as any).img} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700" 
                  alt={project.title}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                  <span className="text-red-600 font-mono text-[8px] tracking-widest uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-monument text-2xl md:text-3xl text-white uppercase leading-none mb-6">
                    {project.title}
                  </h3>
                  
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="inline-flex items-center justify-center w-full py-4 bg-white/5 border border-white/10 rounded-xl font-monument text-[9px] text-white uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all duration-300 backdrop-blur-md"
                  >
                    View Case
                  </Link>
                </div>
              </div>
              <motion.div 
                className="absolute -bottom-4 left-0 h-[2px] bg-red-600 w-0 group-hover:w-full transition-all duration-700"
              />
            </div>
          ))}

          {/* CTA */}
          <div className="flex-shrink-0 w-[300px] flex flex-col items-center justify-center">
             <Link href="/projects" className="group text-center">
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-4 group-hover:text-red-600 transition-colors">End of Archive</p>
                <h4 className="font-monument text-xl text-white/40 group-hover:text-white transition-colors uppercase leading-none">
                  Load More<br />Experience
                </h4>
             </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a
