"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.5,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-red-500 to-red-600 z-[9997] origin-left shadow-[0_0_8px_rgba(220,38,38,0.5)]"
      style={{ scaleX }}
    />
  );
}
