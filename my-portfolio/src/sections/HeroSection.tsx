import React from 'react';
import { Github, Linkedin, Mail, ChevronDown, MapPin, Download } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import TextScramble from '../components/TextScramble';
import { RevealWrapper, StaggeredReveal } from '../components/RevealAnimations';

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY, scrollToSection }) => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Okiled", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/deliko-hartono", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hartonodeliko@gmail.com", label: "Email" }
  ];

  const specialties = [
    "Artificial Intelligence",
    "Quantitative Finance", 
    "Full-Stack Development"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_60%)]"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />
      
      {/* Ambient Orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/5 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-slate-400/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Status Badge */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={100}
          className="text-center mb-16"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-300">Open for opportunities</span>
          </div>
        </RevealWrapper>

        {/* Name & Title */}
        <div className="text-center mb-16">
          <RevealWrapper 
            animation="fadeIn" 
            delay={200}
            className="mb-8"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="text-sm uppercase tracking-widest text-slate-500 font-medium mb-4">
              Portfolio
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <TextScramble 
                text="DELIKO HARTONO"
                className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent"
              />
            </h1>
          </RevealWrapper>
          
          <RevealWrapper 
            animation="slideUp" 
            delay={400}
            className="mb-8"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/30 backdrop-blur-xl border border-slate-600/20 rounded-full">
              <span className="text-lg sm:text-xl font-medium text-slate-300">Information Technology Student</span>
            </div>
          </RevealWrapper>

          <RevealWrapper 
            animation="fadeIn" 
            delay={600}
            className="max-w-4xl mx-auto"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-xl text-slate-400">
              <span>Passionate about</span>
              {specialties.map((specialty, index) => (
                <React.Fragment key={specialty}>
                  <span className={`font-semibold ${
                    index === 0 ? 'text-slate-200' : 
                    index === 1 ? 'text-slate-300' : 'text-slate-200'
                  }`}>
                    {specialty}
                  </span>
                  {index < specialties.length - 1 && <span className="text-slate-600">•</span>}
                </React.Fragment>
              ))}
            </div>
          </RevealWrapper>
        </div>

        {/* Social Links & Actions */}
        <RevealWrapper 
          animation="slideUp" 
          delay={800}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          triggerOnce={false}
          threshold={0.3}
        >
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <StaggeredReveal
              staggerDelay={100}
              animation="scaleIn"
              baseDelay={900}
              className="flex gap-4"
              triggerOnce={false}
              threshold={0.3}
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <FloatingCard key={label} delay={0}>
                  <a 
                    href={href} 
                    className="group relative p-4 bg-slate-800/40 backdrop-blur-xl border border-slate-600/30 rounded-xl hover:bg-slate-700/50 hover:border-slate-500/40 transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-slate-900/20"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors duration-300" />
                    
                    {/* Hover Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-slate-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {label}
                    </div>
                    
                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-600/10 to-slate-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                </FloatingCard>
              ))}
            </StaggeredReveal>
          </div>
          
          {/* Separator */}
          <div className="h-px w-12 sm:h-8 sm:w-px bg-slate-600" />
          
          {/* Download CV Button */}
          <RevealWrapper 
            animation="slideLeft" 
            delay={1200}
            triggerOnce={false}
            threshold={0.3}
          >
            <FloatingCard delay={0}>
              <button className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-xl border border-slate-500/40 rounded-xl hover:from-slate-600/70 hover:to-slate-500/70 hover:border-slate-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-slate-900/30">
                <Download className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors duration-300" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">Download Resume</span>
              </button>
            </FloatingCard>
          </RevealWrapper>
        </RevealWrapper>

        {/* Location & Experience Stats */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={1800}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 backdrop-blur-xl border border-slate-600/20 rounded-full">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Jakarta, Indonesia</span>
          </div>
          
          <div className="h-px w-8 bg-slate-600 hidden sm:block" />
          
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: 'Years Experience', value: '2+', color: 'slate-200' },
              { label: 'Projects Completed', value: '2+', color: 'slate-300' }
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <div className={`text-2xl font-bold text-${color} mb-1`}>
                  {value}
                </div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
        
        {/* Scroll Indicator */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={2000}
          className="text-center"
          triggerOnce={false}
          threshold={0.3}
        >
          <button 
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-all duration-500 mx-auto"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Scroll Down</span>
            <div className="flex flex-col gap-1">
              <ChevronDown className="w-5 h-5 animate-bounce" />
              <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent group-hover:from-slate-300 transition-colors duration-500" />
            </div>
          </button>
        </RevealWrapper>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
    </section>
  );
};

export default HeroSection;