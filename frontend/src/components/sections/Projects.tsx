"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { FiArrowUpRight } from "react-icons/fi";
import { easeOutExpo } from "@/lib/animations";

const aspectClasses = [
  "aspect-[16/10]",
  "aspect-[4/3]",
  "aspect-[3/2]",
  "aspect-[4/3]",
];

export default function Projects({ projects, showCta = true }: { projects: Project[]; showCta?: boolean }) {
  return (
    <section
      id="projects"
      className="relative min-h-screen bg-[#020202] pt-20 md:pt-28 pb-40 md:pb-52 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#950101]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#3e0000]/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute whitespace-nowrap text-[10vh] md:text-[14vh] font-monument uppercase text-white/[0.03] pointer-events-none z-0 top-1/2 -translate-y-1/2"
      >
        <span>M.Fajri Ramadhan 2026 — Projects — Development — Design — Archived Works —&nbsp;</span>
        <span>M.Fajri Ramadhan 2026 — Projects — Development — Design — Archived Works —&nbsp;</span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-red-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-4 block"
          >
            (02) SELECTED
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
            className="font-monument text-4xl sm:text-5xl md:text-7xl text-white uppercase leading-tight tracking-tight"
          >
            Archived
            <br />
            <span className="text-red-600 italic">Works</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
          className="max-w-xs font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 md:text-right leading-relaxed"
        >
          A visual index of {projects.length.toString().padStart(2, "0")} selected
          builds — open any frame to read the case.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto columns-1 sm:columns-2 gap-4 md:gap-5">
        {projects.length === 0 && (
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            No projects published yet.
          </p>
        )}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: (index % 2) * 0.08 }}
            className="mb-4 md:mb-5 break-inside-avoid"
          >
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — ${project.category}`}
              className={`group relative block overflow-hidden rounded-[20px] border border-white/5 bg-[#080808] transition-colors duration-500 hover:border-red-600/40 ${
                aspectClasses[index % aspectClasses.length]
              }`}
            >
              <Image
                src={project.cover || project.images?.[0] || ""}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 560px"
                className="object-cover grayscale-[60%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply" />

              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                <span className="rounded-md border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-red-500 backdrop-blur-md">
                  0{index + 1}
                </span>
                <span className="rounded-md border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-500/80 mb-2">
                    Archived Build · 0{index + 1}
                  </p>
                  <h3 className="font-monument text-xl md:text-3xl text-white uppercase leading-[0.95] tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/40 line-clamp-1">
                    {project.technologies.join(" / ")}
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/60 backdrop-blur-md group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500">
                  <FiArrowUpRight />
                </span>
              </div>

              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-red-600/80 transition-transform duration-700 group-hover:scale-x-100" />
            </Link>
          </motion.div>
        ))}
      </div>

      {showCta && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.3 }}
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
      )}
    </section>
  );
}
