import React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { useLayoutEffect, useMemo, useRef, useState } from "react"

function useSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [w, setW] = useState(0)
  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(() => {
      const r = ref.current!.getBoundingClientRect()
      setW(r.width)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return { ref, width: w }
}

const mod = (a: number, n: number) => ((a % n) + n) % n

type RowProps = {
  text: string
  baseVelocity: number
  gap?: number
  className?: string
  accel?: number
}

function InfiniteRow({ text, baseVelocity, gap = 0, className = "", accel = 0.9 }: RowProps) {
  const container = useSize<HTMLDivElement>()
  const sample = useSize<HTMLSpanElement>()

  const unitWidth = useMemo(() => (sample.width || 0) + gap, [sample.width, gap])
  const duplicates = useMemo(() => {
    if (!container.width || !unitWidth) return 8
    return Math.max(3, Math.ceil(container.width / unitWidth) + 2)
  }, [container.width, unitWidth])

  const { scrollY } = useScroll()
  const scrollVel = useVelocity(scrollY)
  const smooth = useSpring(scrollVel, { stiffness: 380, damping: 60 })
  const vFactor = useTransform(smooth, [-1500, 0, 1500], [-1, 0, 1], { clamp: false })

  const offset = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    if (!unitWidth) return
    const dt = Math.max(0, delta) / 1000
    const boost = 1 + accel * Math.abs(vFactor.get())
    const speed = baseVelocity * boost
    offset.set(mod(offset.get() + speed * dt, unitWidth))
  })

  const x = useTransform(offset, (v) => -v)

  const probe = (
    <span
      ref={sample.ref}
      className={`${className} inline-block whitespace-nowrap`}
      style={{ marginRight: gap }}
    >
      {text}
    </span>
  )

  return (
    <div ref={container.ref} className="relative overflow-hidden leading-none">
      <div className="absolute inset-0 opacity-0 pointer-events-none">{probe}</div>
      <motion.div className="flex will-change-transform whitespace-nowrap select-none" style={{ x }}>
        {Array.from({ length: duplicates }).map((_, i) => (
          <span key={i} className={`${className} inline-block`} style={{ marginRight: gap }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function AboutMeParallax({ text = "ABOUT ME" }: { text?: string }) {
  const style =
    "uppercase font-extrabold tracking-tight text-fg " +
    "text-4xl sm:text-6xl md:text-7xl lg:text-8xl " +
    "drop-shadow-[0_0_14px_rgba(var(--fg),0.18)]"

  return (
    <div className="w-full select-none space-y-0 pb-8">
      <InfiniteRow text={text} baseVelocity={-160} className={style} gap={40} accel={5} />
      <InfiniteRow text={text} baseVelocity={160} className={style} gap={40} accel={5} />
    </div>
  )
}
