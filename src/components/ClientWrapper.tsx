"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";

<<<<<<< HEAD
=======
// Kita muat SmoothScroll secara dinamis agar tidak error di server-side
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

<<<<<<< HEAD
const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
=======
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
>>>>>>> e8cc6196486dd5056527a90a751c09251eeb0e1a
      <Navbar />
      {children}
    </SmoothScroll>
  );
}