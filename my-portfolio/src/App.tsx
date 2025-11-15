// App.tsx
import React, { useState, useEffect } from 'react'
import ThemeProvider from '../src/context/ThemeProvider'
import LoadingScreen from '../src/components/LoadingScreen'
import Navigation from '../src/components/Navigation'
import HeroSection from '../src/sections/HeroSection'
import AboutSection from '../src/sections/About'
import ExperienceSection from '../src/sections/Experience'
import ProjectsSection from '../src/sections/Projects'
import SkillsSection from '../src/sections/Skills'
import ContactSection from '../src/sections/Contact'
import Footer from '../src/components/Footer'
import PixelTrail from './animations/Cursor'
import { useGlobalParallax } from '../src/hooks/useGlobalParallax'

import BackgroundPaths from '../src/animations/BackgroundPaths'

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null)

  useGlobalParallax()

  useEffect(() => {
    setEventSource(document.body)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setIsLoaded(true)
  }

  useEffect(() => {
    if (!showLoading) {
      let ticking = false
      let lastScrollTime = 0

      const handleScroll = () => {
        const y = window.scrollY
        const now = performance.now()
        if (now - lastScrollTime < 16) return
        lastScrollTime = now

        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrollY(y)

            const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'] as const
            const scrollPosition = y + 100

            for (const section of sections) {
              const element = document.getElementById(section)
              if (element) {
                const offsetTop = element.offsetTop
                const offsetHeight = element.offsetHeight
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                  setActiveSection(section)
                  break
                }
              }
            }

            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [showLoading])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  if (showLoading) {
    return <LoadingScreen onFinish={handleLoadingComplete} />
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-x-hidden bg-surface text-content transition-colors duration-300">
        {/* 🔹 Fixed background paths, naik sedikit ke atas */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundPaths
            className="!bg-transparent"
            yOffset={40}   // geser path sedikit ke atas
            count={36}     // bisa kamu tweak kalau mau lebih ringan/padat
          />
        </div>

        {/* 🔹 Semua konten di atas background */}
        <div className="relative z-10">
          {/* Kalau mau pakai cursor trail: */}
          {/* <PixelTrail eventSource={eventSource} /> */}

          <Navigation
            activeSection={activeSection}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            scrollToSection={scrollToSection}
            isLoaded={isLoaded}
          />
          <HeroSection scrollY={scrollY} scrollToSection={scrollToSection} />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />

          {/* Pastikan footer punya bg-surface supaya garisnya "hilang" di footer */}
          <Footer activeSection={activeSection} scrollToSection={scrollToSection} />
        </div>

        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true" />
      </div>
    </ThemeProvider>
  )
}

export default App
