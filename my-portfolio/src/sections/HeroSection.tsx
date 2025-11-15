import React, { useEffect, useRef, useState } from "react";
import { MapPin, Download, Sparkles } from "lucide-react";
import TextScramble from "../animations/TextScramble";
import { RevealWrapper, StaggeredReveal } from "../animations/RevealAnimations";
import { socialLinks } from "../utils/data";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (sectionId: string) => void;
}

const ROLE_TITLES = ["Software Engineer", "AI Engineer", "FullStack Developer"];

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY, scrollToSection }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const roleRef = useRef<HTMLSpanElement | null>(null);
  const splitInstanceRef = useRef<GSAPSplitText | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const loopTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.1,
      rootMargin: "0px 0px -15% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cvLink = socialLinks.find((l) => l.label === "Download CV")?.href || "#";
  const currentRole = ROLE_TITLES[currentRoleIndex];

  useEffect(() => {
    if (!roleRef.current || !fontsLoaded) return;

    if (loopTimeoutRef.current !== null) {
      window.clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }

    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    if (splitInstanceRef.current) {
      try {
        splitInstanceRef.current.revert();
      } catch {}
      splitInstanceRef.current = null;
    }

    const el = roleRef.current;

    el.textContent = currentRole;

    const split = new GSAPSplitText(el, {
      type: "chars",
      smartWrap: true,
      autoSplit: false,
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
      reduceWhiteSpace: false,
    });

    splitInstanceRef.current = split;

    let targets: Element[] = [];
    if (split.chars && split.chars.length) targets = split.chars;
    else if (split.words && split.words.length) targets = split.words;
    else if (split.lines && split.lines.length) targets = split.lines;

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.06,
        willChange: "transform, opacity",
        force3D: true,
        onComplete: () => {
          loopTimeoutRef.current = window.setTimeout(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % ROLE_TITLES.length);
          }, 250);
        },
      }
    );

    tweenRef.current = tween;

    return () => {
      if (loopTimeoutRef.current !== null) {
        window.clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      if (splitInstanceRef.current) {
        try {
          splitInstanceRef.current.revert();
        } catch {}
        splitInstanceRef.current = null;
      }
    };
  }, [currentRole, fontsLoaded]);

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
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[rgb(var(--fg)/0.2)] blur-xl" />
        </div>
        <div
          className="floating-element absolute w-32 h-32 opacity-10"
          style={{
            top: "70%",
            right: "15%",
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[rgb(var(--fg)/0.3)] blur-2xl" />
        </div>
        <div
          className="floating-element absolute w-16 h-16 opacity-30"
          style={{
            top: "40%",
            right: "20%",
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        >
          <Sparkles className="w-full h-full text-fg" />
        </div>
      </div>

      <div
        className="absolute inset-0 z-20 pointer-events-none will-change-transform parallax-layer"
        style={{
          transform: `translate3d(0, ${visible ? scrollY * 0.1 : 0}px, 0)`,
          background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgb(var(--fg)/0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-40 max-w-6xl pointer-events-auto mt-20">
        <div className="text-center mb-20">
          <RevealWrapper animation="fadeIn" delay={200} className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight relative text-fg">
              <TextScramble text="DELIKO HARTONO" className="relative z-10 text-fg" />
            </h1>
          </RevealWrapper>

          <div className="max-w-4xl mx-auto mb-12 flex flex-col items-center gap-3">
            <div className="text-lg sm:text-xl text-fg">
              <span>Passionate about</span>
            </div>

            <span
              ref={roleRef}
              className="split-parent pointer-events-none select-none text-4xl sm:text-5xl font-semibold text-fg"
            >
              {currentRole}
            </span>
          </div>
        </div>

        <RevealWrapper
          animation="slideUp"
          delay={800}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20"
        >
          <div className="mt-0">
            <StaggeredReveal
              staggerDelay={100}
              animation="scaleIn"
              baseDelay={900}
              className="grid grid-flow-col auto-cols-max gap-4 sm:gap-6"
            >
              {socialLinks
                .filter(({ label }) => label !== "Download CV")
                .map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    aria-label={label}
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
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 bg-fg border border-[rgb(var(--fg)/0.5)] rounded-xl shadow-lg"
            >
              <Download className="w-5 h-5 text-bg" />
              <span className="text-sm font-medium text-bg">Download CV</span>
            </a>
          </RevealWrapper>
        </RevealWrapper>

        <RevealWrapper
          animation="fadeIn"
          delay={1800}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-[rgb(var(--bg)/0.6)] backdrop-blur-sm border border-[rgb(var(--fg)/0.2)] rounded-full">
            <MapPin className="w-5 h-5 animate-pulse text-fg" />
            <span className="text-md text-fg">Jakarta, Indonesia</span>
          </div>

          <div className="h-px w-12 bg-[rgb(var(--fg)/0.4)] hidden sm:block" />

          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "Years Experience", value: "2+" },
              { label: "Projects Completed", value: "2+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center group">
                <div className="text-3xl font-bold text-fg mb-2">{value}</div>
                <div className="text-xs text-fg uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
