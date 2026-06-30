import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  BrainCircuit,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trophy,
  UserRound,
  Zap
} from 'lucide-react';

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Project = {
  title: string;
  category: string;
  year: string;
  image: string;
  summary: string;
  stack: string[];
  highlights: string[];
  liveUrl: string;
  sourceUrl: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  description: string;
};

export const site = {
  name: 'Safayet Ullah',
  role: 'Creative Frontend Developer & Software Engineering Student',
  university: 'Southeast University',
  location: 'Dhaka, Bangladesh',
  email: 'safayet.ullah@example.com',
  resumePath: '/resume-safayet-ullah.pdf',
  profileImage: '/images/profile-placeholder.svg',
  availability: 'Open to internships, freelance work, and collaborative product ideas',
  headline: 'I design immersive web experiences where elegant interfaces meet interactive 3D storytelling.',
  intro:
    'A student developer focused on modern web engineering, polished UI systems, and fast interactive products. This portfolio is built to be edited from one data file, so real projects, links, and achievements can be added quickly.',
  keywords: ['3D Web', 'React', 'Next.js', 'UI Engineering', 'Creative Coding'],
  stats: [
    { label: 'Featured Projects', value: '06' },
    { label: 'Core Skills', value: '18+' },
    { label: 'Responsive Sections', value: '10' },
    { label: 'Reusable Components', value: '25+' }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/yourusername', icon: Github },
    { label: 'Email', href: 'mailto:safayet.ullah@example.com', icon: Mail },
    { label: 'Live Work', href: '#projects', icon: ExternalLink }
  ] satisfies SocialLink[],
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' }
  ],
  focusCards: [
    {
      icon: Sparkles,
      title: 'Experience-first UI',
      text: 'Layouts, motion, and micro-interactions are designed around clarity, not decoration.'
    },
    {
      icon: Layers3,
      title: 'Real-time 3D scenes',
      text: 'Procedural WebGL visuals create a premium feel without heavy model files.'
    },
    {
      icon: ShieldCheck,
      title: 'Performance minded',
      text: 'Mobile fallbacks, lightweight assets, semantic HTML, and accessible navigation are included.'
    }
  ],
  skillGroups: [
    {
      title: 'Frontend Craft',
      icon: Code2,
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI']
    },
    {
      title: '3D & Motion',
      icon: Blocks,
      skills: ['Three.js', 'React Three Fiber', 'Drei', 'Framer Motion', 'Scroll Motion', 'WebGL Basics']
    },
    {
      title: 'Product Thinking',
      icon: BrainCircuit,
      skills: ['UX Strategy', 'Design Systems', 'Case Studies', 'Accessibility', 'SEO Basics']
    },
    {
      title: 'Backend Basics',
      icon: Database,
      skills: ['Node.js', 'REST APIs', 'MongoDB', 'MySQL', 'Firebase', 'Auth Flows']
    }
  ],
  projects: [
    {
      title: 'OrbitLearn LMS',
      category: 'Education Platform',
      year: '2026',
      image: '/images/project-orbitlearn.svg',
      summary:
        'A polished learning dashboard for students and instructors with progress cards, class schedules, and assignment tracking.',
      stack: ['Next.js', 'TypeScript', 'Charts', 'Auth'],
      highlights: ['Role-based dashboards', 'Reusable card system', 'Mobile-first screens'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/yourusername/orbitlearn'
    },
    {
      title: 'NexaStore 3D Commerce',
      category: 'Interactive Ecommerce',
      year: '2026',
      image: '/images/project-nexastore.svg',
      summary:
        'A concept storefront with immersive product highlights, clean checkout flow, and conversion-focused product storytelling.',
      stack: ['React', 'Three.js', 'Stripe UI', 'CMS'],
      highlights: ['3D product hero', 'Fast category pages', 'Premium product cards'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/yourusername/nexastore'
    },
    {
      title: 'PulseCare Portal',
      category: 'Health Tech Dashboard',
      year: '2025',
      image: '/images/project-pulsecare.svg',
      summary:
        'A clean admin portal for appointments, reports, and patient status tracking with accessible layouts and quick search.',
      stack: ['Next.js', 'MySQL', 'API Routes', 'UI Kit'],
      highlights: ['Admin workflows', 'Searchable tables', 'Status analytics'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/yourusername/pulsecare'
    },
    {
      title: 'Atlas AI Notes',
      category: 'AI Productivity Tool',
      year: '2025',
      image: '/images/project-atlasnotes.svg',
      summary:
        'A study assistant interface for summarizing notes, organizing concepts, and turning long content into revision cards.',
      stack: ['React', 'API', 'Markdown', 'Local Storage'],
      highlights: ['Smart note views', 'Card-based revision', 'Keyboard-friendly UX'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/yourusername/atlas-ai-notes'
    }
  ] satisfies Project[],
  experience: [
    {
      role: 'Software Engineering Student',
      organization: 'Southeast University',
      period: 'Present',
      description:
        'Building strong foundations in programming, software design, database systems, web engineering, and project presentation.'
    },
    {
      role: 'Frontend Project Builder',
      organization: 'Independent Practice',
      period: '2025 — Present',
      description:
        'Creating responsive websites, dashboards, landing pages, and portfolio systems using modern React-based workflows.'
    },
    {
      role: 'Creative Coding Explorer',
      organization: 'Personal Lab',
      period: '2024 — Present',
      description:
        'Experimenting with interactive visuals, 3D layouts, UI animation, and reusable component architecture.'
    }
  ] satisfies ExperienceItem[],
  principles: [
    { icon: Rocket, title: 'Fast first impression', text: 'The first screen explains who you are, what you do, and why the visitor should continue.' },
    { icon: TerminalSquare, title: 'Clean engineering', text: 'Data-driven content, reusable components, typed structures, and clear folder organization.' },
    { icon: Trophy, title: 'Proof over decoration', text: 'Projects include role, stack, highlights, and direct links so recruiters can evaluate quickly.' },
    { icon: UserRound, title: 'Personal brand', text: 'A warm non-black visual identity helps the site stand apart from common dark portfolios.' },
    { icon: GraduationCap, title: 'Student-ready', text: 'Built for a university profile today, but scalable for internships, freelance work, and jobs later.' },
    { icon: Zap, title: 'Interactive but usable', text: '3D adds memorability while the content remains easy to read on mobile and desktop.' }
  ],
  testimonials: [
    {
      quote:
        'Safayet combines curiosity with careful execution. His work feels thoughtful, modern, and easy to understand.',
      author: 'Academic Mentor',
      role: 'Southeast University'
    },
    {
      quote:
        'A clean portfolio structure with strong visual identity and practical project storytelling.',
      author: 'Project Reviewer',
      role: 'Software Lab'
    }
  ]
};
