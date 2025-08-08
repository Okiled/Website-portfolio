import React from 'react';
import { Github, ExternalLink, Eye, Heart, MessageCircle } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { projects } from '../data';

const Projects: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <section id="projects" className="py-20 bg-black/20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
          A showcase of my latest work in web development, AI, and fintech
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <FloatingCard key={project.title} delay={index * 150}>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl group">
                {/* Project preview/thumbnail area */}
                <div className={`h-48 bg-gradient-to-br from-${project.color}-400/20 to-${project.color}-600/20 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a 
                      href={project.github} 
                      className="p-2 bg-black/30 backdrop-blur-lg rounded-lg hover:bg-black/50 transition-all duration-300"
                      onClick={handleLinkClick}
                    >
                      <Github size={16} className="text-white" />
                    </a>
                    <a 
                      href={project.demo} 
                      className="p-2 bg-black/30 backdrop-blur-lg rounded-lg hover:bg-black/50 transition-all duration-300"
                      onClick={handleLinkClick}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </a>
                  </div>
                  
                  {/* Project stats */}
                  <div className="absolute bottom-4 left-4 flex gap-4 text-xs text-white/80">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{project.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      <span>{project.stats.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      <span>{project.stats.comments}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-4">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/80 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className={`px-3 py-1 bg-${project.color}-400/10 text-${project.color}-400 rounded-full text-sm hover:bg-${project.color}-400/20 transition-all duration-300 transform hover:scale-105`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Progress bar for project completion */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60 text-sm">Project Status</span>
                      <span className="text-cyan-400 text-sm font-medium">Completed</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r from-${project.color}-400 to-${project.color}-600 h-2 rounded-full transition-all duration-1000`} 
                        style={{ 
                          width: '100%',
                          animationDelay: `${index * 200}ms`
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;