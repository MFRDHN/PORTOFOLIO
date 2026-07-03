"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
<<<<<<< HEAD
import Magnetic from "@/components/effects/Magnetic";
=======
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Project", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? "py-3 bg-black/90 backdrop-blur-xl border-b border-white/5" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="relative cursor-pointer">
          <span className="font-monument text-xl md:text-2xl text-white tracking-tighter uppercase">
            MFR<span className="text-red-600">DHN</span>
          </span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-red-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          
          {/* CTA WA */}
          <motion.a
            href="https://wa.me/6282173774337?text=Halo%20Fajri,%20aku%20melihat%20portfolio%20kamu."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
<<<<<<< HEAD
            <Magnetic strength={0.15}>
              <motion.button
                whileHover={{ backgroundColor: "#dc2626", color: "#fff", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-white/10 text-white font-monument text-[9px] uppercase tracking-widest transition-all"
              >
                Contact Me
              </motion.button>
            </Magnetic>
=======
            <motion.button
              whileHover={{ backgroundColor: "#dc2626", color: "#fff", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-white/10 text-white font-monument text-[9px] uppercase tracking-widest transition-all"
            >
              Contact Me
            </motion.button>
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a
          </motion.a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <HiMenuAlt3 size={28} />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen bg-black z-[110] flex flex-col items-center justify-center gap-8"
          >
            <button 
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiX size={32} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-monument text-3xl text-white uppercase hover:text-red-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}