"use client";
import { motion } from "framer-motion";
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import FloatingDecor from "@/components/effects/FloatingDecor";
<<<<<<< HEAD
import Magnetic from "@/components/effects/Magnetic";
=======
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a

export default function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0a0a0a] text-white pt-20 pb-10 overflow-hidden">
      
      <FloatingDecor />
      <div className="container relative z-10 mx-auto px-6 md:px-16">
        
        {/* BIG CTA */}
        <div className="relative mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase mb-10 block text-center md:text-left"
          >
            [ 03 . Get in Touch ]
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-monument text-5xl md:text-[9vw] leading-[0.85] uppercase text-center md:text-left break-words"
          >
            Let's create <br /> 
            <span className="text-red-600">something</span> <br />
            Great.
          </motion.h2>
        </div>

        {/* CONTACT INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/10 pt-16 mb-20">
          <div className="md:col-span-4 space-y-8">
            <h4 className="font-monument text-[10px] text-white/40 uppercase tracking-widest">Socials</h4>
            <div className="flex flex-col gap-4">
              <SocialLink href="https://www.instagram.com/_mf.ramadhan_?igsh=MW9lbTI2OWp1aDU0dg==" label="Instagram" icon={<FaInstagram />} />
              <SocialLink href="https://www.linkedin.com/in/m-fajri-ramadhan-919058373/" label="LinkedIn" icon={<FaLinkedin />} />
              <SocialLink href="https://github.com/MFRDHN" label="GitHub" icon={<FaGithub />} />
              <SocialLink href="https://wa.me/6282173774337?text=Halo%20Fajri,%20aku%20melihat%20portfolio%20kamu." label="WhatsApp" icon={<FaWhatsapp />} />
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            <h4 className="font-monument text-[10px] text-white/40 uppercase tracking-widest">Contact Details</h4>
            <div className="space-y-4">
              <a href="mailto:muhammadfajrirmdhn27@gmail.com" className="block font-monument text-sm md:text-sm hover:text-red-600 transition-colors">
                muhammadfajrirmdhn27@gmail.com
              </a>
              <p className="text-white/40 font-mono text-xs uppercase leading-loose">
                Jonggol, West Java, Indonesia <br />
                Available for remote projects
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between items-end">
            <div className="text-right">
                <h4 className="font-monument text-[10px] text-white/40 uppercase tracking-widest mb-2">Local Time</h4>
                <p className="font-monument text-2xl md:text-4xl text-white">{time} <span className="text-red-600 text-sm">WIB</span></p>
            </div>
            
<<<<<<< HEAD
            <Magnetic strength={0.2}>
              <motion.button 
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-10 p-6 bg-red-600 rounded-full text-white shadow-xl hover:bg-white hover:text-black transition-all"
              >
                <FaArrowUp />
              </motion.button>
            </Magnetic>
=======
            <motion.button 
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-10 p-6 bg-red-600 rounded-full text-white shadow-xl hover:bg-white hover:text-black transition-all"
            >
              <FaArrowUp />
            </motion.button>
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 text-white/20 font-mono text-[9px] uppercase tracking-[0.3em]">
          <p>© 2026 M. Fajri Ramadhan. All rights reserved.</p>
          <p>Built with Next.js</p>
        </div>

      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <Magnetic strength={0.15}>
      <motion.a 
        href={href}
        target="_blank"
        whileHover={{ x: 6 }}
        className="group flex items-center gap-4 text-white/60 hover:text-red-600 transition-all font-monument text-xs uppercase tracking-widest"
      >
        <span className="text-lg group-hover:rotate-12 transition-transform">{icon}</span>
        {label}
      </motion.a>
    </Magnetic>
=======
    <motion.a 
      href={href}
      target="_blank"
      whileHover={{ x: 10 }}
      className="group flex items-center gap-4 text-white/60 hover:text-red-600 transition-all font-monument text-xs uppercase tracking-widest"
    >
      <span className="text-lg group-hover:rotate-12 transition-transform">{icon}</span>
      {label}
    </motion.a>
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a
  );
}