import React, { memo } from "react";
import { BookOpen, Star, User, GraduationCap, Code2 } from "lucide-react";
import { useGlowEffect as useGlowEffectHook } from "@/components/GlowEffect";
import TextJalan from "@/animations/TextJalan";

const ProfileBadge = memo(() => (
  <div className="inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 bg-secondary border border-border rounded-full mb-5 sm:mb-7">
    <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
    <span className="text-sm sm:text-base font-semibold text-foreground whitespace-nowrap">
      Personal Profile
    </span>
  </div>
));
ProfileBadge.displayName = "ProfileBadge";

const IntroductionCard = memo(
  React.forwardRef<HTMLDivElement, { glowProps: any }>(({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-3xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-7">
          <User className="w-6 h-6 sm:w-7 sm:h-7 text-foreground flex-shrink-0" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            About Me
          </h3>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Information Technology student specializing in{" "}
          <span className="text-foreground font-semibold">machine learning</span>{" "}
          and{" "}
          <span className="text-foreground font-semibold">full-stack development</span>.
          Hands-on experience building{" "}
          <span className="text-foreground font-semibold">
            AI-driven trading systems
          </span>{" "}
          (LSTM, PPO, Black–Litterman optimization) and contributing to{" "}
          <span className="text-foreground font-semibold">
            secure fintech marketplace platforms
          </span>{" "}
          (JWT/RBAC, Midtrans integration, real-time features) in professional Agile
          environments. Focused on delivering{" "}
          <span className="text-foreground font-semibold">reliable, well-documented</span>{" "}
          solutions with{" "}
          <span className="text-foreground font-semibold">measurable impact</span> that meet
          current industry standards.
        </p>
      </div>
    </div>
  ))
);
IntroductionCard.displayName = "IntroductionCard";

const Web3JourneyCard = memo(
  React.forwardRef<HTMLDivElement, { glowProps: any }>(({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-3xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-7">
          <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-foreground flex-shrink-0" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Web3 Journey
          </h3>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Active in the Web3 ecosystem since 2022, I have extensive experience in blockchain technologies, DeFi protocols, and cryptocurrency trading algorithms. I'm particularly interested in applying AI to financial markets and building decentralized applications.
        </p>
      </div>
    </div>
  ))
);
Web3JourneyCard.displayName = "Web3JourneyCard";

const FocusImpactCard = memo(
  React.forwardRef<HTMLDivElement, { glowProps: any }>(({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-3xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-7">
          <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-foreground flex-shrink-0" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Focus & Impact
          </h3>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
          Committed to building solutions that combine technical excellence with real-world impact. My work focuses on:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">AI & Machine Learning</h4>
            <p className="text-sm text-muted-foreground">
              Developing intelligent systems for financial analysis, trading strategies, and predictive modeling using modern ML frameworks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-secondary border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Full-Stack Development</h4>
            <p className="text-sm text-muted-foreground">
              Building secure, scalable applications with focus on user experience, performance optimization, and clean architecture.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-secondary border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Web3 & Blockchain</h4>
            <p className="text-sm text-muted-foreground">
              Exploring decentralized technologies, smart contracts, and the intersection of AI with blockchain ecosystems.
            </p>
          </div>
        </div>
      </div>
    </div>
  ))
);
FocusImpactCard.displayName = "FocusImpactCard";

const EducationCard = memo(
  React.forwardRef<HTMLDivElement, { glowProps: any }>(({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-3xl">
      <div className="glow-spots" />
      <div className="relative z-10 rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]">
        <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-foreground flex-shrink-0" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Education
          </h3>
        </div>

        <div className="space-y-7 sm:space-y-9">
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-secondary">
            <div className="flex items-start gap-4 sm:gap-5 mb-5">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-foreground flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                  Binus University
                </h4>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Bachelor's in Information Technology
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Aug 2023 – Present
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base">
                GPA: 3.07 / 4.0
              </span>
            </div>
          </div>

          <div className="text-center p-4 sm:p-5 rounded-2xl border border-border bg-secondary">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">5th Semester</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Currently Enrolled</div>
          </div>
        </div>
      </div>
    </div>
  ))
);
EducationCard.displayName = "EducationCard";

const QuoteBadge = memo(() => (
  <div className="text-center mt-12 sm:mt-16">
    <div className="inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-secondary border border-border rounded-full max-w-[90vw]">
      <span className="text-foreground text-sm sm:text-base">
        "Reliable, well-documented solutions with measurable impact."
      </span>
    </div>
  </div>
));
QuoteBadge.displayName = "QuoteBadge";

const BackgroundLayers = memo(() => (
  <>
    <div className="absolute inset-0 -z-20 bg-background" />
    <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(1400px_700px_at_60%_-10%,hsl(var(--primary)/0.1),transparent_60%)]" />
    <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(900px_600px_at_20%_110%,hsl(var(--primary)/0.08),transparent_60%)]" />
  </>
));
BackgroundLayers.displayName = "BackgroundLayers";

const About: React.FC = () => {
  const { ref: glow1Ref, glowProps: glow1Props, glowCSS } = useGlowEffectHook({
    glowColor: "blue",
  });
  const { ref: glow2Ref, glowProps: glow2Props } = useGlowEffectHook({
    glowColor: "blue",
  });
  const { ref: glow3Ref, glowProps: glow3Props } = useGlowEffectHook({
    glowColor: "blue",
  });

  return (
    <section
      id="about"
      className="py-6 xs:py-14 sm:py-20 lg:py-24 relative overflow-hidden isolate"
    >
      <style dangerouslySetInnerHTML={{ __html: glowCSS }} />
      <BackgroundLayers />
      <TextJalan />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="flex justify-center">
          <ProfileBadge />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12">
          <div className="space-y-6 sm:space-y-10 lg:space-y-12">
            <IntroductionCard ref={glow1Ref} glowProps={glow1Props} />
            <EducationCard ref={glow2Ref} glowProps={glow2Props} />
          </div>

          <div>
            <FocusImpactCard ref={glow3Ref} glowProps={glow3Props} />
          </div>
        </div>

        <QuoteBadge />
      </div>
    </section>
  );
};

export default memo(About);