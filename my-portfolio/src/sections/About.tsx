import React, { memo } from "react";
import { User, GraduationCap, Code2 } from "lucide-react";
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

const AboutEducationCard = memo(
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

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-2">
          👋 I&apos;m Deliko, a{" "}
          <span className="font-semibold text-foreground">
            Computer Science undergraduate specializing in Software Engineering
          </span>{" "}
          at BINUS University and a{" "}
          <span className="font-semibold text-foreground">full-stack ML engineer</span> in
          training.
        </p>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
          I build{" "}
          <span className="font-semibold text-foreground">AI trading systems</span> with LSTM,
          PPO, and Black–Litterman, plus{" "}
          <span className="font-semibold text-foreground">
            secure, scalable web and API services
          </span>{" "}
          with real-time features, clear docs, and strong tests. I use{" "}
          <span className="font-semibold text-foreground">LLMs every day</span> to speed
          development and sharpen reviews.
        </p>


        <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-foreground flex-shrink-0" />
          <p className="font-medium text-foreground">
            BINUS University · Computer Science (Software Engineering) · Aug 2023 – Present
          </p>
        </div>
      </div>
    </div>
  ))
);
AboutEducationCard.displayName = "AboutEducationCard";

const FocusImpactCard = memo(
  React.forwardRef<HTMLDivElement, { glowProps: any }>(({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-3xl h-full">
      <div className="glow-spots" />
      <div className="relative z-10 h-full rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)] flex flex-col">
        <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-7">
          <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-foreground flex-shrink-0" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Focus & Impact
          </h3>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
          I care about solutions that combine technical depth with real-world impact. A
          few areas I&apos;m actively working on:
        </p>

        <div className="space-y-4">
          <div className="pl-4 border-l border-border">
            <h4 className="text-lg font-semibold text-foreground mb-1.5">
              AI & Machine Learning
            </h4>
            <p className="text-sm text-muted-foreground">
              Designing trading and forecasting systems with modern ML frameworks and
              clear evaluation metrics.
            </p>
          </div>

          <div className="pl-4 border-l border-border">
            <h4 className="text-lg font-semibold text-foreground mb-1.5">
              Full-Stack Engineering
            </h4>
            <p className="text-sm text-muted-foreground">
              Building secure, scalable backends and UIs with a focus on performance,
              clean architecture, and developer ergonomics.
            </p>
          </div>

          <div className="pl-4 border-l border-border">
            <h4 className="text-lg font-semibold text-foreground mb-1.5">
              Web3 & Infrastructure
            </h4>
            <p className="text-sm text-muted-foreground">
              Exploring how decentralized tech, smart contracts, and AI can work
              together in real products.
            </p>
          </div>
        </div>
      </div>
    </div>
  ))
);
FocusImpactCard.displayName = "FocusImpactCard";

const Web3JourneyCard = memo(
  React.forwardRef<HTMLDivElement, { glowProps: any }>(({ glowProps }, ref) => (
    <div ref={ref} {...glowProps} className="rounded-3xl h-full">
      <div className="glow-spots" />
      <div className="relative z-10 h-full rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)] flex flex-col">
        <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-7">
          <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-foreground flex-shrink-0" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Web3 Journey
          </h3>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          I&apos;ve been active in the Web3 ecosystem since 2022, experimenting with
          blockchain infrastructure, DeFi protocols, and crypto trading systems. I&apos;m
          especially interested in how{" "}
          <span className="font-semibold text-foreground">AI-driven tooling</span> can
          make on-chain products safer, faster, and easier to use.
        </p>
      </div>
    </div>
  ))
);
Web3JourneyCard.displayName = "Web3JourneyCard";

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
  const { ref: glowMainRef, glowProps: glowMainProps, glowCSS } = useGlowEffectHook({
    glowColor: "blue",
  });
  const { ref: glowFocusRef, glowProps: glowFocusProps } = useGlowEffectHook({
    glowColor: "blue",
  });
  const { ref: glowWeb3Ref, glowProps: glowWeb3Props } = useGlowEffectHook({
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

        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
          <AboutEducationCard ref={glowMainRef} glowProps={glowMainProps} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            <FocusImpactCard ref={glowFocusRef} glowProps={glowFocusProps} />
            <Web3JourneyCard ref={glowWeb3Ref} glowProps={glowWeb3Props} />
          </div>
        </div>

        <QuoteBadge />
      </div>
    </section>
  );
};

export default memo(About);
