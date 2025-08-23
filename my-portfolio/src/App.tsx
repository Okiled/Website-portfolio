import React, { useState, useEffect } from 'react';
import  ThemeProvider  from '../src/context/ThemeProvider'; // pastikan path sesuai
import LoadingScreen from '../src/components/LoadingScreen';
import Navigation from '../src/components/Navigation';
import HeroSection from '../src/sections/HeroSection';
import AboutSection from '../src/sections/About';
import ExperienceSection from '../src/sections/Experience';
import ProjectsSection from '../src/sections/Projects';
import SkillsSection from '../src/sections/Skills';
import ContactSection from '../src/sections/Contact';
import Footer from '../src/components/Footer';
// import SplashCursor from '../src/animations/SplashCursor'; // kalau dipakai, tetap import

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!showLoading) {
      let ticking = false;
      let lastScrollTime = 0;

      const handleScroll = () => {
        const y = window.scrollY;
        const now = performance.now();
        if (now - lastScrollTime < 16) return;
        lastScrollTime = now;

        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrollY(y);

            const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
            const scrollPosition = y + 100;

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

            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showLoading]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (showLoading) {
    return <LoadingScreen onFinish={handleLoadingComplete} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-x-hidden bg-surface text-content transition-colors duration-300">
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true" />
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
        <Footer activeSection={activeSection} scrollToSection={scrollToSection} />
      </div>
    </ThemeProvider>
  );
};

export default App;
