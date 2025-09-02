import React, { useMemo, useCallback, useEffect, useRef, useState } from "react"
import { Briefcase, Calendar, Star, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react"
import { RevealWrapper, TextReveal, StaggeredReveal } from "../animations/RevealAnimations"
import { experiences } from "../utils/data"

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n))
}

function buildThresholdList(steps = 24) {
  const list: number[] = []
  for (let i = 0; i <= steps; i++) list.push(i / steps)
  return list
}

function useSectionScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  const [dir, setDir] = useState<"down" | "up">("down")
  const inViewRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const lastY = useRef(0)

  const compute = useCallback(() => {
    const node = ref.current
    if (!node) {
      rafRef.current = null
      return
    }
    const rect = node.getBoundingClientRect()
    const vh = window.innerHeight
    const total = rect.height + vh
    const seen = clamp(vh - rect.top, 0, total)
    const next = (seen / total) * 100

    targetRef.current = next
    const alpha = 0.18
    smoothRef.current = smoothRef.current + (targetRef.current - smoothRef.current) * alpha

    const rounded = Math.round(smoothRef.current * 10) / 10
    setProgress((p) => (Math.abs(p - rounded) >= 0.1 ? rounded : p))

    if (inViewRef.current) rafRef.current = requestAnimationFrame(compute)
    else rafRef.current = null
  }, [ref])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = new IntersectionObserver(
      ([entry]) => {
        const now = entry.isIntersecting || entry.intersectionRatio > 0
        inViewRef.current = now
        if (now && !rafRef.current) rafRef.current = requestAnimationFrame(compute)
      },
      { threshold: buildThresholdList(24), rootMargin: "20% 0px 20% 0px" }
    )

    io.observe(node)

    const onScroll = () => {
      const y = window.scrollY
      const nextDir = y >= lastY.current ? "down" : "up"
      if (nextDir !== dir) setDir(nextDir)
      lastY.current = y
      if (inViewRef.current && !rafRef.current) rafRef.current = requestAnimationFrame(compute)
    }
    const onResize = () => {
      if (inViewRef.current && !rafRef.current) rafRef.current = requestAnimationFrame(compute)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    rafRef.current = requestAnimationFrame(compute)

    return () => {
      io.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [compute, dir, ref])

  return { progress, dir }
}

type ExpItem = (typeof experiences)[number]

function useHysteresis(
  value: number,
  openStart: number,
  openEnd: number,
  holdStart: number,
  holdEnd: number
) {
  const ref = useRef(false)
  const [, force] = useState(0)
  useEffect(() => {
    const insideOpen = value >= openStart && value <= openEnd
    const insideHold = value >= holdStart && value <= holdEnd
    let next = ref.current
    if (!ref.current && insideOpen) next = true
    else if (ref.current && !insideHold) next = false
    if (next !== ref.current) {
      ref.current = next
      force((v) => v + 1)
    }
  }, [value, openStart, openEnd, holdStart, holdEnd])
  return ref.current
}

