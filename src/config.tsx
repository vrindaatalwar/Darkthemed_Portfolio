import { useState, useEffect, type ReactNode } from 'react';
import { React as ReactLogo, Nextjs, Vercel, TypeScript, TailwindCSS, GitHub, Figma } from './components/ui/tech-logos';
import profileImg from './assets/Vrindaapfp.png';
import { Cards } from './components/ui/cards';
import { NavBody, NavItems, NavbarLogo } from './components/ui/resizable-navbar';

import MultiStateMorphButton from './components/ui/multi-state-morph-button';
import { DynamicSearch } from './components/ui/dynamicsearch';

const WaitlistDemo = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) throw new Error("Email required");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setEmail("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 relative z-10 items-center justify-center w-full max-w-[600px] mx-auto transform scale-[0.9] origin-center">

      <MultiStateMorphButton
        label="Continue"
        onClick={handleSubscribe}
        height={40}
        containerClassName="w-full sm:w-[104px] shrink-0"
        className="text-black font-sans tracking-tight font-medium rounded-xl transition-all duration-300 hover:bg-white/70"
        colors={{
          idle: "#ffffff",
          success: "#ffffff",
          error: "#ffffff",
        }}
      />
    </div>
  );
};

const NavbarDemo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const items = [{ name: 'about', link: '#' }, { name: 'works', link: '#' }, { name: 'contact', link: '#' }];

  useEffect(() => {
    const interval = setInterval(() => setIsScrolled(prev => !prev), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[120px] flex flex-col items-center justify-center">
      <div className="absolute inset-0" />
      <div className="w-[1000px] origin-center transform scale-[0.4] sm:scale-[0.6] flex justify-center">
        <NavBody visible={isScrolled} className="!flex">
          <NavbarLogo />
          <NavItems items={items} className="!flex" />
        </NavBody>
      </div>
    </div>
  );
};

const Highlight = ({ children }: { children: ReactNode }) => (
  <span className="underline decoration-wavy decoration-1 underline-offset-[3px] [text-decoration-skip-ink:none]" style={{ textDecorationColor: 'white' }}>
    {children}
  </span>
);

export const CONFIG = {
  name: "Vrindaa Talwar",
  firstName: "Vrindaa",
  title: "Design Engineer • Thinker • Builder",
  profileImage: profileImg,

  social: {
    twitter: "https://twitter.com/vrndtwr",
    github: "https://github.com/vrindaatalwar",
    linkedin: "https://linkedin.com",
    email: "mailto:vrindaatalwar@gmail.com"
  },

  about: {
    paragraphs: [
      <>I love to design <Highlight>stuff</Highlight></>,
      <>I’m exploring how to turn ideas into simple, functional <Highlight>projects</Highlight> while learning the craft of good <Highlight>design</Highlight> and clean <Highlight>code</Highlight>.</>,
      <>My mission is to <Highlight>build</Highlight> cool things, keep <Highlight>learning</Highlight>, and keep my caffeine intake at socially acceptable levels.</>
    ]
  },

  experience: [
    { company: "IIIT Allahbahad", role: "Open source contribution", date: "Dec 25 - Jan 26", location: "" },
  ],

  github: {
    // Leave blank to use the dummy fallback.
    username: "vrindaatalwar",
    // This dictates the generic user shown if username is left blank above.
    fallbackUsername: "torvalds",
    contributionsText: "150 contributions in the last year",
  },

  projects: [
    {
      title: "ChainForecast",
      description: "An advanced predictive analytics platform leveraging machine learning algorithms to forecast supply chain disruptions. Features real-time data integration and interactive scenario modeling for enterprise resilience.",
      techStack: ["React", "TypeScript", "TailwindCSS", "Python", "FastAPI"],
      link: "https://chainforecast.vercel.app/"
    },
    {
      title: "Agentic Tools",
      description: "An innovative platform for autonomous AI tools. Features a high-conversion, beautifully animated waitlist page designed to capture early user interest and build pre-launch momentum.",
      techStack: ["React", "Framer Motion", "TailwindCSS", "Next.js"],
      link: "https://www.agentictools.in/"
    },
    {
      title: "Professional Portfolio",
      description: "A sleek, responsive personal portfolio website showcasing professional experience and featured projects. Designed with a dark-themed aesthetic and subtle interactive animations for a premium feel.",
      techStack: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
      link: "https://portfolio-seven-black-41.vercel.app/"
    },
    {
      title: "Nexus",
      description: "A modern, high-converting landing page designed with premium aesthetics and fluid animations. Built to deliver a seamless user experience and maximize engagement.",
      techStack: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
      link: "https://nexus-p9d2qjv4v-vs-projects-eec286f9.vercel.app/"
    }
  ],

  components: [
    {
      title: "Motion Card",
      demo: (
        <div className="flex items-center justify-center w-full h-[450px] bg-[#111010] rounded-md overflow-hidden relative">
          <div className="w-[1040px] shrink-0 flex justify-center items-center scale-[0.8]">
            <Cards />
          </div>
        </div>
      ),
      link: "https://www.google.com"
    },
    {
      title: "Dynamic Navbar",
      demo: <NavbarDemo />,
      link: "https://www.google.com"
    },
    {
      title: "Interactive Morph Button",
      demo: (
        <div className="flex items-center justify-center w-full h-48 bg-[#111010] rounded-md overflow-hidden relative">
          <div className="absolute inset-0" />
          <WaitlistDemo />
        </div>
      ),
      link: "https://www.google.com"
    },
    {
      title: "Interactive Search Bar",
      demo: (
        <div className="flex items-center justify-center w-full h-48 bg-[#111010] rounded-md overflow-hidden relative">
          <div className="w-full transform scale-[0.9] origin-center">
            <DynamicSearch />
          </div>
        </div>
      ),
      link: "https://www.google.com"
    }
  ],

  stack: {
    title: "Stack I use",
    subtitle: "Technologies I work with to build products that solve real problems",
    logos: [
      { name: "React", icon: ReactLogo },
      { name: "Next.js", icon: Nextjs },
      { name: "Vercel", icon: Vercel },
      { name: "TypeScript", icon: TypeScript },
      { name: "Tailwind CSS", icon: TailwindCSS },
      { name: "GitHub", icon: GitHub },
      { name: "Figma", icon: Figma },
    ]
  }
};
