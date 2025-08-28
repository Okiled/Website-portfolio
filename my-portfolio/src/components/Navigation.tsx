import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Code,
  Mail,
} from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

type Variant = "button" | "switch" | "icon" | "minimal" | "floating";
type Size = "sm" | "md" | "lg";
interface ThemeToggleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  showLabel?: boolean;
  ariaLabel?: string;
}
const sizeClasses = {
  sm: { button: "px-4 py-2 text-sm", icon: "w-8 h-8 p-1.5", iconSize: 14 },
  md: { button: "px-6 py-2.5 text-base", icon: "w-10 h-10 p-2", iconSize: 18 },
  lg: { button: "px-8 py-3 text-lg", icon: "w-12 h-12 p-2.5", iconSize: 22 },
} as const;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "icon",
  size = "md",
  className = "",
  showLabel = false,
  ariaLabel,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { icon } = sizeClasses[size];
  const isDark = theme === "dark";
  
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel ?? `Switch to ${isDark ? "Light" : "Dark"} mode`}
        className={`${icon} relative rounded-full overflow-hidden backdrop-blur-md transition-all duration-300 border border-fg/20 text-fg hover:scale-105 active:scale-95 ${className}`}
        style={{
          backgroundColor: `rgba(${isDark ? "0, 14, 27" : "0, 83, 156"}, 0.06)`,
          borderColor: `rgba(${
            isDark ? "214, 237, 23" : "238, 164, 127"
          }, 0.18)`,
          color: `rgb(${isDark ? "214, 237, 23" : "238, 164, 127"})`,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`${
              isDark
                ? "opacity-0 rotate-180 scale-0"
                : "opacity-100 rotate-0 scale-100"
            } absolute inset-0 grid place-items-center transition-all duration-500`}
          >
            ☀️
          </div>
          <div
            className={`${
              isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-180 scale-0"
            } absolute inset-0 grid place-items-center transition-all duration-500`}
          >
            🌙
          </div>
        </div>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel ?? `Switch to ${isDark ? "Light" : "Dark"} mode`}
      className={`${sizeClasses[size].button} rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-105 active:scale-95`}
      style={{
        background: isDark ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.5)",
        border: `1px solid rgba(${isDark ? "71,85,105" : "209,213,219"},0.4)`,
        color: isDark ? "#e5e7eb" : "#374151",
      }}
    >
      {showLabel ? (
        `Switch to ${isDark ? "Light" : "Dark"}`
      ) : (
        <div className="flex items-center justify-center">🌓</div>
      )}
    </button>
  );
};

type IconComp = React.ComponentType<{
  size?: number | string;
  className?: string;
}>;
interface MenuItem {
  name: string;
  id: string;
  icon?: IconComp;
  isTheme?: boolean;
  shortcut?: string;
}
const menuItems: readonly MenuItem[] = [
  { name: "Home", id: "home", icon: Home, shortcut: "H" },
  { name: "About", id: "about", icon: User, shortcut: "A" },
  { name: "Experience", id: "experience", icon: Briefcase, shortcut: "E" },
  { name: "Projects", id: "projects", icon: FolderOpen, shortcut: "P" },
  { name: "Skills", id: "skills", icon: Code, shortcut: "S" },
  { name: "Contact", id: "contact", icon: Mail, shortcut: "C" },
  { name: "Theme", id: "theme", isTheme: true, shortcut: "T" },
] as const;

interface DockConfig {
  baseSize: number;
  maxScale: number;
  influence: number;
  lift: number;
  spring: number;
}
const DEFAULT_DOCK: DockConfig = {
  baseSize: 54,
  maxScale: 2.6,
  influence: 140,
  lift: 36,
  spring: 0.22,
};

interface DockProps {
  items: readonly MenuItem[];
  activeId: string;
  onSelect: (id: string) => void;
  config?: Partial<DockConfig>;
  isTop?: boolean;
}

