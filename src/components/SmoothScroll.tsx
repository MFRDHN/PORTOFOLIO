"use client";
// Di tahun 2026, kita gunakan import dari 'lenis/react'
import { ReactLenis } from "lenis/react"; 
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      duration: 1.2, 
      lerp: 0.1, 
      smoothWheel: true 
    }}>
      {children}
    </ReactLenis>
  );
}