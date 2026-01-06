"use client";
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