"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import Magnetic from "@/components/effects/Magnetic";
import ShinyText from "@/components/react-bits/ShinyText";
import { easeOutExpo, staggerContainer, fadeInUp } from "@/lib/animations";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}vw`,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 5,
  driftX: (Math.random() - 0.5) * 15,
}));

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

        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", x: p.x, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
              x: `calc(${p.x} + ${p.driftX}vw)`,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-red-600 rounded-full blur-[1px] will-change-transform"
          />
        ))}

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-[40] flex flex-col gap-8"
      >
        {[
          { Icon: FaInstagram, href: "https://www.instagram.com/_mf.ramadhan_?igsh=MW9lbTI2OWp1aDU0dg==" },
          { Icon: FaLinkedin, href: "https://www.linkedin.com/in/m-fajri-ramadhan-919058373/" },
          { Icon: FaGithub, href: "https://github.com/MFRDHN" },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Magnetic strength={0.2}>
              <motion.a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="text-white/20 hover:text-red-600 transition-colors duration-300 block"
              >
                <item.Icon size={22} />
              </motion.a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        style={{ scale: textScaleOut, opacity: textOpacityOut }}
        className="absolute z-[5] w-full text-center flex flex-col items-center top-[15%] md:top-1/2 md:-translate-y-1/2"
      >
        <motion.div
          initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
          animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.3 }}
          className="mb-[-2vw]"
        >
          <motion.h1
            initial={{ y: "100%", rotateZ: -6, scale: 0.6, filter: "blur(12px)", opacity: 0 }}
            animate={{ y: 0, rotateZ: 0, scale: 1, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.8, ease: easeOutExpo, delay: 0.3 }}
            className="font-monument text-[13vw] md:text-[11vw] text-white leading-none uppercase will-change-transform will-change-filter"
          >
            <ShinyText
              text="M FAJRI"
              speed={3}
              color="#ffffff"
              shineColor="#991b1b"
              spread={60}
              direction="right"
            />
          </motion.h1>
        </motion.div>

        <div>
          <motion.h1
            initial={{ y: "100%", rotateZ: 6, scale: 0.6, filter: "blur(12px)", opacity: 0 }}
            animate={{ y: 0, rotateZ: 0, scale: 1, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.8, ease: easeOutExpo, delay: 0.6 }}
            className="font-monument text-[13vw] md:text-[11vw] uppercase tracking-tight will-change-transform will-change-filter opacity-40"
          >
            <ShinyText
              text="RAMADHAN"
              speed={5}
              color="transparent"
              shineColor="rgba(255,180,180,0.7)"
              spread={90}
              direction="left"
              delay={0.5}
            />
          </motion.h1>
        </div>
      </motion.div>

      <motion.div
        style={{ scale: photoScaleIn, opacity: textOpacityOut }}
        initial={{ y: "100%", scale: 0.6, filter: "blur(20px)", opacity: 0 }}
        animate={{ y: 0, scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 2, ease: easeOutExpo, delay: 0.9 }}
        className="absolute bottom-0 z-[10] w-full h-[65vh] md:h-[85vh] flex justify-center items-end pointer-events-none will-change-transform will-change-filter"
      >
        <div className="relative h-full flex items-end justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: easeOutExpo, delay: 1.2 }}
            className="absolute bottom-0 w-[100%] h-[30%] bg-red-600/20 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{ y: ["0%", "-3%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="h-full flex items-end justify-center"
          >
            <Image
              src="/aset/pp.png"
              alt="M Fajri Ramadhan - Full-Stack Developer"
              width={1400}
              height={1400}
              className="h-full w-auto object-contain object-bottom scale-[1.1] md:scale-[1.2] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-[20]" />
    </section>
  );
}