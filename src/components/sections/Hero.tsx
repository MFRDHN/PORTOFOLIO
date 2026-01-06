"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"],
  });

  // Transformasi Scroll
  const textScaleOut = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textOpacityOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const photoScaleIn = useTransform(scrollYProgress, [0, 0.6], [1, 1.2]);

  if (!isMounted) return <section className="h-screen w-full bg-[#0a0a0a]" />;

  return (
    <section 
      ref={containerRef}
      className="sticky top-0 h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center z-10"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,0,0,0.25)_0%,transparent_70%)]" />
        
        {/* Particle Effect: Bintik merah naik */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 1, 0],
              x: `${(Math.random() * 100) + (Math.random() * 5 - 2.5)}vw` 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-red-600 rounded-full blur-[1px]"
          />
        ))}

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      </div>

     { /* SOSMED: FLOATING */ }
 <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-[40] flex flex-col gap-8">
    {[
      { Icon: FaInstagram, href: "https://www.instagram.com/_mf.ramadhan_?igsh=MW9lbTI2OWp1aDU0dg==" },
      { Icon: FaLinkedin, href: "https://www.linkedin.com/in/m-fajri-ramadhan-919058373/" },
      { Icon: FaGithub, href: "https://github.com/MFRDHN" },
    ].map((item, i) => (
      <motion.a 
        key={i} 
        href={item.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: i * 0.4 
        }}
        className="text-white/20 hover:text-red-600 transition-all duration-300"
      >
        <item.Icon size={22} />
      </motion.a>
    ))}
 </div>

      <motion.div 
        style={{ scale: textScaleOut, opacity: textOpacityOut }}
        className="absolute z-[5] w-full text-center flex flex-col items-center 
                   top-[15%] md:top-1/2 md:-translate-y-1/2" 
      >
        <div className="overflow-hidden mb-[-2vw] relative group">
          <motion.h1 
            initial={{ y: "150%", skewY: 7 }}
            animate={{ y: 0, skewY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="font-monument text-[13vw] md:text-[11vw] text-white leading-none uppercase relative"
          >
            M FAJRI

            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
            />
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "150%", skewY: -7 }}
            animate={{ y: 0, skewY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="font-monument text-[13vw] md:text-[11vw] uppercase opacity-30 tracking-tight"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)", color: "transparent" }}
          >
            RAMADHAN
          </motion.h1>
        </div>
      </motion.div>

      {/* FOTO CHARACTER */}
      <motion.div 
        style={{ scale: photoScaleIn, opacity: textOpacityOut }}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ 
          y: ["0%", "-3%", "0%"], 
          opacity: 1 
        }}
        transition={{ 
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 2, delay: 1 }
        }}
        className="absolute bottom-0 z-[10] w-full h-[65vh] md:h-[85vh] flex justify-center items-end pointer-events-none"
      >
        <div className="relative h-full flex items-end justify-center">
          <div className="absolute bottom-0 w-[100%] h-[30%] bg-red-600/20 blur-[120px] rounded-full" />
          <Image
            src="/aset/pp.png" 
            alt="Avatar" 
            width={1400} 
            height={1400}
            className="h-full w-auto object-contain object-bottom scale-[1.1] md:scale-[1.2] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
            priority
          />
        </div>
      </motion.div>

      {/* GRADIENT*/}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-[20]" />
    </section>
  );
}