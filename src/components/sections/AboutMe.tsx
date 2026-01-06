"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  FaLaravel, FaPhp, FaHtml5, FaCss3Alt, FaJs, FaBootstrap, 
  FaWordpress, FaGithub, FaDownload, 
  FaPaintBrush, FaUsers, FaLightbulb, FaRocket,
  FaServer, FaDatabase, FaFigma 
} from "react-icons/fa";
import { 
  SiCodeigniter, 
  SiCanva,
  SiGit,
  SiMysql,
  SiTailwindcss
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined, 
    offset: ["start end", "end start"],
  });

  const xWatermark = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const scaleExit = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
  const opacityExit = useTransform(scrollYProgress, [0.8, 1], [1, 0]);


  if (!isMounted) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full z-20 bg-transparent"
    >

      <motion.div 
        style={{ scale: scaleExit, opacity: opacityExit }}
        className="relative w-full min-h-screen bg-[#eeeeee] 
                   /* RADIUS ATAS */
                   rounded-t-[80px] md:rounded-t-[120px] 
                   /* BORDER MENGIKUTI LENGKUNGAN */
                   border-t-[3px] border-x-[3px] border-black/10
                   shadow-[0_-50px_80px_rgba(0,0,0,0.4)] -mt-24 overflow-hidden"
      >
        
        {/* WATERMARK BACKGROUND */}
        <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.04] pointer-events-none select-none">
          <motion.h2 style={{ x: xWatermark }} className="font-monument text-[20vw] whitespace-nowrap text-black uppercase">
            M.Fajri Ramadhan — Laravel Developer —
          </motion.h2>
        </div>

        <div className="relative z-20 container mx-auto px-6 md:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT SIDE: PERSONAL INFO */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-5 space-y-12"
            >
              <motion.div variants={fadeInUp}>
                <span className="text-red-600 font-mono text-xs tracking-[0.5em] uppercase mb-4 block">[ 01 . Profile ]</span>
                <h2 className="font-monument text-5xl md:text-7xl text-[#111] uppercase leading-none">About<br /><span className="text-red-600">Me</span></h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6 pt-10 border-t border-black/10">
                <InfoItem label="Full Name" value="M. Fajri Ramadhan" />
                <InfoItem label="Location" value="Jonggol, West Java" />
                <InfoItem label="Specialization" value="Junior Web Developer" />
                <InfoItem label="Status" value="Student / Developer" />
              </motion.div>


                <motion.div variants={fadeInUp}>
                  <motion.a 
                    href="https://docs.google.com/document/d/1nMEoi_hTaGD35Lsa8oy2q_BAW5UcYKWpHhU5CYLd1cY/edit?usp=drivesdk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="group relative w-fit px-6 py-4 bg-[#111] text-white overflow-hidden rounded-xl flex items-center gap-3 transition-all shadow-lg cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    
                    <span className="relative z-10 font-monument text-[9px] tracking-widest uppercase">
                      Download CV
                    </span>
                    
                    <FaDownload size={14} className="relative z-10 group-hover:rotate-12 transition-transform" />
                  </motion.a>
                </motion.div>
            </motion.div>

            {/* RIGHT SIDE: SKILLS */}
            <div className="lg:col-span-7 space-y-16">
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="text-[#333] text-xl md:text-2xl font-medium leading-relaxed"
              > I am a Junior Web Developer who started learning programming in 2023, with hands-on experience in building functional, clean, and user-friendly websites. I am familiar with both front-end and back-end development, and I have a strong interest in creating efficient, responsive, and well-structured web applications. I am committed to continuous learning, improving my technical skills, and staying up to date with modern web technologies.              </motion.p>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <SkillCard title="Web Development" 
                  icons={[
                    { icon: <FaPhp />, color: "hover:text-[#777BB4]" },
                    { icon: <FaLaravel />, color: "hover:text-[#FF2D20]" },
                    { icon: <SiCodeigniter />, color: "hover:text-[#EE4323]" },
                    { icon: <SiMysql />, color: "hover:text-[#4479A1]" },
                    { icon: <FaHtml5 />, color: "hover:text-[#E34F26]" },
                    { icon: <FaCss3Alt />, color: "hover:text-[#1572B6]" },
                    { icon: <FaJs />, color: "hover:text-[#F7DF1E]" },
                    { icon: <FaBootstrap />, color: "hover:text-[#7952B3]" },
                    { icon: <SiTailwindcss />, color: "hover:text-[#06B6D4]" }
                  ]} 
                />

                <SkillCard title="CMS & Design" 
                  icons={[
                    { icon: <FaWordpress />, color: "hover:text-[#21759B]" },
                    { icon: <SiCanva />, color: "hover:text-[#00C4CC]" },
                    { icon: <FaFigma />, color: "hover:text-[#F24E1E]" },
                    { icon: <FaPaintBrush />, color: "hover:text-[#FF61F6]" }
                  ]} 
                />

                <SkillCard title="Tools & Server" 
                  icons={[
                    { icon: <SiGit />, color: "hover:text-[#F05032]" },
                    { icon: <FaGithub />, color: "hover:text-[#181717]" },
                    { icon: <VscCode />, color: "hover:text-[#007ACC]" },
                    { icon: <FaServer />, color: "hover:text-[#22B14C]" },
                    { icon: <FaDatabase />, color: "hover:text-[#FB7E14]" }
                  ]} 
                />

                <SkillCard title="Soft Skills" 
                  icons={[
                    { icon: <FaLightbulb />, color: "hover:text-yellow-500" },
                    { icon: <FaRocket />, color: "hover:text-orange-500" },
                    { icon: <FaUsers />, color: "hover:text-blue-500" }
                  ]} 
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* MARQUEE FOOTER */}
        <div className="w-full py-12 bg-black flex overflow-hidden"> 
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
            className="flex gap-12 items-center whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center text-white/20 font-monument text-2xl uppercase tracking-widest">
                <span>Clean Code</span> <div className="w-3 h-3 bg-red-600 rounded-full" />
                <span>Scalable System</span> <div className="w-3 h-3 bg-red-600 rounded-full" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// --- SUB-COMPONENTS ---
function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="group border-l-2 border-black/5 pl-4 hover:border-red-600 transition-all duration-300">
      <p className="text-[9px] font-mono text-black/30 uppercase tracking-[0.2em]">{label}</p>
      <p className="font-monument text-sm text-[#111] uppercase mt-1 group-hover:translate-x-1 transition-transform">{value}</p>
    </div>
  );
}

function SkillCard({ title, icons }: { title: string, icons: {icon: React.ReactNode, color: string}[] }) {
  return (
    <motion.div 
      variants={fadeInUp}
      className="p-8 border border-black/10 bg-white/40 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-[40px] group flex flex-col justify-between h-full"
    >
      <h4 className="font-monument text-[10px] text-black/40 uppercase tracking-[0.2em] mb-8 group-hover:text-red-600 transition-colors">
        {title}
      </h4>
      <div className="flex flex-wrap gap-5 items-center mt-auto">
        {icons.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.3, y: -5 }}
            className={`text-3xl text-black/20 transition-all duration-300 ${item.color} cursor-pointer`}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}