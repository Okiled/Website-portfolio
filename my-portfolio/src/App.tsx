import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from '../src/components/Navigation';
import ParticleSystem from '../src/components/ParticleSystem';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/About';
import ExperienceSection from './sections/Experience';
import ProjectsSection from './sections/Projects';
import SkillsSection from './sections/Skills';
import ContactSection from './sections/Contact';
import Footer from '../src/components/Footer';

interface MousePosition {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState<number>(0);

  const handleLoadingComplete = (): void => {
    setShowLoading(false);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!showLoading) {
      const handleScroll = (): void => {
        setScrollY(window.scrollY);
        const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      const handleMouseMove = (e: MouseEvent): void => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [showLoading]);

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      <ParticleSystem />
      
      {/* Enhanced cursor glow */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: `radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 100%)`
        }}
      />

      <Navigation 
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        isLoaded={isLoaded}
      />

      <HeroSection scrollY={scrollY} scrollToSection={scrollToSection} />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer 
      activeSection={activeSection} 
      scrollToSection={scrollToSection} 
      />



    </div>
  );
};

export default App;