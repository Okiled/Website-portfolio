import { Download, Github, Linkedin, Mail, TrendingUp, Award, Code, Globe, Smartphone, Brain, Database, BarChart3 } from 'lucide-react';
import cvPdf from '../asset/DelikoHartono.pdf';
import bconnectImg from "../asset/bconnect.jpg";
import bitcoinImg from "../asset/thumbnailbitcoin.jpg";
import type { Experience, Project, Skill, SocialLink, ProjectDetails } from '../types';

const techIconMapping: Record<string, string> = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
  "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
  "WebSocket": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
  "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  "Scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "Matplotlib": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  "Chart.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
};

export const socialLinks: SocialLink[] = [
  { icon: Download, href: cvPdf, label: 'Download CV'},
  { icon: Github, href: 'https://github.com/Okiled', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/deliko-hartono-9b06b827a/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hartonodeliko@gmail.com', label: 'Email' }
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
    demo: "https://b-connect-nu.vercel.app/",
    tech: ["React.js", "Node.js", "MongoDB", "Socket.io"],
    color: "cyan",
    image: bconnectImg
  },
  {
    title: "AI Bitcoin Backtesting",
    description: "Intelligent backtesting system for Bitcoin trading strategies using machine learning with data visualization dashboards and real-time market analysis.",
    github: "https://github.com/Okiled/Backtest-Bitcoin-using-ai",
    demo: "#",
    tech: ["Python", "PyTorch", "Pandas", "Matplotlib"],
    color: "purple",
    image: bitcoinImg
  }
];

export const skills: Skill[] = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java"],
    color: "cyan",
    description: "Developing applications using various programming languages for web, backend, and automation purposes."
  },
  {
    icon: Globe,
    title: "Web Development",
    skills: ["React.js", "Node.js", "Express.js", "HTML5", "CSS3"],
    color: "purple",
    description: "Building interactive websites and APIs using popular web frameworks and technologies."
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    skills: ["Android Studio"],
    color: "pink",
    description: "Creating cross-platform mobile applications using React Native and Flutter."
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    color: "cyan",
    description: "Working with data analysis, building AI/ML models, and automating business processes."
  },
  {
    icon: Database,
    title: "Database & Backend",
    skills: ["MongoDB", "MySQL", "Git"],
    color: "purple",
    description: "Managing data storage, backend APIs, deployment, and DevOps workflows."
  },
  {
    icon: BarChart3,
    title: "Finance & Trading",
    skills: ["Quantitative Analysis", "Algorithmic Trading", "Financial Modeling"],
    color: "pink",
    description: "Processing financial data, building automated trading systems, and analyzing markets."
  }
];

export const getProjectDetails = (project: Project): ProjectDetails => {
  switch (project.title) {
    case "B-Connect Platform":
      return {
        fullDescription: "B-Connect is a comprehensive business connection platform designed to streamline professional networking and collaboration. Built with modern React frontend and robust Express.js backend API, it provides seamless integration for business professionals to connect, communicate, and collaborate effectively in today's digital landscape.",
        features: [
          "Real-time messaging and notifications system",
          "Advanced professional networking tools",
          "Comprehensive business profile management",
          "Smart search and filtering capabilities",
          "Secure JWT-based authentication system",
          "Responsive design for all devices",
          "File sharing and collaboration tools",
          "Integration with social media platforms"
        ],
        installation: [
          "Clone both repositories (frontend and backend)",
          "Frontend: git clone https://github.com/KelvinLihandy/b-connect.git",
          "Backend: git clone https://github.com/KelvinLihandy/b-connect-api.git",
          "Install dependencies: npm install",
          "Set up environment variables",
          "Configure MongoDB connection string",
          "Run backend: npm run dev",
          "Run frontend: npm run dev",
          "Visit localhost:3000"
        ],
        links: {
          github: "https://github.com/Okiled/b-connect",
          githubApi: "https://github.com/KelvinLihandy/b-connect-api",
          demo: "https://b-connect-nu.vercel.app/"
        }
      };

    case "AI Bitcoin Backtesting":
      return {
        fullDescription: "An advanced AI-powered Bitcoin portfolio management framework integrating LSTM neural networks, Black-Litterman model, Enhanced CVaR risk management, and PPO reinforcement learning for optimal cryptocurrency trading strategies.",
        features: [
          "LSTM temporal prediction",
          "Black-Litterman portfolio optimization",
          "Enhanced CVaR risk control",
          "PPO reinforcement trading",
          "Technical indicator integration",
          "Performance analytics",
          "Dynamic rebalancing",
          "Comprehensive risk assessment"
        ],
        installation: [
          "Clone repository",
          "Install Python 3.8+",
          "Install dependencies",
          "Configure parameters",
          "Run main.py"
        ],
        links: {
          github: "https://github.com/Okiled/Backtest-Bitcoin-using-ai",
          demo: "#"
        },
        performance: {
          "Total Return": "6,280.12%",
          "Benchmark": "2,447.67%",
          "Sharpe Ratio": "1.50",
          "Max Drawdown": "57.00%",
          "Win Rate": "70%",
          "RMSE": "0.0262"
        }
      };

    default:
      return {
        fullDescription: project.description,
        features: ["Modern web development", "Responsive design", "User-friendly interface"],
        installation: ["Clone repository", "Install dependencies", "Run application"],
        links: { github: project.github, demo: project.demo }
      };
  }
};

export { techIconMapping };
