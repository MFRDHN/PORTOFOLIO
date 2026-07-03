"use client";
import { motion } from "framer-motion";

export default function FloatingDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      

      {/* FLOATING COORDINATES */}
      <motion.div 
        className="absolute top-1/4 right-[5%] font-mono text-[8px] text-red-600/40 space-y-2 hidden lg:block"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <p>LAT: -6.4526</p>
        <p>LONG: 107.0508</p>
        <p>JONGGOL // IDN</p>
      </motion.div>

      {/*  SCROLL INDICATOR LINE  */}
      <div className="absolute left-10 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-red-600/20 to-transparent">
        <motion.div 
          className="w-full h-20 bg-red-600 shadow-[0_0_10px_#ff0000]"
          animate={{ y: ["0%", "500%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* FLOATING PLUS SIGNS */}
      <PlusSign top="15%" left="8%" delay={0} />
      <PlusSign top="70%" left="12%" delay={2} />
      <PlusSign top="40%" right="15%" delay={4} />

    </div>
  );
}

function PlusSign({ top, left, right, delay }: any) {
  return (
    <motion.div
      style={{ top, left, right }}
      className="absolute text-red-600/60 font-bold text-2xl"
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
        rotate: [0, 180] 
      }}
      transition={{ duration: 5, repeat: Infinity, delay }}
    >
      +
    </motion.div>
  );
}