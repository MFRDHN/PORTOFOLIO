"use client";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0a]">
      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <Hero />
      </section>
      {/*  aboutme */}  
      <section id="about" className="relative z-30 -mt-1"> 
        <AboutMe />
      </section>
      {/* projects */}
      <section id="projects" className="relative z-20 -mt-1">
        <Projects />
      </section>
      {/* contact */}
      <section id="contact" className="relative z-10 -mt-1">
        <Contact />
      </section>
    </main>
  );
}