import { 
  Github, 
  Linkedin, 
  Mail, 
  TrendingUp, 
  Award, 
  Code, 
  Globe, 
  Smartphone, 
  Brain, 
  Database, 
  BarChart3 
} from 'lucide-react';

import type { Experience, Project, Skill, SocialLink } from './types';

export const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/Okiled", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/deliko-hartono", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hartonodeliko@gmail.com", label: "Email" }
];

export const experiences: Experience[] = [
  {
    title: "Discord Community Manager",
    company: "Trading Community",
    period: "Apr 2024 – May 2024",
    points: [
      "Managed a Discord trading community with over 500 active members",
      "Organized trading discussions, market analysis sessions, and educational content",
      "Developed understanding of financial markets and trading psychology"
    ],
    icon: TrendingUp,
    color: "cyan"
  },
  {
    title: "Family Business Assistant",
    company: "Retail Store",
    period: "2019 – Present",
    points: [
      "Assisted in daily operations of family retail business for 5 years",
      "Provided customer service, handled transactions, and managed inventory",
      "Developed communication skills and business operation understanding"
    ],
    icon: Award,
    color: "purple"
  }
];

export const projects: Project[] = [
  {
    title: "B-Connect Platform",
    description: "Comprehensive connection platform with modern web technologies, featuring user authentication, real-time communication, and responsive design.",
    github: "https://github.com/Okiled/b-connect",
    demo: "#",
    tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io'],
    color: "cyan",
    stats: { views: 1234, likes: 89, comments: 23 }
  },
  {
    title: "AI Bitcoin Backtesting",
    description: "Intelligent backtesting system for Bitcoin trading strategies using machine learning with data visualization dashboards and real-time market analysis.",
    github: "https://github.com/Okiled/Backtest-Bitcoin-using-ai",
    demo: "#",
    tech: ['Python', 'PyTorch', 'Pandas', 'Matplotlib'],
    color: "purple",
    stats: { views: 2156, likes: 147, comments: 34 }
  },
  {
    title: "Portfolio Website",
    description: "Modern, interactive portfolio website built with React, featuring advanced animations, particle systems, and responsive design.",
    github: "#",
    demo: "#",
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    color: "pink",
    stats: { views: 856, likes: 67, comments: 12 }
  },
  {
    title: "Trading Bot Interface",
    description: "Real-time trading bot interface with live market data, automated trading strategies, and comprehensive analytics dashboard.",
    github: "#",
    demo: "#",
    tech: ['Vue.js', 'WebSocket', 'Chart.js', 'Express'],
    color: "cyan",
    stats: { views: 1789, likes: 123, comments: 45 }
  }
];

export const skills: Skill[] = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
    color: "cyan",
    description: "Developing applications using various programming languages for web, backend, and automation purposes."
  },
  {
    icon: Globe,
    title: "Web Development",
    skills: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3'],
    color: "purple",
    description: "Building interactive websites and APIs using popular web frameworks and technologies."
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    skills: ['React Native', 'Flutter', 'Android Studio'],
    color: "pink",
    description: "Creating cross-platform mobile applications using React Native and Flutter."
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
    color: "cyan",
    description: "Working with data analysis, building AI/ML models, and automating business processes."
  },
  {
    icon: Database,
    title: "Database & Backend",
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'Docker'],
    color: "purple",
    description: "Managing data storage, backend APIs, deployment, and DevOps workflows."
  },
  {
    icon: BarChart3,
    title: "Finance & Trading",
    skills: ['Quantitative Analysis', 'Algorithmic Trading', 'Financial Modeling'],
    color: "pink",
    description: "Processing financial data, building automated trading systems, and analyzing markets."
  }
];
