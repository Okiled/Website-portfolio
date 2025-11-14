import React from "react";
import { Github, Linkedin, Mail, Globe, Zap, ArrowRight, Send } from "lucide-react";
import { RevealWrapper, TextReveal, StaggeredReveal } from "../animations/RevealAnimations";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background using Tailwind's built-in CSS variable classes */}
      <div className="absolute inset-0 bg-primary/5" aria-hidden />

      <div className="container mx-auto px-6 relative z-10">
        <RevealWrapper
          animation="fadeIn"
          delay={100}
          className="text-center mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full mb-6">
            <Send className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Get In Touch</span>
          </div>

          <h2 className="text-5xl font-bold text-foreground mb-4">
            <TextReveal text="Let's Create Something Amazing" speed={60} triggerOnce={false} threshold={0.3} />
          </h2>

          <RevealWrapper animation="slideUp" delay={300} triggerOnce={false} threshold={0.3}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
            <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:bg-secondary">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 rounded-xl bg-primary shadow-sm">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start a Conversation?</h3>
                <p className="text-muted-foreground">Let's discuss how we can bring your ideas to life</p>
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
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary border border-border hover:bg-primary/10 transition-colors duration-200">
                      <Mail className="w-4 h-4 text-primary" />
                      <p className="text-sm text-foreground">hartonodeliko@gmail.com</p>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary border border-border hover:bg-primary/10 transition-colors duration-200">
                      <Globe className="w-4 h-4 text-primary" />
                      <p className="text-sm text-foreground">Jakarta, Indonesia</p>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary border border-border hover:bg-primary/10 transition-colors duration-200">
                      <Zap className="w-4 h-4 text-primary" />
                      <p className="text-sm text-foreground font-medium">Available for work</p>
                    </div>
                  </StaggeredReveal>
                </div>

                <div className="text-center md:text-right space-y-6">
                  <RevealWrapper animation="slideUp" delay={700} triggerOnce={false} threshold={0.25}>
                    <a
                      href="mailto:hartonodeliko@gmail.com"
                      className="inline-flex items-center mb-12 gap-1 px-6 py-2 rounded-xl font-medium bg-primary text-primary-foreground transition-transform duration-200 hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                      <span >Get In Touch</span>
                    </a>
                  </RevealWrapper>

                  <RevealWrapper animation="slideUp" delay={800} triggerOnce={false} threshold={0.25}>
                    <div className="flex justify-center md:justify-end gap-3">
                      <a
                        href="https://github.com/Okiled"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary border border-border rounded-lg hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                      >
                        <Github className="w-5 h-5 text-foreground" />
                      </a>
                      <a
                        href="https://linkedin.com/in/deliko-hartono"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary border border-border rounded-lg hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                      >
                        <Linkedin className="w-5 h-5 text-foreground" />
                      </a>
                    </div>
                  </RevealWrapper>
                </div>
              </div>

              <div className="mt-8 h-px bg-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </RevealWrapper>
        </div>

        <RevealWrapper animation="fadeIn" delay={900} className="text-center mt-20" triggerOnce={false} threshold={0.3}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-full">
            <span className="text-muted-foreground">Ready for the next challenge</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Contact;