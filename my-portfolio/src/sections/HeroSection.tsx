import React, { useEffect, useMemo, useRef } from "react";
import { Github, Linkedin, Mail, ChevronDown, MapPin, Download } from "lucide-react";
import FloatingCard from "../components/FloatingCard";
import TextScramble from "../components/TextScramble";
import { RevealWrapper, StaggeredReveal } from "../components/RevealAnimations";
import CosmicParticles from "../components/CosmicParticles";

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY, scrollToSection }) => {
  const socialLinks = useMemo(
    () => [
      { icon: Github, href: "https://github.com/Okiled", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com/in/deliko-hartono", label: "LinkedIn" },
      { icon: Mail, href: "mailto:hartonodeliko@gmail.com", label: "Email" },
    ],
    []
  );

  const specialties = useMemo(
    () => ["Artificial Intelligence", "Quantitative Finance", "Full-Stack Development"],
    []
  );

  const rafId = useRef<number | null>(null);
  const lastDetail = useRef<{ x: number; y: number; px: number; py: number; w: number; h: number } | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const detail = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
      px: e.clientX,
      py: e.clientY,
      w: r.width,
      h: r.height,
    };
    lastDetail.current = detail;
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(() => {
        if (lastDetail.current) {
          window.dispatchEvent(new CustomEvent("cosmic:move", { detail: lastDetail.current }));
        }
        rafId.current = null;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden isolate"
      onMouseMove={onMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <CosmicParticles />
      </div>

      <div
        className="absolute inset-0 z-20 pointer-events-none will-change-transform will-change-opacity"
        style={{
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          background:
            "radial-gradient(circle at 30% 20%, rgba(120,119,198,0.06), transparent 55%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.02), transparent 60%), linear-gradient(135deg, rgba(2,6,23,0.6), rgba(2,6,23,0.0) 40%, rgba(2,6,23,0.6))",
        }}
      />

      <div className="container mx-auto px-6 relative z-40 max-w-6xl">
        <RevealWrapper animation="fadeIn" delay={100} className="text-center mb-16" triggerOnce={false} threshold={0.3}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mt-12 bg-slate-800/60 border border-slate-600/40 rounded-full shadow-lg shadow-slate-900/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/30" />
            <span className="text-sm font-medium text-slate-200">Open for opportunities</span>
          </div>
        </RevealWrapper>

        <div className="text-center mb-16">
          <RevealWrapper animation="fadeIn" delay={200} className="mb-8" triggerOnce={false} threshold={0.3}>
            <div className="text-md uppercase tracking-widest text-slate-300 font-bold mb-4">Portfolio</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-lg">
              <TextScramble
                text="DELIKO HARTONO"
                className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent"
              />
            </h1>
          </RevealWrapper>

          <RevealWrapper animation="slideUp" delay={400} className="mb-8" triggerOnce={false} threshold={0.3}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-600/30 rounded-full shadow-lg shadow-slate-900/20">
              <span className="text-lg sm:text-xl font-medium text-slate-200">Information Technology Student</span>
            </div>
          </RevealWrapper>

          <RevealWrapper animation="fadeIn" delay={600} className="max-w-4xl mx-auto" triggerOnce={false} threshold={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-xl text-slate-300">
              <span>Passionate about</span>
              {specialties.map((specialty, index) => (
                <React.Fragment key={specialty}>
                  <span
                    className={`font-semibold ${index === 1 ? "text-slate-100 drop-shadow-lg" : "text-white drop-shadow-lg"}`}
                  >
                    {specialty}
                  </span>
                  {index < specialties.length - 1 && <span className="text-slate-500">•</span>}
                </React.Fragment>
              ))}
            </div>
          </RevealWrapper>
        </div>

        <RevealWrapper
          animation="slideUp"
          delay={800}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="mt-4">
            <StaggeredReveal
              staggerDelay={100}
              animation="scaleIn"
              baseDelay={900}
              triggerOnce={false}
              threshold={0.3}
              className="grid grid-flow-col auto-cols-max gap-3 sm:gap-4 justify-start sm:justify-center"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex size-12 sm:size-14 items-center justify-center rounded-2xl border border-slate-600/40 bg-slate-800/60 transition-all duration-300 hover:bg-slate-700/70 hover:border-slate-500/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 will-change-transform"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-200 group-hover:text-white transition-colors duration-200" />
                  <span className="sr-only">{label}</span>
                  <div aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </StaggeredReveal>
          </div>

          <div className="h-px w-12 sm:h-8 sm:w-px bg-slate-500/50" />

          <RevealWrapper animation="slideLeft" delay={1200} triggerOnce={false} threshold={0.3}>
            <button className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-700/70 to-slate-600/70 border border-slate-500/50 rounded-xl hover:from-slate-600/80 hover:to-slate-500/80 hover:border-slate-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-slate-900/40 will-change-transform">
              <Download className="w-4 h-4 text-slate-200 group-hover:text-white transition-colors duration-300" />
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                Download Resume
              </span>
            </button>
          </RevealWrapper>
        </RevealWrapper>

        <RevealWrapper
          animation="fadeIn"
          delay={1800}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-full shadow-lg shadow-slate-900/20">
            <MapPin className="w-4 h-4 text-slate-300" />
            <span className="text-sm text-slate-300">Jakarta, Indonesia</span>
          </div>

          <div className="h-px w-8 bg-slate-500/50 hidden sm:block" />

          <div className="grid grid-cols-2 gap-8">
            {[{ label: "Years Experience", value: "2+" }, { label: "Projects Completed", value: "2+" }].map(
              ({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{value}</div>
                  <div className="text-xs text-slate-400">{label}</div>
                </div>
              )
            )}
          </div>
        </RevealWrapper>

        <RevealWrapper animation="fadeIn" delay={2000} className="text-center" triggerOnce={false} threshold={0.3}>
          <button
            onClick={() => scrollToSection("about")}
            className="group flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-all duration-500 mx-auto"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Scroll Down</span>
            <div className="flex flex-col gap-1">
              <ChevronDown className="w-5 h-5 animate-bounce" />
              <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent group-hover:from-slate-200 transition-colors duration-500" />
            </div>
          </button>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
