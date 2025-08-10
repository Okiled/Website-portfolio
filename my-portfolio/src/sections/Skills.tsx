import React from 'react';
import { 
  Code, 
  Globe, 
  Smartphone,
  Brain,
  Database,
  BarChart3,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../components/RevealAnimations';
import { skills } from '../data';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Elements - Matching Experience Style */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.02),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Exact Same Style as Experience */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={100} 
          className="text-center mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <Brain className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-400">Technical Arsenal</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4">
            <TextReveal 
              text="Skills & Expertise" 
              speed={60} 
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
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A comprehensive toolkit of technologies, languages, and frameworks that power my development journey
            </p>
          </RevealWrapper>
        </RevealWrapper>

        {/* Skills Grid - Using Experience Card Style */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <RevealWrapper
                key={skill.title}
                animation="slideUp"
                delay={400 + (index * 100)}
                className="relative"
                triggerOnce={false}
                threshold={0.25}
              >
                <FloatingCard delay={index * 50}>
                  <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                    
                    {/* Icon Header - Same Style as Experience */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                      <div className="flex items-center gap-4">
                        <RevealWrapper 
                          animation="rotateIn" 
                          delay={500 + (index * 100)}
                          className="p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <skill.icon className="w-6 h-6 text-white" />
                        </RevealWrapper>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-slate-200 transition-colors duration-300">
                            {skill.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                        {skill.description}
                      </p>
                    </div>

                    {/* Skills Tags - Same Style as Experience Points */}
                    <div className="space-y-4">
                      <StaggeredReveal
                        staggerDelay={60}
                        animation="slideUp"
                        baseDelay={600 + (index * 100)}
                        className="space-y-3"
                        triggerOnce={false}
                        threshold={0.25}
                      >
                        <div className="flex flex-wrap gap-2">
                          {skill.skills.map((skillName, skillIndex) => (
                            <div key={skillName} className="group/item flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 hover:bg-slate-700/60 transition-all duration-300">
                              <span className="text-sm font-medium text-slate-300 group-hover/item:text-slate-200 transition-colors duration-300">
                                {skillName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </StaggeredReveal>
                    </div>

                    {/* Bottom Accent Line - Same as Experience */}
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Subtle Glow Effect - Same as Experience */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-600/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </FloatingCard>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section - Same Style as Experience */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={800 + (skills.length * 100)}
          className="text-center mt-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-full">
            <span className="text-slate-400">Always Learning, Always Growing</span>
            <Zap className="w-4 h-4 text-slate-400" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Skills;