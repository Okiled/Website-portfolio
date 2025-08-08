import React from 'react';
import { Github, Linkedin, Mail, ChevronDown, Star } from 'lucide-react';
import FloatingCard from '../components/FloatingCard.tsx';
import TextScramble from '../components/TextScramble.tsx';
import AnimatedCounter from '../components/AnimatedCounter.tsx';

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Parallax background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <FloatingCard delay={0}>
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1 hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">DH</span>
            </div>
          </div>
        </FloatingCard>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
          <TextScramble 
            text="DELIKO HARTONO"
            className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          />
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Information Technology Student passionate about 
          <span className="text-cyan-400 font-semibold"> AI</span>, 
          <span className="text-purple-400 font-semibold"> Quantitative Finance</span>, and 
          <span className="text-pink-400 font-semibold"> Full-Stack Development</span>
        </p>
        
        <div className="flex justify-center space-x-6 mb-16">
          {socialLinks.map(({ icon: Icon, href, label }, index) => (
            <FloatingCard key={label} delay={index * 100}>
              <a 
                href={href} 
                className="group p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/10"
                aria-label={label}
              >
                <Icon size={24} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
            </FloatingCard>
          ))}
        </div>

        {/* Enhanced stats with animations */}
        <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto mb-16">
          {[
            { label: 'Years Experience', value: 2, color: 'cyan' },
            { label: 'Projects Completed', value: 2, color: 'purple' },
          ].map(({ label, value, color }) => (
            <FloatingCard key={label}>
              <div className="text-center">
                <div className={`text-4xl font-bold text-${color}-400 mb-2`}>
                  <AnimatedCounter end={value} suffix="" />
                </div>
                <div className="text-sm text-white/60">{label}</div>
              </div>
            </FloatingCard>
          ))}
        </div>
        
        <button 
          onClick={() => scrollToSection('about')}
          className="animate-bounce text-white/60 hover:text-white transition-colors duration-300 transform hover:scale-110"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;