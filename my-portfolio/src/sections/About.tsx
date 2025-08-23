import React, { memo } from "react";
import { BookOpen, Star, User, GraduationCap, Code2 } from "lucide-react";
import { useGlowEffect as useGlowEffectHook } from "@/components/GlowEffect";

// Memoized sub-components to prevent unnecessary re-renders
const ProfileBadge = memo(() => (
  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary border border-border rounded-full mb-4 sm:mb-6">
    <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
    <span className="text-xs sm:text-sm font-medium text-foreground">
      Personal Profile
    </span>
  </div>
));
ProfileBadge.displayName = 'ProfileBadge';

const IntroductionCard = memo(React.forwardRef<HTMLDivElement, { glowProps: any }>(
  ({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-2xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-2xl p-6 md:p-8 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 mb-6">
          <User className="w-6 h-6 text-foreground" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Introduction
          </h3>
        </div>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
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

const Web3Card = memo(React.forwardRef<HTMLDivElement, { glowProps: any }>(
  ({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-2xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-2xl p-6 md:p-8 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 mb-6">
          <Code2 className="w-6 h-6 text-foreground" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Web3 Journey
          </h3>
        </div>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
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

const EducationCard = memo(React.forwardRef<HTMLDivElement, { glowProps: any }>(
  ({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-2xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-2xl p-6 md:p-8 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 mb-8">
          <BookOpen className="w-6 h-6 text-foreground" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Education
          </h3>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-xl border border-border bg-secondary">
            <div className="flex items-start gap-4 mb-4">
              <GraduationCap className="w-5 h-5 text-foreground" />
              <div>
                <h4 className="text-xl font-semibold text-foreground">
                  Binus University
                </h4>
                <p className="text-muted-foreground text-sm">
                  Bachelor's in Information Technology
                </p>
                <p className="text-muted-foreground text-xs">
                  Aug 2023 – Expected 2027
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground text-sm">
                GPA: 3.0/4.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl border border-border bg-secondary">
              <div className="text-2xl font-bold text-foreground">
                5th
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Current Semester
              </div>
            </div>
            <div className="text-center p-4 rounded-xl border border-border bg-secondary">
              <div className="text-2xl font-bold text-foreground">
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

const QuoteBadge = memo(() => (
  <div className="text-center mt-16">
    <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-full">
      <span className="text-foreground text-base">
        "Building the future, one line of code at a time"
      </span>
    </div>
  </div>
));
QuoteBadge.displayName = 'QuoteBadge';

// Static background layers memoized to prevent re-creation
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
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden isolate"
    >
      <style dangerouslySetInnerHTML={{ __html: glowCSS }} />

      <BackgroundLayers />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <ProfileBadge />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Passionate about bridging technology and finance through innovative
            solutions
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            <div className="space-y-6 sm:space-y-8">
              <IntroductionCard ref={glow1Ref} glowProps={glow1Props} />
              <Web3Card ref={glow2Ref} glowProps={glow2Props} />
            </div>

            <EducationCard ref={glow3Ref} glowProps={glow3Props} />
          </div>
        </div>

        <QuoteBadge />
      </div>
    </section>
  );
};

export default memo(About);