const Spine: React.FC<{ progress: number; dir: "down" | "up" }> = ({ progress, dir }) => {
  const eased = useMemo(() => clamp(progress, 0, 100), [progress])
  const glowActive = useHysteresis(eased, 4, 96, 1, 99)

  return (
    <>
      <div
        className="pointer-events-none hidden lg:block absolute top-0 bottom-0 z-20 left-1/2 -translate-x-1/2 w-[6px]"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-white/10 to-white/15" />
        <div
          className="absolute inset-0 rounded-full origin-top"
          style={{
            transform: `scaleY(${eased / 100})`,
            background: "linear-gradient(to bottom, rgba(var(--primary-rgb),0.9), rgba(var(--accent-rgb),0.8))",
            boxShadow: "0 0 16px rgba(var(--primary-rgb),0.35)",
          }}
        />
        {glowActive && (
          <div
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
            style={{
              left: "50%",
              top: `${eased}%`,
              background: "rgba(var(--primary-rgb),0.9)",
              boxShadow: "0 0 10px rgba(var(--primary-rgb),0.6), 0 0 22px rgba(var(--primary-rgb),0.35)",
            }}
          />
        )}
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              dir === "down"
                ? "linear-gradient(transparent 0%, rgba(255,255,255,0.35) 40%, transparent 80%)"
                : "linear-gradient(transparent 20%, rgba(255,255,255,0.35) 60%, transparent 100%)",
            animation: dir === "down" ? "flow-down 3s ease-in-out infinite" : "flow-up 3s ease-in-out infinite",
          }}
        />
      </div>

      <div className="pointer-events-none lg:hidden absolute top-0 bottom-0 z-20 left-6 w-[4px]" aria-hidden>
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-white/10 to-white/15" />
        <div
          className="absolute inset-0 rounded-full origin-top"
          style={{
            transform: `scaleY(${eased / 100})`,
            background: "linear-gradient(to bottom, rgba(var(--primary-rgb),0.9), rgba(var(--accent-rgb),0.8))",
            boxShadow: "0 0 12px rgba(var(--primary-rgb),0.3)",
          }}
        />
        {glowActive && (
          <div
            className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
            style={{
              left: "50%",
              top: `${eased}%`,
              background: "rgba(var(--primary-rgb),0.9)",
              boxShadow: "0 0 10px rgba(var(--primary-rgb),0.6)",
            }}
          />
        )}
      </div>
    </>
  )
}

