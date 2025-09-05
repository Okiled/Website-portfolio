import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Github, Linkedin, Mail, ChevronDown, MapPin, Download, Sparkles, Code, Brain, TrendingUp } from "lucide-react";
import TextScramble from "../animations/TextScramble";
import { RevealWrapper, StaggeredReveal } from "../animations/RevealAnimations";

const ChromeGridLazy = React.lazy(() => import("../animations/BackgroundPaths"));

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
    () => [
      { text: "Artificial Intelligence", icon: Brain },
      { text: "Quantitative Finance", icon: TrendingUp },
      { text: "Full-Stack Development", icon: Code }
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [gridReady, setGridReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden isolate [content-visibility:auto] [contain-intrinsic-size:900px] group"
      data-visible={visible}
    >
      <style>{`
        [data-visible="false"] .parallax-layer{opacity:.999;transform:none}
        @media (prefers-reduced-motion: reduce){
          .parallax-layer{transform:none!important}
          .floating-element{animation:none!important}
          .mouse-track{transform:none!important}
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .floating-element { animation: float 6s ease-in-out infinite; }
        .floating-element:nth-child(2) { animation-delay: -2s; }
        .floating-element:nth-child(3) { animation-delay: -4s; }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div
          className="floating-element absolute w-20 h-20 opacity-20"
          style={{
            top: "15%",
            left: "10%",
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        >
          <div className="w-full h-full rounded-full bg-[rgb(var(--fg)/0.2)] blur-xl" />
        </div>
        <div
          className="floating-element absolute w-32 h-32 opacity-10"
          style={{
            top: "70%",
            right: "15%",
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
        >
          <div className="w-full h-full rounded-full bg-[rgb(var(--fg)/0.3)] blur-2xl" />
        </div>
        <div
          className="floating-element absolute w-16 h-16 opacity-30"
          style={{
            top: "40%",
            right: "20%",
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        >
          <Sparkles className="w-full h-full text-fg" />
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-auto">
        {gridReady && (
          <Suspense fallback={null}>
            <ChromeGridLazy />
          </Suspense>
        )}
      </div>

      <div
        className="absolute inset-0 z-20 pointer-events-none will-change-transform parallax-layer"
        style={{
          transform: `translate3d(0, ${visible ? scrollY * 0.1 : 0}px, 0)`,
          background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgb(var(--fg)/0.05) 0%, transparent 50%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-40 max-w-6xl pointer-events-auto">

        <div className="text-center mb-20">
          <RevealWrapper animation="fadeIn" delay={200} className="mb-8">
            <div className="text-md uppercase tracking-widest text-fg/70 font-bold mb-6 relative">
              <span className="relative z-10">Portfolio</span>
              <div className="absolute inset-x-0 bottom-0 h-px bg-[rgb(var(--fg)/0.3)]" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight relative text-fg">
              <TextScramble text="DELIKO HARTONO" className="relative z-10 text-fg" />
            </h1>
          </RevealWrapper>

          <RevealWrapper animation="slideUp" delay={400} className="mb-10">
            <div className="group inline-flex items-center gap-3 px-8 py-4 bg-[rgb(var(--bg)/0.6)] backdrop-blur-sm border border-[rgb(var(--fg)/0.2)] rounded-2xl shadow-lg">
              <Code className="w-5 h-5 text-fg" />
              <span className="text-lg sm:text-xl font-medium text-fg">Information Technology Student</span>
            </div>
          </RevealWrapper>

          <RevealWrapper animation="fadeIn" delay={600} className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col gap-6">
              <div className="text-lg sm:text-xl text-fg mb-4">
                <span>Passionate about</span>
              </div>
              <StaggeredReveal
                staggerDelay={150}
                animation="slideUp"
                baseDelay={700}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                {specialties.map(({ text, icon: Icon }) => (
                  <div
                    key={text}
                    className="group relative flex items-center gap-3 px-6 py-3 bg-[rgb(var(--bg)/0.5)] backdrop-blur-sm border border-[rgb(var(--fg)/0.2)] rounded-xl transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-fg" />
                    <span className="font-semibold text-fg">{text}</span>
                  </div>
                ))}
              </StaggeredReveal>
            </div>
          </RevealWrapper>
        </div>

        <RevealWrapper animation="slideUp" delay={800} className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20">
          <div className="mt-4">
            <StaggeredReveal
              staggerDelay={100}
              animation="scaleIn"
              baseDelay={900}
              className="grid grid-flow-col auto-cols-max gap-4 sm:gap-6"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex size-14 sm:size-16 items-center justify-center rounded-2xl border border-[rgb(var(--fg)/0.2)] bg-[rgb(var(--bg)/0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-fg group-hover:scale-110 transition-all duration-300" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </StaggeredReveal>
          </div>

          <div className="h-px w-16 sm:h-12 sm:w-px bg-[rgb(var(--fg)/0.4)]" />

          <RevealWrapper animation="slideLeft" delay={1200}>
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-fg border border-[rgb(var(--fg)/0.5)] rounded-xl shadow-lg">
              <Download className="w-5 h-5 text-bg" />
              <span className="text-sm font-medium text-bg">Download Resume</span>
            </button>
          </RevealWrapper>
        </RevealWrapper>

        <RevealWrapper animation="fadeIn" delay={1800} className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24">
          <div className="flex items-center gap-3 px-6 py-3 bg-[rgb(var(--bg)/0.6)] backdrop-blur-sm border border-[rgb(var(--fg)/0.2)] rounded-full">
            <MapPin className="w-5 h-5 animate-pulse text-fg" />
            <span className="text-sm text-fg">Jakarta, Indonesia</span>
          </div>

          <div className="h-px w-12 bg-[rgb(var(--fg)/0.4)] hidden sm:block" />

          <div className="grid grid-cols-2 gap-8">
            {[{ label: "Years Experience", value: "2+" }, { label: "Projects Completed", value: "2+" }].map(
              ({ label, value }) => (
                <div key={label} className="text-center group">
                  <div className="text-3xl font-bold text-fg mb-2">{value}</div>
                  <div className="text-xs text-fg uppercase tracking-wider">{label}</div>
                </div>
              )
            )}
          </div>
        </RevealWrapper>

        <RevealWrapper animation="fadeIn" delay={2000} className="text-center">
          <button
            onClick={() => scrollToSection("about")}
            className="group flex flex-col items-center gap-3 text-fg transition-all duration-300 mx-auto"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Scroll Down</span>
            <div className="flex flex-col gap-2 items-center">
              <div className="relative">
                <ChevronDown className="w-6 h-6 text-fg group-hover:translate-y-1 transition-transform duration-300" />
                <ChevronDown className="w-6 h-6 text-fg absolute top-0 opacity-50 group-hover:translate-y-2 transition-transform duration-300 delay-75" />
              </div>
              <div className="w-px h-8 bg-[rgb(var(--fg)/0.6)]" />
            </div>
          </button>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
