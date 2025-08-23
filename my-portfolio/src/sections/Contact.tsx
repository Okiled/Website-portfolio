import React from "react";
import { Github, Linkedin, Mail, Globe, Zap, ArrowRight, Send } from "lucide-react";
import { RevealWrapper, TextReveal, StaggeredReveal } from "../animations/RevealAnimations";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgb(var(--primary)/0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(var(--accent)/0.04),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <RevealWrapper
          animation="fadeIn"
          delay={100}
          className="text-center mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/10 backdrop-blur-sm border border-borderc/20 rounded-full mb-6">
            <Send className="w-4 h-4 text-content/60" />
            <span className="text-sm font-medium text-content/70">Get In Touch</span>
          </div>

          <h2 className="text-5xl font-bold text-content mb-4">
            <TextReveal text="Let's Create Something Amazing" speed={60} triggerOnce={false} threshold={0.3} />
          </h2>

          <RevealWrapper animation="slideUp" delay={300} triggerOnce={false} threshold={0.3}>
            <p className="text-xl text-content/70 max-w-2xl mx-auto leading-relaxed">
              Ready to discuss your next project? Let's connect and build something extraordinary together
            </p>
          </RevealWrapper>
        </RevealWrapper>

        <div className="max-w-4xl mx-auto">
          <RevealWrapper
            animation="slideUp"
            delay={400}
            className="relative mb-12"
            triggerOnce={false}
            threshold={0.25}
          >
            <div className="group relative bg-surface/10 border border-borderc/20 rounded-2xl p-8 hover:bg-surface/15 hover:border-borderc/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[rgb(var(--primary)/0.15)]">
              <div className="flex items-center justify-center mb-6">
                <RevealWrapper
                  animation="rotateIn"
                  delay={500}
                  className="p-3 rounded-xl shadow-lg bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] group-hover:shadow-[rgb(var(--accent)/0.2)] transition-all duration-300"
                  triggerOnce={false}
                  threshold={0.25}
                >
                  <Mail className="w-6 h-6 text-surface" />
                </RevealWrapper>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-content group-hover:text-content/90 transition-colors duration-300 mb-4">
                  Ready to Start a Conversation?
                </h3>
                <p className="text-content/70 leading-relaxed group-hover:text-content/80 transition-colors duration-300">
                  Let's discuss how we can bring your ideas to life
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <StaggeredReveal
                    staggerDelay={60}
                    animation="slideUp"
                    baseDelay={600}
                    className="space-y-3"
                    triggerOnce={false}
                    threshold={0.25}
                  >
                    <div className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-surface/20 transition-all duration-300">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-content/60 group-hover/item:text-content/70 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-sm text-content/80 group-hover/item:text-content transition-colors duration-300">
                          hartonodeliko@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-surface/20 transition-all duration-300">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-content/60 group-hover/item:text-content/70 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-sm text-content/80 group-hover/item:text-content transition-colors duration-300">
                          Jakarta, Indonesia
                        </p>
                      </div>
                    </div>

                    <div className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-surface/20 transition-all duration-300">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-content/60 group-hover/item:text-content/70 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-sm text-content/70 group-hover/item:text-content/90 transition-colors duration-300">
                          Available for work
                        </p>
                      </div>
                    </div>
                  </StaggeredReveal>
                </div>

                <div className="text-center md:text-right space-y-6">
                  <RevealWrapper animation="slideUp" delay={700} triggerOnce={false} threshold={0.25}>
                    <a
                      href="mailto:hartonodeliko@gmail.com"
                      className="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-xl text-surface font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(var(--accent)/0.2)] bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))]"
                    >
                      <Mail className="w-4 h-4 group-hover/btn:animate-pulse" />
                      <span>Get In Touch</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </a>
                  </RevealWrapper>

                  <RevealWrapper animation="slideUp" delay={800} triggerOnce={false} threshold={0.25}>
                    <div className="flex justify-center md:justify-end gap-3">
                      <a
                        href="https://github.com/Okiled"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social p-3 bg-surface/20 backdrop-blur-sm border border-borderc/30 rounded-lg hover:bg-surface/30 hover:border-borderc/40 transition-all duration-300 hover:scale-105"
                      >
                        <Github className="w-5 h-5 text-content/70 group-hover/social:text-content/80 transition-colors duration-300" />
                      </a>
                      <a
                        href="https://linkedin.com/in/deliko-hartono"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social p-3 bg-surface/20 backdrop-blur-sm border border-borderc/30 rounded-lg hover:bg-surface/30 hover:border-borderc/40 transition-all duration-300 hover:scale-105"
                      >
                        <Linkedin className="w-5 h-5 text-content/70 group-hover/social:text-content/80 transition-colors duration-300" />
                      </a>
                    </div>
                  </RevealWrapper>
                </div>
              </div>

              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent)/0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgb(var(--primary)/0.05)] to-[rgb(var(--accent)/0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </RevealWrapper>
        </div>

        <RevealWrapper animation="fadeIn" delay={900} className="text-center mt-20" triggerOnce={false} threshold={0.3}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-surface/10 backdrop-blur-sm border border-borderc/20 rounded-full">
            <span className="text-content/70">Ready for the next challenge</span>
            <ArrowRight className="w-4 h-4 text-content/60" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Contact;
