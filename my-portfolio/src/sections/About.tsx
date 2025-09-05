import React, { memo } from "react";
import { BookOpen, Star, User, GraduationCap, Code2 } from "lucide-react";
import { useGlowEffect as useGlowEffectHook } from "@/components/GlowEffect";
import TextJalan from "@/animations/TextJalan";

// Optimized ProfileBadge with better responsive design
const ProfileBadge = memo(() => (
  <div className="inline-flex items-center gap-2 px-3 py-2 xs:px-4 bg-secondary border border-border rounded-full mb-4 xs:mb-6">
    <User className="w-3 h-3 xs:w-4 xs:h-4 text-muted-foreground flex-shrink-0" />
    <span className="text-xs xs:text-sm font-medium text-foreground whitespace-nowrap">
      Personal Profile
    </span>
  </div>
));
ProfileBadge.displayName = 'ProfileBadge';

// Optimized IntroductionCard with better text handling
const IntroductionCard = memo(React.forwardRef<HTMLDivElement, { glowProps: any }>(
  ({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-2xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-2xl p-4 xs:p-6 md:p-8 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-6">
          <User className="w-5 h-5 xs:w-6 xs:h-6 text-foreground flex-shrink-0" />
          <h3 className="text-lg xs:text-xl md:text-2xl font-bold text-foreground">
            Introduction
          </h3>
        </div>
        <p className="text-sm xs:text-base md:text-lg text-muted-foreground leading-relaxed">
          I'm an Information Technology student at Binus University
          with a passion for AI, quantitative finance, and full-stack
          development. Currently in my 5th semester with a focus on
          building innovative solutions that bridge technology and
          finance.
        </p>
      </div>
    </div>
  )
));
IntroductionCard.displayName = 'IntroductionCard';

// Optimized Web3Card with improved spacing
const Web3Card = memo(React.forwardRef<HTMLDivElement, { glowProps: any }>(
  ({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-2xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-2xl p-4 xs:p-6 md:p-8 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-6">
          <Code2 className="w-5 h-5 xs:w-6 xs:h-6 text-foreground flex-shrink-0" />
          <h3 className="text-lg xs:text-xl md:text-2xl font-bold text-foreground">
            Web3 Journey
          </h3>
        </div>
        <p className="text-sm xs:text-base md:text-lg text-muted-foreground leading-relaxed">
          Active in the Web3 ecosystem since 2022, I have extensive
          experience in blockchain technologies, DeFi protocols, and
          cryptocurrency trading algorithms. I'm particularly
          interested in applying AI to financial markets and building
          decentralized applications.
        </p>
      </div>
    </div>
  )
));
Web3Card.displayName = 'Web3Card';

// Optimized EducationCard with better mobile layout
const EducationCard = memo(React.forwardRef<HTMLDivElement, { glowProps: any }>(
  ({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-2xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-2xl p-4 xs:p-6 md:p-8 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-3 xs:gap-4 mb-6 xs:mb-8">
          <BookOpen className="w-5 h-5 xs:w-6 xs:h-6 text-foreground flex-shrink-0" />
          <h3 className="text-lg xs:text-xl md:text-2xl font-bold text-foreground">
            Education
          </h3>
        </div>

        <div className="space-y-6 xs:space-y-8">
          <div className="p-4 xs:p-6 rounded-xl border border-border bg-secondary">
            <div className="flex items-start gap-3 xs:gap-4 mb-4">
              <GraduationCap className="w-4 h-4 xs:w-5 xs:h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <h4 className="text-base xs:text-lg md:text-xl font-semibold text-foreground">
                  Binus University
                </h4>
                <p className="text-muted-foreground text-xs xs:text-sm">
                  Bachelor's in Information Technology
                </p>
                <p className="text-muted-foreground text-xs">
                  Aug 2023 – Expected 2027
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 xs:gap-4">
              <Star className="w-3 h-3 xs:w-4 xs:h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground text-xs xs:text-sm">
                GPA: 3.0/4.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 xs:gap-4">
            <div className="text-center p-3 xs:p-4 rounded-xl border border-border bg-secondary">
              <div className="text-xl xs:text-2xl font-bold text-foreground">
                5th
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Current Semester
              </div>
            </div>
            <div className="text-center p-3 xs:p-4 rounded-xl border border-border bg-secondary">
              <div className="text-xl xs:text-2xl font-bold text-foreground">
                3.0
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Current GPA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
));
EducationCard.displayName = 'EducationCard';

// Optimized QuoteBadge with better responsive text
const QuoteBadge = memo(() => (
  <div className="text-center mt-12 xs:mt-16">
    <div className="inline-flex items-center gap-2 px-4 xs:px-6 py-2 xs:py-3 bg-secondary border border-border rounded-full max-w-[90vw]">
      <span className="text-foreground text-sm xs:text-base text-center">
        "Building the future, one line of code at a time"
      </span>
    </div>
  </div>
));
QuoteBadge.displayName = 'QuoteBadge';

// Memoized background layers to prevent re-renders
const BackgroundLayers = memo(() => (
  <>
    <div className="absolute inset-0 -z-20 bg-background" />
    <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(1200px_600px_at_60%_-10%,hsl(var(--primary)/0.1),transparent_60%)]" />
    <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(800px_500px_at_20%_110%,hsl(var(--primary)/0.08),transparent_60%)]" />
  </>
));
BackgroundLayers.displayName = 'BackgroundLayers';

const About: React.FC = () => {
  // All glow effects preserved exactly as original
  const {
    ref: glow1Ref,
    glowProps: glow1Props,
    glowCSS,
  } = useGlowEffectHook({ glowColor: "blue" });
  const { ref: glow2Ref, glowProps: glow2Props } = useGlowEffectHook({
    glowColor: "blue",
  });
  const { ref: glow3Ref, glowProps: glow3Props } = useGlowEffectHook({
    glowColor: "blue",
  });

  return (
    <section
      id="about"
      className="py-2 xs:py-12 sm:py-16 md:py-20 lg:py- relative overflow-hidden isolate"
    >
      <style dangerouslySetInnerHTML={{ __html: glowCSS }} />

      <BackgroundLayers />
      <TextJalan/>
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 items-start">
            <div className="space-y-4 xs:space-y-6 sm:space-y-8 w-full">
              <IntroductionCard ref={glow1Ref} glowProps={glow1Props} />
              <Web3Card ref={glow2Ref} glowProps={glow2Props} />
            </div>

            <div className="w-full">
              <EducationCard ref={glow3Ref} glowProps={glow3Props} />
            </div>
          </div>
        </div>

        <QuoteBadge />
      </div>
    </section>
  );
};

export default memo(About);