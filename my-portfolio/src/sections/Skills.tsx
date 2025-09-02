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

/* ============== 3D Ball dengan Drag + Inertia ============== */
type BallProps = { label: string; src?: string | null };

const SkillBall: React.FC<BallProps> = ({ label, src }) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const rotRef = React.useRef({ rx: 0, ry: 0 });
  const baseRef = React.useRef({ rx: 0, ry: 0 });
  const hoverRef = React.useRef({ rx: 0, ry: 0 });
  const velRef = React.useRef({ vx: 0, vy: 0 });
  const lastRef = React.useRef<{ x: number; y: number } | null>(null);
  const draggingRef = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = React.useCallback(() => {
    const el = rootRef.current;
    if (!el) return;

    if (!draggingRef.current) {
      baseRef.current.rx += velRef.current.vy;
      baseRef.current.ry += velRef.current.vx;
      velRef.current.vx *= 0.94;
      velRef.current.vy *= 0.94;
      if (Math.abs(velRef.current.vx) < 0.001) velRef.current.vx = 0;
      if (Math.abs(velRef.current.vy) < 0.001) velRef.current.vy = 0;
    }

    const targetRx = baseRef.current.rx + hoverRef.current.rx;
    const targetRy = baseRef.current.ry + hoverRef.current.ry;

    rotRef.current.rx = lerp(rotRef.current.rx, targetRx, 0.15);
    rotRef.current.ry = lerp(rotRef.current.ry, targetRy, 0.15);

    el.style.setProperty('--rx', `${rotRef.current.rx}`);
    el.style.setProperty('--ry', `${rotRef.current.ry}`);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  React.useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [tick]);

  const setLightFromPointer = (clientX: number, clientY: number) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    const ny = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
    el.style.setProperty('--lx', `${nx * 100}`);
    el.style.setProperty('--ly', `${ny * 100}`);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    lastRef.current = { x: e.clientX, y: e.clientY };
    velRef.current = { vx: 0, vy: 0 };
    setLightFromPointer(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setLightFromPointer(e.clientX, e.clientY);
    if (!draggingRef.current) {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      hoverRef.current.ry = nx * 10;
      hoverRef.current.rx = -ny * 10;
      return;
    }
    if (!lastRef.current) return;
    const dx = e.clientX - lastRef.current.x;
    const dy = e.clientY - lastRef.current.y;
    lastRef.current = { x: e.clientX, y: e.clientY };
    const sens = 0.18;
    baseRef.current.ry += dx * sens;
    baseRef.current.rx += -dy * sens;
    velRef.current.vx = dx * sens * 0.08;
    velRef.current.vy = -dy * sens * 0.08;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    hoverRef.current = { rx: 0, ry: 0 };
  };

  const onLeave = () => {
    if (!draggingRef.current) hoverRef.current = { rx: 0, ry: 0 };
  };

  return (
    <div className="tile group relative flex flex-col items-center justify-center p-3" title={label}>
      <div
        ref={rootRef}
        className="ball"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onLeave}
        role="img"
        aria-label={`${label} ball`}
      >
        {src ? (
          <img
            src={src}
            alt={`${label} icon`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            draggable={false}
            className="decal"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <span className="decal-fallback">{label.charAt(0).toUpperCase()}</span>
        )}
        <div className="badge"><span className="badge-text">{label.length > 2 ? label.slice(0, 2).toUpperCase() : label.toUpperCase()}</span></div>
      </div>
      <span className="mt-2 text-[11px] sm:text-xs text-content/80 text-center line-clamp-1 tracking-wide">{label}</span>
    </div>
  );
};

