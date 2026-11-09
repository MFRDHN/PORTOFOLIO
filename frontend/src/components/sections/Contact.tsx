"use client";
import { motion } from "framer-motion";
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";
import FloatingDecor from "@/components/effects/FloatingDecor";
import Magnetic from "@/components/effects/Magnetic";
import { easeOutExpo, staggerContainer, fadeInUp } from "@/lib/animations";

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0a0a0a] text-white pt-32 md:pt-40 pb-12 overflow-hidden">
      <FloatingDecor />
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">
        <div className="relative mb-32 md:mb-40">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase mb-10 block text-center md:text-left"
          >
            [ 03 . Get in Touch ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.93, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="font-monument text-4xl sm:text-5xl md:text-[9vw] leading-[0.85] uppercase text-center md:text-left break-words"
          >
            Let&apos;s create <br />
            <span className="text-red-600">something</span> <br />
            Great.
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-16 border-t border-white/10 pt-16 mb-20"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="font-monument text-[10px] text-white/40 uppercase tracking-widest">Socials</h4>
            <div className="flex flex-col gap-4">
              <SocialLink href="https://www.instagram.com/_mf.ramadhan_?igsh=MW9lbTI2OWp1aDU0dg==" label="Instagram" icon={<FaInstagram />} />
              <SocialLink href="https://www.linkedin.com/in/m-fajri-ramadhan-919058373/" label="LinkedIn" icon={<FaLinkedin />} />
              <SocialLink href="https://github.com/MFRDHN" label="GitHub" icon={<FaGithub />} />
              <SocialLink href="https://wa.me/6282173774337?text=Halo%20Fajri,%20aku%20melihat%20portfolio%20kamu." label="WhatsApp" icon={<FaWhatsapp />} />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="font-monument text-[10px] text-white/40 uppercase tracking-widest">Contact Details</h4>
            <div className="space-y-4">
              <a href="mailto:gimmortal357@gmail.com" className="block font-monument text-xs sm:text-sm break-all hover:text-red-600 transition-colors duration-300">
                gimmortal357@gmail.com
              </a>
              <p className="text-white/40 font-mono text-xs uppercase leading-loose">
                Jonggol, West Java, Indonesia <br />
                Available for remote projects
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-8 md:text-right">
            <div>
              <h4 className="font-monument text-[10px] text-white/40 uppercase tracking-widest mb-3">Availability</h4>
              <p className="flex items-center gap-2 md:justify-end font-monument text-sm text-white uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open for projects
              </p>
              <p className="mt-3 font-mono text-[10px] text-white/30 uppercase tracking-widest">
                Usually replies within 24 hours
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a
                href="mailto:gimmortal357@gmail.com?subject=Project%20Inquiry"
                className="px-6 py-4 bg-red-600 rounded-full font-monument text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Start a Project
              </a>
              <Magnetic strength={0.2}>
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Back to top"
                  className="p-5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  <FaArrowUp />
                </motion.button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 text-white/20 font-mono text-[9px] uppercase tracking-[0.3em]"
        >
          <p>&copy; 2026 M. Fajri Ramadhan. All rights reserved.</p>
          <p>Built with Next.js</p>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Magnetic strength={0.15}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: 6 }}
        className="group flex items-center gap-4 text-white/60 hover:text-red-600 transition-all duration-300 font-monument text-xs uppercase tracking-widest"
      >
        <span className="text-lg group-hover:rotate-12 transition-transform duration-300">{icon}</span>
        {label}
      </motion.a>
    </Magnetic>
  );
}