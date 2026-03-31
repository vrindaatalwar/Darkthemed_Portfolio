import { useRef, useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { Github as GithubIcon, Twitter, Linkedin, Mail, ChevronRight, ChevronDown, ExternalLink, ChevronUp } from 'lucide-react';
import { AnimatedCarousel } from './components/ui/logo-carousel';
import { React as ReactLogo, Nextjs, Vercel, TypeScript, TailwindCSS, GitHub, Figma } from './components/ui/tech-logos';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/ui/resizable-navbar";

const partnerLogos = [
  { name: "React", icon: ReactLogo },
  { name: "Next.js", icon: Nextjs },
  { name: "Vercel", icon: Vercel },
  { name: "TypeScript", icon: TypeScript },
  { name: "Tailwind CSS", icon: TailwindCSS },
  { name: "GitHub", icon: GitHub },
  { name: "Figma", icon: Figma },
];

const LANGUAGES = [
  { text: "Hello", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Bonjour", lang: "French" },
  { text: "Ciao", lang: "Italian" },
  { text: "Hola", lang: "Spanish" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" }
];

function AnimatedGreeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 2000); // Faster pace as requested
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[48px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={LANGUAGES[index].text}
          initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -5 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="font-serif text-white/90 text-[32px] tracking-wide px-4 text-center absolute whitespace-nowrap"
        >
          {LANGUAGES[index].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function ScrollTracker() {
  const { scrollYProgress } = useScroll();
  const [showArrow, setShowArrow] = useState(false);
  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowArrow(latest > 0.05);
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-[100] w-12 h-12 flex items-center justify-center cursor-pointer pointer-events-auto group"
      onClick={handleScrollToTop}
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="white"
          strokeWidth="6"
          className="opacity-10 group-hover:opacity-20 transition-opacity"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: scaleProgress }}
          className="opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </svg>
      
      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp size={18} className="text-white opacity-60 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScrollBlurOverlay() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-[100px] z-[60] pointer-events-none bg-gradient-to-t from-[#111010] to-transparent"
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        maskImage: 'linear-gradient(to top, black, transparent)',
        WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
      }}
    />
  );
}

