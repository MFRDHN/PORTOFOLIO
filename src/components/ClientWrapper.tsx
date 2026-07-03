"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      {children}
    </SmoothScroll>
  );
}
