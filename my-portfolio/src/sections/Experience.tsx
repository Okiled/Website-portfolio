import React, { useMemo } from 'react';
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
  const { isLeft, pointsFirst, pointsRest, delayBase, iconDelay, badgeDelay, listBaseDelay } =
    useMemo(() => {
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
    }, [exp, index]);

  return (
    <RevealWrapper
      key={exp.title}
      animation={isLeft ? 'slideRight' : 'slideLeft'}
      delay={delayBase}
      className="relative"
      triggerOnce={false}
      threshold={0.25}
    >
      <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <div className={`w-6/12 ${isLeft ? 'pr-10' : 'pl-10'}`}>
          <div className="group relative bg-surface/90 backdrop-blur-sm border border-border/50 rounded-xl p-8 transition-all duration-300 hover:bg-surface hover:border-border/70 hover:shadow-2xl will-change-transform">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <RevealWrapper
                  animation="rotateIn"
                  delay={iconDelay}
                  className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg shadow-md flex-shrink-0"
                  triggerOnce={false}
                  threshold={0.25}
                >
                  <exp.icon className="w-5 h-5 text-white" />
                </RevealWrapper>

                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-bold text-content mb-1">{exp.title}</h3>
                  <p className="text-content/70 font-medium text-sm">{exp.company}</p>
                </div>
              </div>
            </div>

            <RevealWrapper animation="fadeIn" delay={badgeDelay} triggerOnce={false} threshold={0.25}>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/30 rounded-lg mb-4 w-fit">
                <Calendar className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">{exp.period}</span>
              </div>
            </RevealWrapper>

            <div className="mb-4">
              <p className="text-content/80 text-sm leading-relaxed">{pointsFirst}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-content/90 flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-content/60" />
                Key Achievements
              </h4>
              <StaggeredReveal
                staggerDelay={40}
                animation="fadeIn"
                baseDelay={listBaseDelay}
                className="space-y-1"
                triggerOnce={false}
                threshold={0.25}
              >
                {pointsRest.map((point, pointIndex) => (
                  <div key={`${exp.title}-${pointIndex}`} className="text-content/70 text-xs leading-relaxed pl-4">
                    • {point}
                  </div>
                ))}
              </StaggeredReveal>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 z-10">
          <div className="absolute inset-0 bg-primary/25 rounded-full animate-pulse" />
          <div className="w-6 h-6 bg-surface rounded-full border-[3px] border-primary shadow-lg transition-transform duration-300 hover:scale-110">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
});

const Experience: React.FC = React.memo(function Experience() {
  const endDelay = useMemo(() => 600 + experiences.length * 100, []);
  const headerDelay = 100;

  return (
    <section id="experience" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealWrapper
          animation="fadeIn"
          delay={headerDelay}
          className="text-center mb-12"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full mb-4 shadow-sm">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-content/80">Experience</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-content mb-3">
            <TextReveal text="Professional Journey" speed={80} triggerOnce={false} threshold={0.3} />
          </h2>

          <RevealWrapper animation="slideUp" delay={300} triggerOnce={false} threshold={0.3}>
            <p className="text-content/70 max-w-xl mx-auto">
              Key milestones and achievements throughout my career
            </p>
          </RevealWrapper>
        </RevealWrapper>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <RevealWrapper
              animation="scaleIn"
              delay={400}
              className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-accent shadow-[0_0_12px_rgba(0,0,0,0.6)]"
              style={{ transformOrigin: 'top' }}
              triggerOnce={false}
              threshold={0.2}
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <ExperienceItem key={exp.title} exp={exp} index={index} />
              ))}
            </div>

            <RevealWrapper
              animation="scaleIn"
              delay={endDelay}
              className="flex justify-center mt-12"
              triggerOnce={false}
              threshold={0.3}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 bg-surface rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs text-content/60 font-medium">Present</span>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Experience;