const Card: React.FC<{ exp: ExpItem; index: number }> = ({ exp, index }) => {
  const [hover, setHover] = useState(false)
  const [mx, setMx] = useState(50)
  const [my, setMy] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number | null>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100)
      const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100)
      setMx(x)
      setMy(y)
      raf.current = null
    })
  }

  useEffect(() => {
  return () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current)
  }
}, [])

  const isLeft = index % 2 === 0
  const Icon = exp.icon

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className={[
        "group relative transform-gpu rounded-3xl border transition-all duration-500 will-change-transform",
        "bg-surface/80 backdrop-blur-2xl border-primary/15 hover:border-primary/40",
        "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)]",
        isLeft ? "lg:mr-16" : "lg:ml-16",
        "px-6 py-6 sm:px-7 sm:py-7 lg:px-10 lg:py-10",
      ].join(" ")}
      style={{
        contentVisibility: "auto",
        contain: "layout paint style",
        transformStyle: "preserve-3d",
        backgroundImage: `radial-gradient(500px circle at ${mx}% ${my}%, rgba(var(--primary-rgb),0.08), transparent 40%)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-70 transition-transform duration-500"
        style={{
          background: hover
            ? "linear-gradient(135deg, rgba(var(--primary-rgb),0.12), rgba(var(--accent-rgb),0.12))"
            : "linear-gradient(135deg, rgba(var(--primary-rgb),0.06), rgba(var(--accent-rgb),0.06))",
          transform: hover ? "translateZ(0.01px) scale(1.02)" : "translateZ(0.01px) scale(1)",
        }}
        aria-hidden
      />

      <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-start gap-4 lg:gap-6">
        <div className="flex-shrink-0">
          <div
            className="rounded-2xl p-3 lg:p-4 transition-all duration-500"
            style={{
              background: hover
                ? "linear-gradient(135deg, rgba(var(--primary-rgb),0.9), rgba(var(--accent-rgb),0.85))"
                : "linear-gradient(135deg, rgba(var(--primary-rgb),0.8), rgba(var(--accent-rgb),0.7))",
              boxShadow: hover
                ? "0 20px 50px -12px rgba(var(--primary-rgb),0.35)"
                : "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
          >
            <Icon className="w-6 h-6 text-white drop-shadow" />
          </div>
        </div>

        <div className="min-w-0">
          <h3
            className="font-bold text-content leading-tight transition-all duration-500 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
            style={{ textShadow: hover ? "0 2px 8px rgba(var(--primary-rgb),0.25)" : "none" }}
          >
            {exp.title}
          </h3>
          <p className="text-content/70 text-base sm:text-lg lg:text-xl xl:text-2xl mt-1">{exp.company}</p>

          <div className="mt-4 lg:mt-6 inline-flex items-center gap-3 rounded-2xl border backdrop-blur-xl px-4 py-2 lg:px-5 lg:py-3 transition-all duration-500 bg-gradient-to-r from-primary/10 via-primary/15 to-accent/10 border-primary/20">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-semibold text-primary text-sm lg:text-base">{exp.period}</span>
            <Zap className="w-4 h-4 text-accent opacity-80" />
          </div>

          <p className="mt-5 lg:mt-7 text-content/80 text-base lg:text-lg leading-relaxed">{exp.points[0]}</p>

          <div className="mt-4 lg:mt-6">
            <h4 className="flex items-center gap-3 font-bold text-content/90 text-base lg:text-lg">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span className="relative">Key Achievements</span>
              <Star className="w-4 h-4 text-accent" />
            </h4>

            <StaggeredReveal
              staggerDelay={60}
              baseDelay={200}
              animation="fadeIn"
              className="mt-3 space-y-2 lg:space-y-3"
              triggerOnce
              threshold={0.25}
            >
              {exp.points.slice(1, 4).map((pt, i) => (
                <div key={i} className="relative pl-6 text-content/80 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_0_6px_rgba(var(--primary-rgb),0.18)]" />
                  {pt}
                </div>
              ))}
            </StaggeredReveal>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-2 opacity-70">
          <TrendingUp className="w-5 h-5 text-primary/70" />
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
      </div>
    </div>
  )
}

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { progress, dir } = useSectionScrollProgress(sectionRef)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting || e.intersectionRatio > 0),
      { threshold: buildThresholdList(12), rootMargin: "10% 0px 10% 0px" }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ contentVisibility: "auto", contain: "layout paint style", overflowAnchor: "none" }}
    >
      <style>{`
        @keyframes flow-down { 0% { transform: translateY(-24px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(24px); opacity: 0; } }
        @keyframes flow-up { 0% { transform: translateY(24px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-24px); opacity: 0; } }
        @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        @media (prefers-reduced-motion: reduce) { *,[*] { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .1s !important; } }
      `}</style>

      <div className="absolute inset-0 bg-surface" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(var(--primary-rgb),0.04), transparent), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(var(--accent-rgb),0.04), transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(var(--primary-rgb),0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(var(--accent-rgb),0.05) 0%, transparent 50%)",
          animation: visible ? "shimmer 18s linear infinite" : undefined,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper
          animation="fadeIn"
          delay={120}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          triggerOnce
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-3xl border bg-gradient-to-r from-primary/10 via-primary/15 to-accent/10 border-primary/20 backdrop-blur-2xl mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", animation: "shimmer 2.2s ease-in-out infinite" }} />
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider">EXPERIENCE</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>

          <h2 className="relative font-bold text-content text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <TextReveal text="Professional Journey" speed={80} triggerOnce threshold={0.3} />
          </h2>
          <p className="mt-4 text-content/70 max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl leading-relaxed">
            Highlights and milestones across my <span className="text-primary font-semibold">career</span>.
          </p>
        </RevealWrapper>

        <div className="relative">
          <Spine progress={progress} dir={dir} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-y-10 sm:gap-y-14 lg:gap-y-20 gap-x-0 lg:gap-x-24">
            {experiences.map((exp, i) => (
              <div key={`${exp.title}-${i}`} className={i % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2 lg:row-start-auto"}>
                <RevealWrapper
                  animation={i % 2 === 0 ? "slideRight" : "slideLeft"}
                  delay={200 + i * 80}
                  triggerOnce
                  threshold={0.25}
                >
                  <div className="lg:relative">
                    <div className="hidden lg:block absolute top-8 -z-[1] w-12 h-12 rounded-full left-1/2 -translate-x-1/2 bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-60" />
                    <Card exp={exp as ExpItem} index={i} />
                  </div>
                </RevealWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Experience)
