import React, { useState, useRef, useEffect } from 'react';
import { Github, ExternalLink, ArrowUpRight, Code2, Sparkles, Zap, Layers3, CircuitBoard, Star, ChevronRight, Cpu } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../components/RevealAnimations';
import { projects } from '../data';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const filteredProjects = projects.filter(project => 
    !project.title.toLowerCase().includes('trading bot')
  );

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('bitcoin')) return CircuitBoard;
    if (title.toLowerCase().includes('platform') || title.toLowerCase().includes('connect')) return Layers3;
    if (title.toLowerCase().includes('portfolio') || title.toLowerCase().includes('website')) return Code2;
    return Cpu;
  };

  const getColorScheme = (color: string) => {
    switch(color) {
      case 'cyan': 
        return {
          gradient: 'from-cyan-500/20 via-blue-500/15 to-cyan-400/20',
          border: 'hover:border-cyan-400/40 hover:shadow-cyan-500/15',
          text: 'group-hover:text-cyan-300',
          glow: 'group-hover:shadow-cyan-500/20',
          particle: 'bg-cyan-400/70',
          tech: 'hover:border-cyan-400/30 hover:text-cyan-200 hover:shadow-cyan-500/15',
          progress: 'from-cyan-500 via-cyan-400 to-cyan-300'
        };
      case 'purple': 
        return {
          gradient: 'from-purple-500/20 via-violet-500/15 to-purple-400/20',
          border: 'hover:border-purple-400/40 hover:shadow-purple-500/15',
          text: 'group-hover:text-purple-300',
          glow: 'group-hover:shadow-purple-500/20',
          particle: 'bg-purple-400/70',
          tech: 'hover:border-purple-400/30 hover:text-purple-200 hover:shadow-purple-500/15',
          progress: 'from-purple-500 via-purple-400 to-purple-300'
        };
      case 'pink': 
        return {
          gradient: 'from-pink-500/20 via-rose-500/15 to-pink-400/20',
          border: 'hover:border-pink-400/40 hover:shadow-pink-500/15',
          text: 'group-hover:text-pink-300',
          glow: 'group-hover:shadow-pink-500/20',
          particle: 'bg-pink-400/70',
          tech: 'hover:border-pink-400/30 hover:text-pink-200 hover:shadow-pink-500/15',
          progress: 'from-pink-500 via-pink-400 to-pink-300'
        };
      default: 
        return {
          gradient: 'from-slate-500/20 via-slate-400/15 to-slate-300/20',
          border: 'hover:border-slate-400/40 hover:shadow-slate-500/15',
          text: 'group-hover:text-slate-300',
          glow: 'group-hover:shadow-slate-500/20',
          particle: 'bg-slate-400/70',
          tech: 'hover:border-slate-400/30 hover:text-slate-200 hover:shadow-slate-500/15',
          progress: 'from-slate-500 via-slate-400 to-slate-300'
        };
    }
  };

  return (
    <section id="projects" className="w-full py-24 relative overflow-hidden">
      {/* Enhanced Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(120,119,198,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(255,255,255,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(148,163,184,0.03),transparent)]" />

      {/* Refined Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.008] overflow-hidden">
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.4)_1px,transparent_1px)]"
          style={{
            backgroundSize: '100px 100px',
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-[0.01] blur-3xl animate-pulse"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              background: `radial-gradient(circle, ${
                ['rgb(59, 130, 246)', 'rgb(139, 92, 246)', 'rgb(236, 72, 153)', 'rgb(34, 197, 94)'][i]
              }, transparent)`,
              left: `${20 + i * 20}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={containerRef}>
        {/* Elegant Header */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={100} 
          className="text-center mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-white/8 group">
            <Star className="w-4 h-4 text-slate-400 animate-pulse group-hover:text-slate-300 transition-colors duration-300" />
            <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300">SHOWCASE</span>
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse group-hover:bg-slate-300 transition-colors duration-300" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
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
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Innovative solutions crafted with precision, showcasing expertise in 
              <span className="text-slate-300 font-medium"> modern web development</span> and 
              <span className="text-slate-300 font-medium"> cutting-edge technologies</span>
            </p>
          </RevealWrapper>
        </RevealWrapper>
        
        {/* Projects Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const ProjectIcon = getProjectIcon(project.title);
              const colors = getColorScheme(project.color);
              
              return (
                <RevealWrapper
                  key={project.title}
                  animation="slideUp"
                  delay={500 + (index * 200)}
                  triggerOnce={false}
                  threshold={0.15}
                  className="w-full"
                >
                  <FloatingCard delay={index * 100}>
                    <div 
                      className={`group relative w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-700/40 ${colors.border} rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer shadow-xl ${colors.glow} hover:shadow-2xl transform hover:scale-[1.01]`}
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Holographic Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[250%] pointer-events-none transition-all ease-out" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                      
                      {/* Header Section */}
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-slate-700/10 to-slate-600/20">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.15),transparent_70%)]" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-30`} />
                        </div>
                        
                        {/* Particle System */}
                        {hoveredProject === index && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className={`absolute w-1.5 h-1.5 ${colors.particle} rounded-full animate-pulse`}
                                style={{
                                  left: `${15 + (i * 6)}%`,
                                  top: `${20 + (i * 5)}%`,
                                  animationDelay: `${i * 0.2}s`,
                                  animationDuration: `${2 + (i % 3) * 0.5}s`,
                                  filter: 'blur(0.5px)'
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Action Links */}
                        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
                          <a 
                            href={project.github} 
                            className="p-3 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-600/40 hover:bg-slate-800/95 hover:border-slate-500/60 transition-all duration-300 hover:scale-110 group/link shadow-lg hover:shadow-xl"
                            onClick={handleLinkClick}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code`}
                          >
                            <Github size={18} className="text-slate-200 group-hover/link:text-white transition-colors duration-200" />
                          </a>
                          <a 
                            href={project.demo} 
                            className="p-3 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-600/40 hover:bg-slate-800/95 hover:border-slate-500/60 transition-all duration-300 hover:scale-110 group/link shadow-lg hover:shadow-xl"
                            onClick={handleLinkClick}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink size={18} className="text-slate-200 group-hover/link:text-white transition-colors duration-200" />
                          </a>
                        </div>
                        
                        {/* Project Icon */}
                        <div className="absolute bottom-6 left-6">
                          <div className={`w-16 h-16 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-600/40 flex items-center justify-center group-hover:bg-slate-700/80 group-hover:border-slate-500/60 transition-all duration-500 group-hover:scale-110 shadow-lg ${colors.glow}`}>
                            <ProjectIcon className={`w-8 h-8 text-slate-300 group-hover:text-white ${colors.text} transition-all duration-300`} />
                          </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute bottom-6 right-6 opacity-15 group-hover:opacity-25 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                          <Layers3 className="w-12 h-12 text-slate-400" />
                        </div>
                        
                        {/* Central Glow */}
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse bg-gradient-to-r ${colors.gradient} blur-xl`} />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6 sm:p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-xl sm:text-2xl font-bold text-white ${colors.text} transition-colors duration-300 mb-3 leading-tight`}>
                              {project.title}
                            </h3>
                            
                            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 text-sm sm:text-base">
                              {project.description}
                            </p>
                          </div>
                          
                          <ArrowUpRight className={`w-5 h-5 text-slate-500 ${colors.text} transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 ml-4 mt-1 flex-shrink-0`} />
                        </div>
                        
                        {/* Tech Stack */}
                        <StaggeredReveal
                          staggerDelay={60}
                          animation="slideUp"
                          baseDelay={600 + (index * 200)}
                          className="flex flex-wrap gap-2"
                          triggerOnce={false}
                          threshold={0.2}
                        >
                          {project.tech.map((tech) => (
                            <span 
                              key={tech} 
                              className={`px-3 py-1.5 bg-slate-800/60 text-slate-300 rounded-lg text-xs sm:text-sm border border-slate-700/40 hover:bg-slate-700/60 hover:text-slate-200 hover:border-slate-600/60 ${colors.tech} transition-all duration-300 transform hover:scale-105 backdrop-blur-sm font-medium`}
                            >
                              {tech}
                            </span>
                          ))}
                        </StaggeredReveal>
                      </div>
                      
                      {/* Overlay Effects */}
                      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${colors.gradient}`} />
                      <div className="absolute inset-0 rounded-3xl shadow-2xl shadow-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </FloatingCard>
                </RevealWrapper>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={1000 + (filteredProjects.length * 200)}
          className="text-center mt-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-full hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-xl">
            <span className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors duration-200 font-medium">
              Exploring new horizons
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse group-hover:bg-slate-300" />
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse group-hover:bg-slate-400" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse group-hover:bg-slate-500" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Projects;