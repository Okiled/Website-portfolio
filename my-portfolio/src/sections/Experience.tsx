import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../components/RevealAnimations';
import { experiences } from '../data';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Elements (match About.tsx) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <RevealWrapper
          animation="fadeIn"
          delay={100}
          className="text-center mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-400">Career Journey</span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-4">
            <TextReveal
              text="Professional Experience"
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
              A timeline of growth, challenges, and achievements that have shaped my professional journey
            </p>
          </RevealWrapper>
        </RevealWrapper>

        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Timeline Line */}
            <RevealWrapper
              animation="scaleIn"
              delay={500}
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-600 to-slate-600 hidden md:block"
              style={{ transformOrigin: 'top' }}
              triggerOnce={false}
              threshold={0.2}
            />

            {/* Experience Items */}
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <RevealWrapper
                  key={exp.title}
                  animation="slideUp"
                  delay={600 + (index * 150)}
                  className="relative"
                  triggerOnce={false}
                  threshold={0.25}
                >
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Timeline Dot - Desktop */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 relative z-20">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full animate-pulse opacity-20" />
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-white rounded-full border-4 border-slate-900 shadow-lg hover:scale-110 transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-600 opacity-80" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 max-w-4xl">
                      <FloatingCard delay={0}>
                        <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                          
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div className="flex items-center gap-4">
                              <RevealWrapper
                                animation="rotateIn"
                                delay={700 + (index * 150)}
                                className="p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300"
                                triggerOnce={false}
                                threshold={0.25}
                              >
                                <exp.icon className="w-6 h-6 text-white" />
                              </RevealWrapper>

                              <div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-slate-200 transition-colors duration-300">
                                  {exp.title}
                                </h3>
                                <p className="text-slate-400 font-medium">{exp.company}</p>
                              </div>
                            </div>

                            {/* Period Badge (match About.tsx badge style) */}
                            <RevealWrapper
                              animation="slideLeft"
                              delay={750 + (index * 150)}
                              triggerOnce={false}
                              threshold={0.25}
                            >
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-slate-300">{exp.period}</span>
                              </div>
                            </RevealWrapper>
                          </div>

                          {/* Description/Points */}
                          <div className="space-y-4">
                            <StaggeredReveal
                              staggerDelay={60}
                              animation="slideUp"
                              baseDelay={800 + (index * 150)}
                              className="space-y-3"
                              triggerOnce={false}
                              threshold={0.25}
                            >
                              {exp.points.map((point, pointIndex) => (
                                <div key={pointIndex} className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-300">
                                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover/item:text-slate-400 group-hover/item:translate-x-1 transition-all duration-300" />
                                  </div>
                                  <p className="text-slate-300 leading-relaxed group-hover/item:text-slate-200 transition-colors duration-300">
                                    {point}
                                  </p>
                                </div>
                              ))}
                            </StaggeredReveal>
                          </div>

                          {/* Bottom Accent Line */}
                          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Subtle Glow Effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-600/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                      </FloatingCard>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>

            {/* Timeline End Indicator */}
            <RevealWrapper
              animation="scaleIn"
              delay={800 + (experiences.length * 150)}
              className="flex justify-center mt-16"
              triggerOnce={false}
              threshold={0.3}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-sm text-slate-500 font-medium">Present Day</span>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* Bottom Section */}
        <RevealWrapper
          animation="fadeIn"
          delay={1000 + (experiences.length * 150)}
          className="text-center mt-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-full">
            <span className="text-slate-400">Ready for the next challenge</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Experience;
