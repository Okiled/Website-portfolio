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
import { projects, getProjectDetails } from '../data';
import type { ColorVariant } from '../types';

// ⬇️ pakai komponen reveal yang sama seperti di experience.tsx
import { RevealWrapper, TextReveal, StaggeredReveal } from '../components/RevealAnimations';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [modalAnimation, setModalAnimation] = useState<'enter' | 'exit' | 'idle'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedProject]);

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
          gradient: 'from-cyan-500/20 via-blue-500/15 to-cyan-400/20',
          border: 'hover:border-cyan-400/50 hover:shadow-cyan-500/25',
          text: 'group-hover:text-cyan-300',
          glow: 'group-hover:shadow-cyan-500/30',
          particle: 'bg-cyan-400/70',
          tech: 'hover:border-cyan-400/40 hover:text-cyan-200 hover:bg-cyan-500/10',
          modalAccent: 'border-cyan-400/30 bg-cyan-500/5',
          buttonPrimary: 'bg-cyan-500 hover:bg-cyan-400 text-white',
          buttonSecondary: 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10',
          modalGlow: 'shadow-cyan-500/20'
        };
      case 'purple': 
        return {
          gradient: 'from-purple-500/20 via-violet-500/15 to-purple-400/20',
          border: 'hover:border-purple-400/50 hover:shadow-purple-500/25',
          text: 'group-hover:text-purple-300',
          glow: 'group-hover:shadow-purple-500/30',
          particle: 'bg-purple-400/70',
          tech: 'hover:border-purple-400/40 hover:text-purple-200 hover:bg-purple-500/10',
          modalAccent: 'border-purple-400/30 bg-purple-500/5',
          buttonPrimary: 'bg-purple-500 hover:bg-purple-400 text-white',
          buttonSecondary: 'border-purple-400/50 text-purple-300 hover:bg-purple-500/10',
          modalGlow: 'shadow-purple-500/20'
        };
      case 'pink': 
        return {
          gradient: 'from-pink-500/20 via-rose-500/15 to-pink-400/20',
          border: 'hover:border-pink-400/50 hover:shadow-pink-500/25',
          text: 'group-hover:text-pink-300',
          glow: 'group-hover:shadow-pink-500/30',
          particle: 'bg-pink-400/70',
          tech: 'hover:border-pink-400/40 hover:text-pink-200 hover:bg-pink-500/10',
          modalAccent: 'border-pink-400/30 bg-pink-500/5',
          buttonPrimary: 'bg-pink-500 hover:bg-pink-400 text-white',
          buttonSecondary: 'border-pink-400/50 text-pink-300 hover:bg-pink-500/10',
          modalGlow: 'shadow-pink-500/20'
        };
    }
  };

  return (
    <>
      <section id="projects" className="w-full py-24 relative overflow-hidden">
        {/* Enhanced Background System */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(120,119,198,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(148,163,184,0.03),transparent)]" />

        {/* Dynamic Mesh Grid */}
        <div className="absolute inset-0 opacity-[0.015] overflow-hidden">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.4)_1px,transparent_1px)]"
            style={{
              backgroundSize: '80px 80px',
              transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.02] blur-3xl animate-pulse"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                background: `radial-gradient(circle, ${
                  ['rgb(59, 130, 246)', 'rgb(139, 92, 246)', 'rgb(236, 72, 153)', 'rgb(34, 197, 94)', 'rgb(249, 115, 22)'][i]
                }, transparent)`,
                left: `${10 + i * 20}%`,
                top: `${5 + i * 18}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={containerRef}>
          {/* Header Section */}
          <RevealWrapper
            animation="fadeIn"
            delay={100}
            className="text-center mb-20"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:bg:white/10 group">
              <Sparkles className="w-5 h-5 text-slate-400 animate-pulse group-hover:text-slate-300 transition-colors duration-300" />
              <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-300 transition-colors duration-300 tracking-wide">FEATURED PROJECTS</span>
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
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
              <p className="text-xl sm:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light px-4">
                Innovative solutions crafted with precision, showcasing expertise in 
                <span className="text-slate-300 font-medium"> modern web development</span> and 
                <span className="text-slate-300 font-medium"> cutting-edge technologies</span>
              </p>
            </RevealWrapper>
          </RevealWrapper>
          
          {/* Projects Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
                      className={`group relative w-full bg-slate-900/60 backdrop-blur-3xl border border-slate-700/50 ${colors?.border} rounded-[2rem] overflow-hidden transition-all duration-700 cursor-pointer shadow-2xl ${colors?.glow} hover:shadow-4xl transform hover:scale-[1.02] hover:-translate-y-3`}
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => handleCardClick(index)}
                    >
                      {/* Enhanced Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] pointer-events-none transition-all ease-out" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors?.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                      
                      {/* Header Section */}
                      <div className="relative h-80 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-600/40">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.15),transparent_70%)]" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors?.gradient} opacity-50`} />
                        </div>
                        
                        {/* Enhanced Particle System */}
                        {hoveredProject === index && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className={`absolute w-1.5 h-1.5 ${colors?.particle} rounded-full animate-pulse`}
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: `${1 + (i % 5) * 0.5}s`,
                                  filter: 'blur(0.5px)',
                                  transform: `scale(${0.3 + Math.random() * 0.7})`
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Action Links */}
                        <RevealWrapper
                          animation="slideLeft"
                          delay={200}
                          className="absolute top-8 right-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <a 
                              href={project.github} 
                              className="p-4 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-600/50 hover:bg-slate-800/95 hover:border-slate-500/70 transition-all duration-300 hover:scale-110 group/link shadow-2xl hover:shadow-3xl"
                              onClick={handleLinkClick}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} source code`}
                            >
                              <Github size={20} className="text-slate-200 group-hover/link:text-white transition-colors duration-200" />
                            </a>
                            {project.demo !== "#" && (
                              <a 
                                href={project.demo} 
                                className="p-4 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-600/50 hover:bg-slate-800/95 hover:border-slate-500/70 transition-all duration-300 hover:scale-110 group/link shadow-2xl hover:shadow-3xl"
                                onClick={handleLinkClick}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} live demo`}
                              >
                                <ExternalLink size={20} className="text-slate-200 group-hover/link:text-white transition-colors duration-200" />
                              </a>
                            )}
                          </div>
                        </RevealWrapper>
                        
                        {/* Project Icon */}
                        <RevealWrapper
                          animation="rotateIn"
                          delay={250}
                          className="absolute bottom-8 left-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div className={`w-20 h-20 bg-slate-800/90 backdrop-blur-2xl rounded-3xl border border-slate-600/50 flex items-center justify-center group-hover:bg-slate-700/90 group-hover:border-slate-500/70 transition-all duration-500 group-hover:scale-110 shadow-2xl ${colors?.glow}`}>
                            <ProjectIcon className={`w-10 h-10 text-slate-300 group-hover:text-white ${colors?.text} transition-all duration-300`} />
                          </div>
                        </RevealWrapper>

                        {/* Enhanced Click Indicator */}
                        <RevealWrapper
                          animation="slideUp"
                          delay={300}
                          className="absolute bottom-8 right-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div className="opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                            <div className="flex items-center gap-3 px-5 py-3 bg-slate-800/90 backdrop-blur-2xl rounded-2xl border border-slate-600/40 shadow-xl">
                              <Eye className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-400">View Details</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        </RevealWrapper>
                        
                        {/* Central Glow */}
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse bg-gradient-to-r ${colors?.gradient} blur-3xl`} />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-8 sm:p-10">
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-2xl sm:text-3xl font-bold text-white ${colors?.text} transition-colors duration-300 mb-4 leading-tight`}>
                              {project.title}
                            </h3>
                            
                            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 text-base sm:text-lg">
                              {project.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Tech Stack */}
                        <StaggeredReveal
                          animation="slideUp"
                          staggerDelay={80}
                          baseDelay={600 + (index * 200)}
                          className="flex flex-wrap gap-3"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          {project.tech.map((tech) => (
                            <span 
                              key={tech} 
                              className={`px-4 py-2 bg-slate-800/70 text-slate-300 rounded-xl text-sm sm:text-base border border-slate-700/50 hover:bg-slate-700/70 hover:text-slate-200 hover:border-slate-600/70 ${colors?.tech} transition-all duration-300 transform hover:scale-105 backdrop-blur-sm font-medium`}
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

          {/* Bottom Section */}
          <RevealWrapper 
            animation="fadeIn"
            delay={1000 + (filteredProjects.length * 200)}
            className="text-center mt-24"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-600/40 rounded-full hover:bg-slate-700/60 hover:border-slate-500/60 transition-all duration-700 group cursor-pointer shadow-2xl hover:shadow-3xl">
              <Zap className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-300" />
              <span className="text-base sm:text-lg text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium">
                Exploring new horizons
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-pulse group-hover:bg-slate-300" />
                <div className="w-2.5 h-2.5 bg-slate-500 rounded-full animate-pulse group-hover:bg-slate-400" style={{ animationDelay: '0.2s' }} />
                <div className="w-2.5 h-2.5 bg-slate-600 rounded-full animate-pulse group-hover:bg-slate-500" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Redesigned Luxury Project Modal */}
{selectedProject !== null && (
  <div 
    className={`fixed inset-0 bg-black/90 backdrop-blur-2xl z-[9999] flex items-center justify-center p-4 transition-opacity duration-200 ${
      modalAnimation === 'enter' ? 'opacity-100' : 
      modalAnimation === 'exit' ? 'opacity-0' : 'opacity-100'
    }`}
    onClick={handleCloseModal}
  >
    <div 
      className={`bg-slate-900/95 backdrop-blur-3xl rounded-2xl border border-slate-700/50 
                  w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-3xl
                  transition-transform transition-opacity duration-200 ease-out
                  ${modalAnimation === 'enter' ? 'opacity-100 scale-100 translate-y-0' :
                    modalAnimation === 'exit' ? 'opacity-0 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {(() => {
        const project = filteredProjects[selectedProject];
        const details = getProjectDetails(project);
        const colors = getColorScheme(project.color);
        const ProjectIcon = getProjectIcon(project.title);

        return (
          <>
            {/* Header — no reveal components */}
            <div className={`relative overflow-hidden bg-slate-900/60 border-b border-slate-700/50`}>
              {/* Subtle bg only */}
              <div className="absolute inset-0 opacity-[0.06]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.12),transparent_55%)]" />
              </div>

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2.5 bg-slate-800/80 rounded-xl border border-slate-600/50 hover:bg-slate-700/90 transition-colors"
              >
                <X size={20} className="text-slate-200" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 bg-slate-800/80 rounded-2xl border border-slate-600/50 flex items-center justify-center shadow-xl flex-shrink-0`}>
                    <ProjectIcon className="w-9 h-9 text-slate-300" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-slate-300/90 mt-3 leading-relaxed">
                      {details.fullDescription}
                    </p>

                    {/* Actions (no hover zoom) */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      <a
                        href={details.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white bg-slate-700/90 border border-slate-600/60 hover:bg-slate-700`}
                      >
                        <Github size={18} />
                        <span className="font-semibold">Source</span>
                      </a>

                      {details.links.githubApi && (
                        <a
                          href={details.links.githubApi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-600/60 text-slate-200 hover:bg-slate-800/60`}
                        >
                          <Terminal size={18} />
                          <span className="font-semibold">API Repo</span>
                        </a>
                      )}

                      {details.links.demo && details.links.demo !== "#" && (
                        <a
                          href={details.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-600/60 text-slate-200 hover:bg-slate-800/60`}
                        >
                          <ExternalLink size={18} />
                          <span className="font-semibold">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body — scroll area (no reveal components) */}
            <div className="overflow-y-auto max-h-[56vh] custom-scrollbar">
              <div className="p-6 sm:p-8 space-y-8">
                {details.performance && (
                  <div className={`p-6 rounded-2xl border ${colors?.modalAccent} backdrop-blur-xl shadow-xl`}>
                    <h4 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                      <BarChart3 size={20} />
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(details.performance).map(([k, v]) => (
                        <div
                          key={k}
                          className="text-center p-5 bg-slate-800/40 rounded-xl border border-slate-700/30"
                        >
                          <div className="text-2xl font-bold text-white mb-1">{v}</div>
                          <div className="text-slate-400 text-sm capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`p-6 rounded-2xl border ${colors?.modalAccent} backdrop-blur-xl shadow-xl`}>
                  <h4 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                    <Star size={20} />
                    Key Features
                  </h4>
                  <ul className="grid gap-3">
                    {details.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/20">
                        <span className={`w-2.5 h-2.5 ${colors?.particle} rounded-full mt-2`} />
                        <span className="text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-6 rounded-2xl border ${colors?.modalAccent} backdrop-blur-xl shadow-xl`}>
                  <h4 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                    <Terminal size={20} />
                    Installation & Setup
                  </h4>
                  <ol className="space-y-3">
                    {details.installation.map((s, i) => (
                      <li key={i} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/20">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/80 text-white font-semibold flex items-center justify-center">
                          {i + 1}
                        </div>
                        <span className="text-slate-300 pt-1">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={`p-6 rounded-2xl border ${colors?.modalAccent} backdrop-blur-xl shadow-xl`}>
                  <h4 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                    <Code2 size={20} />
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map(t => (
                      <span 
                        key={t}
                        className={`px-4 py-2 bg-slate-800/60 text-slate-300 rounded-xl text-sm border border-slate-700/50 ${colors?.tech}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-700/50 p-4 sm:p-5 bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">Press ESC to close</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className={`px-4 py-2 border ${colors?.buttonSecondary} rounded-lg font-semibold`}
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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        
        .shadow-4xl {
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* Custom Scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
          background-clip: padding-box;
        }

        /* Enhanced Hover Effects */
        .hover\\:shadow-cyan-500\\/25:hover {
          box-shadow: 0 25px 50px -12px rgba(6, 182, 212, 0.25);
        }
        
        .hover\\:shadow-purple-500\\/25:hover {
          box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.25);
        }
        
        .hover\\:shadow-pink-500\\/25:hover {
          box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.25);
        }
        
        .group-hover\\:shadow-cyan-500\\/30:hover {
          box-shadow: 0 25px 50px -12px rgba(6, 182, 212, 0.3);
        }
        
        .group-hover\\:shadow-purple-500\\/30:hover {
          box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.3);
        }
        
        .group-hover\\:shadow-pink-500\\/30:hover {
          box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.3);
        }

        /* Modal Glow Effects */
        .shadow-cyan-500\\/20 {
          box-shadow: 0 0 40px rgba(6, 182, 212, 0.2);
        }
        
        .shadow-purple-500\\/20 {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
        }
        
        .shadow-pink-500\\/20 {
          box-shadow: 0 0 40px rgba(236, 72, 153, 0.2);
        }

        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
};

export default Projects;
