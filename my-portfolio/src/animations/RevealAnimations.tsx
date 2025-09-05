import React, { memo, useMemo, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * LuxReveal — a tasteful upgrade to your reveal primitives with:
 * - cinematic easing (custom cubic-beziers)
 * - depth (perspective + subtle Z parallax)
 * - soft blur-in and chroma glow accents (optional)
 * - motion-reduce support
 * - buttery stagger utilities
 */

// ---- Shared Types

type AnimName =
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'elegant'      // fade + slight up + blur -> crisp
  | 'opulent'      // scale + rotate + glow entry

interface RevealWrapperProps {
  children?: React.ReactNode
  animation?: AnimName
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  threshold?: number
  triggerOnce?: boolean
  distance?: number // px distance for slide variants
  blur?: number     // px initial blur
  glow?: boolean    // enable chroma glow accent
  perspective?: number // px perspective for 3D variants
}

const EASE = {
  soft: '[cubic-bezier(0.22,1,0.36,1)]', // "back"-like feel
  snappy: '[cubic-bezier(0.16,1,0.3,1)]',
}

const BASE = [
  'relative',
  'will-change-transform will-change-opacity',
  'transform-gpu',
  'transition-all',
  `ease-${EASE.soft}`,
  'opacity-0',
  '[backface-visibility:hidden]',
  'motion-reduce:transition-none motion-reduce:opacity-100',
].join(' ')

const VISIBLE = 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0 blur-0'

const hiddenMap: Record<AnimName, (opts: { d: number; b: number }) => string> = {
  fadeIn: ({ b }) => `opacity-0 blur-[${b}px]`,
  slideUp: ({ d, b }) => `opacity-0 translate-y-[${d}px] blur-[${b}px]`,
  slideDown: ({ d, b }) => `opacity-0 -translate-y-[${d}px] blur-[${b}px]`,
  slideLeft: ({ d, b }) => `opacity-0 translate-x-[${d}px] blur-[${b}px]`,
  slideRight: ({ d, b }) => `opacity-0 -translate-x-[${d}px] blur-[${b}px]`,
  scaleIn: ({ b }) => `opacity-0 scale-95 blur-[${b}px]`,
  rotateIn: ({ b }) => `opacity-0 rotate-[2deg] scale-[0.98] blur-[${b}px]`,
  elegant: ({ d, b }) => `opacity-0 translate-y-[${Math.max(8, Math.round(d*0.6))}px] blur-[${Math.max(2, Math.round(b*0.7))}px]`,
  opulent: ({ b }) => `opacity-0 rotate-[2.5deg] scale-[0.96] blur-[${Math.max(2,b)}px]`,
}

export const RevealWrapper = memo<RevealWrapperProps>(
  ({
    children,
    animation = 'fadeIn',
    delay = 0,
    duration = 650,
    className = '',
    style,
    threshold = 0.12,
    triggerOnce = true,
    distance = 14,
    blur = 6,
    glow = false,
    perspective = 800,
  }) => {
    const { elementRef, isVisible } = useScrollReveal({ delay, triggerOnce, threshold })

    const computedClassName = useMemo(() => {
      const dur = `duration-[${Math.max(120, duration)}ms]`
      const ease = `ease-${EASE.soft}`
      const hidden = hiddenMap[animation]({ d: distance, b: blur })
      const show = VISIBLE

      // subtle 3D depth for fancy variants
      const depth =
        animation === 'rotateIn' || animation === 'opulent'
          ? ` [transform-style:preserve-3d] [perspective:${perspective}px]`
          : ''

      // premium hover micro-interaction once visible
      const hover = 'hover:translate-y-[-1px] hover:[filter:saturate(1.05)]'

      return [BASE, dur, ease, depth, isVisible ? show : hidden, hover, className]
        .filter(Boolean)
        .join(' ')
    }, [animation, blur, className, distance, duration, isVisible, perspective])

    // "Opulent" chroma glow accent using ::after
    const afterBase = [
      'after:pointer-events-none after:absolute after:inset-[-6%]',
      'after:rounded-[inherit]',
      'after:transition-all after:duration-700',
      'after:opacity-0',
      'after:blur-[14px]',
      'after:bg-[radial-gradient(120%_120%_at_50%_10%,rgba(59,130,246,0.18)_0%,rgba(236,72,153,0.12)_45%,rgba(34,197,94,0.16)_90%)]',
    ].join(' ')

    const glowClass = glow ? `${afterBase} ${isVisible ? 'after:opacity-100' : ''}` : ''

    return (
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`${computedClassName} ${glowClass}`}
        style={{
          ...(style || {}),
          // depth translateZ for visible state (parallax whisper)
          transform: isVisible
            ? undefined
            : undefined,
        }}
      >
        {children}
      </div>
    )
  }
)

