import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Github,
  ExternalLink,
  Code2,
  Layers3,
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
import { RevealWrapper, TextReveal, StaggeredReveal } from "../animations/RevealAnimations";

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [modalAnimation, setModalAnimation] = useState<"enter" | "exit" | "idle">("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mqSm = window.matchMedia("(max-width: 639.9px)");
    const mqMd = window.matchMedia("(min-width: 640px) and (max-width: 1023.9px)");
    const apply = () => {
      setIsMobile(mqSm.matches);
      setIsTablet(mqMd.matches);
    };
    apply();
    mqSm.addEventListener("change", apply);
    mqMd.addEventListener("change", apply);
    return () => {
      mqSm.removeEventListener("change", apply);
      mqMd.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) return;
    const host = containerRef.current ?? document.body;
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 16) return;
      last = now;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!gridRef.current) return;
        const rect = (containerRef.current ?? document.body).getBoundingClientRect();
        const relX = (e.clientX - rect.left) / Math.max(1, rect.width);
        const relY = (e.clientY - rect.top) / Math.max(1, rect.height);
        const x = (relX - 0.5) * 8;
        const y = (relY - 0.5) * 8;
        gridRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, isTablet]);

  useEffect(() => {
    const lock = selectedProject !== null;
    const prevOverflow = document.body.style.overflow;
    const prevPr = document.body.style.paddingRight;
    if (lock) {
      document.body.style.overflow = "hidden";
      if (!isMobile && !isTablet) document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPr;
    };
  }, [selectedProject, isMobile, isTablet]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject !== null) handleCloseModal();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [selectedProject]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation(), []);
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
    () =>
      projects.filter(
        (p) => !p.title.toLowerCase().includes("portfolio")
      ),
    []
  );

  const getProjectIcon = useCallback((title: string) => {
    const t = title.toLowerCase();
    if (t.includes("ai") || t.includes("bitcoin")) return Brain;
    if (t.includes("platform") || t.includes("connect")) return Layers3;
    return Cpu;
  }, []);

  const variantTriplet = useCallback((color: ColorVariant): string => {
    switch (color) {
      case "cyan":
        return "6 182 212";
      case "purple":
        return "168 85 247";
      default:
        return "236 72 153";
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
  const particleMap = useMemo(
    () =>
      filteredProjects.map(() =>
        Array.from({ length: particlesPerCard }).map((_, i) => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${i * 0.15}s`,
          duration: `${1.5 + (i % 3) * 0.5}s`,
          scale: 0.5 + Math.random() * 0.5,
        }))
      ),
    [filteredProjects.length, particlesPerCard]
  );

  return (
    <>
      <section id="projects" className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden isolate">
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
              transform: "translate3d(0px,0px,0px)",
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

        <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
          <RevealWrapper animation="fadeIn" delay={100} className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20" triggerOnce={false} threshold={0.3}>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-surface/10 backdrop-blur-xl border border-borderc/20 rounded-full mb-4 sm:mb-6 md:mb-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-surface/15 group">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-content/60 group-hover:text-content/70 transition-colors duration-300" />
              <span className="text-xs sm:text-sm font-semibold text-content/70 group-hover:text-content/80 transition-colors duration-300 tracking-wide">
                FEATURED PROJECTS
              </span>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[rgb(var(--accent))] rounded-full" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-content mb-4 sm:mb-6 md:mb-8 tracking-tight px-2">
              <TextReveal text="My Projects" speed={50} triggerOnce={false} threshold={0.3} />
            </h2>

            <RevealWrapper animation="slideUp" delay={300} triggerOnce={false} threshold={0.3}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-content/70 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-4">
                Innovative solutions crafted with precision, showcasing
                <span className="text-content/80 font-medium"> modern web development</span> and
                <span className="text-content/80 font-medium"> cutting-edge technologies</span>
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
                  <div key={project.title} className="w-full">
                    <div
                      className={`group relative w-full isolate overflow-hidden 
                        bg-surface/10 backdrop-blur-xl border border-borderc/20 
                        hover:bg-surface/15 hover:border-borderc/30 ${colors.border}
                        rounded-lg sm:rounded-xl md:rounded-2xl
                        transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl 
                        will-change-transform active:scale-[0.99]
                        [content-visibility:auto] [contain-intrinsic-size:300px]
                        ${!isMobile && !isTablet ? "hover:scale-[1.01] hover:-translate-y-1" : ""}`}
                      style={{ ["--accent-local" as any]: accentTriplet }}
                      onMouseEnter={() => !isMobile && !isTablet && setHoveredProject(index)}
                      onMouseLeave={() => !isMobile && !isTablet && setHoveredProject(null)}
                      onClick={() => handleCardClick(index)}
                    >
                      <RevealWrapper animation="slideUp" delay={500 + index * 200} triggerOnce={false} threshold={0.25} className="[display:contents]">
                        <div className="relative h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 overflow-hidden">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface)/0.20)] via-[rgb(var(--surface)/0.15)] to-[rgb(var(--surface)/0.20)]" />
                          )}
                        </div>

                        <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                          <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-content ${colors.text} transition-colors duration-300 mb-2 sm:mb-3 md:mb-4 leading-tight`}>
                                {project.title}
                              </h3>
                              <p className="text-content/70 leading-relaxed group-hover:text-content/80 transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          <StaggeredReveal animation="slideUp" staggerDelay={80} baseDelay={600 + index * 200} className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3" triggerOnce={false} threshold={0.25}>
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
                      </RevealWrapper>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <RevealWrapper animation="fadeIn" delay={1000 + filteredProjects.length * 200} className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24" triggerOnce={false} threshold={0.3}>
            <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-surface/15 backdrop-blur-xl border border-borderc/20 rounded-full hover:bg-surface/25 hover:border-borderc/30 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-xl">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-content/60 group-hover:text-content/70 transition-colors duration-300" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg text-content/70 group-hover:text-content/80 transition-colors duration-300 font-medium">
                Exploring new horizons
              </span>
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-content/70 rounded-full" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-content/60 rounded-full" style={{ animation: "pulse 1.5s ease-in-out infinite", animationDelay: "0.2s" }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-content/50 rounded-full" style={{ animation: "pulse 1.5s ease-in-out infinite", animationDelay: "0.4s" }} />
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
};

export default Projects;
