import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Github, Linkedin, Mail, ChevronDown, MapPin, Download } from "lucide-react";
import TextScramble from "../animations/TextScramble";
import { RevealWrapper, StaggeredReveal } from "../animations/RevealAnimations";

const ChromeGridLazy = React.lazy(() => import("../animations/ChromeGrid"));

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

  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [gridReady, setGridReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ric = (window as any).requestIdleCallback || ((fn: any) => setTimeout(fn, 120));
    const cic = (window as any).cancelIdleCallback || clearTimeout;
    const id = ric(() => setGridReady(true));
    return () => cic(id);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden isolate [content-visibility:auto] [contain-intrinsic-size:900px]"
      data-visible={visible}
    >
      <style>{`
        [data-visible="false"] .parallax-layer{opacity:.999;transform:none}
        @media (prefers-reduced-motion: reduce){
          .parallax-layer{transform:none!important}
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-auto">
        {gridReady && (
          <Suspense fallback={null}>
            <ChromeGridLazy />
          </Suspense>
        )}
      </div>

      {/* overlay tanpa gradient (transparan, hanya parallax translate) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none will-change-transform parallax-layer"
        style={{ transform: `translate3d(0, ${visible ? scrollY * 0.1 : 0}px, 0)` }}
      />

      <div className="container mx-auto px-6 relative z-40 max-w-6xl pointer-events-auto">
        <RevealWrapper animation="fadeIn" delay={100} className="text-center mb-16" triggerOnce={false} threshold={0.3}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mt-12 bg-[rgb(var(--surface)/0.6)] border border-borderc/40 rounded-full shadow">
            <div className="w-2 h-2 bg-[rgb(var(--accent))] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-content">Open for opportunities</span>
          </div>
        </RevealWrapper>

        <div className="text-center mb-16">
          <RevealWrapper animation="fadeIn" delay={200} className="mb-8" triggerOnce={false} threshold={0.3}>
            <div className="text-md uppercase tracking-widest text-content/70 font-bold mb-4">Portfolio</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <TextScramble text="DELIKO HARTONO" className="text-primary" />
            </h1>
          </RevealWrapper>

          <RevealWrapper animation="slideUp" delay={400} className="mb-8" triggerOnce={false} threshold={0.3}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--surface)/0.5)] border border-borderc/30 rounded-full">
              <span className="text-lg sm:text-xl font-medium text-content">Information Technology Student</span>
            </div>
          </RevealWrapper>

          <RevealWrapper animation="fadeIn" delay={600} className="max-w-4xl mx-auto" triggerOnce={false} threshold={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-xl text-content/80">
              <span>Passionate about</span>
              {specialties.map((specialty, index) => (
                <React.Fragment key={specialty}>
                  <span className={`font-semibold ${index === 1 ? "text-content" : "text-primary"}`}>
                    {specialty}
                  </span>
                  {index < specialties.length - 1 && <span className="text-content/50">•</span>}
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
                  className="group relative inline-flex size-12 sm:size-14 items-center justify-center rounded-2xl border border-borderc/30 bg-[rgb(var(--surface)/0.6)] transition-all duration-300 hover:bg-[rgb(var(--surface)/0.7)] hover:border-[rgb(var(--primary)/0.4)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary)/0.6)]"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-content group-hover:text-primary transition-colors duration-200" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </StaggeredReveal>
          </div>

          <div className="h-px w-12 sm:h-8 sm:w-px bg-[rgb(var(--content)/0.4)]" />

          <RevealWrapper animation="slideLeft" delay={1200} triggerOnce={false} threshold={0.3}>
            <button className="group flex items-center gap-3 px-6 py-4 bg-primary border border-[rgb(var(--primary)/0.5)] rounded-xl hover:bg-[rgb(var(--primary)/0.9)] transition-all duration-300">
              <Download className="w-4 h-4 text-surface" />
              <span className="text-sm font-medium text-surface">Download Resume</span>
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
          <div className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--surface)/0.5)] border border-borderc/30 rounded-full">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-content/80">Jakarta, Indonesia</span>
          </div>

          <div className="h-px w-8 bg-[rgb(var(--content)/0.4)] hidden sm:block" />

          <div className="grid grid-cols-2 gap-8">
            {[{ label: "Years Experience", value: "2+" }, { label: "Projects Completed", value: "2+" }].map(
              ({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-xs text-content/70">{label}</div>
                </div>
              )
            )}
          </div>
        </RevealWrapper>

        <RevealWrapper animation="fadeIn" delay={2000} className="text-center" triggerOnce={false} threshold={0.3}>
          <button
            onClick={() => scrollToSection("about")}
            className="group flex flex-col items-center gap-2 text-content/70 hover:text-content transition-all duration-300 mx-auto"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Scroll Down</span>
            <div className="flex flex-col gap-1 items-center">
              <ChevronDown className="w-5 h-5 text-primary" />
              <div className="w-px h-8 bg-[rgb(var(--content)/0.6)] group-hover:bg-[rgb(var(--content))] transition-colors duration-300" />
            </div>
          </button>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
