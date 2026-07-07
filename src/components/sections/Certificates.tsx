"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { certificatesData } from "@/data/certificates";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { easeOutExpo, springSoft, springSnappy } from "@/lib/animations";

function useResponsiveDimensions() {
  const [dims, setDims] = useState({ cardWidth: 400, gap: 28, cardHeight: 440, isCompact: false });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setDims({ cardWidth: Math.floor((vw - 40) / 1.7), gap: 8, cardHeight: Math.floor((vw - 40) / 1.2), isCompact: true });
      } else if (vw < 640) {
        setDims({ cardWidth: 200, gap: 14, cardHeight: 340, isCompact: true });
      } else if (vw < 1024) {
        setDims({ cardWidth: 320, gap: 20, cardHeight: 400, isCompact: false });
      } else {
        setDims({ cardWidth: 320, gap: 28, cardHeight: 440, isCompact: false });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const s = i * 137 + 42;
      return {
        id: i,
        x: seededRandom(s) * 100,
        y: seededRandom(s + 1) * 100,
        size: seededRandom(s + 2) * 3 + 1.5,
        duration: seededRandom(s + 3) * 6 + 4,
        delay: seededRandom(s + 4) * 5,
        driftX: (seededRandom(s + 5) - 0.5) * 40,
        driftY: (seededRandom(s + 6) - 0.5) * 40,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-600/30 will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] bg-red-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[20vw] h-[20vw] bg-red-600/5 blur-[100px] rounded-full" />
    </div>
  );
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const spanVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

const lineVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