RevealWrapper.displayName = 'RevealWrapper'

// ---- Staggered

interface StaggeredRevealProps {
  children: React.ReactNode
  animation?: AnimName
  staggerDelay?: number
  className?: string
  baseDelay?: number
  triggerOnce?: boolean
  threshold?: number
  distance?: number
  blur?: number
  glow?: boolean
}

export const StaggeredReveal = memo<StaggeredRevealProps>(
  ({
    children,
    animation = 'elegant',
    staggerDelay = 80,
    className = '',
    baseDelay = 0,
    triggerOnce = true,
    threshold = 0.12,
    distance = 14,
    blur = 6,
    glow = false,
  }) => {
    const arr = useMemo(() => React.Children.toArray(children), [children])

    const render = useCallback(
      (child: React.ReactNode, index: number) => (
        <RevealWrapper
          key={index}
          animation={animation}
          delay={baseDelay + index * staggerDelay}
          duration={520}
          triggerOnce={triggerOnce}
          threshold={threshold}
          distance={distance}
          blur={blur}
          glow={glow}
        >
          {child}
        </RevealWrapper>
      ),
      [animation, baseDelay, staggerDelay, triggerOnce, threshold, distance, blur, glow]
    )

    return <div className={className}>{arr.map(render)}</div>
  }
)

StaggeredReveal.displayName = 'StaggeredReveal'

// ---- Text Reveal (lux)

interface TextRevealProps {
  text: string
  delay?: number
  speed?: number // lower = faster
  className?: string
  showCursor?: boolean
  triggerOnce?: boolean
  threshold?: number
  shimmer?: boolean
}

export const TextReveal = memo<TextRevealProps>(
  ({
    text,
    delay = 0,
    speed = 26,
    className = '',
    showCursor = true,
    triggerOnce = true,
    threshold = 0.1,
    shimmer = true,
  }) => {
    const { elementRef, isVisible } = useScrollReveal({ delay, triggerOnce, threshold })
    const [displayed, setDisplayed] = React.useState('')
    const [done, setDone] = React.useState(false)

    React.useEffect(() => {
      if (!isVisible) {
        if (!triggerOnce) {
          setDisplayed('')
          setDone(false)
        }
        return
      }

      let raf = 0
      let i = 0
      const step = () => {
        i += Math.max(1, Math.round(2 - speed * -0.02))
        setDisplayed(text.slice(0, i))
        if (i < text.length) {
          raf = requestAnimationFrame(step)
        } else {
          setDone(true)
        }
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }, [isVisible, text, speed, triggerOnce])

    return (
      <span
        ref={elementRef as React.RefObject<HTMLSpanElement>}
        className={[
          'inline-block align-baseline',
          shimmer && !done
            ? 'bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.9)_40%,rgba(255,255,255,0.5)_80%)] [background-size:200%_100%] animate-[shimmer_1.2s_linear_infinite]'
            : '',
          className,
        ].join(' ')}
      >
        {displayed}
        {showCursor && isVisible && !done && (
          <span className="ml-0.5 animate-pulse">|</span>
        )}
      </span>
    )
  }
)

TextReveal.displayName = 'TextReveal'

export default RevealWrapper
