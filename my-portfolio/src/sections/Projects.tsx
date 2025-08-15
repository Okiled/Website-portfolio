import React, { useState, useRef, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  Code2, 
  Layers3, 
  Star, 
  Cpu, 
  X, 
  Terminal, 
  BarChart3, 
  Brain,
  ChevronRight,
  Sparkles,
  Zap,
  Eye
} from 'lucide-react';
import { projects, getProjectDetails } from '../utils/data';
import type { ColorVariant } from '../types';

// Komponen reveal animations (sesuaikan dengan path yang sebenarnya)
import { RevealWrapper, TextReveal, StaggeredReveal } from '../animations/RevealAnimations';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [modalAnimation, setModalAnimation] = useState<'enter' | 'exit' | 'idle'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move handler (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
      // Prevent layout shift on desktop only
      if (!isMobile) {
        document.body.style.paddingRight = '15px';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedProject, isMobile]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject !== null) {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleCardClick = (index: number) => {
    setModalAnimation('enter');
    setSelectedProject(index);
  };

  const handleCloseModal = () => {
    setModalAnimation('exit');
    setTimeout(() => {
      setSelectedProject(null);
      setModalAnimation('idle');
    }, 300);
  };

  const filteredProjects = projects.filter(project => 
    !project.title.toLowerCase().includes('trading bot')
  );

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('bitcoin')) return Brain;
    if (title.toLowerCase().includes('platform') || title.toLowerCase().includes('connect')) return Layers3;
    if (title.toLowerCase().includes('portfolio') || title.toLowerCase().includes('website')) return Code2;
    return Cpu;
  };

  const getColorScheme = (color: ColorVariant) => {
    switch(color) {
      case 'cyan': 
        return {
          gradient: 'from-cyan-500/10 via-blue-500/8 to-cyan-400/10',
          border: 'hover:border-cyan-400/30',
          text: 'group-hover:text-cyan-300',
          glow: 'hover:shadow-cyan-500/20',
          particle: 'bg-cyan-400/50',
          tech: 'hover:border-cyan-400/30 hover:text-cyan-200',
          modalAccent: 'border-cyan-400/20 bg-cyan-500/5',
          buttonPrimary: 'bg-cyan-500 hover:bg-cyan-400 text-white',
          buttonSecondary: 'border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10',
          modalGlow: 'shadow-cyan-500/15'
        };
      case 'purple': 
        return {
          gradient: 'from-purple-500/10 via-violet-500/8 to-purple-400/10',
          border: 'hover:border-purple-400/30',
          text: 'group-hover:text-purple-300',
          glow: 'hover:shadow-purple-500/20',
          particle: 'bg-purple-400/50',
          tech: 'hover:border-purple-400/30 hover:text-purple-200',
          modalAccent: 'border-purple-400/20 bg-purple-500/5',
          buttonPrimary: 'bg-purple-500 hover:bg-purple-400 text-white',
          buttonSecondary: 'border-purple-400/30 text-purple-300 hover:bg-purple-500/10',
          modalGlow: 'shadow-purple-500/15'
        };
      case 'pink': 
        return {
          gradient: 'from-pink-500/10 via-rose-500/8 to-pink-400/10',
          border: 'hover:border-pink-400/30',
          text: 'group-hover:text-pink-300',
          glow: 'hover:shadow-pink-500/20',
          particle: 'bg-pink-400/50',
          tech: 'hover:border-pink-400/30 hover:text-pink-200',
          modalAccent: 'border-pink-400/20 bg-pink-500/5',
          buttonPrimary: 'bg-pink-500 hover:bg-pink-400 text-white',
          buttonSecondary: 'border-pink-400/30 text-pink-300 hover:bg-pink-500/10',
          modalGlow: 'shadow-pink-500/15'
        };
    }
  };

  return (
    <>
      <section id="projects" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.02),transparent_50%)]" />

        {/* Grid Background - Responsive */}
        <div className="absolute inset-0 opacity-[0.01] overflow-hidden">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.3)_1px,transparent_1px)]"
            style={{
              backgroundSize: isMobile ? '40px 40px' : '60px 60px',
              transform: !isMobile ? `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)` : 'none',
              transition: !isMobile ? 'transform 0.4s ease-out' : 'none'
            }}
          />
        </div>

        {/* Floating Orbs - Responsive */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.015] blur-2xl"
              style={{
                width: `${(isMobile ? 80 : 150) + i * (isMobile ? 40 : 80)}px`,
                height: `${(isMobile ? 80 : 150) + i * (isMobile ? 40 : 80)}px`,
                background: `radial-gradient(circle, ${
                  ['rgb(59, 130, 246)', 'rgb(139, 92, 246)', 'rgb(236, 72, 153)'][i]
                }, transparent)`,
                left: `${15 + i * 25}%`,
                top: `${10 + i * 20}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10" ref={containerRef}>
          {/* Header Section - Responsive */}
          <RevealWrapper
            animation="fadeIn"
            delay={100}
            className="text-center mb-12 sm:mb-16 md:mb-20"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/3 backdrop-blur-xl border border-white/8 rounded-full mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-white/5 group">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-300" />
              <span className="text-xs sm:text-sm font-semibold text-slate-400 group-hover:text-slate-300 transition-colors duration-300 tracking-wide">FEATURED PROJECTS</span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 tracking-tight px-2">
              <TextReveal 
                text="My Projects" 
                speed={50} 
                triggerOnce={false}
                threshold={0.3}
              />
            </h2>

            <RevealWrapper
              animation="slideUp"
              delay={300}
              triggerOnce={false}
              threshold={0.3}
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light px-4">
                Innovative solutions crafted with precision, showcasing expertise in 
                <span className="text-slate-300 font-medium"> modern web development</span> and 
                <span className="text-slate-300 font-medium"> cutting-edge technologies</span>
              </p>
            </RevealWrapper>
          </RevealWrapper>
          
          {/* Projects Grid - Responsive */}
          <div className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
              {filteredProjects.map((project, index) => {
                const ProjectIcon = getProjectIcon(project.title);
                const colors = getColorScheme(project.color);
                
                return (
                  <RevealWrapper
                    key={project.title}
                    animation="slideUp"
                    delay={500 + (index * 200)}
                    className="w-full"
                    triggerOnce={false}
                    threshold={0.25}
                  >
                    <div 
                      className={`group relative w-full bg-slate-900/30 backdrop-blur-xl border border-slate-700/40 hover:bg-slate-800/40 hover:border-slate-600/40 ${colors?.border} rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg ${colors?.glow} hover:shadow-xl transform hover:scale-[1.01] sm:hover:scale-[1.015] hover:-translate-y-0.5 sm:hover:-translate-y-1`}
                      onMouseEnter={() => !isMobile && setHoveredProject(index)}
                      onMouseLeave={() => !isMobile && setHoveredProject(null)}
                      onClick={() => handleCardClick(index)}
                    >
                      {/* Minimal Shimmer - Desktop Only */}
                      {!isMobile && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 duration-700 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] pointer-events-none transition-all ease-out" />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors?.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                      
                      {/* Header Section - Responsive */}
                      <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-slate-700/15 to-slate-600/20">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.08),transparent_70%)]" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors?.gradient} opacity-40`} />
                        </div>
                        
                        {/* Particles - Desktop Only */}
                        {!isMobile && hoveredProject === index && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className={`absolute w-1 h-1 ${colors?.particle} rounded-full opacity-60`}
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animation: `pulse ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
                                  animationDelay: `${i * 0.15}s`,
                                  transform: `scale(${0.5 + Math.random() * 0.5})`
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Action Links - Responsive */}
                        <RevealWrapper
                          animation="slideLeft"
                          delay={200}
                          className="absolute top-3 sm:top-4 md:top-6 lg:top-8 right-3 sm:right-4 md:right-6 lg:right-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div className={`flex gap-2 sm:gap-3 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-400 transform ${isMobile ? 'translate-y-0' : 'translate-y-2 group-hover:translate-y-0'}`}>
                            <a 
                              href={project.github} 
                              className="p-2 sm:p-3 bg-slate-900/80 backdrop-blur-xl rounded-lg sm:rounded-xl border border-slate-600/40 hover:bg-slate-800/80 hover:border-slate-500/60 transition-all duration-300 hover:scale-105 group/link shadow-lg hover:shadow-xl"
                              onClick={handleLinkClick}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} source code`}
                            >
                              <Github size={isMobile ? 16 : 18} className="text-slate-200 group-hover/link:text-white transition-colors duration-200" />
                            </a>
                            {project.demo !== "#" && (
                              <a 
                                href={project.demo} 
                                className="p-2 sm:p-3 bg-slate-900/80 backdrop-blur-xl rounded-lg sm:rounded-xl border border-slate-600/40 hover:bg-slate-800/80 hover:border-slate-500/60 transition-all duration-300 hover:scale-105 group/link shadow-lg hover:shadow-xl"
                                onClick={handleLinkClick}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} live demo`}
                              >
                                <ExternalLink size={isMobile ? 16 : 18} className="text-slate-200 group-hover/link:text-white transition-colors duration-200" />
                              </a>
                            )}
                          </div>
                        </RevealWrapper>
                        
                        {/* Project Icon - Responsive */}
                        <RevealWrapper
                          animation="rotateIn"
                          delay={250}
                          className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-3 sm:left-4 md:left-6 lg:left-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-600/40 flex items-center justify-center group-hover:bg-slate-700/70 group-hover:border-slate-500/60 transition-all duration-400 group-hover:scale-105 shadow-lg ${colors?.glow}`}>
                            <ProjectIcon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-slate-300 group-hover:text-white ${colors?.text} transition-all duration-300`} />
                          </div>
                        </RevealWrapper>

                        {/* Click Indicator - Responsive */}
                        <RevealWrapper
                          animation="slideUp"
                          delay={300}
                          className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 right-3 sm:right-4 md:right-6 lg:right-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div className={`${isMobile ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'} transition-all duration-400 transform group-hover:scale-105`}>
                            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-slate-800/70 backdrop-blur-xl rounded-lg sm:rounded-xl border border-slate-600/30 shadow-lg">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                              <span className="text-xs sm:text-sm font-medium text-slate-400">View Details</span>
                              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                            </div>
                          </div>
                        </RevealWrapper>
                      </div>
                      
                      {/* Content Section - Responsive */}
                      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="flex items-start justify-between mb-6 sm:mb-8">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white ${colors?.text} transition-colors duration-300 mb-3 sm:mb-4 leading-tight`}>
                              {project.title}
                            </h3>
                            
                            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 text-sm sm:text-base md:text-lg">
                              {project.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Tech Stack - Responsive */}
                        <StaggeredReveal
                          animation="slideUp"
                          staggerDelay={80}
                          baseDelay={600 + (index * 200)}
                          className="flex flex-wrap gap-2 sm:gap-3"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          {project.tech.map((tech) => (
                            <span 
                              key={tech} 
                              className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-slate-800/50 text-slate-300 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-slate-700/40 hover:bg-slate-700/50 hover:text-slate-200 hover:border-slate-600/60 ${colors?.tech} transition-all duration-300 transform hover:scale-105 backdrop-blur-sm font-medium`}
                            >
                              {tech}
                            </span>
                          ))}
                        </StaggeredReveal>
                      </div>
                    </div>
                  </RevealWrapper>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Responsive */}
          <RevealWrapper 
            animation="fadeIn"
            delay={1000 + (filteredProjects.length * 200)}
            className="text-center mt-16 sm:mt-20 md:mt-24"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/30 backdrop-blur-xl border border-slate-600/30 rounded-full hover:bg-slate-700/40 hover:border-slate-500/40 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-xl">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-300" />
              <span className="text-sm sm:text-base lg:text-lg text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium">
                Exploring new horizons
              </span>
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-400 rounded-full group-hover:bg-slate-300" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-500 rounded-full group-hover:bg-slate-400" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.2s' }} />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-600 rounded-full group-hover:bg-slate-500" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.4s' }} />
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Responsive Project Modal */}
      {selectedProject !== null && (
        <div 
          className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-2 sm:p-4 transition-opacity duration-200 ${
            modalAnimation === 'enter' ? 'opacity-100' : 
            modalAnimation === 'exit' ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-slate-900/85 backdrop-blur-2xl rounded-lg sm:rounded-xl border border-slate-700/40 
                        w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden shadow-2xl
                        transition-transform transition-opacity duration-200 ease-out
                        ${modalAnimation === 'enter' ? 'opacity-100 scale-100 translate-y-0' :
                          modalAnimation === 'exit' ? 'opacity-0 scale-[0.98] translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const project = filteredProjects[selectedProject];
              const details = getProjectDetails(project);
              const colors = getColorScheme(project.color);
              const ProjectIcon = getProjectIcon(project.title);

              return (
                <>
                  {/* Header - Responsive */}
                  <div className={`relative overflow-hidden bg-slate-900/40 border-b border-slate-700/40`}>
                    <div className="absolute inset-0 opacity-[0.04]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.08),transparent_55%)]" />
                    </div>

                    <button
                      onClick={handleCloseModal}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-slate-800/60 rounded-lg border border-slate-600/40 hover:bg-slate-700/80 transition-colors duration-200 z-10"
                    >
                      <X size={isMobile ? 16 : 18} className="text-slate-200" />
                    </button>

                    <div className="p-4 sm:p-6 md:p-8 pr-12 sm:pr-16">
                      <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-slate-800/60 rounded-lg sm:rounded-xl border border-slate-600/40 flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <ProjectIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-2 sm:mb-3">
                            {project.title}
                          </h2>
                          <p className="text-slate-300/90 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 md:mb-5">
                            {details.fullDescription}
                          </p>

                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <a
                              href={details.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-white bg-slate-700/70 border border-slate-600/50 hover:bg-slate-700/90 transition-all duration-200 text-xs sm:text-sm`}
                            >
                              <Github size={isMobile ? 14 : 16} />
                              <span className="font-semibold">Source</span>
                            </a>

                            {details.links.githubApi && (
                              <a
                                href={details.links.githubApi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg border border-slate-600/50 text-slate-200 hover:bg-slate-800/40 transition-all duration-200 text-xs sm:text-sm`}
                              >
                                <Terminal size={isMobile ? 14 : 16} />
                                <span className="font-semibold">API Repo</span>
                              </a>
                            )}

                            {details.links.demo && details.links.demo !== "#" && (
                              <a
                                href={details.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg border border-slate-600/50 text-slate-200 hover:bg-slate-800/40 transition-all duration-200 text-xs sm:text-sm`}
                              >
                                <ExternalLink size={isMobile ? 14 : 16} />
                                <span className="font-semibold">Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body - Responsive */}
                  <div className="overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(85vh-140px)] md:max-h-[calc(80vh-160px)] custom-scrollbar">
                    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
                      {/* Performance Metrics - Responsive */}
                      {details.performance && (
                        <div className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors?.modalAccent} backdrop-blur-xl shadow-lg`}>
                          <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <BarChart3 size={isMobile ? 16 : 18} />
                            Performance Metrics
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {Object.entries(details.performance).map(([k, v]) => (
                              <div
                                key={k}
                                className="text-center p-3 sm:p-4 bg-slate-800/30 rounded-lg border border-slate-700/20"
                              >
                                <div className="text-lg sm:text-xl font-bold text-white mb-1">{v}</div>
                                <div className="text-slate-400 text-xs sm:text-sm capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Features - Responsive */}
                      <div className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors?.modalAccent} backdrop-blur-xl shadow-lg`}>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                          <Star size={isMobile ? 16 : 18} />
                          Key Features
                        </h4>
                        <ul className="grid gap-2">
                          {details.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-slate-800/20 border border-slate-700/15">
                              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${colors?.particle} rounded-full mt-1.5 sm:mt-2 flex-shrink-0`} />
                              <span className="text-slate-300 text-sm sm:text-base">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Installation & Setup - Responsive */}
                      <div className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors?.modalAccent} backdrop-blur-xl shadow-lg`}>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                          <Terminal size={isMobile ? 16 : 18} />
                          Installation & Setup
                        </h4>
                        <ol className="space-y-2">
                          {details.installation.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-slate-800/20 border border-slate-700/15">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-700/60 text-white font-semibold flex items-center justify-center text-xs sm:text-sm flex-shrink-0">
                                {i + 1}
                              </div>
                              <span className="text-slate-300 pt-0.5 sm:pt-1 text-sm sm:text-base">{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Technology Stack - Responsive */}
                      <div className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors?.modalAccent} backdrop-blur-xl shadow-lg`}>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                          <Code2 size={isMobile ? 16 : 18} />
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.tech.map(t => (
                            <span 
                              key={t}
                              className={`px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800/40 text-slate-300 rounded-md sm:rounded-lg text-xs sm:text-sm border border-slate-700/40 ${colors?.tech} transition-colors duration-200`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer - Responsive */}
                  <div className="border-t border-slate-700/40 p-3 sm:p-4 md:p-5 bg-slate-900/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium">Press ESC to close</span>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 border ${colors?.buttonSecondary} rounded-md sm:rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm`}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .shadow-lg {
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .shadow-xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Custom Scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.2) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 6px;
          border: 1px solid transparent;
          background-clip: padding-box;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.3);
          background-clip: padding-box;
        }

        /* Enhanced Hover Effects */
        .hover\\:shadow-cyan-500\\/20:hover {
          box-shadow: 0 20px 40px -12px rgba(6, 182, 212, 0.2);
        }
        
        .hover\\:shadow-purple-500\\/20:hover {
          box-shadow: 0 20px 40px -12px rgba(168, 85, 247, 0.2);
        }
        
        .hover\\:shadow-pink-500\\/20:hover {
          box-shadow: 0 20px 40px -12px rgba(236, 72, 153, 0.2);
        }

        /* Modal Glow Effects */
        .shadow-cyan-500\\/15 {
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.15);
        }
        
        .shadow-purple-500\\/15 {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.15);
        }
        
        .shadow-pink-500\\/15 {
          box-shadow: 0 0 30px rgba(236, 72, 153, 0.15);
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .hover\\:scale-\\[1\\.015\\]:hover,
          .hover\\:scale-\\[1\\.01\\]:hover {
            transform: scale(1);
          }
          
          .hover\\:-translate-y-1:hover,
          .hover\\:-translate-y-0\\.5:hover {
            transform: translateY(0);
          }
        }

        /* Improved touch targets for mobile */
        @media (max-width: 768px) {
          .group {
            touch-action: manipulation;
          }
          
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-slate-900\\/30 {
            background-color: rgba(15, 23, 42, 0.5);
          }
          
          .border-slate-700\\/40 {
            border-color: rgba(51, 65, 85, 0.6);
          }
          
          .text-slate-400 {
            color: rgb(148, 163, 184);
          }
        }
      `}</style>
    </>
  );
};

export default Projects;