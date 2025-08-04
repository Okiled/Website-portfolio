import React, { useState, useEffect, useRef } from 'react';
import ParallaxHero from './components/ParallaxHero';
import { ParallaxProvider } from 'react-scroll-parallax'; 

import { Github, Linkedin, Mail, ExternalLink, Code, Brain, TrendingUp, Monitor, Database, Smartphone, ChevronDown, Menu, X, Star, ArrowRight, Award, BookOpen, Zap } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  label: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Project {
  title: string;
  description: string;
  github: string;
  tech: string[];
  color: string;
}

interface Skill {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  skills: string[];
  color: string;
}

// Text Scramble Component
interface TextScrambleProps {
  text: string;
  className?: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({ text, className = '' }) => {
  const [displayChars, setDisplayChars] = useState<string[]>(text.split(''));

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const intervalsRef = useRef<{ [key: number]: number }>({});
  const timeoutsRef = useRef<{ [key: number]: number }>({});

  const scrambleLetter = (index: number) => {
    const originalLetter = text[index];
    if (originalLetter === ' ') return;

    if (intervalsRef.current[index]) {
      clearInterval(intervalsRef.current[index]);
    }
    if (timeoutsRef.current[index]) {
      clearTimeout(timeoutsRef.current[index]);
    }

    intervalsRef.current[index] = window.setInterval(() => {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      setDisplayChars(prev => {
        const newChars = [...prev];
        newChars[index] = randomLetter;
        return newChars;
      });
    }, 100);
  };

  const stopScramble = (index: number) => {
    timeoutsRef.current[index] = window.setTimeout(() => {
      if (intervalsRef.current[index]) {
        clearInterval(intervalsRef.current[index]);
        delete intervalsRef.current[index];
      }

      setDisplayChars(prev => {
        const newChars = [...prev];
        newChars[index] = text[index];
        return newChars;
      });

      delete timeoutsRef.current[index];
    }, 300);
  };

  useEffect(() => {
    return () => {
      (Object.values(intervalsRef.current) as number[]).forEach(clearInterval);
      (Object.values(timeoutsRef.current) as number[]).forEach(clearTimeout);
    };
  }, []);

  return (
    <span className={className}>
      {displayChars.map((char, index) => (
        <span
          key={index}
          className={`inline-block cursor-pointer transition-all duration-200 ${
            char === ' ' ? 'w-4' : 'hover:scale-110 mx-1'
          } ${intervalsRef.current[index] ? 'text-cyan-300' : ''}`}
          onMouseEnter={() => scrambleLetter(index)}
          onMouseLeave={() => stopScramble(index)}
          style={{
            minWidth: char === ' ' ? '1rem' : '0.8rem',
            textAlign: 'center',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = (): void => {
      const sections: string[] = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition: number = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop: number = element.offsetTop;
          const offsetHeight: number = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Floating particles animation
  const FloatingParticles: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  // Animated counter
  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState<number>(0);
    
    useEffect(() => {
      let startTime: number;
      const animate = (currentTime: number): void => {
        if (!startTime) startTime = currentTime;
        const progress: number = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, duration]);
    
    return <span>{count}{suffix}</span>;
  };

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/Okiled", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/deliko-hartono", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hartonodeliko@gmail.com", label: "Email" }
  ];

  const experiences: Experience[] = [
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
      period: "2019 – 2024",
      points: [
        "Assisted in daily operations of family retail business for 5 years",
        "Provided customer service, handled transactions, and managed inventory",
        "Developed communication skills and business operation understanding"
      ],
      icon: Award,
      color: "purple"
    }
  ];

  const projects: Project[] = [
    {
      title: "B-Connect Platform",
      description: "Comprehensive connection platform with modern web technologies, featuring user authentication, real-time communication, and responsive design.",
      github: "https://github.com/Okiled/b-connect",
      tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io'],
      color: "cyan"
    },
    {
      title: "AI Bitcoin Backtesting",
      description: "Intelligent backtesting system for Bitcoin trading strategies using machine learning with data visualization dashboards and real-time market analysis.",
      github: "https://github.com/Okiled/Backtest-Bitcoin-using-ai",
      tech: ['Python', 'PyTorch', 'Pandas', 'Matplotlib'],
      color: "purple"
    }
  ];

  const skills: Skill[] = [
    {
      icon: Code,
      title: "Programming",
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
      color: "cyan"
    },
    {
      icon: Monitor,
      title: "Web Development",
      skills: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3'],
      color: "purple"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ['React Native', 'Flutter', 'Android Studio'],
      color: "pink"
    },
    {
      icon: Brain,
      title: "AI & ML",
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
      color: "cyan"
    },
    {
      icon: Database,
      title: "Database & Tools",
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'Docker'],
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: "Finance & Trading",
      skills: ['Quantitative Analysis', 'Algorithmic Trading', 'Financial Modeling'],
      color: "pink"
    }
  ];

  const menuItems: string[] = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden font-poppins">
      <FloatingParticles />
      
      {/* Custom cursor effect */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isMenuOpen ? 1.5 : 1})`
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-75"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-black/20 backdrop-blur-xl border-b border-white/10 z-40 transition-all duration-500 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse font-Archivo">
              Deliko
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              {menuItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-inter ${
                    activeSection === item.toLowerCase()
                      ? 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mt-4 py-4 border-t border-white/10 space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 transform hover:translate-x-2 font-inter"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1 animate-spin hover:animate-spin-fast">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors duration-300">
                <span className="text-2xl sm:text-4xl font-bold text-white font-Archivo">DH</span>
              </div>
            </div>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transform transition-all duration-1000 delay-200 font-poppins ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <TextScramble 
              text="DELIKO HARTONO"
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            />
          </h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 font-inter ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            Information Technology Student passionate about 
            <span className="text-cyan-400 font-semibold"> AI</span>, 
            <span className="text-purple-400 font-semibold"> Quantitative Finance</span>, and 
            <span className="text-pink-400 font-semibold"> Full-Stack Development</span>
          </p>
          
          <div className={`flex justify-center space-x-4 sm:space-x-6 mb-12 transform transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <a 
                key={label}
                href={href} 
                className="group p-3 sm:p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12 backdrop-blur-sm border border-white/10"
                style={{ animationDelay: `${600 + index * 100}ms` }}
                aria-label={label}
              >
                <Icon size={20} className="text-white sm:w-6 sm:h-6 group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-12 transform transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-nunito">
                <AnimatedCounter end={0} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-inter">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-nunito">
                <AnimatedCounter end={0} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-inter">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-pink-400 font-nunito">
                <AnimatedCounter end={0} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-inter">Community</div>
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-white/60 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <ChevronDown size={28} className="sm:w-8 sm:h-8" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-black/20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="transform hover:scale-105 transition-all duration-300">
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-inter">
                  I'm an Information Technology student at Binus University with a passion for AI, quantitative finance, and full-stack development. Currently in my 5th semester with a focus on building innovative solutions that bridge technology and finance.
                </p>
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 delay-100">
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-inter">
                  Active in the Web3 ecosystem since 2022, I have experience in blockchain technologies, DeFi, and cryptocurrency trading. I'm particularly interested in applying AI to financial markets and decentralized systems.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  { text: 'AI & Machine Learning', color: 'cyan' },
                  { text: 'Quantitative Finance', color: 'purple' },
                  { text: 'Full-Stack Development', color: 'pink' }
                ].map(({ text, color }, index) => (
                  <div 
                    key={text}
                    className={`px-3 sm:px-4 py-2 bg-${color}-400/10 border border-${color}-400/20 rounded-lg hover:bg-${color}-400/20 transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className={`text-${color}-400 text-sm sm:text-base font-inter`}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2 transform hover:scale-105 transition-all duration-500">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/10">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-cyan-400 mr-3" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins">Education</h3>
                </div>
                <div className="space-y-4">
                  <div className="group cursor-pointer">
                    <h4 className="text-lg sm:text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 font-nunito">Binus University</h4>
                    <p className="text-white/80 font-inter">Bachelor's in Information Technology</p>
                    <p className="text-white/60 font-inter">Aug 2023 – Expected 2027</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <p className="text-white/60 font-inter">GPA: 3.0/4.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Experience
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={exp.title}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 bg-${exp.color}-400/10 rounded-lg group-hover:bg-${exp.color}-400/20 transition-all duration-300`}>
                      <exp.icon className={`w-6 h-6 text-${exp.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 font-poppins">{exp.title}</h3>
                      <p className={`text-${exp.color}-400 text-base sm:text-lg font-nunito`}>{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-white/60 mt-2 sm:mt-0 text-sm sm:text-base font-inter">{exp.period}</span>
                </div>
                <ul className="text-white/80 space-y-2">
                  {exp.points.map((point, pointIndex) => (
                    <li 
                      key={pointIndex}
                      className="flex items-start hover:text-white transition-colors duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mt-1 mr-2 text-cyan-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-inter">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 font-poppins">{project.title}</h3>
                  <div className="flex space-x-3">
                    <a 
                      href={project.github} 
                      className="text-white/60 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} className="sm:w-6 sm:h-6" />
                    </a>
                    <ExternalLink size={20} className="text-white/60 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 cursor-pointer sm:w-6 sm:h-6" />
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed text-sm sm:text-base group-hover:text-white transition-colors duration-300 font-inter">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={tech} 
                      className={`px-2 sm:px-3 py-1 bg-${project.color}-400/10 text-${project.color}-400 rounded-full text-xs sm:text-sm hover:bg-${project.color}-400/20 transition-all duration-300 transform hover:scale-105 font-inter`}
                      style={{ animationDelay: `${techIndex * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={skill.title}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 p-3 bg-${skill.color}-400/10 rounded-xl group-hover:bg-${skill.color}-400/20 transition-all duration-300`}>
                  <skill.icon className={`w-full h-full text-${skill.color}-400 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300 font-poppins">{skill.title}</h3>
                <div className="space-y-2">
                  {skill.skills.map((skillName, skillIndex) => (
                    <div 
                      key={skillName} 
                      className="text-white/80 hover:text-white transition-colors duration-300 text-sm sm:text-base font-inter"
                      style={{ animationDelay: `${skillIndex * 50}ms` }}
                    >
                      {skillName}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-poppins">
            Get In Touch
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed font-inter">
              I'm always interested in discussing new opportunities, innovative projects, or collaborations in AI, fintech, and web development. Let's connect!
            </p>
            
            <div className="flex justify-center mb-8 sm:mb-12">
              <a 
                href="mailto:hartonodeliko@gmail.com"
                className="group flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <Mail size={20} className="text-white sm:w-6 sm:h-6 group-hover:animate-bounce" />
                <span className="text-white font-semibold text-sm sm:text-base font-inter">Send Email</span>
                <ArrowRight size={16} className="text-white sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            <div className="flex justify-center space-x-4 sm:space-x-6">
              {[
                { icon: Github, href: "https://github.com/Okiled", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/deliko-hartono", label: "LinkedIn" }
              ].map(({ icon: Icon, href, label }, index) => (
                <a 
                  key={label}
                  href={href}
                  className="group p-3 sm:p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12 backdrop-blur-sm border border-white/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={label}
                >
                  <Icon size={24} className="text-white sm:w-7 sm:h-7 group-hover:text-cyan-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <p className="text-white/60 text-sm sm:text-base font-inter">
                © 2025 Deliko Hartono. Built with React & Tailwind CSS.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white/40 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-inter">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => scrollToSection('home')}
        className={`fixed bottom-6 right-6 p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/25 transition-all duration-300 z-40 ${
          activeSection !== 'home' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } hover:scale-110 hover:shadow-2xl`}
      >
        <ChevronDown className="w-5 h-5 text-white rotate-180" />
      </button> 
    </div>
  );
};

export default App;