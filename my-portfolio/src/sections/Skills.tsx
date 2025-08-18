import React from 'react';
import { Brain, Zap } from 'lucide-react';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../animations/RevealAnimations';
import { skills, techIconMapping } from '../utils/data';

interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}

/** ====== Perf: memoized TapeRow di luar komponen ====== */
const TapeRow = React.memo(function TapeRow({ items }: { items: string[] }) {
  return (
    <>
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className="chunk">
          <span className="dot" />
          <span className="label">{label}</span>
          <span className="sep">•</span>
        </span>
      ))}
    </>
  );
});

const Skills: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [ribbonsReady, setRibbonsReady] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  // Kumpulkan semua nama skill unik (tetap)
  const allSkillNames = React.useMemo(() => {
    const set = new Set<string>();
    (skills as SkillGroup[]).forEach(s => s.skills.forEach(n => set.add(n.trim())));
    return Array.from(set);
  }, []);

  // Dua list untuk dua ribbon
  const tapeItems1 = allSkillNames;
  const tapeItems2 = React.useMemo(() => [...allSkillNames].reverse(), [allSkillNames]);

  /** ====== Perf: cache icon map dan fungsi lookup ====== */
  const iconMap = React.useMemo(
    () => techIconMapping as Record<string, string | undefined>,
    []
  );
  const getIcon = React.useCallback(
    (name: string): string | null => iconMap[name.trim()] ?? null,
    [iconMap]
  );

  /** ====== Defer mount marquee (ribbons) setelah idle ====== */
  React.useEffect(() => {
    const ric: any = window.requestIdleCallback || ((fn: any) => setTimeout(fn, 120));
    const cic: any = window.cancelIdleCallback || clearTimeout;
    const id = ric(() => setRibbonsReady(true));
    return () => cic(id);
  }, []);

  /** ====== Pause animasi saat offscreen (hemat CPU) ====== */
  React.useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 lg:py-24 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1000px]"
    >
      {/* ===== Local Styles (warna & font tetap, efek dipoles) ===== */}
      <style>{`
        .fx-bg::before{
          content:"";
          position:absolute; inset:0;
          background:
            radial-gradient(1200px 600px at 18% 82%, rgba(148,163,184,0.10), transparent 60%),
            radial-gradient(900px 520px at 82% 18%, rgba(241,245,249,0.05), transparent 55%),
            linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
          pointer-events:none;
        }
        .fx-bg::after{
          content:"";
          position:absolute; inset:-30% -10%;
          background: linear-gradient(70deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
          transform: translateX(-55%);
          opacity:.5; pointer-events:none; transition: transform 1.2s ease;
        }
        .fx-bg:hover::after{ transform: translateX(0%); }

        .ribbon{
          position: relative; height: 52px; display:flex; align-items:center;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.10)) padding-box;
          border:1px solid rgba(0,0,0,0.25);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.25),
            inset 0 -6px 12px rgba(0,0,0,0.10),
            0 10px 28px rgba(0,0,0,0.35);
          overflow:hidden; background-color:#fde047;
        }
        .ribbon::before{
          content:""; position:absolute; inset:0;
          background: repeating-linear-gradient(-45deg,
              rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 12px,
              transparent 12px, transparent 24px);
          opacity:.7; pointer-events:none;
        }
        .ribbon::after{
          content:""; position:absolute; inset:-20% -10%;
          background: linear-gradient(70deg, transparent 45%, rgba(255,255,255,0.22) 52%, transparent 59%);
          transform: translateX(-60%); transition: transform 1s ease; pointer-events:none;
        }
        .ribbon:hover::after{ transform: translateX(0%); }

        .track{ display:flex; width:200%; white-space:nowrap; will-change: transform; }
        .chunk{ display:inline-flex; align-items:center; gap:10px; padding:0 18px; letter-spacing:.08em; font-weight:800; text-transform: uppercase; color:#000; position:relative; }
        .label{ color:#000; font-weight:900; }
        .sep{ opacity:.45; font-weight:900; }
        .dot{ width:6px; height:6px; border-radius:9999px; background:#000; opacity:.9; }

        @keyframes tape-left { 0% {transform: translateX(0);} 100% {transform: translateX(-50%);} }
        @keyframes tape-right { 0% {transform: translateX(-50%);} 100% {transform: translateX(0);} }
        .animate-left{ animation: tape-left 28s linear infinite; }
        .animate-right{ animation: tape-right 32s linear infinite; }

        /* Stop animasi saat tidak visible (ditoggle via data-visible) */
        [data-visible="false"] .animate-left,
        [data-visible="false"] .animate-right { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce){
          .animate-left, .animate-right{ animation-duration: 999s; }
          .fx-bg::after, .ribbon::after{ display:none; }
        }

        .tile{
          position:relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)) padding-box;
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -6px 10px rgba(0,0,0,0.15),
            0 8px 22px rgba(0,0,0,0.30);
          transition: transform .35s cubic-bezier(.2,.8,.2,1), border-color .35s, box-shadow .35s, background .35s;
          backdrop-filter: blur(6px);
        }
        .tile:hover{
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(255,255,255,0.14);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.10),
            inset 0 -8px 14px rgba(0,0,0,0.18),
            0 14px 34px rgba(0,0,0,0.36);
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)) padding-box;
        }
        .icon-fallback{
          background: linear-gradient(180deg, #1f2937, #0f172a); color:#e5e7eb; font-weight:800;
        }

        /* Mobile: kurangi biaya efek berat */
        @media (max-width: 640px){
          .tile{ backdrop-filter: none; box-shadow: 0 6px 14px rgba(0,0,0,0.28); }
        }
      `}</style>

      {/* ===== Background (warna slate tetap) ===== */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617_0%,#0b1220_50%,#020617_100%)] fx-bg" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-visible={isVisible}>
        {/* ===== Header ===== */}
        <RevealWrapper animation="fadeIn" delay={100} className="text-center mb-12" triggerOnce={false} threshold={0.3}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <Brain className="w-4 h-4 text-slate-300/80" />
            <span className="text-sm font-medium text-slate-300/80">Technical Arsenal</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
            <TextReveal text="Skills & Expertise" speed={60} triggerOnce={false} threshold={0.3} />
          </h2>

          <RevealWrapper animation="slideUp" delay={260} triggerOnce={false} threshold={0.3}>
            <p className="text-base sm:text-lg text-slate-300/85 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit of technologies, languages, and frameworks that power my development journey.
            </p>
          </RevealWrapper>
        </RevealWrapper>

        {/* ===== RIBBON TOP ===== */}
        {ribbonsReady && (
          <RevealWrapper animation="slideLeft" delay={120} triggerOnce={false} threshold={0.25} className="relative mb-10">
            <div className="ribbon group/t1 rounded-xl overflow-hidden" aria-hidden>
              <div className="track animate-left group-hover/t1:[animation-play-state:paused]">
                <TapeRow items={tapeItems1} />
                <TapeRow items={tapeItems1} />
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* ===== ICON GRID ===== */}
        <RevealWrapper animation="fadeIn" delay={180} triggerOnce={false} threshold={0.2} className="relative">
          <StaggeredReveal
            animation="slideUp"
            staggerDelay={40}
            baseDelay={220}
            triggerOnce={false}
            threshold={0.2}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 sm:gap-5 lg:gap-6 [content-visibility:auto]"
          >
            {allSkillNames.map((name) => {
              const src = getIcon(name);
              return (
                <div key={name} className="tile group relative flex flex-col items-center justify-center p-3" title={name}>
                  {src ? (
                    <img
                      src={src}
                      alt={`${name} icon`}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      draggable={false}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg icon-fallback flex items-center justify-center select-none">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="mt-2 text-[11px] sm:text-xs text-slate-200/90 text-center line-clamp-1 tracking-wide">
                    {name}
                  </span>
                </div>
              );
            })}
          </StaggeredReveal>
        </RevealWrapper>

        {/* ===== RIBBON BOTTOM ===== */}
        {ribbonsReady && (
          <RevealWrapper animation="slideRight" delay={140} triggerOnce={false} threshold={0.25} className="relative mt-10">
            <div className="ribbon group/t2 rounded-xl overflow-hidden" aria-hidden>
              <div className="track animate-right group-hover/t2:[animation-play-state:paused]">
                <TapeRow items={tapeItems2} />
                <TapeRow items={tapeItems2} />
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* ===== CTA ===== */}
        <RevealWrapper animation="fadeIn" delay={380} className="text-center mt-12" triggerOnce={false} threshold={0.3}>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
            <span className="text-slate-200/90 font-medium">Always Learning, Always Growing</span>
            <Zap className="w-4 h-4 text-slate-200/80" />
          </button>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Skills;