function App() {
  const calendarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "about", link: "#about" },
    { name: "works", link: "#experience" },
    { name: "projects", link: "#projects" },
    { name: "contact", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState<number>(-1);

  const projects = [
    {
      title: "MetaVerse",
      description: "A browser-based spatial video chat platform that allows users to interact in a 2D pixel-art world. Users can connect, move their avatars with real-time physics, and communicate based on proximity. Solved complex frontend challenges including double-render strict mode handling and asset synchronization across varying network speeds.",
      techStack: ["Next.js", "Node.js", "Zustand", "Phaser 3", "WebSockets", "TailwindCSS", "TypeScript"],
      link: "#"
    },
    {
      title: "SuperGlobe",
      description: "A high-performance visualization tool for global environmental data. Built with Three.js to render real-time weather patterns and carbon emissions across a detailed 3D globe, supporting interactive exploration and data filtering.",
      techStack: ["React", "Three.js", "Python", "FastAPI", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Swapify",
      description: "A decentralized finance protocol focused on low-slippage cross-chain asset swapping. Features an automated market maker (AMM) model with optimized smart contracts for gas efficiency and robust security audits.",
      techStack: ["Solidity", "Ethers.js", "Hardhat", "React", "TypeScript"],
      link: "#"
    },
    {
      title: "Quorum",
      description: "A modern governance platform for DAOs, providing transparent voting mechanisms and treasury management. Integrated with multi-sig wallets and on-chain proposal tracking to empower community decision-making.",
      techStack: ["GraphQL", "Apollo", "Next.js", "Node.js", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Seedling",
      description: "An interactive educational platform for sustainable urban gardening. Combines a rich community knowledge base with a personalized grow-tracking dashboard to help city dwellers maximize their green spaces.",
      techStack: ["Flutter", "Firebase", "Dart", "Google Cloud", "Nginx"],
      link: "#"
    }
  ];

  useEffect(() => {
    const findScrollable = (el: HTMLElement): HTMLElement | null => {
      if (el.scrollWidth > el.clientWidth + 2) return el;
      for (const child of Array.from(el.children) as HTMLElement[]) {
        const found = findScrollable(child);
        if (found) return found;
      }
      return null;
    };

    const timeout = setTimeout(() => {
      const container = calendarRef.current;
      if (!container) return;
      // Scroll our own container
      container.scrollLeft = container.scrollWidth;
      // Also scroll the inner library element if different
      const inner = findScrollable(container);
      if (inner && inner !== container) {
        inner.scrollLeft = inner.scrollWidth;
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, []);



  return (
    <div className="min-h-screen bg-[#111010] text-[#a3a3a3] font-sans selection:bg-white/10 flex flex-col items-center w-full pb-20">

      {/* NAVBAR */}
      <Navbar className="top-[3px]">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative py-2 group"
              >
                <span className="block font-sans text-[15px] text-[#a3a3a3] hover:text-white transition-colors group-hover:underline group-hover:decoration-wavy group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:text-decoration-white [text-decoration-skip-ink:none]">
                  {item.name}
                </span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="w-full max-w-[700px] relative mx-auto flex-1 flex flex-col pt-24">
        {/* Left Side Border with Diagonal Lines */}
        <div
          className="absolute top-[60px] bottom-0 right-full w-10 opacity-[0.04] pointer-events-none border-x border-[#ffffff]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 1px, transparent 8px)' }}
        ></div>

        {/* Right Side Border with Diagonal Lines */}
        <div
          className="absolute top-[60px] bottom-0 left-full w-10 opacity-[0.04] pointer-events-none border-x border-[#ffffff]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 1px, transparent 8px)' }}
        ></div>

        <main className="w-full max-w-[640px] px-6 mx-auto flex flex-col gap-12 relative z-10 bg-[#111010]">
          {/* HERO SECTION */}
          <section id="about" className="relative w-full overflow-visible mb-0">
            {/* Mountain Background */}
            {/* Removed rounded borders. Added custom mask-image for horizontal fade in/out */}
            <div
              className="w-[110%] -ml-[5%] h-[240px] overflow-hidden relative group"
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1436891620584-47fd0e565afb?q=80&w=1200&auto=format&fit=crop"
                alt="Mountain at dusk"
                className="w-full h-full object-cover"
              />
              {/* Subtle blur overlay on the edges */}
              <div className="absolute inset-y-0 left-0 w-20 backdrop-blur-[2px] pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-20 backdrop-blur-[2px] pointer-events-none"></div>

              {/* Dark overlay for contrast and vertical blending */}
              <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111010] via-transparent to-[#111010] pointer-events-none"></div>

              {/* Animated Greeting */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-[-20px]">
                <AnimatedGreeting />
              </div>
            </div>

            {/* Profile Picture (overlapping - adjusted gap) */}
            <div className="absolute -bottom-12 left-0 z-20">
              <div className="w-[96px] h-[96px] rounded-full overflow-hidden border-[6px] border-[#111010] bg-[#1a1a1a]">
                <img
                  src="https://github.com/vrindaatalwar.png"
                  alt="Vrindaa Talwar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* PROFILE DETAILS */}
          <section className="flex flex-col gap-6 mt-4 relative z-30">
            <div>
              <h1 className="text-[44px] text-gray-100 mb-2 leading-none tracking-tight font-serif">
                Vrindaa Talwar
              </h1>
              <p className="text-[15px] text-[#737373] mt-2 font-serif tracking-wide">
                21 • ideas • systems • stories
              </p>
            </div>

            <div className="text-[15px] leading-relaxed text-[#a3a3a3] space-y-6">
              <p>
                I'm someone who loves <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>exploring ideas</span>, through code, design, and whatever medium feels right that day. I spend most of my time <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>building things</span> that make life a bit simpler or spark curiosity, often blending structure with imagination.
              </p>
              <p>
                Outside of work, I am a <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>part-time artist</span> and a <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>full-time cinephile</span> and audiophile. I enjoy stories in all forms, whether that's film, music, or the small experiments that keep me inspired.
              </p>
              <p>
                Currently open to <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>part-time and contract roles</span>. The kind that let me dive deep into <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>interesting systems</span>, build cool fast tools, or collaborate on <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>experimental ideas</span>.
              </p>
            </div>

            <div className="flex items-center gap-5 mt-2">
              <a href="#" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><Twitter size={18} strokeWidth={1.5} /></a>
              <a href="https://github.com/vrindaatalwar" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><GithubIcon size={18} strokeWidth={1.5} /></a>
              <a href="#" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><Linkedin size={18} strokeWidth={1.5} /></a>
              <a href="#" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><Mail size={18} strokeWidth={1.5} /></a>
            </div>
          </section>

          {/* EXPERIENCE TIMELINE */}
          <section id="experience" className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[700px] border-t border-dotted border-[#404040]"></div>
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h2 className="text-[#a3a3a3] font-serif text-[26px] mb-2">Professional experience</h2>
                <p className="text-gray-200 font-sans tracking-[-0.03em] text-[15px] opacity-100">Places where I've built systems and solved problems</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <ExperienceItem company="Global Consulting Associates" role="AI Consultant" date="Sept 2024 — Present" location="Remote" />
              <ExperienceItem company="Hexzt" role="SDE-II" date="Jun 2024 — Aug 2024" location="Remote" />
              <ExperienceItem company="Fada Cba" role="Founder" date="Jun 2024 — May 2025" location="Remote" />
              <ExperienceItem company="Agalio.ai" role="SDE" date="Jan 2024 — Apr 2024" location="Remote" />
              <ExperienceItem company="Codemed" role="Consultant" date="Sept 2023 — Dec 2024" location="Remote" />
              <ExperienceItem company="Moved HR Solutions" role="SDE" date="Feb 2023 — May 2024" location="Remote" />
              <ExperienceItem company="SimplifyVets" role="SDE Intern" date="Jul 2022 — Sept 2022" location="Remote" />
              <ExperienceItem company="Zata Ze" role="Founder" date="Mar 2020 — Jun 2022" location="Remote" />
            </div>
          </section>

          {/* GITHUB CONTRIBUTIONS */}
          <section className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[700px] border-t border-dotted border-[#404040]"></div>
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-[#737373] font-serif text-[26px] mb-2">GitHub contributions</h2>
                <p className="text-gray-200 font-sans tracking-[-0.03em] text-[15px] opacity-100">120 contributions in the last year</p>
              </div>
              <a
                href="https://github.com/vrindaatalwar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#737373] hover:text-white transition-colors mt-2 group"
              >
                <span className="text-[14px] font-sans">Follow</span>
                <GithubIcon size={16} />
              </a>
            </div>
            <div className="relative group">
              <div
                ref={calendarRef}
                className="github-calendar-scroll overflow-x-hidden"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px)',
                  maskImage: 'linear-gradient(to right, transparent, black 40px)'
                }}
              >
                <GitHubCalendar
                  username="vrindaatalwar"
                  colorScheme="dark"
                  blockSize={11}
                  blockMargin={4}
                  blockRadius={5}
                  fontSize={11}
                  theme={{
                    dark: ['#1e1e1e', '#333333', '#555555', '#999999', '#ffffff'],
                  }}
                  labels={{
                    totalCount: '',
                  }}
                  style={{ fontFamily: 'Inter, -apple-system, sans-serif', color: '#ffffff' }}
                />
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[700px] border-t border-dotted border-[#404040]"></div>
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-[#737373] font-serif text-[26px]">Projects</h2>
              <a href="#" className="flex items-center gap-1.5 text-[#737373] hover:text-white transition-colors group">
                <span className="text-[14px] font-sans">See All</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex flex-col">
              {projects.map((project, index) => (
                <ProjectItem 
                  key={project.title}
                  {...project}
                  isOpen={openProjectIndex === index}
                  onToggle={() => setOpenProjectIndex(openProjectIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </section>

          {/* STACK */}
          <section className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[700px] border-t border-dotted border-[#404040]"></div>

            <div className="-ml-6 overflow-hidden">
              <AnimatedCarousel
                title="Stack I use"
                subTitle="Technologies I work with to build products that solve real problems"
                logos={partnerLogos}
                autoPlay={true}
                itemsPerViewMobile={3}
                itemsPerViewDesktop={5}
                logoContainerWidth="w-24 lg:w-32"
                logoContainerHeight="h-16 lg:h-20"
                logoImageWidth="w-auto"
                logoImageHeight="h-8 lg:h-10"
                padding="py-2"
                spacing="gap-6"
                titleClassName="!ml-6"
              />
            </div>
          </section>

          {/* CTA & FOOTER */}
          <section id="contact" className="mt-4 pt-6 relative flex flex-col items-center justify-center pb-8 gap-6 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[700px] border-t border-dotted border-[#404040]"></div>

            <div className="w-full text-left mt-6">
              <h3 className="text-gray-200 font-serif tracking-[-0.03em] text-[22px] mb-1">Let's connect</h3>
              <p className="text-sm text-[#737373] mb-6">Find me on these platforms:</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#737373]">
                <a href="https://github.com/vrindaatalwar" className="hover:text-white transition-colors flex items-center gap-2"><GithubIcon size={14} /> GitHub</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Twitter size={14} /> Twitter</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={14} /> LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Mail size={14} /> Mail</a>
              </div>
              <p className="text-xs text-[#404040] mt-8">
                © {new Date().getFullYear()} Vrindaa Talwar
              </p>
            </div>
          </section>
        </main>
        {/* Bottom Fade Gradient - Ensures side borders and content don't end abruptly */}
        <div className="absolute bottom-0 left-[-150px] right-[-150px] h-[150px] bg-gradient-to-t from-[#111010] via-[#111010]/50 to-transparent pointer-events-none z-20"></div>
      </div>
      
      {/* Scroll Progress Tracker */}
      <ScrollTracker />
      
      {/* Scroll Blur Overlay */}
      <ScrollBlurOverlay />
    </div>
  );
}

function ProjectItem({ 
  title, 
  description, 
  techStack, 
  link, 
  isOpen, 
  onToggle 
}: { 
  title: string, 
  description: string, 
  techStack: string[], 
  link: string, 
  isOpen: boolean, 
  onToggle: () => void 
}) {
  return (
    <div className="border-b border-[#262626]/50 last:border-0 hover:border-white/10 transition-colors">
      <button 
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between group transition-colors hover:bg-white/2 px-2 -mx-2 rounded-lg"
      >
        <div className="flex items-center gap-4">
          <div className="text-[#737373] group-hover:text-white transition-colors">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          <h3 className="text-gray-100 font-sans font-medium text-[15px] tracking-tight">
            {title}
          </h3>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#737373] hover:text-white transition-colors"
        >
          <ExternalLink size={16} />
        </a>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-8 pr-6">
              <p className="text-[#a3a3a3] font-sans text-[14px] leading-relaxed mb-5 max-w-[580px]">
                {description}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[#737373] font-sans text-[13px] hover:text-gray-100 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExperienceItem({ company, role, date, location }: { company: string, role: string, date: string, location: string }) {
  return (
    <div className="flex justify-between items-start group">
      <div className="flex flex-col">
        <h3 className="text-gray-100 font-sans font-medium text-[15px] tracking-tight mb-1">
          {company}
        </h3>
        <p className="text-[#737373] font-sans text-[14px]">{role}</p>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-[#737373] font-sans text-[14px] font-normal">{date}</span>
        <span className="text-[#737373] font-sans text-[14px] font-normal">{location}</span>
      </div>
    </div>
  );
}

export default App;
