import React, { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  isLoaded: boolean;
}

const menuItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  isLoaded,
}) => {
  const firstMobileItemRef = useRef<HTMLButtonElement | null>(null);

  const handleMenuClick = (section: string) => {
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  // Lock scroll ketika menu mobile terbuka + close dengan ESC
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // fokus ke item pertama untuk aksesibilitas
      setTimeout(() => firstMobileItemRef.current?.focus(), 0);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 
        border-b border-cyan-400/20
        bg-black/80 backdrop-blur-xl
        transition-all duration-500 ease-out
        ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        shadow-lg shadow-black/50
      `}
      role="navigation"
      aria-label="Primary navigation"
    >
      {/* Safe area top padding untuk notch devices */}
      <div className="pt-[env(safe-area-inset-top)]" />

      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="group select-none outline-none 
              focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50
              rounded-xl p-2 -m-2
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-95"
            aria-label="Go to Home"
          >
            <span
              className="font-black tracking-tight leading-none
                text-2xl sm:text-3xl lg:text-4xl
                bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400
                bg-clip-text text-transparent
                group-hover:from-cyan-300 group-hover:via-cyan-200 group-hover:to-purple-300
                transition-all duration-300 ease-out
                drop-shadow-lg
              "
            >
              DELIKO
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {menuItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative px-4 py-2.5 lg:px-5 lg:py-3 rounded-xl
                    font-medium text-sm lg:text-base
                    transition-all duration-300 ease-out
                    outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50
                    hover:scale-105 active:scale-95
                    ${
                      isActive
                        ? 'text-cyan-300 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 shadow-lg shadow-cyan-400/25'
                        : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                    }
                  `}
                >
                  <span className="relative z-10">{item}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl blur-sm" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl outline-none
              bg-white/5 hover:bg-white/10 active:bg-white/15
              border border-white/10 hover:border-cyan-400/30
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-95
              focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 text-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 text-cyan-300 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="pb-4 pt-2">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {menuItems.map((item, idx) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <button
                    key={item}
                    ref={idx === 0 ? firstMobileItemRef : undefined}
                    onClick={() => handleMenuClick(id)}
                    className={`group relative w-full text-center px-4 py-4 rounded-xl
                      font-medium text-sm
                      transition-all duration-300 ease-out
                      outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50
                      hover:scale-105 active:scale-95
                      ${
                        isActive
                          ? 'text-cyan-300 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 shadow-lg shadow-cyan-400/25'
                          : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/20'
                      }
                    `}
                  >
                    <span className="relative z-10">{item}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl blur-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;