"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Magnetic from "@/components/effects/Magnetic";
import { easeOutExpo } from "@/lib/animations";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Project", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: easeOutExpo },
    }),
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
        isScrolled
          ? "py-3 bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="relative cursor-pointer"
        >
          <span className="font-monument text-xl md:text-2xl text-white tracking-tighter uppercase">
            MFR<span className="text-red-600">DHN</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-red-600 transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}

          <motion.a
            href="https://wa.me/6282173774337?text=Halo%20Fajri,%20aku%20melihat%20portfolio%20kamu."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
            className="inline-block"
          >
            <Magnetic strength={0.15}>
              <motion.button
                whileHover={{ backgroundColor: "#dc2626", color: "#fff", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-white/10 text-white font-monument text-[9px] uppercase tracking-widest transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </Magnetic>
          </motion.a>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <HiMenuAlt3 size={28} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 h-screen bg-black/95 backdrop-blur-lg z-[110] flex flex-col items-center justify-center gap-10"
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <HiX size={32} />
            </motion.button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + i * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-monument text-3xl text-white uppercase hover:text-red-600 transition-colors duration-300"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}