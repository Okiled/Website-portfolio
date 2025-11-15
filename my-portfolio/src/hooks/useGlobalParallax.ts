import { useLayoutEffect } from "react"
import { gsap, ScrollTrigger, setupGsap } from "@/lib/gsapConfig"

export function useGlobalParallax() {
  useLayoutEffect(() => {
    setupGsap()

    if (typeof window === "undefined") return

    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    if (!isDesktop) return

    ScrollTrigger.defaults({
      scrub: 0.6,
    })

    const sections = gsap.utils.toArray<HTMLElement>("[data-parallax-section]")

    const animations: gsap.core.Tween[] = []

    sections.forEach((section) => {
      const speedValue = section.dataset.parallaxSpeed
      const speed = speedValue ? parseFloat(speedValue) : -0.2

      const animation = gsap.to(section, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
        },
      })

      animations.push(animation)
    })

    return () => {
      animations.forEach((animation) => {
        animation.kill()
      })
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill()
      })
    }
  }, [])
}
