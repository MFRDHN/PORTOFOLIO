import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Reveal from "@/components/ui/Reveal";
import { fetchCertificates, fetchProjects } from "@/lib/laravel";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, certificates] = await Promise.all([
    fetchProjects(),
    fetchCertificates(),
  ]);

  return (
    <main className="relative bg-[#0a0a0a] overflow-x-clip [touch-action:pan-y_pinch-zoom]">
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <Hero />
      </section>

      <Reveal id="about" className="relative z-30 -mt-1">
        <AboutMe />
      </Reveal>

      <Reveal id="projects" className="relative z-20 -mt-1">
        <Projects projects={projects.slice(0, 6)} />
      </Reveal>

      <Reveal id="certificates" className="relative z-[15] -mt-1">
        <Certificates certificates={certificates} />
      </Reveal>

      <Reveal id="contact" className="relative z-10 -mt-1">
        <Contact />
      </Reveal>
    </main>
  );
}
