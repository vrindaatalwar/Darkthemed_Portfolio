import { React as ReactLogo, Nextjs, Vercel, TypeScript, TailwindCSS, GitHub, Figma } from './components/ui/tech-logos';

export const CONFIG = {
  name: "Jane Doe",
  firstName: "Jane",
  title: "Software Engineer • Builder • Thinker",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  
  social: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:hello@example.com"
  },

  about: {
    paragraphs: [
      "I am a passionate software engineer who loves building scalable applications and exploring new technologies. I spend most of my time architecting systems that make life a bit simpler or spark curiosity, often blending structure with imagination.",
      "Outside of work, I am an avid open-source contributor and a lifelong learner. I enjoy diving deep into technical challenges, whether that's optimizing backend infrastructure, designing intuitive interfaces, or writing about my learnings.",
      "Currently open to new opportunities and collaborations. The kind that let me dive deep into interesting systems, build cool fast tools, or collaborate on experimental ideas."
    ]
  },

  experience: [
    { company: "TechCorp Global", role: "Senior Software Engineer", date: "Jan 2023 — Present", location: "Remote" },
    { company: "Innovate Inc.", role: "Full Stack Developer", date: "Mar 2021 — Dec 2022", location: "New York, NY" },
    { company: "Startup Beta", role: "Frontend Engineer", date: "Jun 2019 — Feb 2021", location: "San Francisco, CA" },
  ],

  github: {
    // Leave blank to use the dummy fallback.
    username: "", 
    // This dictates the generic user shown if username is left blank above.
    fallbackUsername: "torvalds", 
    contributionsText: "1,240 contributions in the last year",
  },

  projects: [
    {
      title: "PulseFlow",
      description: "A real-time analytics dashboard tracking user engagement metrics across multiple platforms. Built with a distributed microservices architecture to handle high throughput data ingestion and processing with minimal latency.",
      techStack: ["Next.js", "Node.js", "Redis", "Kafka", "PostgreSQL", "TailwindCSS"],
      link: "https://www.google.com"
    },
    {
      title: "AuraSpace",
      description: "A collaborative 3D workspace for remote design teams. Utilizes WebGL for rendering interactive models and WebSockets for synchronous multi-user editing, providing a seamless virtual studio environment.",
      techStack: ["React", "Three.js", "Python", "FastAPI", "WebSockets"],
      link: "https://www.google.com"
    },
    {
      title: "Nexus Protocol",
      description: "A decentralized lending platform focused on algorithmic interest rate models. Features a highly optimized smart contract suite audited for security, ensuring safe and efficient capital allocation across liquidity pools.",
      techStack: ["Solidity", "Ethers.js", "Hardhat", "React", "TypeScript"],
      link: "https://www.google.com"
    },
    {
      title: "Lumina",
      description: "An AI-powered content moderation API designed for community forums. Integrates state-of-the-art NLP models to automatically detect and flag harmful content with high accuracy while minimizing false positives.",
      techStack: ["Python", "PyTorch", "FastAPI", "Docker", "AWS"],
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
