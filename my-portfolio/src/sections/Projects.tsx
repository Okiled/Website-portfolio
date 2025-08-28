import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Github,
  ExternalLink,
  Code2,
  Layers3,
  Star,
  Cpu,
  X,
  Terminal,
  BarChart3,
  Brain,
  ChevronRight,
  Sparkles,
  Zap,
  Eye,
} from "lucide-react";
import { projects, getProjectDetails } from "../utils/data";
import type { ColorVariant } from "../types";
import {
  RevealWrapper,
  TextReveal,
  StaggeredReveal,
} from "../animations/RevealAnimations";

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [modalAnimation, setModalAnimation] = useState<
    "enter" | "exit" | "idle"
  >("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const resizeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkDeviceSize();
    
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(checkDeviceSize, 100);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) return;
    
    let lastMoveTime = 0;
    const throttleDelay = 16;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < throttleDelay) return;
      lastMoveTime = now;
      
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (gridRef.current) {
          const x = e.clientX * 0.01;
          const y = e.clientY * 0.01;
          gridRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
      if (!isMobile && !isTablet) document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selectedProject, isMobile, isTablet]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject !== null) handleCloseModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedProject]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation(),
    []
  );

  const handleCardClick = useCallback((index: number) => {
    setModalAnimation("enter");
    setSelectedProject(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAnimation("exit");
    setTimeout(() => {
      setSelectedProject(null);
      setModalAnimation("idle");
    }, 240);
  }, []);

  const filteredProjects = useMemo(
    () => projects.filter((p) => !p.title.toLowerCase().includes("trading bot")),
    []
  );

  const getProjectIcon = useCallback((title: string) => {
    const t = title.toLowerCase();
    if (t.includes("ai") || t.includes("bitcoin")) return Brain;
    if (t.includes("platform") || t.includes("connect")) return Layers3;
    if (t.includes("portfolio") || t.includes("website")) return Code2;
    return Cpu;
  }, []);

  const variantTriplet = useCallback((color: ColorVariant): string => {
    switch (color) {
      case "cyan": return "6 182 212";
      case "purple": return "168 85 247";
      case "pink": return "236 72 153";
    }
  }, []);

  const getColorScheme = useCallback((color: ColorVariant) => {
    return {
      gradient: "from-[rgb(var(--accent-local)/0.10)] via-[rgb(var(--primary)/0.08)] to-[rgb(var(--accent-local)/0.10)]",
      border: "hover:border-[rgb(var(--accent-local)/0.30)]",
      text: "group-hover:text-[rgb(var(--accent-local))]",
      glow: "hover:shadow-[0_20px_40px_-12px_rgb(var(--accent-local)/0.20)]",
      particle: "bg-[rgb(var(--accent-local)/0.50)]",
      tech: "hover:border-[rgb(var(--accent-local)/0.30)] hover:text-[rgb(var(--accent-local)/0.85)]",
      modalAccent: "border-[rgb(var(--accent-local)/0.20)] bg-[rgb(var(--accent-local)/0.06)]",
      buttonPrimary: "bg-[rgb(var(--accent-local))] hover:bg-[rgb(var(--accent-local)/0.90)] text-surface",
      buttonSecondary: "border-[rgb(var(--accent-local)/0.30)] text-[rgb(var(--accent-local))] hover:bg-[rgb(var(--accent-local)/0.10)]",
      modalGlow: "shadow-[0_0_30px_rgb(var(--accent-local)/0.15)]",
    };
  }, []);

  const particlesPerCard = isMobile ? 4 : 8;
  const particleMap = useMemo(() => {
    return filteredProjects.map(() => {
      return Array.from({ length: particlesPerCard }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${i * 0.15}s`,
        duration: `${1.5 + (i % 3) * 0.5}s`,
        scale: 0.5 + Math.random() * 0.5,
      }));
    });
  }, [filteredProjects.length, particlesPerCard]);

  return (
    <>
      <section
        id="projects"
        className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--primary)/0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgb(var(--accent)/0.04),transparent_50%)]" />

        <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
          <div
            ref={gridRef}
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage:
                `linear-gradient(rgb(var(--border)/0.30) 1px, transparent 1px),` +
                `linear-gradient(90deg, rgb(var(--border)/0.30) 1px, transparent 1px)`,
              backgroundSize: isMobile ? "30px 30px" : isTablet ? "45px 45px" : "60px 60px",
              transform: "translate3d(0px, 0px, 0px)",
              transition: isMobile || isTablet ? "none" : "transform 0.4s ease-out",
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.06] blur-2xl will-change-transform"
              style={{
                width: `${(isMobile ? 60 : isTablet ? 100 : 150) + i * (isMobile ? 30 : isTablet ? 50 : 80)}px`,
                height: `${(isMobile ? 60 : isTablet ? 100 : 150) + i * (isMobile ? 30 : isTablet ? 50 : 80)}px`,
                background:
                  i === 0
                    ? "radial-gradient(circle, rgb(var(--primary)), transparent)"
                    : i === 1
                    ? "radial-gradient(circle, rgb(var(--accent)), transparent)"
                    : "radial-gradient(circle, rgb(var(--border)), transparent)",
                left: `${15 + i * 25}%`,
                top: `${10 + i * 20}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        <div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10"
          ref={containerRef}
        >
          <RevealWrapper
            animation="fadeIn"
            delay={100}
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-surface/10 backdrop-blur-xl border border-borderc/20 rounded-full mb-4 sm:mb-6 md:mb-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-surface/15 group">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-content/60 group-hover:text-content/70 transition-colors duration-300" />
              <span className="text-xs sm:text-sm font-semibold text-content/70 group-hover:text-content/80 transition-colors duration-300 tracking-wide">
                FEATURED PROJECTS
              </span>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[rgb(var(--accent))] rounded-full" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-content mb-4 sm:mb-6 md:mb-8 tracking-tight px-2">
              <TextReveal
                text="My Projects"
                speed={50}
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
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-content/70 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-4">
                Innovative solutions crafted with precision, showcasing
                expertise in
                <span className="text-content/80 font-medium">
                  {" "}
                  modern web development
                </span>{" "}
                and
                <span className="text-content/80 font-medium">
                  {" "}
                  cutting-edge technologies
                </span>
              </p>
            </RevealWrapper>
          </RevealWrapper>

          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              {filteredProjects.map((project, index) => {
                const ProjectIcon = getProjectIcon(project.title);
                const colors = getColorScheme(project.color);
                const accentTriplet = variantTriplet(project.color);
                const particles = particleMap[index] || [];

                return (
                  <RevealWrapper
                    key={project.title}
                    animation="slideUp"
                    delay={500 + index * 200}
                    className="w-full"
                    triggerOnce={false}
                    threshold={0.25}
                  >
                    <div
                      className={`group relative w-full bg-surface/10 backdrop-blur-xl border border-borderc/20 hover:bg-surface/15 hover:border-borderc/30 ${colors.border} rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg ${colors.glow} hover:shadow-xl transform ${
                        !isMobile && !isTablet ? 'hover:scale-[1.01] hover:-translate-y-1' : ''
                      } will-change-transform active:scale-[0.99]`}
                      style={{ ["--accent-local" as any]: accentTriplet }}
                      onMouseEnter={() => !isMobile && !isTablet && setHoveredProject(index)}
                      onMouseLeave={() => !isMobile && !isTablet && setHoveredProject(null)}
                      onClick={() => handleCardClick(index)}
                    >
                      {!isMobile && !isTablet && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(255_255_255/0.04)] to-transparent opacity-0 group-hover:opacity-100 duration-700 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] pointer-events-none transition-all ease-out" />
                      )}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />

                      <div className="relative h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface)/0.20)] via-[rgb(var(--surface)/0.15)] to-[rgb(var(--surface)/0.20)]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--border)/0.08),transparent_70%)]" />
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-40`}
                          />
                        </div>

                        {!isMobile && !isTablet && hoveredProject === index && (
                          <div className="absolute inset-0 overflow-hidden">
                            {particles.map((p, i) => (
                              <div
                                key={i}
                                className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 ${colors.particle} rounded-full opacity-60`}
                                style={{
                                  left: p.left,
                                  top: p.top,
                                  animation: `pulse ${p.duration} ease-in-out infinite`,
                                  animationDelay: p.delay,
                                  transform: `scale(${p.scale})`,
                                }}
                              />
                            ))}
                          </div>
                        )}

                        <RevealWrapper
                          animation="slideLeft"
                          delay={200}
                          className="absolute top-2 sm:top-3 md:top-4 lg:top-6 xl:top-8 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div
                            className={`flex gap-1.5 sm:gap-2 md:gap-3 ${
                              isMobile || isTablet
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            } transition-all duration-400 ${
                              isMobile || isTablet
                                ? "translate-y-0"
                                : "translate-y-2 group-hover:translate-y-0"
                            }`}
                          >
                            <a
                              href={project.github}
                              className="p-1.5 sm:p-2 md:p-3 bg-surface/30 backdrop-blur-xl rounded-md sm:rounded-lg md:rounded-xl border border-borderc/30 hover:bg-surface/40 hover:border-borderc/40 transition-all duration-300 hover:scale-105 group/link shadow-lg hover:shadow-xl min-w-[36px] min-h-[36px] flex items-center justify-center"
                              onClick={handleLinkClick}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} source code`}
                            >
                              <Github
                                size={isMobile ? 14 : isTablet ? 16 : 18}
                                className="text-content/80 group-hover/link:text-content transition-colors duration-200"
                              />
                            </a>
                            {project.demo !== "#" && (
                              <a
                                href={project.demo}
                                className="p-1.5 sm:p-2 md:p-3 bg-surface/30 backdrop-blur-xl rounded-md sm:rounded-lg md:rounded-xl border border-borderc/30 hover:bg-surface/40 hover:border-borderc/40 transition-all duration-300 hover:scale-105 group/link shadow-lg hover:shadow-xl min-w-[36px] min-h-[36px] flex items-center justify-center"
                                onClick={handleLinkClick}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} live demo`}
                              >
                                <ExternalLink
                                  size={isMobile ? 14 : isTablet ? 16 : 18}
                                  className="text-content/80 group-hover/link:text-content transition-colors duration-200"
                                />
                              </a>
                            )}
                          </div>
                        </RevealWrapper>

                        <RevealWrapper
                          animation="rotateIn"
                          delay={250}
                          className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 left-2 sm:left-3 md:left-4 lg:left-6 xl:left-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-surface/40 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl border border-borderc/30 flex items-center justify-center group-hover:bg-surface/50 group-hover:border-borderc/40 transition-all duration-400 group-hover:scale-105 shadow-lg ${colors.glow}`}
                          >
                            <ProjectIcon
                              className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-content/80 group-hover:text-content ${colors.text} transition-all duration-300`}
                            />
                          </div>
                        </RevealWrapper>

                        <RevealWrapper
                          animation="slideUp"
                          delay={300}
                          className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          <div
                            className={`${
                              isMobile || isTablet
                                ? "opacity-100"
                                : "opacity-50 group-hover:opacity-100"
                            } transition-all duration-400 group-hover:scale-105`}
                          >
                            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 bg-surface/40 backdrop-blur-xl rounded-md sm:rounded-lg md:rounded-xl border border-borderc/30 shadow-lg min-h-[32px]">
                              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-content/60 flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-medium text-content/70 whitespace-nowrap">
                                View Details
                              </span>
                              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-content/60 flex-shrink-0" />
                            </div>
                          </div>
                        </RevealWrapper>
                      </div>

                      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                        <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-content ${colors.text} transition-colors duration-300 mb-2 sm:mb-3 md:mb-4 leading-tight`}
                            >
                              {project.title}
                            </h3>
                            <p className="text-content/70 leading-relaxed group-hover:text-content/80 transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <StaggeredReveal
                          animation="slideUp"
                          staggerDelay={80}
                          baseDelay={600 + index * 200}
                          className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3"
                          triggerOnce={false}
                          threshold={0.25}
                        >
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 bg-surface/20 text-content/80 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-borderc/30 hover:bg-surface/30 hover:text-content ${colors.tech} transition-all duration-300 transform hover:scale-105 backdrop-blur-sm font-medium`}
                            >
                              {tech}
                            </span>
                          ))}
                        </StaggeredReveal>
                      </div>
                    </div>
                  </RevealWrapper>
                );
              })}
            </div>
          </div>

          <RevealWrapper
            animation="fadeIn"
            delay={1000 + filteredProjects.length * 200}
            className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24"
            triggerOnce={false}
            threshold={0.3}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-surface/15 backdrop-blur-xl border border-borderc/20 rounded-full hover:bg-surface/25 hover:border-borderc/30 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-xl">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-content/60 group-hover:text-content/70 transition-colors duration-300" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg text-content/70 group-hover:text-content/80 transition-colors duration-300 font-medium">
                Exploring new horizons
              </span>
              <div className="flex gap-1 sm:gap-1.5">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-content/70 rounded-full"
                  style={{ animation: "pulse 1.5s ease-in-out infinite" }}
                />
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-content/60 rounded-full"
                  style={{
                    animation: "pulse 1.5s ease-in-out infinite",
                    animationDelay: "0.2s",
                  }}
                />
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-content/50 rounded-full"
                  style={{
                    animation: "pulse 1.5s ease-in-out infinite",
                    animationDelay: "0.4s",
                  }}
                />
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {selectedProject !== null && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center 
                px-3 sm:px-4 md:px-6
                py-3 sm:py-4 md:py-6
                transition-opacity duration-200
                ${
                  modalAnimation === "enter"
                    ? "opacity-100"
                    : modalAnimation === "exit"
                    ? "opacity-0"
                    : "opacity-100"
                }`}
          role="dialog"
          aria-modal="true"
          onClick={handleCloseModal}
          style={{ 
            height: "100dvh",
            paddingLeft: `max(env(safe-area-inset-left), ${isMobile ? '12px' : '16px'})`,
            paddingRight: `max(env(safe-area-inset-right), ${isMobile ? '12px' : '16px'})`,
            paddingTop: `max(env(safe-area-inset-top), ${isMobile ? '12px' : '16px'})`,
            paddingBottom: `max(env(safe-area-inset-bottom), ${isMobile ? '12px' : '16px'})`
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />

          <div
            className={`
        relative 
        w-full max-w-[min(95vw,${isMobile ? '100%' : isTablet ? '85vw' : '60rem'})]
        max-h-[min(85dvh,${isMobile ? '90dvh' : '780px'})]
        grid grid-rows-[auto_minmax(0,1fr)_auto]
        bg-surface/90 backdrop-blur-2xl 
        rounded-xl sm:rounded-2xl 
        border border-borderc/30
        shadow-[0_10px_50px_-12px_rgb(0_0_0/0.55)] 
        ring-1 ring-[rgb(var(--accent)/0.12)]
        transition-[opacity,transform] duration-200 ease-out will-change-transform isolate
        ${
          modalAnimation === "enter"
            ? "opacity-100 translate-y-0"
            : modalAnimation === "exit"
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
        }
      `}
            onClick={(e) => e.stopPropagation()}
            style={{
              ["--accent-local" as any]: variantTriplet(
                filteredProjects[selectedProject].color
              ),
            }}
          >
            {(() => {
              const project = filteredProjects[selectedProject];
              const details = getProjectDetails(project);
              const colors = getColorScheme(project.color);
              const ProjectIcon = getProjectIcon(project.title);

              return (
                <>
                  <div className="relative overflow-hidden bg-surface/50 border-b border-borderc/30">
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 p-2 sm:p-2.5 bg-surface/60 rounded-lg sm:rounded-xl border border-borderc/30 hover:bg-surface/70 active:scale-[0.98] transition min-w-[40px] min-h-[40px] flex items-center justify-center z-10"
                      aria-label="Close"
                    >
                      <X
                        size={isMobile ? 16 : 18}
                        className="text-content/80"
                      />
                    </button>

                    <div className="p-3 sm:p-4 md:p-6 lg:p-8 pr-12 sm:pr-16">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-surface/60 rounded-lg sm:rounded-xl border border-borderc/30 flex items-center justify-center shadow-md flex-shrink-0">
                          <ProjectIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-content/70" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-content leading-tight mb-1 sm:mb-2">
                            {project.title}
                          </h2>
                          <p className="text-content/80 leading-relaxed text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">
                            {details.fullDescription}
                          </p>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                            <a
                              href={details.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg text-surface bg-[rgb(var(--accent-local))] hover:bg-[rgb(var(--accent-local)/0.92)] border border-[rgb(var(--accent-local)/0.45)] text-xs sm:text-sm min-h-[32px] active:scale-[0.98] transition-all"
                            >
                              <Github size={isMobile ? 12 : 14} />
                              <span className="font-semibold">Source</span>
                            </a>

                            {details.links.githubApi && (
                              <a
                                href={details.links.githubApi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg border border-[rgb(var(--accent-local)/0.4)] text-[rgb(var(--accent-local))] hover:bg-[rgb(var(--accent-local)/0.10)] text-xs sm:text-sm min-h-[32px] active:scale-[0.98] transition-all"
                              >
                                <Terminal size={isMobile ? 12 : 14} />
                                <span className="font-semibold">API Repo</span>
                              </a>
                            )}

                            {details.links.demo &&
                              details.links.demo !== "#" && (
                                <a
                                  href={details.links.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg border border-[rgb(var(--accent-local)/0.4)] text-[rgb(var(--accent-local))] hover:bg-[rgb(var(--accent-local)/0.10)] text-xs sm:text-sm min-h-[32px] active:scale-[0.98] transition-all"
                                >
                                  <ExternalLink size={isMobile ? 12 : 14} />
                                  <span className="font-semibold">
                                    Live Demo
                                  </span>
                                </a>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="min-h-0 overflow-y-auto overscroll-contain custom-scrollbar">
                    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
                      {details.performance && (
                        <div
                          className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors.modalAccent} backdrop-blur-xl`}
                        >
                          <h4 className="text-sm sm:text-base md:text-lg font-bold text-content mb-2 sm:mb-3 md:mb-4 flex items-center gap-2">
                            <BarChart3 size={isMobile ? 14 : 16} />
                            Performance Metrics
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                            {Object.entries(details.performance).map(
                              ([k, v]) => (
                                <div
                                  key={k}
                                  className="text-center p-2 sm:p-3 md:p-4 bg-surface/20 rounded-md sm:rounded-lg border border-borderc/20"
                                >
                                  <div className="text-base sm:text-lg md:text-xl font-bold text-content mb-1">
                                    {v}
                                  </div>
                                  <div className="text-content/60 text-xs sm:text-sm capitalize">
                                    {k.replace(/([A-Z])/g, " $1").trim()}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <div
                        className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors.modalAccent} backdrop-blur-xl`}
                      >
                        <h4 className="text-sm sm:text-base md:text-lg font-bold text-content mb-2 sm:mb-3 md:mb-4 flex items-center gap-2">
                          <Star size={isMobile ? 14 : 16} />
                          Key Features
                        </h4>
                        <ul className="grid gap-2">
                          {details.features.map((f, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-md sm:rounded-lg bg-surface/20 border border-borderc/15"
                            >
                              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[rgb(var(--accent-local)/0.50)] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                              <span className="text-content/80 text-xs sm:text-sm md:text-base">
                                {f}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors.modalAccent} backdrop-blur-xl`}
                      >
                        <h4 className="text-sm sm:text-base md:text-lg font-bold text-content mb-2 sm:mb-3 md:mb-4 flex items-center gap-2">
                          <Code2 size={isMobile ? 14 : 16} />
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className={`px-2 sm:px-3 py-1 sm:py-1.5 bg-surface/25 text-content/80 rounded-md sm:rounded-lg text-xs sm:text-sm border border-borderc/30 ${colors.tech}`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-borderc/30 p-3 sm:p-4 md:p-5 bg-surface/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-content/60">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                          Press ESC to close
                        </span>
                        <span className="text-xs font-medium sm:hidden">
                          Tap outside to close
                        </span>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 border ${colors.buttonSecondary} rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm min-h-[36px] active:scale-[0.98] transition-all`}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { 
          from { opacity: 0; transform: scale(0.95); } 
          to { opacity: 1; transform: scale(1); } 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-10px); } 
        }
        @keyframes pulse { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0.5; } 
        }
        .animate-fade-in { 
          animation: fade-in 0.6s ease-out forwards; 
        }
        .custom-scrollbar { 
          scrollbar-width: thin; 
          scrollbar-color: rgb(var(--text)/0.2) transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar { 
          width: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: transparent; 
          border-radius: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgb(var(--text)/0.2); 
          border-radius: 4px; 
          border: 1px solid transparent; 
          background-clip: padding-box; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: rgb(var(--text)/0.3); 
          background-clip: padding-box; 
        }
        
        @media (max-width: 640px) {
          .hover\\:scale-\\[1\\.015\\]:hover, 
          .hover\\:scale-\\[1\\.01\\]:hover { 
            transform: scale(1); 
          }
          .hover\\:-translate-y-1:hover, 
          .hover\\:-translate-y-0\\.5:hover { 
            transform: translateY(0); 
          }
        }
        
        @media (max-width: 1024px) {
          .group { 
            touch-action: manipulation; 
          }
          button, a { 
            min-height: 36px; 
            min-width: 36px; 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
        
        @media (max-width: 480px) {
          .custom-scrollbar::-webkit-scrollbar { 
            width: 2px; 
          }
        }
        
        @media (orientation: landscape) and (max-height: 600px) {
          .fixed.inset-0 {
            padding: 8px !important;
          }
        }
        
        @supports (height: 100dvh) {
          .fixed.inset-0 {
            height: 100dvh;
          }
        }
        
        @supports not (height: 100dvh) {
          .fixed.inset-0 {
            height: 100vh;
          }
        }
      `}</style>
    </>
  );
};

export default Projects;