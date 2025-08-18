import React, { useState, useEffect } from 'react';
import LoadingScreen from '../src/components/LoadingScreen';
import Navigation from '../src/components/Navigation';
import HeroSection from '../src/sections/HeroSection';
import AboutSection from '../src/sections/About';
import ExperienceSection from '../src/sections/Experience';
import ProjectsSection from '../src/sections/Projects';
import SkillsSection from '../src/sections/Skills';
import ContactSection from '../src/sections/Contact';
import Footer from '../src/components/Footer';
import SplashCursor from '../src/animations/SplashCursor';

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

      const handleScroll = () => {
        const y = window.scrollY;

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

      // initial compute
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showLoading]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        aria-hidden="true"
      >
        <SplashCursor />
      </div>

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
