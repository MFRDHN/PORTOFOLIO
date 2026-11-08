"use client";
import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

const TILES_X = 24;
const TILES_Y = 18;

const PALETTE = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#F0B27A", "#82E0AA", "#F1948A", "#73C6B6", "#E59866",
  "#AED6F1", "#D7BDE2", "#A3E4D7", "#FAD7A0", "#6C5CE7",
  "#FD79A8", "#00CEC9", "#E17055", "#0984E3", "#00B894",
];

function getColor(i: number, j: number) {
  const idx = (i * 7 + j * 13) % PALETTE.length;
  return PALETTE[idx];
}

export default function ChromaGridBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const setterX = useRef<((v: number) => void) | null>(null);
  const setterY = useRef<((v: number) => void) | null>(null);

  const tiles = useMemo(() => {
    const rows = [];
    for (let j = 0; j < TILES_Y; j++) {
      const cols = [];
      for (let i = 0; i < TILES_X; i++) {
        cols.push(getColor(i, j));
      }
      rows.push(cols);
    }
    return rows;
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    setterX.current = gsap.quickSetter(el, "--x", "px") as (v: number) => void;
    setterY.current = gsap.quickSetter(el, "--y", "px") as (v: number) => void;
    const { width, height } = el.getBoundingClientRect();
    posRef.current = { x: width / 2, y: height / 2 };
    setterX.current(posRef.current.x);
    setterY.current(posRef.current.y);
  }, []);

  const handleMove = (e: React.PointerEvent) => {
    const r = containerRef.current!.getBoundingClientRect();
    const tx = e.clientX - r.left;
    const ty = e.clientY - r.top;
    gsap.to(posRef.current, {
      x: tx,
      y: ty,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => {
        setterX.current?.(posRef.current.x);
        setterY.current?.(posRef.current.y);
      },
      overwrite: true,
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
    >
      <div className="grid w-full h-full" style={{
        gridTemplateColumns: `repeat(${TILES_X}, 1fr)`,
        gridTemplateRows: `repeat(${TILES_Y}, 1fr)`,
      }}>
        {tiles.map((row, j) =>
          row.map((color, i) => (
            <div key={`${i}-${j}`} style={{ background: color }} />
          ))
        )}
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "grayscale(1) brightness(0.35)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.35)",
          background: "rgba(0,0,0,0.001)",
          maskImage: "radial-gradient(circle 320px at var(--x) var(--y), transparent 0%, transparent 12%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)",
          WebkitMaskImage: "radial-gradient(circle 320px at var(--x) var(--y), transparent 0%, transparent 12%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)",
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />
    </div>
  );
}