const Dock: React.FC<DockProps> = ({
  items,
  activeId,
  onSelect,
  config,
  isTop = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cfgRef = useRef({ ...DEFAULT_DOCK, ...config });
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, {
      passive: true,
    } as AddEventListenerOptions);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  
  cfgRef.current.baseSize = useMemo(() => {
    if (vw < 360) return 40;
    if (vw < 480) return 44;
    if (vw < 640) return 48;
    if (vw < 1024) return 52;
    return config?.baseSize ?? DEFAULT_DOCK.baseSize;
  }, [vw, config?.baseSize]);

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centersRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const animTargets = useRef<{ scale: number; lift: number; slot: number }[]>([]);
  const animValues = useRef<{ scale: number; lift: number; slot: number }[]>([]);
  const themeBtnRef = useRef<HTMLDivElement | null>(null);

  const measure = useCallback(() => {
    centersRef.current = slotRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2;
    });
  }, []);
  
  useLayoutEffect(() => {
    measure();
    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize, {
      passive: true,
    } as AddEventListenerOptions);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  useEffect(() => {
    animTargets.current = items.map(() => ({
      scale: 1,
      lift: 0,
      slot: cfgRef.current.baseSize,
    }));
    animValues.current = items.map(() => ({
      scale: 1,
      lift: 0,
      slot: cfgRef.current.baseSize,
    }));
  }, [items.length]);

  const step = useCallback(() => {
    const s = cfgRef.current.spring;
    let still = false;
    for (let i = 0; i < items.length; i++) {
      const v = animValues.current[i];
      const t = animTargets.current[i];
      v.scale += (t.scale - v.scale) * s;
      v.lift += (t.lift - v.lift) * s;
      v.slot += (t.slot - v.slot) * s;
      const slot = slotRefs.current[i];
      if (slot) slot.style.width = `${v.slot}px`;
      const btn = btnRefs.current[i];
      if (btn) {
        const liftDirection = isTop ? v.lift : -v.lift;
        btn.style.transform = `translateY(${liftDirection}px) scale(${v.scale}) translateZ(0)`;
        btn.style.willChange = "transform";
        btn.style.zIndex = "1";
      }
      if (
        Math.abs(v.scale - t.scale) > 0.004 ||
        Math.abs(v.lift - t.lift) > 0.4 ||
        Math.abs(v.slot - t.slot) > 0.6
      )
        still = true;
    }
    if (still) rafRef.current = requestAnimationFrame(step);
    else rafRef.current = null;
  }, [items.length, isTop]);

  const gaussianFalloff = (d: number, sigma: number) => {
    const x = d / sigma;
    return Math.exp(-(x * x) / 2);
  };

  const updateTargetsFromMouse = useCallback(
    (clientX: number | null) => {
      for (let i = 0; i < items.length; i++) {
        const base = cfgRef.current.baseSize;
        if (items[i].isTheme) {
          animTargets.current[i] = { scale: 1, lift: 0, slot: base };
          continue;
        }
        let influence = 0;
        if (clientX !== null) {
          const d = Math.abs(clientX - centersRef.current[i]);
          influence = gaussianFalloff(d, cfgRef.current.influence / 4);
        }
        const scale = 1 + (cfgRef.current.maxScale - 1) * influence;
        const lift = cfgRef.current.lift * influence;
        const slotWidth = base * scale;
        animTargets.current[i] = { scale, lift, slot: slotWidth };
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    },
    [items, step]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (
        themeBtnRef.current &&
        themeBtnRef.current.contains(e.target as Node)
      ) {
        updateTargetsFromMouse(null);
        return;
      }
      updateTargetsFromMouse(e.clientX);
    },
    [updateTargetsFromMouse]
  );

  const onMouseLeave = useCallback(() => {
    updateTargetsFromMouse(null);
    setHoveredItem(null);
  }, [updateTargetsFromMouse]);

  return (
    <div className="relative">
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative flex items-start justify-center gap-5 px-5 py-3 rounded-[24px] overflow-visible"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          backgroundImage: `
            radial-gradient(120% 180% at 50% 100%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.02) 65%, transparent 100%),
            linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12)),
            linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12))
          `,
          border: `1px solid rgba(${
            isDark ? "214, 237, 23" : "238, 164, 127"
          }, 0.12)`,
          boxShadow:
            "0 18px 50px rgba(0,0,0,0.28), 0 6px 18px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        <div
          className="pointer-events-none absolute left-4 right-4 -top-1 h-2 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.0))",
            filter: "blur(1px)",
          }}
        />
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredItem === item.id;
          const Icon = item.icon;
          const base = cfgRef.current.baseSize;
          
          const button = (
            <button
              ref={(el) => (btnRefs.current[idx] = el)}
              onClick={() => !item.isTheme && onSelect(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 relative transition-[box-shadow,filter] duration-200 transform-gpu group"
              style={{
                width: base,
                height: base,
                transformOrigin: "top center",
                backgroundColor: isActive
                  ? `rgba(${isDark ? "161, 19, 18" : "150, 164, 211"}, 0.70)`
                  : `rgba(${isDark ? "0, 14, 27" : "0, 83, 156"}, 0.22)`,
                borderColor: isActive
                  ? `rgba(${isDark ? "161, 19, 18" : "150, 164, 211"}, 0.46)`
                  : `rgba(${isDark ? "214, 237, 23" : "238, 164, 127"}, 0.18)`,
                borderWidth: 1,
                boxShadow: isActive
                  ? `0 10px 28px rgba(${
                      isDark ? "161, 19, 18" : "150, 164, 211"
                    }, 0.45), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 0 1px rgba(255,255,255,0.08)`
                  : "0 3px 12px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
              title={item.name}
              aria-current={isActive ? "page" : undefined}
              aria-keyshortcuts={item.shortcut}
            >
              <div className="grid place-items-center h-full relative z-10">
                {item.isTheme ? (
                  <ThemeToggle
                    variant="icon"
                    size="sm"
                    ariaLabel="Toggle theme"
                  />
                ) : (
                  Icon && (
                    <Icon
                      size={20}
                      className={[
                        "transition-all duration-200",
                        isActive
                          ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]"
                          : "",
                        !isActive
                          ? isDark
                            ? "text-[rgb(214,237,23)]"
                            : "text-[rgb(238,164,127)]"
                          : "",
                        isHovered && !isActive ? "scale-110" : "",
                      ].join(" ")}
                    />
                  )
                )}
              </div>
              
              {/* Active indicator - enhanced */}
              {isActive && (
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    boxShadow: `0 0 9px rgba(${
                      isDark ? "161, 19, 18" : "150, 164, 211"
                    }, 0.85)`,
                  }}
                />
              )}
              
              {/* Ripple effect on hover */}
              {isHovered && !item.isTheme && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-20 animate-ping"
                  style={{
                    backgroundColor: isDark ? "rgb(214, 237, 23)" : "rgb(238, 164, 127)",
                  }}
                />
              )}
            </button>
          );
          
          return (
            <div
              key={item.id}
              ref={(el) => (slotRefs.current[idx] = el)}
              className="group relative flex justify-center items-start"
              style={{
                width: cfgRef.current.baseSize,
                transition: "width 80ms linear",
              }}
              onMouseEnter={() => {
                if (item.isTheme) updateTargetsFromMouse(null);
              }}
              onMouseMove={(e) => {
                if (item.isTheme) {
                  e.stopPropagation();
                  updateTargetsFromMouse(null);
                }
              }}
              onMouseLeave={() => {
                if (item.isTheme) updateTargetsFromMouse(null);
              }}
            >
              <div className="relative">
                {item.isTheme ? <div ref={themeBtnRef}>{button}</div> : button}
                
                {/* Enhanced tooltip - follows icon movement */}
                <div
                  className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-30
                  ${hoveredItem === item.id 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-2 scale-90'
                  }
                  transition-all duration-300 ease-out`}
                  style={{
                    top: `${cfgRef.current.baseSize + (isTop ? (animValues.current[idx]?.lift || 0) : -(animValues.current[idx]?.lift || 0)) + 12}px`
                  }}
                >
                  <div
                    className="relative rounded-2xl px-5 py-3 text-sm font-semibold ring-1 shadow-2xl backdrop-blur-xl min-w-max"
                    style={{
                      backgroundColor: `rgba(${
                        isDark ? "0, 14, 27" : "0, 83, 156"
                      }, 0.95)`,
                      color: `rgb(${isDark ? "214, 237, 23" : "238, 164, 127"})`,
                      boxShadow: "0 12px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                      borderColor: `rgba(${
                        isDark ? "214, 237, 23" : "238, 164, 127"
                      }, 0.25)`,
                      borderWidth: 1,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base font-medium">{item.name}</span>
                      {item.shortcut && (
                        <kbd
                          className="px-2 py-1 text-xs rounded-lg font-mono font-semibold"
                          style={{
                            backgroundColor: `rgba(${
                              isDark ? "214, 237, 23" : "238, 164, 127"
                            }, 0.2)`,
                            color: `rgba(${
                              isDark ? "214, 237, 23" : "238, 164, 127"
                            }, 0.9)`,
                            border: `1px solid rgba(${
                              isDark ? "214, 237, 23" : "238, 164, 127"
                            }, 0.3)`,
                          }}
                        >
                          Alt+{item.shortcut}
                        </kbd>
                      )}
                    </div>
                    <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                      style={{
                        backgroundColor: `rgba(${
                          isDark ? "0, 14, 27" : "0, 83, 156"
                        }, 0.95)`,
                        borderTop: `1px solid rgba(${
                          isDark ? "214, 237, 23" : "238, 164, 127"
                        }, 0.25)`,
                        borderLeft: `1px solid rgba(${
                          isDark ? "214, 237, 23" : "238, 164, 127"
                        }, 0.25)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface NavigationProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  isLoaded: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  isLoaded,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if no input is focused and Alt key is pressed
      if (event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
          return;
        }
        
        const key = event.key.toUpperCase();
        const item = menuItems.find(item => item.shortcut === key && !item.isTheme);
        
        if (item) {
          event.preventDefault();
          scrollToSection(item.id);
        } else if (key === 'T') {
          event.preventDefault();
          // Toggle theme shortcut handled by ThemeToggle
        }
      }
      
      // ESC to close mobile menu
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [scrollToSection, isMenuOpen, setIsMenuOpen]);
  
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize, {
      passive: true,
    } as AddEventListenerOptions);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  
  const isDesktop = w >= 1024;

  return (
    <nav
      className={`fixed z-50 left-0 right-0 flex justify-center ${
        isLoaded
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-4 scale-95"
      } transition-all duration-500 ease-out`}
      style={{ top: 0 }}
      aria-label="Primary navigation"
      role="navigation"
    >
      <div className="flex items-center justify-center w-full max-w-6xl px-4 pt-3">
        {isDesktop ? (
          <div className="transform transition-all duration-500 mt-2">
            <Dock
              items={menuItems}
              activeId={activeSection}
              onSelect={scrollToSection}
              isTop={true}
            />
          </div>
        ) : (
          <div className="w-full">
            {!isMenuOpen ? (
              <div className="flex justify-end px-2">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="w-12 h-12 rounded-2xl grid place-items-center transition-all duration-300 backdrop-blur-xl border shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  style={{
                    backgroundColor: `rgba(${
                      isDark ? "0, 14, 27" : "255, 255, 255"
                    }, 0.5)`,
                    borderColor: `rgba(${
                      isDark ? "214, 237, 23" : "17, 24, 39"
                    }, 0.18)`,
                    color: isDark ? "#e5e7eb" : "#111827",
                  }}
                  aria-expanded={isMenuOpen}
                  aria-label="Open navigation menu"
                  aria-keyshortcuts="Escape"
                >
                  <Menu size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-end px-2">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-12 h-12 rounded-2xl grid place-items-center transition-all duration-300 backdrop-blur-xl border shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    style={{
                      backgroundColor: `rgba(${
                        isDark ? "0, 14, 27" : "255, 255, 255"
                      }, 0.5)`,
                      borderColor: `rgba(${
                        isDark ? "214, 237, 23" : "17, 24, 39"
                      }, 0.18)`,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                    aria-expanded={isMenuOpen}
                    aria-label="Close navigation menu"
                    aria-keyshortcuts="Escape"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="w-full mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Dock
                    items={menuItems}
                    activeId={activeSection}
                    onSelect={(id) => {
                      scrollToSection(id);
                      setIsMenuOpen(false);
                    }}
                    config={{
                      baseSize: 48,
                      maxScale: 2.4,
                      influence: 160,
                      lift: 30,
                    }}
                    isTop={true}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;