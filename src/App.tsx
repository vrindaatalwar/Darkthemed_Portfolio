import { useRef, useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { Github as GithubIcon, Twitter, Linkedin, Mail, ChevronRight, ChevronDown, ExternalLink, ChevronUp } from 'lucide-react';
import { AnimatedCarousel } from './components/ui/logo-carousel';
import { TextHoverEffect } from './components/ui/hover-text-effect';
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
import { CONFIG } from './config';

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

  const displayGithubUsername = CONFIG.github.username || CONFIG.github.fallbackUsername;

  return (
    <div className="min-h-screen bg-[#111010] text-[#a3a3a3] font-sans selection:bg-white/10 flex flex-col items-center w-full pb-0">

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

      <div className="w-full max-w-[749px] relative mx-auto flex-1 flex flex-col pt-24">
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

        <main className="w-full max-w-[685px] px-6 mx-auto flex flex-col gap-12 relative z-10 bg-[#111010]">
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
                  src={CONFIG.profileImage}
                  alt={CONFIG.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* PROFILE DETAILS */}
          <section className="flex flex-col gap-6 mt-4 relative z-30">
            <div>
              <h1 className="text-[44px] text-white mb-2 leading-none tracking-tight font-serif">
                {CONFIG.name}
              </h1>
              <p className="text-[15px] text-[#737373] mt-2 font-serif tracking-wide">
                {CONFIG.title}
              </p>
            </div>

            <div className="text-[15px] leading-relaxed text-[#a3a3a3] space-y-6">
              {CONFIG.about.paragraphs.map((p, idx) => (
                <p key={`bio-${idx}`}>{p}</p>
              ))}
            </div>

            <div className="flex items-center gap-5 mt-2">
              <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><Twitter size={18} strokeWidth={1.5} /></a>
              <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><GithubIcon size={18} strokeWidth={1.5} /></a>
              <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><Linkedin size={18} strokeWidth={1.5} /></a>
              <a href={CONFIG.social.email} className="text-[#a3a3a3] hover:text-gray-100 transition-colors"><Mail size={18} strokeWidth={1.5} /></a>
            </div>
          </section>

          {/* EXPERIENCE TIMELINE */}
          <section id="experience" className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[749px] border-t border-dotted border-[#404040]"></div>
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-white font-serif text-[26px] mb-2">Professional experience</h2>
                <p className="text-[#a3a3a3] font-sans tracking-[-0.03em] text-[15px] opacity-100">Places where I've built systems and solved problems</p>
              </div>
              <a
                href={CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#737373] hover:text-white transition-colors mt-2 group"
              >
                <span className="text-[14px] font-sans">Follow</span>
                <Linkedin size={16} />
              </a>
            </div>

            <div className="flex flex-col gap-6">
              {CONFIG.experience.map((exp, idx) => (
                <ExperienceItem key={`experience-${idx}`} {...exp} />
              ))}
            </div>
          </section>

          {/* GITHUB CONTRIBUTIONS */}
          <section className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[749px] border-t border-dotted border-[#404040]"></div>
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-white font-serif text-[26px] mb-2">GitHub contributions</h2>
                <p className="text-[#a3a3a3] font-sans tracking-[-0.03em] text-[15px] opacity-100">{CONFIG.github.contributionsText}</p>
              </div>
              <a
                href={CONFIG.social.github}
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
                className="github-calendar-scroll overflow-x-auto overflow-y-hidden"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px)',
                  maskImage: 'linear-gradient(to right, transparent, black 40px)'
                }}
              >
                <div className="pr-2 pb-2">
                  <GitHubCalendar
                    username={displayGithubUsername}
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
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="mt-8 pt-12 relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[749px] border-t border-dotted border-[#404040]"></div>
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-white font-serif text-[26px] mb-2">Projects</h2>
                <p className="text-[#a3a3a3] font-sans tracking-[-0.03em] text-[15px] opacity-100">Here's a list of projects I loved making :)</p>
              </div>
            </div>

            <div className="flex flex-col">
              {CONFIG.projects.map((project, index) => (
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[749px] border-t border-dotted border-[#404040]"></div>

            <div className="-ml-6 overflow-hidden">
              <AnimatedCarousel
                title={CONFIG.stack.title}
                subTitle={CONFIG.stack.subtitle}
                logos={CONFIG.stack.logos}
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[749px] border-t border-dotted border-[#404040]"></div>

            <div className="w-full text-left mt-6">
              <h3 className="text-white font-serif tracking-[-0.03em] text-[22px] mb-2">Let's connect</h3>
              <p className="text-sm text-[#a3a3a3] mb-6">Find me on these platforms:</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#737373]">
                <a href={CONFIG.social.github} className="hover:text-white transition-colors flex items-center gap-2"><GithubIcon size={14} /> GitHub</a>
                <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><Twitter size={14} /> Twitter</a>
                <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={14} /> LinkedIn</a>
                <a href={CONFIG.social.email} className="hover:text-white transition-colors flex items-center gap-2"><Mail size={14} /> Mail</a>
              </div>
              <p className="text-xs text-[#404040] mt-8">
                © {new Date().getFullYear()} {CONFIG.name}
              </p>
            </div>
          </section>
        </main>

        {/* Signature perfectly attached to the absolute physical bottom */}
        <div className="w-full flex items-end justify-center overflow-hidden pointer-events-auto relative z-30 mt-10">
          <TextHoverEffect text={CONFIG.firstName} />
        </div>
      </div>

      {/* Scroll Progress Tracker */}
      <ScrollTracker />
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
    <div className="border-b border-[#262626]/50 last:border-0 transition-colors">
      <button 
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between group transition-colors px-2 -mx-2 rounded-lg"
      >
        <div className="flex items-center gap-4">
          <div className="text-[#737373] transition-colors">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          <h3 className="text-white font-sans font-medium text-[15px] tracking-tight transition-transform duration-150 ease-in group-hover:scale-[1.2] origin-left">
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
        <h3 className="text-white font-sans font-medium text-[15px] tracking-tight mb-1">
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
