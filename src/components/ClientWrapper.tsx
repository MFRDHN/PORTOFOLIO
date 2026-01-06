"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";

// Kita muat SmoothScroll secara dinamis agar tidak error di server-side
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      {children}
    </SmoothScroll>
  );
}