export default function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { cardWidth, gap, cardHeight, isCompact } = useResponsiveDimensions();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCarouselWidth(entry.contentRect.width);
      }
    });
    ro.observe(carouselRef.current);
    return () => ro.disconnect();
  }, [isMounted]);

  const STEP = cardWidth + gap;
  const xOffset = carouselWidth / 2 - cardWidth / 2 - activeIndex * STEP;

  const handleCardClick = useCallback((index: number) => {
    if (index === activeIndex) setModalOpen(true);
    else setActiveIndex(index);
  }, [activeIndex]);

  const handleCardHover = useCallback((index: number) => setHoveredIndex(index), []);
  const handleCardLeave = useCallback(() => setHoveredIndex(null), []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % certificatesData.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, goNext, goPrev]);

  if (!isMounted) return <section className="min-h-screen bg-[#0a0a0a]" />;

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-transparent">
        <div
          className="relative w-full min-h-screen bg-[#0a0a0a] rounded-t-[80px] md:rounded-t-[120px] border-t-[3px] border-x-[3px] border-white/5 shadow-[0_-50px_80px_rgba(0,0,0,0.5)] -mt-24 overflow-hidden"
        >
          <ParticleField />

          <div className="relative z-10 container mx-auto px-6 md:px-16 py-24 md:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={headerVariants}
              className="mb-16 md:mb-20"
            >
              <motion.span variants={spanVariants} className="text-red-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-4 block">
                (04) CERTIFICATES
              </motion.span>
              <motion.h2 variants={headingVariants} className="font-monument text-4xl md:text-6xl text-white uppercase leading-tight tracking-tight">
                Licenses &amp;
                <br />
                <span className="text-red-600 italic">Credentials</span>
              </motion.h2>
              <motion.div variants={lineVariants} className="w-12 h-[1px] bg-white/10 mt-8 origin-left" />
            </motion.div>

            <div ref={carouselRef} className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />

              <motion.div
                className="flex"
                style={{ perspective: 1200, gap }}
                animate={{ x: xOffset }}
                transition={{ type: "spring", stiffness: 140, damping: 24, mass: 0.9 }}
              >
                {certificatesData.map((cert, index) => {
                  const isActive = index === activeIndex;
                  const isHovered = hoveredIndex === index;
                  const dist = index - activeIndex;
                  const tiltY = -dist * (isCompact ? 6 : 14);
                  const zOffset = -Math.abs(dist) * (isCompact ? 10 : 30);

                  return (
                    <motion.div
                      key={cert.id}
                      className="flex-shrink-0 cursor-pointer select-none"
                      style={{ width: cardWidth, height: cardHeight }}
                      animate={{
                        scale: isActive ? 1 : (isCompact ? 0.95 : 0.85),
                        opacity: isActive ? 1 : (isCompact ? 0.9 : 0.6),
                        rotateY: tiltY,
                        z: zOffset,
                      }}
                      transition={springSnappy}
                      onClick={() => handleCardClick(index)}
                      onMouseEnter={() => handleCardHover(index)}
                      onMouseLeave={handleCardLeave}
                    >
                      <CardContent cert={cert} isActive={isActive} isHovered={isHovered} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
              }}
              className="flex items-center justify-center gap-3 mt-12"
            >
              {certificatesData.map((_, index) => (
                <motion.button
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: springSoft },
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? "w-6 bg-red-600" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-20" />
        </div>
      </section>

      <AnimatePresence mode="wait">
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 md:px-8"
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: -20, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setModalOpen(false)}
                className="absolute -top-14 right-0 text-white/40 hover:text-white transition-colors z-10"
                aria-label="Close modal"
              >
                <FaTimes size={28} />
              </motion.button>

              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white transition-colors p-2"
                aria-label="Previous certificate"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white transition-colors p-2"
                aria-label="Next certificate"
              >
                <FaChevronRight size={24} />
              </button>

              <div className="relative w-full aspect-[4/3] bg-[#111] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center" style={{ borderRadius: 14 }}>
                {certificatesData[activeIndex].image ? (
                  <Image
                    src={certificatesData[activeIndex].image}
                    alt={certificatesData[activeIndex].title}
                    width={1200}
                    height={900}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-red-600/30 flex items-center justify-center">
                      <span className="font-monument text-red-600/50 text-2xl">C</span>
                    </div>
                    <p className="text-white/20 font-mono text-sm">Certificate image not available</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-monument text-white text-lg uppercase leading-snug">{certificatesData[activeIndex].title}</h3>
                  <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest mt-1">
                    {certificatesData[activeIndex].subtitle} &mdash; {certificatesData[activeIndex].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CardContent({
  cert,
  isActive,
  isHovered,
}: {
  cert: (typeof certificatesData)[number];
  isActive: boolean;
  isHovered: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full h-full relative overflow-hidden transition-all duration-500 will-change-transform"
      style={{
        borderRadius: 12,
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: isActive
          ? "1px solid rgba(220,38,38,0.3)"
          : isHovered
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: isActive
          ? "0 20px 40px -12px rgba(220,38,38,0.20)"
          : "0 8px 20px -8px rgba(0,0,0,0.3)",
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : isActive ? 0.5 : 0,
          background: "radial-gradient(circle 220px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(220,38,38,0.25), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: "radial-gradient(circle 80px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.12) 0%, transparent 60%)",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{ borderRadius: 12 }}
        initial={false}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 1.8, ease: easeOutExpo }}
      >
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 55%, transparent 75%)",
          }}
        />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/25 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: cert.gradient }} />

      <div className="relative z-10 p-5 flex flex-col h-full">
        <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.12em]">{cert.subtitle}</span>
        <div className="flex-1 flex items-center justify-center my-3">
          <div
            className="w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${cert.color}15, transparent)`, border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {cert.image ? (
              <Image src={cert.image} alt={cert.title} width={400} height={300} className="w-full h-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${cert.color}20` }}>
                  <span className="font-monument text-sm" style={{ color: cert.color }}>{cert.title.charAt(0)}</span>
                </div>
                <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Certificate</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="font-[family-name:var(--font-monument)] text-xs text-white/80 leading-snug line-clamp-2">{cert.title}</h3>
          <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest mt-1.5">{cert.date}</p>
        </div>
      </div>
    </div>
  );
}
