import React from 'react';
import { BookOpen, Star, User, GraduationCap, Brain, Code2 } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../animations/RevealAnimations';

const About: React.FC = () => {
  const interests = [
    { text: 'AI & Machine Learning', color: 'slate', icon: Brain },
    { text: 'Quantitative Finance', color: 'slate', icon: GraduationCap },
    { text: 'Full-Stack Development', color: 'slate', icon: Code2 },
    { text: 'Blockchain Technology', color: 'slate', icon: BookOpen },
    { text: 'Data Science', color: 'slate', icon: Star }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
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
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-400">Personal Profile</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            <TextReveal 
              text="About Me" 
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
              Passionate about bridging technology and finance through innovative solutions
            </p>
          </RevealWrapper>
        </RevealWrapper>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            
            {/* Left Column - Description */}
            <div className="space-y-6 sm:space-y-8">
              {/* Main Description Card */}
              <RevealWrapper 
                animation="slideUp" 
                delay={400}
                triggerOnce={false}
                threshold={0.25}
              >
                <FloatingCard delay={0}>
                  <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <RevealWrapper 
                        animation="rotateIn" 
                        delay={500}
                        className="p-2 sm:p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300 flex-shrink-0"
                        triggerOnce={false}
                        threshold={0.25}
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      </RevealWrapper>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Introduction</h3>
                    </div>
                    
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      I'm an Information Technology student at Binus University with a passion for AI, quantitative finance, and full-stack development. Currently in my 5th semester with a focus on building innovative solutions that bridge technology and finance.
                    </p>
                    
                    <div className="mt-4 sm:mt-6 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </FloatingCard>
              </RevealWrapper>
              
              {/* Web3 Experience Card */}
              <RevealWrapper 
                animation="slideUp" 
                delay={550}
                triggerOnce={false}
                threshold={0.25}
              >
                <FloatingCard delay={100}>
                  <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <RevealWrapper 
                        animation="rotateIn" 
                        delay={650}
                        className="p-2 sm:p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300 flex-shrink-0"
                        triggerOnce={false}
                        threshold={0.25}
                      >
                        <Code2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      </RevealWrapper>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Web3 Journey</h3>
                    </div>
                    
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      Active in the Web3 ecosystem since 2022, I have extensive experience in blockchain technologies, DeFi protocols, and cryptocurrency trading algorithms. I'm particularly interested in applying AI to financial markets and building decentralized applications.
                    </p>
                    
                    <div className="mt-4 sm:mt-6 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </FloatingCard>
              </RevealWrapper>
              
              {/* Interests/Skills */}
              <RevealWrapper 
                animation="slideUp" 
                delay={700}
                triggerOnce={false}
                threshold={0.25}
              >
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white px-1">Areas of Interest</h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <StaggeredReveal
                      staggerDelay={100}
                      animation="slideUp"
                      baseDelay={800}
                      className="contents"
                      triggerOnce={false}
                      threshold={0.25}
                    >
                      {interests.map(({ text, icon: Icon }) => (
                        <FloatingCard key={text} delay={0}>
                          <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-md sm:rounded-lg group-hover:shadow-slate-600/20 transition-all duration-300 flex-shrink-0">
                                <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                              <span className="text-slate-300 font-medium group-hover:text-slate-200 transition-colors duration-300 text-sm sm:text-base">
                                {text}
                              </span>
                            </div>
                          </div>
                        </FloatingCard>
                      ))}
                    </StaggeredReveal>
                  </div>
                </div>
              </RevealWrapper>
            </div>
            
            {/* Right Column - Education */}
            <RevealWrapper 
              animation="slideUp" 
              delay={600}
              triggerOnce={false}
              threshold={0.25}
            >
              <FloatingCard delay={200}>
                <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <RevealWrapper 
                      animation="rotateIn" 
                      delay={700}
                      className="p-2 sm:p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300 flex-shrink-0"
                      triggerOnce={false}
                      threshold={0.25}
                    >
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </RevealWrapper>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Education</h3>
                  </div>
                  
                  <RevealWrapper 
                    animation="slideUp" 
                    delay={800}
                    triggerOnce={false}
                    threshold={0.25}
                  >
                    <div className="space-y-6 sm:space-y-8">
                      {/* University Details */}
                      <div className="group/edu relative p-4 sm:p-6 bg-slate-800/30 rounded-lg sm:rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/30 hover:border-slate-600/50">
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-md sm:rounded-lg flex-shrink-0">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-semibold text-white group-hover/edu:text-slate-200 mb-1 sm:mb-2 transition-colors duration-300">
                              Binus University
                            </h4>
                            <p className="text-sm sm:text-base text-slate-300 mb-1">Bachelor's in Information Technology</p>
                            <p className="text-xs sm:text-sm text-slate-400">Aug 2023 – Expected 2027</p>
                          </div>
                        </div>
                        
                        {/* GPA Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                            <span className="text-slate-400 text-xs sm:text-sm">GPA: 3.0/4.0</span>
                          </div>
                          <div className="flex-1 bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                            <div className="bg-gradient-to-r from-slate-500 to-slate-400 h-1.5 sm:h-2 rounded-full transition-all duration-1000 ease-out" 
                                 style={{ width: '75%' }} />
                          </div>
                        </div>
                        
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover/edu:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Stats Grid */}
                      <StaggeredReveal
                        staggerDelay={100}
                        animation="slideUp"
                        baseDelay={900}
                        className="grid grid-cols-2 gap-3 sm:gap-4"
                        triggerOnce={false}
                        threshold={0.25}
                      >
                        <div className="group/stat relative text-center p-3 sm:p-4 bg-slate-800/30 rounded-lg sm:rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/30 hover:border-slate-600/50">
                          <div className="text-xl sm:text-2xl font-bold text-slate-200 group-hover/stat:text-white transition-colors duration-300">5th</div>
                          <div className="text-xs text-slate-400 group-hover/stat:text-slate-300 transition-colors duration-300 mt-1">Current Semester</div>
                        </div>
                        <div className="group/stat relative text-center p-3 sm:p-4 bg-slate-800/30 rounded-lg sm:rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/30 hover:border-slate-600/50">
                          <div className="text-xl sm:text-2xl font-bold text-slate-200 group-hover/stat:text-white transition-colors duration-300">3.0</div>
                          <div className="text-xs text-slate-400 group-hover/stat:text-slate-300 transition-colors duration-300 mt-1">Current GPA</div>
                        </div>
                      </StaggeredReveal>
                    </div>
                  </RevealWrapper>
                  
                  <div className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-600/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </FloatingCard>
            </RevealWrapper>
          </div>
        </div>

        {/* Bottom Quote/CTA */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={1000}
          className="text-center mt-12 sm:mt-16 md:mt-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-full hover:bg-slate-700/50 transition-all duration-300 mx-4">
            <span className="text-slate-400 text-sm sm:text-base text-center">"Building the future, one line of code at a time"</span>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default About;