"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      {children}
    </SmoothScroll>
  );
}