const Skills: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [ribbonsReady, setRibbonsReady] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const allSkillNames = React.useMemo(() => {
    const set = new Set<string>();
    (skills as SkillGroup[]).forEach(s => s.skills.forEach(n => set.add(n.trim())));
    return Array.from(set);
  }, []);

  const tapeItems1 = allSkillNames;
  const tapeItems2 = React.useMemo(() => [...allSkillNames].reverse(), [allSkillNames]);

  const iconMap = React.useMemo(() => techIconMapping as Record<string, string | undefined>, []);
  const getIcon = React.useCallback((name: string): string | null => iconMap[name.trim()] ?? null, [iconMap]);

  React.useEffect(() => {
    const ric: any = (window as any).requestIdleCallback || ((fn: any) => setTimeout(fn, 120));
    const cic: any = (window as any).cancelIdleCallback || clearTimeout;
    const id = ric(() => setRibbonsReady(true));
    return () => cic(id);
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const obs = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: '0px 0px -20% 0px', threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 lg:py-24 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1000px]">
      <style>{`
        .fx-bg::before{content:"";position:absolute;inset:0;background:
          radial-gradient(1200px 600px at 18% 82%, rgb(var(--primary)/0.10), transparent 60%),
          radial-gradient(900px 520px at 82% 18%, rgb(var(--accent)/0.06), transparent 55%),
          linear-gradient(180deg, rgb(var(--content)/0.05), transparent);pointer-events:none;}
        .fx-bg::after{content:"";position:absolute;inset:-30% -10%;background:linear-gradient(70deg,transparent 40%,rgb(var(--content)/0.08) 50%,transparent 60%);transform:translateX(-55%);opacity:.5;pointer-events:none;transition:transform 1.2s ease;}
        .fx-bg:hover::after{transform:translateX(0%);}

        .ribbon{position:relative;height:52px;display:flex;align-items:center;border-radius:12px;background:linear-gradient(180deg,rgb(var(--accent)/0.94),rgb(var(--accent)/0.88)) padding-box;border:1px solid rgb(var(--border)/0.25);box-shadow:inset 0 1px 0 rgb(var(--surface)/0.25),inset 0 -6px 12px rgb(0 0 0 / 0.08),0 10px 28px rgb(0 0 0 / 0.35);overflow:hidden;color:rgb(var(--primary));}
        .dark .ribbon{color:rgb(var(--surface));}
        .ribbon::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-45deg,rgb(0 0 0 / 0.06) 0px,rgb(0 0 0 / 0.06) 12px,transparent 12px,transparent 24px);opacity:.55;pointer-events:none;}
        .ribbon::after{content:"";position:absolute;inset:-20% -10%;background:linear-gradient(70deg,transparent 45%,rgb(255 255 255 / 0.22) 52%,transparent 59%);transform:translateX(-60%);transition:transform 1s ease;pointer-events:none;}
        .ribbon:hover::after{transform:translateX(0%);}
        .track{display:flex;width:200%;white-space:nowrap;will-change:transform;}
        .chunk{display:inline-flex;align-items:center;gap:10px;padding:0 18px;letter-spacing:.08em;font-weight:800;text-transform:uppercase;position:relative;}
        .label{color:currentColor;font-weight:900;}
        .sep{opacity:.45;font-weight:900;color:currentColor;}
        .dot{width:6px;height:6px;border-radius:9999px;background:currentColor;opacity:.9;}
        @keyframes tape-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes tape-right{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        .animate-left{animation:tape-left 28s linear infinite;}
        .animate-right{animation:tape-right 32s linear infinite;}
        [data-visible="false"] .animate-left,[data-visible="false"] .animate-right{animation-play-state:paused;}
        @media (prefers-reduced-motion:reduce){.animate-left,.animate-right{animation-duration:999s}.fx-bg::after,.ribbon::after{display:none}}
        .tile{position:relative;background:linear-gradient(180deg,rgb(var(--surface)/0.06),rgb(var(--surface)/0.015)) padding-box;border:1px solid rgb(var(--border)/0.18);border-radius:16px;box-shadow:inset 0 1px 0 rgb(var(--surface)/0.08),inset 0 -6px 10px rgb(0 0 0 / 0.15),0 8px 22px rgb(0 0 0 / 0.30);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .35s,box-shadow .35s,background .35s;backdrop-filter:blur(6px);}
        .tile:hover{transform:translateY(-3px) scale(1.02);border-color:rgb(var(--border)/0.30);box-shadow:inset 0 1px 0 rgb(var(--surface)/0.10),inset 0 -8px 14px rgb(0 0 0 / 0.18),0 14px 34px rgb(0 0 0 / 0.36);background:linear-gradient(180deg,rgb(var(--surface)/0.08),rgb(var(--surface)/0.02)) padding-box;}
        .icon-fallback{background:linear-gradient(180deg,rgb(var(--primary)/0.55),rgb(var(--border)/0.85));color:rgb(var(--surface));font-weight:800;}
        @media (max-width:640px){.tile{backdrop-filter:none;box-shadow:0 6px 14px rgb(0 0 0 / 0.28)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

        /* 3D Ball (lebih BESAR + depth) */
        .ball{
          --rx:0; --ry:0; --lx:50; --ly:35;
          width:3.25rem; height:3.25rem; border-radius:9999px; position:relative;
          transform-style:preserve-3d; will-change:transform; transition:transform 120ms ease; outline:none;
          transform:perspective(800px) rotateX(calc(var(--rx)*1deg)) rotateY(calc(var(--ry)*1deg));
        }
        @media (min-width:640px){ .ball{ width:3.75rem; height:3.75rem; } }
        @media (min-width:1024px){ .ball{ width:4.25rem; height:4.25rem; } }

        .ball::before{
          content:""; position:absolute; inset:0; border-radius:inherit;
          background:
            radial-gradient(130% 130% at calc(var(--lx)*1%) calc(var(--ly)*1%), rgb(255 255 255 / .75), transparent 36%),
            radial-gradient(80% 80% at 50% 55%, rgb(var(--surface)/0.10), rgb(0 0 0 / .38)),
            conic-gradient(from 210deg, rgb(0 0 0 / .20), rgb(255 255 255 / .06), rgb(0 0 0 / .28), rgb(255 255 255 / .05), rgb(0 0 0 / .30));
          box-shadow: inset 0 1px 2px rgb(255 255 255 / .25), inset 0 -8px 14px rgb(0 0 0 / .30), 0 12px 20px rgb(0 0 0 / .30);
          transform:translateZ(0.1px) rotateX(calc(var(--rx)*1deg)) rotateY(calc(var(--ry)*1deg));
        }
        .dark .ball::before{
          background:
            radial-gradient(130% 130% at calc(var(--lx)*1%) calc(var(--ly)*1%), rgb(255 255 255 / .45), transparent 36%),
            radial-gradient(80% 80% at 50% 55%, rgb(255 255 255 / .05), rgb(0 0 0 / .46)),
            conic-gradient(from 210deg, rgb(0 0 0 / .28), rgb(255 255 255 / .04), rgb(0 0 0 / .36), rgb(255 255 255 / .03), rgb(0 0 0 / .40));
        }
        .ball::after{
          content:""; position:absolute; width:38%; height:38%; left:0; top:0; border-radius:9999px;
          background:radial-gradient(60% 60% at 50% 50%, white, transparent 70%);
          opacity:.65; filter:blur(1px);
          transform: translate(calc(var(--lx)*1% - 19%), calc(var(--ly)*1% - 19%)) translateZ(1px);
          pointer-events:none;
        }
        .decal,.decal-fallback{
          position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%) translateZ(2px) rotateX(calc(var(--rx)*1deg)) rotateY(calc(var(--ry)*1deg));
          width:64%; height:64%; display:flex; align-items:center; justify-content:center;
          border-radius:14px; object-fit:contain; user-select:none; pointer-events:none;
          box-shadow:0 1px 2px rgb(0 0 0 / .25);
        }
        .decal-fallback{ font-weight:900; font-size:1rem; color:rgb(var(--surface)); background:rgb(var(--primary)); }
        .badge{
          position:absolute; right:7%; top:7%; width:30%; height:30%; border-radius:9999px;
          background:radial-gradient(120% 120% at 50% 50%, white, rgb(230 230 230) 60%);
          box-shadow:0 1px 2px rgb(0 0 0 / .25), inset 0 -1px 2px rgb(0 0 0 / .18);
          transform:translateZ(3px) rotateX(calc(var(--rx)*1deg)) rotateY(calc(var(--ry)*1deg));
          display:flex; align-items:center; justify-content:center;
        }
        .badge-text{ font-size:.55rem; font-weight:900; color:#111; line-height:1; }
      `}</style>

      <div className="absolute inset-0 bg-surface fx-bg" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-visible={isVisible}>
        <RevealWrapper animation="fadeIn" delay={100} className="text-center mb-12" triggerOnce={false} threshold={0.3}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/10 backdrop-blur-sm border border-borderc/20 rounded-full mb-6">
            <Brain className="w-4 h-4 text-content/70" />
            <span className="text-sm font-medium text-content/70">Technical Arsenal</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-content mb-3 tracking-tight">
            <TextReveal text="Skills & Expertise" speed={60} triggerOnce={false} threshold={0.3} />
          </h2>
          <RevealWrapper animation="slideUp" delay={260} triggerOnce={false} threshold={0.3}>
            <p className="text-base sm:text-lg text-content/70 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit of technologies, languages, and frameworks that power my development journey.
            </p>
          </RevealWrapper>
        </RevealWrapper>

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

        <RevealWrapper animation="fadeIn" delay={180} triggerOnce={false} threshold={0.2} className="relative">
          <StaggeredReveal
            animation="slideUp"
            staggerDelay={40}
            baseDelay={220}
            triggerOnce={false}
            threshold={0.2}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 sm:gap-5 lg:gap-6 [content-visibility:auto]"
          >
            {allSkillNames.map((name) => (
              <SkillBall key={name} label={name} src={getIcon(name) || undefined} />
            ))}
          </StaggeredReveal>
        </RevealWrapper>

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

        <RevealWrapper animation="fadeIn" delay={380} className="text-center mt-12" triggerOnce={false} threshold={0.3}>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-borderc/20 bg-surface/10 hover:bg-surface/15 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
            <span className="text-content/80 font-medium">Always Learning, Always Growing</span>
            <Zap className="w-4 h-4 text-content/70" />
          </button>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Skills;
