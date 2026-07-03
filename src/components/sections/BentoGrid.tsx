"use client";
import { motion } from "framer-motion";

const items = [
  { title: "STORY", desc: "Deadpool III: Legacy of the fourth wall break.", span: "col-span-2 md:col-span-2" },
  { title: "STATS", desc: "99% Accuracy", span: "col-span-1" },
  { title: "YEAR", desc: "2026", span: "col-span-1" },
  { title: "DIRECTOR", desc: "Shawn Levy", span: "col-span-1" },
  { title: "CAST", desc: "Ryan Reynolds, Hugh Jackman", span: "col-span-2" },
];

export default function BentoGrid() {
  return (
    <section className="px-6 py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/20 transition-colors group ${item.span}`}
          >
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
              {item.title}
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-zinc-200 group-hover:text-white transition-colors uppercase italic tracking-tighter">
              {item.desc}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}