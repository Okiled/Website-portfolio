import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../animations/RevealAnimations';
import { experiences } from '../utils/data';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealWrapper
          animation="fadeIn"
          delay={100}
          className="text-center mb-12 sm:mb-16 md:mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-4 sm:mb-6">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-400">Career Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
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
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              A timeline of growth, challenges, and achievements that have shaped my professional journey
            </p>
          </RevealWrapper>
        </RevealWrapper>

        {/* Timeline Container */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Main Timeline Line - Hidden on mobile, visible on md+ */}
            <RevealWrapper
              animation="scaleIn"
              delay={500}
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-600 to-slate-600 hidden md:block"
              style={{ transformOrigin: 'top' }}
              triggerOnce={false}
              threshold={0.2}
            />

            {/* Mobile Timeline Line - Only visible on mobile */}
            <RevealWrapper
              animation="scaleIn"
              delay={500}
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-600 to-slate-600 block md:hidden"
              style={{ transformOrigin: 'top' }}
              triggerOnce={false}
              threshold={0.2}
            />

            {/* Experience Items */}
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {experiences.map((exp, index) => (
                <RevealWrapper
                  key={exp.title}
                  animation="slideUp"
                  delay={600 + (index * 150)}
                  className="relative"
                  triggerOnce={false}
                  threshold={0.25}
                >
                  <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
                    {/* Timeline Dot - Mobile Version */}
                    <div className="flex md:hidden items-center justify-center w-8 h-8 sm:w-10 sm:h-10 relative z-20 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full animate-pulse opacity-20" />
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-slate-200 to-white rounded-full border-2 border-slate-900 shadow-lg">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-600 opacity-80" />
                      </div>
                    </div>

                    {/* Timeline Dot - Desktop Version */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 relative z-20 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full animate-pulse opacity-20" />
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-white rounded-full border-4 border-slate-900 shadow-lg hover:scale-110 transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-600 opacity-80" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 min-w-0">
                      <FloatingCard delay={0}>
                        <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                          
                          {/* Card Header */}
                          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                            {/* Icon and Title Row */}
                            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                              <RevealWrapper
                                animation="rotateIn"
                                delay={700 + (index * 150)}
                                className="p-2 sm:p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300 flex-shrink-0"
                                triggerOnce={false}
                                threshold={0.25}
                              >
                                <exp.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                              </RevealWrapper>

                              <div className="min-w-0 flex-1">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-slate-200 transition-colors duration-300 break-words">
                                  {exp.title}
                                </h3>
                                <p className="text-slate-400 font-medium text-sm sm:text-base break-words">{exp.company}</p>
                              </div>
                            </div>

                            {/* Period Badge */}
                            <RevealWrapper
                              animation="slideLeft"
                              delay={750 + (index * 150)}
                              triggerOnce={false}
                              threshold={0.25}
                            >
                              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 self-start">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full animate-pulse flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium text-slate-300 whitespace-nowrap">{exp.period}</span>
                              </div>
                            </RevealWrapper>
                          </div>

                          {/* Description/Points */}
                          <div className="space-y-3 sm:space-y-4">
                            <StaggeredReveal
                              staggerDelay={60}
                              animation="slideUp"
                              baseDelay={800 + (index * 150)}
                              className="space-y-2 sm:space-y-3"
                              triggerOnce={false}
                              threshold={0.25}
                            >
                              {exp.points.map((point, pointIndex) => (
                                <div key={pointIndex} className="group/item flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-300">
                                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex items-center justify-center">
                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 group-hover/item:text-slate-400 group-hover/item:translate-x-1 transition-all duration-300" />
                                  </div>
                                  <p className="text-slate-300 leading-relaxed group-hover/item:text-slate-200 transition-colors duration-300 text-sm sm:text-base break-words">
                                    {point}
                                  </p>
                                </div>
                              ))}
                            </StaggeredReveal>
                          </div>

                          {/* Bottom Accent Line */}
                          <div className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Subtle Glow Effect */}
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-600/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
              className="flex justify-center mt-12 sm:mt-16 md:mt-20"
              triggerOnce={false}
              threshold={0.3}
            >
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Present Day</span>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* Bottom Section */}
        <RevealWrapper
          animation="fadeIn"
          delay={1000 + (experiences.length * 150)}
          className="text-center mt-16 sm:mt-20 md:mt-24"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-full">
            <span className="text-slate-400 text-sm sm:text-base">Ready for the next challenge</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Experience;