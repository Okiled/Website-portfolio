import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Menu, X, Sparkles, Sun, Moon, Home, User, Briefcase, FolderOpen, Code, Mail } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  isLoaded: boolean;
}

type ThemeToggleProps = {
  variant?: 'icon' | 'switch';
  size?: 'sm' | 'md' | 'lg';
};

const menuItems = [
  { name: 'Home', icon: Home },
  { name: 'About', icon: User },
  { name: 'Experience', icon: Briefcase },
  { name: 'Projects', icon: FolderOpen },
  { name: 'Skills', icon: Code },
  { name: 'Contact', icon: Mail }
] as const;

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', size = 'md' }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') return document.documentElement.classList.contains('dark');
    return false;
  });

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  }, [isDark]);

  const iconSize = useMemo(() => (size === 'sm' ? 16 : size === 'md' ? 18 : 20), [size]);

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))] group"
        style={{ 
          backgroundColor: `rgb(var(--bg) / 0.4)`,
          border: `1px solid rgb(var(--fg) / 0.2)`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.1)'
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        aria-pressed={isDark}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full shadow-lg transition-all duration-300 ease-out flex items-center justify-center ${
            isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
          style={{ backgroundColor: `rgb(var(--brand))` }}
        >
          {isDark ? (
            <Moon size={12} style={{ color: `rgb(var(--bg))` }} />
          ) : (
            <Sun size={12} style={{ color: `rgb(var(--bg))` }} />
          )}
        </span>
        <div 
          className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, rgb(var(--brand) / 0.2), rgb(var(--brand) / 0.4))` }}
        />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))] group overflow-hidden"
      style={{ 
        backgroundColor: `rgb(var(--bg) / 0.3)`, 
        border: `1px solid rgb(var(--fg) / 0.15)`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 25px rgba(0,0,0,0.1)'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
        style={{ background: `linear-gradient(135deg, rgb(var(--brand) / 0.1), rgb(var(--brand) / 0.2))` }}
      />
      {isDark ? (
        <Sun size={iconSize} className="relative z-10 drop-shadow-sm transition-all duration-300" style={{ color: `rgb(var(--brand))` }} />
      ) : (
        <Moon size={iconSize} className="relative z-10 drop-shadow-sm transition-all duration-300" style={{ color: `rgb(var(--brand))` }} />
      )}
    </button>
  );
};

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  isLoaded,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const firstMobileItemRef = useRef<HTMLButtonElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Scroll -> progress
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const startThreshold = vh * 0.08; // mulai cepat
      const endThreshold = vh * 0.35;   // selesai cepat
      const newScrolled = y > 10;
      let progress = 0;
      if (y > startThreshold) {
        if (y >= endThreshold) {
          progress = 1;
        } else {
          const raw = (y - startThreshold) / (endThreshold - startThreshold);
          // ease-in-out
          progress = raw * raw * (3 - 2 * raw);
        }
      }
      if (newScrolled !== scrolled) setScrolled(newScrolled);
      setTransitionProgress(progress);
    });
  }, [scrolled]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const handleMenuClick = useCallback((section: string) => {
    scrollToSection(section.toLowerCase());
    setIsMenuOpen(false);
  }, [scrollToSection, setIsMenuOpen]);

  const handleLogoClick = useCallback(() => {
    scrollToSection('home');
  }, [scrollToSection]);

  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen, setIsMenuOpen]);

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  // Sizing & rounding
  const navHeight = useMemo(() => {
    const baseHeight = window.innerWidth < 640 ? 70 : window.innerWidth < 768 ? 76 : 80;
    const targetHeight = window.innerWidth < 640 ? 66 : window.innerWidth < 768 ? 70 : 74;
    return lerp(baseHeight, targetHeight, transitionProgress);
  }, [transitionProgress, lerp]);

  const radius = useMemo(() => lerp(0, 28, transitionProgress || 0), [transitionProgress, lerp]);

  const containerStyles = useMemo(() => {
    // Lebih besar saat floating agar terasa "besar sedikit"
    const maxWidth = lerp(9999, 1280, transitionProgress);
    const horizontalPadding = lerp(0, 28, transitionProgress);
    return {
      height: navHeight,
      maxWidth: maxWidth > 9000 ? 'none' : `${maxWidth}px`,
      marginLeft: maxWidth > 9000 ? '0' : 'auto',
      marginRight: maxWidth > 9000 ? '0' : 'auto',
      paddingLeft: `${horizontalPadding}px`,
      paddingRight: `${horizontalPadding}px`,
      top: `0px`,                 // tetap nempel atas (no gap)
      borderRadius: `${radius}px`,
      overflow: 'hidden'
    };
  }, [navHeight, transitionProgress, radius, lerp]);

  // BACKGROUND + GLOW
  const backgroundStyles = useMemo(() => {
    const bgOpacity = lerp(scrolled ? 0.94 : 0.88, 0.98, transitionProgress);
    const blurAmount = lerp(12, 22, transitionProgress);
    const borderOpacity = lerp(0.14, 0.3, transitionProgress);

    // Normal: hanya bottom glow yang lebar & lembut
    if (transitionProgress === 0) {
      return {
        backgroundColor: `rgb(var(--bg) / ${bgOpacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        border: 'none',
        borderBottomWidth: '1px',
        borderBottomColor: `rgb(var(--fg) / 0.18)`,
        boxShadow:
          // wide soft bottom spread
          `0 22px 48px 10px rgba(255,255,255,0.10), ` + // white spread
          `0 3px 0 0 rgba(255,255,255,0.35)`,
        borderRadius: `${radius}px`,
      } as React.CSSProperties;
    }

    // Floating: besar, spreading, dan benar-benar terlihat melayang
    const whiteGlow = `0 0 60px 18px rgba(255,255,255,${lerp(0.14, 0.26, transitionProgress)})`; // white aura besar
    const outline = `0 0 0 1px rgba(255,255,255,${borderOpacity})`;                               // garis tipis putih
    const ambient = `0 32px 80px 0 rgba(0,0,0,0.30)`;                                            // drop shadow kebawah
    const mid = `0 12px 32px 6px rgba(0,0,0,0.12)`;                                             // mid shadow

    return {
      backgroundColor: `rgb(var(--bg) / ${bgOpacity})`,
      backdropFilter: `blur(${blurAmount}px)`,
      border: `1px solid rgb(var(--fg) / ${borderOpacity})`,
      boxShadow: `${outline}, ${mid}, ${ambient}, ${whiteGlow}, inset 0 1px 0 rgba(255,255,255,0.45)`,
      borderRadius: `${radius}px`,
    } as React.CSSProperties;
  }, [transitionProgress, scrolled, lerp, radius]);

  // Logo/menu size
  const logoStyles = useMemo(() => {
    const logoSize = lerp(28, 26, transitionProgress);
    const fontSize = lerp(1.5, 1.4, transitionProgress);
    return { logoSize, fontSize };
  }, [transitionProgress, lerp]);

  const menuItemStyles = useMemo(() => {
    const iconSize = lerp(16, 15, transitionProgress);
    const padding = `${lerp(10, 9, transitionProgress)}px ${lerp(16, 14, transitionProgress)}px`;
    const gap = `${lerp(8, 7, transitionProgress)}px`;
    const fontSize = lerp(13, 12.5, transitionProgress);
    return { iconSize, padding, gap, fontSize };
  }, [transitionProgress, lerp]);

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-md lg:hidden transition-all duration-300 ease-out"
          style={{ 
            backgroundColor: `rgb(var(--bg) / 0.8)`,
            opacity: isMenuOpen ? 1 : 0
          }}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed z-50 left-0 right-0 transition-all duration-300 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={containerStyles}
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="absolute inset-0 transition-all duration-300 ease-out" style={backgroundStyles}>
          {/* garis highlight tipis hanya saat floating */}
          {transitionProgress > 0 && (
            <div
              className="absolute left-0 right-0 top-0 h-px transition-all duration-300 ease-out"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 20%, rgba(255,255,255,0.95) 50%, rgba(255,255,white,0.65) 80%, transparent 100%)`,
                opacity: transitionProgress * 0.85,
                filter: `blur(0.5px)`
              }}
            />
          )}
        </div>

        <div className="relative h-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-out">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="group flex items-center gap-3 p-2 -m-2 rounded-xl transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))]"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `rgb(var(--brand) / 0.08)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              aria-label="Go to Home"
            >
              <div className="relative">
                <Sparkles
                  size={logoStyles.logoSize}
                  className="transition-all duration-300 ease-out group-hover:rotate-12 group-hover:scale-110 drop-shadow-sm"
                  style={{ color: `rgb(var(--brand))` }}
                />
                <div className="absolute inset-0 blur-md opacity-30 transition-all duration-300">
                  <Sparkles size={logoStyles.logoSize} style={{ color: `rgb(var(--brand))` }} />
                </div>
              </div>
              <span
                className="font-black tracking-tight leading-none transition-all duration-300 ease-out"
                style={{
                  fontSize: `${logoStyles.fontSize}rem`,
                  background: `linear-gradient(135deg, rgb(var(--fg)), rgb(var(--fg) / 0.8))`,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                DELIKO
              </span>
            </button>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-4">
              <div
                className="flex items-center rounded-2xl backdrop-blur-sm transition-all duration-300 ease-out"
                style={{
                  backgroundColor: `rgb(var(--bg) / 0.4)`,
                  border: `1px solid rgb(var(--fg) / 0.15)`,
                  padding: `${lerp(6, 5, transitionProgress)}px`,
                  gap: `${lerp(4, 3, transitionProgress)}px`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 20px rgba(0,0,0,0.08)`
                }}
              >
                {menuItems.map((item) => {
                  const id = item.name.toLowerCase();
                  const isActive = activeSection === id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative flex items-center rounded-xl font-semibold transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))] ${isActive ? 'shadow-lg' : ''}`}
                      style={{
                        padding: menuItemStyles.padding,
                        gap: menuItemStyles.gap,
                        fontSize: `${menuItemStyles.fontSize}px`,
                        backgroundColor: isActive ? `rgb(var(--brand))` : 'transparent',
                        color: isActive ? `rgb(var(--bg))` : `rgb(var(--fg) / 0.88)`
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--brand) / 0.08)`;
                          e.currentTarget.style.color = `rgb(var(--brand))`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = `rgb(var(--fg) / 0.88)`;
                        }
                      }}
                    >
                      <Icon size={menuItemStyles.iconSize} className="transition-all duration-300" />
                      <span className="relative z-10 whitespace-nowrap transition-all duration-300">
                        {transitionProgress > 0.7 && window.innerWidth < 1280 ? item.name.slice(0, 4) : item.name}
                      </span>
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-xl blur-sm opacity-30 transition-all duration-300"
                          style={{ backgroundColor: `rgb(var(--brand))` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="ml-2">
                <ThemeToggle variant="icon" size="md" />
              </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle variant="icon" size="sm" />
              <button
                onClick={toggleMenu}
                className="relative p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))] overflow-hidden"
                style={{
                  backgroundColor: `rgb(var(--bg) / 0.3)`,
                  border: `1px solid rgb(var(--fg) / 0.2)`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.1)'
                }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, rgb(var(--brand) / 0.1), rgb(var(--brand) / 0.2))` }}
                />
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
                    style={{ color: `rgb(var(--fg) / 0.88)` }}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}
                    style={{ color: `rgb(var(--brand))` }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
            <div className="pt-6 space-y-4">
              <div
                className="flex items-center justify-between p-4 rounded-xl backdrop-blur-sm transition-all duration-300"
                style={{ 
                  backgroundColor: `rgb(var(--bg) / 0.6)`, 
                  border: `1px solid rgb(var(--fg) / 0.15)`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <span className="text-sm font-semibold flex items-center gap-3" style={{ color: `rgb(var(--fg) / 0.88)` }}>
                  <Sparkles size={18} style={{ color: `rgb(var(--brand))` }} />
                  Theme
                </span>
                <ThemeToggle variant="switch" size="md" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item, idx) => {
                  const id = item.name.toLowerCase();
                  const isActive = activeSection === id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      ref={idx === 0 ? firstMobileItemRef : undefined}
                      onClick={() => handleMenuClick(item.name)}
                      className={`relative flex flex-col items-center gap-3 p-4 rounded-xl font-semibold text-sm transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))] overflow-hidden ${isActive ? 'shadow-xl' : ''}`}
                      style={{
                        backgroundColor: isActive ? `rgb(var(--brand))` : `rgb(var(--bg) / 0.6)`,
                        color: isActive ? `rgb(var(--bg))` : `rgb(var(--fg) / 0.88)`,
                        border: `1px solid rgb(var(--fg) / 0.15)`,
                        boxShadow: isActive 
                          ? `0 12px 30px rgb(var(--brand) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2)` 
                          : 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--brand) / 0.08)`;
                          e.currentTarget.style.color = `rgb(var(--brand))`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--bg) / 0.6)`;
                          e.currentTarget.style.color = `rgb(var(--fg) / 0.88)`;
                        }
                      }}
                    >
                      <Icon size={28} className="relative z-10 transition-all duration-300" />
                      <span className="relative z-10 transition-all duration-300">{item.name}</span>
                      {isActive && (
                        <div 
                          className="absolute inset-0 rounded-xl blur-xl scale-110 opacity-30 transition-all duration-300"
                          style={{ backgroundColor: `rgb(var(--brand))` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
