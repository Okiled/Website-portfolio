import React, { useMemo, useCallback } from 'react';
import { ArrowRight, Calendar, Briefcase } from 'lucide-react';
import { RevealWrapper, TextReveal, StaggeredReveal } from '../animations/RevealAnimations';
import { experiences } from '../utils/data';

type ExpItem = (typeof experiences)[number];

const ExperienceItem = React.memo(function ExperienceItem({
  exp,
  index,
}: {
  exp: ExpItem;
  index: number;
}) {
  const itemConfig = useMemo(() => {
    const left = index % 2 === 0;
    return {
      isLeft: left,
      pointsFirst: exp.points[0],
      pointsRest: exp.points.slice(1, 4),
      delayBase: 500 + index * 100,
      iconDelay: 600 + index * 100,
      badgeDelay: 650 + index * 100,
      listBaseDelay: 700 + index * 100,
    };
  }, [exp.points, index]);

  const renderContent = useCallback((isMobile = false) => {
    const IconComponent = exp.icon;
    
    return (
      <div className={`group relative bg-surface/95 backdrop-blur-xl border border-primary/20 rounded-2xl transition-all duration-500 hover:bg-surface hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 will-change-transform ${isMobile ? 'p-6' : 'p-8 hover:-translate-y-1'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className={`flex items-start justify-between gap-4 ${isMobile ? 'mb-5' : 'mb-6'}`}>
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <RevealWrapper
                animation="rotateIn"
                delay={itemConfig.iconDelay}
                className="relative p-3 bg-gradient-to-br from-primary via-primary to-accent rounded-xl shadow-lg flex-shrink-0 group-hover:shadow-primary/25 transition-shadow duration-300"
                triggerOnce={false}
                threshold={0.25}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                <IconComponent className={`text-white relative z-10 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
              </RevealWrapper>

              <div className="min-w-0 flex-1">
                <h3 className={`font-bold text-content group-hover:text-primary transition-colors duration-300 ${isMobile ? 'text-xl mb-1 break-words' : 'text-2xl mb-2'}`}>
                  {exp.title}
                </h3>
                <p className={`text-content/70 font-medium ${isMobile ? 'text-sm break-words' : 'text-base'}`}>
                  {exp.company}
                </p>
              </div>
            </div>
          </div>

          <RevealWrapper animation="fadeIn" delay={itemConfig.badgeDelay} triggerOnce={false} threshold={0.25}>
            <div className={`flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/25 rounded-xl backdrop-blur-sm w-fit ${isMobile ? 'px-3 py-2 mb-5' : 'px-4 py-2 mb-6'}`}>
              <Calendar className={`text-primary ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span className={`font-semibold text-primary ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {exp.period}
              </span>
            </div>
          </RevealWrapper>

          <div className={isMobile ? 'mb-5' : 'mb-6'}>
            <p className={`text-content/80 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
              {itemConfig.pointsFirst}
            </p>
          </div>

          <div className={isMobile ? 'space-y-2' : 'space-y-3'}>
            <h4 className={`font-bold text-content/90 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
              <ArrowRight className={`text-primary ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              Key Achievements
            </h4>
            <StaggeredReveal
              staggerDelay={40}
              animation="fadeIn"
              baseDelay={itemConfig.listBaseDelay}
              className={isMobile ? 'space-y-1' : 'space-y-2'}
              triggerOnce={false}
              threshold={0.25}
            >
              {itemConfig.pointsRest.map((point, pointIndex) => (
                <div 
                  key={pointIndex} 
                  className={`text-content/75 leading-relaxed relative ${isMobile ? 'text-xs pl-5' : 'text-sm pl-6'}`}
                >
                  <div className="absolute left-2 top-2 w-1 h-1 bg-primary rounded-full" />
                  {point}
                </div>
              ))}
            </StaggeredReveal>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
      </div>
    );
  }, [exp.icon, exp.title, exp.company, exp.period, itemConfig]);

  const timelineNode = useMemo(() => {
    const baseClasses = "absolute z-20";
    const nodeClasses = "relative bg-gradient-to-br from-primary via-primary to-accent rounded-full border-4 border-surface transition-all duration-300";
    const glowClasses = "absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-25 scale-150";
    const highlightClasses = "absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full";
    
    return {
      desktop: (
        <div className={`hidden lg:block ${baseClasses} left-1/2 top-8 transform -translate-x-1/2`}>
          <div className="relative">
            <div className={glowClasses} />
            <div className={`${nodeClasses} w-6 h-6 shadow-2xl shadow-primary/30 hover:scale-125 hover:shadow-primary/50`}>
              <div className={highlightClasses} />
            </div>
          </div>
        </div>
      ),
      mobile: (
        <div className={`lg:hidden ${baseClasses} left-0 top-8 transform`}>
          <div className="relative">
            <div className={glowClasses} />
            <div className={`${nodeClasses} w-5 h-5 border-3 shadow-xl shadow-primary/30`}>
              <div className={highlightClasses} />
            </div>
          </div>
        </div>
      )
    };
  }, []);

  return (
    <div className="relative">
      {/* Desktop Layout */}
      <RevealWrapper
        animation={itemConfig.isLeft ? 'slideRight' : 'slideLeft'}
        delay={itemConfig.delayBase}
        className={`hidden lg:flex items-center ${itemConfig.isLeft ? 'justify-start' : 'justify-end'}`}
        triggerOnce={false}
        threshold={0.25}
      >
        <div className={`w-[45%] ${itemConfig.isLeft ? 'pr-12' : 'pl-12'}`}>
          {renderContent(false)}
        </div>
      </RevealWrapper>

      {/* Mobile Layout */}
      <RevealWrapper
        animation="slideRight"
        delay={itemConfig.delayBase}
        className="lg:hidden flex items-start gap-6"
        triggerOnce={false}
        threshold={0.25}
      >
        <div className="flex-1 min-w-0 ml-8">
          {renderContent(true)}
        </div>
      </RevealWrapper>

      {timelineNode.desktop}
      {timelineNode.mobile}
    </div>
  );
});

ExperienceItem.displayName = 'ExperienceItem';

const TimelineLine = React.memo(function TimelineLine({ delay }: { delay: number }) {
  const lineStyles = useMemo(() => ({
    desktop: "hidden lg:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 z-10",
    mobile: "lg:hidden absolute left-[10px] top-0 bottom-0 w-[2px] z-10"
  }), []);

  const LineContent = useCallback(() => (
    <div className="w-full h-full bg-gradient-to-b from-primary/80 via-primary/60 to-accent/80 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-primary/30">
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
    </div>
  ), []);

  return (
    <>
      <RevealWrapper
        animation="scaleIn"
        delay={delay}
        className={lineStyles.desktop}
        style={{ transformOrigin: 'top' }}
        triggerOnce={false}
        threshold={0.2}
      >
        <LineContent />
      </RevealWrapper>

      <RevealWrapper
        animation="scaleIn"
        delay={delay}
        className={lineStyles.mobile}
        style={{ transformOrigin: 'top' }}
        triggerOnce={false}
        threshold={0.2}
      >
        <LineContent />
      </RevealWrapper>
    </>
  );
});

TimelineLine.displayName = 'TimelineLine';

const EndPoint = React.memo(function EndPoint({ delay }: { delay: number }) {
  return (
    <RevealWrapper
      animation="scaleIn"
      delay={delay}
      className="flex justify-center lg:justify-center mt-16 lg:mt-20"
      triggerOnce={false}
      threshold={0.3}
    >
      <div className="relative lg:ml-0 -ml-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-25 scale-150" />
        <div className="relative w-12 h-12 bg-gradient-to-br from-primary via-primary to-accent rounded-full border-4 border-surface shadow-2xl shadow-primary/50 flex items-center justify-center">
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
          <div className="relative w-4 h-4 bg-surface rounded-full flex items-center justify-center z-10">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-sm text-primary font-bold">Present</span>
        </div>
      </div>
    </RevealWrapper>
  );
});

EndPoint.displayName = 'EndPoint';

const Experience: React.FC = React.memo(function Experience() {
  const { endDelay, headerDelay } = useMemo(() => ({
    endDelay: 600 + experiences.length * 100,
    headerDelay: 100
  }), []);

  const experienceItems = useMemo(() => 
    experiences.map((exp, index) => (
      <ExperienceItem key={`${exp.title}-${index}`} exp={exp} index={index} />
    )), 
  []);

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealWrapper
          animation="fadeIn"
          delay={headerDelay}
          className="text-center mb-12 sm:mb-16"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl border border-primary/25 rounded-2xl mb-6 shadow-lg">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-content mb-4">
            <TextReveal text="Professional Journey" speed={80} triggerOnce={false} threshold={0.3} />
          </h2>

          <RevealWrapper animation="slideUp" delay={300} triggerOnce={false} threshold={0.3}>
            <p className="text-content/70 max-w-2xl mx-auto text-lg px-4">
              Key milestones and achievements throughout my career
            </p>
          </RevealWrapper>
        </RevealWrapper>

        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <TimelineLine delay={400} />

            <div className="space-y-16 lg:space-y-20">
              {experienceItems}
            </div>

            <EndPoint delay={endDelay} />
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;