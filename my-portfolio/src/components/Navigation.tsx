import React from 'react';
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
  const handleMenuClick = (section: string) => {
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full bg-black/20 backdrop-blur-xl border-b border-white/10 z-40 transition-all duration-500 ${
      isLoaded ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* LOGO BESAR */}
          <div className="select-none">
            <span
              className="font-extrabold 
                text-2xl sm:text-4xl lg:text-5xl 
                bg-gradient-to-r from-cyan-400 to-purple-400 
                bg-clip-text text-transparent 
                animate-pulse 
                hover:text-pink-400 
                transition-colors duration-300 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              DELIKO
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.toLowerCase()
                    ? 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-110"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-4 py-4 border-t border-white/10 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleMenuClick(item.toLowerCase())}
                className={`block w-full text-left px-3 py-3 rounded-lg transition-all duration-300
                  ${activeSection === item.toLowerCase() 
                    ? 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
