import React from "react";
import { Github, Linkedin, Mail, Globe, Zap, ArrowRight, Send } from "lucide-react";
import FloatingCard from "../components/FloatingCard";
import { RevealWrapper, TextReveal, StaggeredReveal } from "../components/RevealAnimations";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Elements - Matching Experience Style */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.02),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Same Style as Experience */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={100} 
          className="text-center mb-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <Send className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-400">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4">
            <TextReveal 
              text="Let's Create Something Amazing" 
              speed={60} 
              triggerOnce={false}
              threshold={0.3}
            />
          </h2>
          
          <RevealWrapper 
            animation="slideUp" 
            delay={300}
            triggerOnce={false}
            threshold={0.3}
          >
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Ready to discuss your next project? Let's connect and build something extraordinary together
            </p>
          </RevealWrapper>
        </RevealWrapper>

        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card - Compact Version */}
          <RevealWrapper
            animation="slideUp"
            delay={400}
            className="relative mb-12"
            triggerOnce={false}
            threshold={0.25}
          >
            <FloatingCard delay={0}>
              <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20">
                
                {/* Icon Header */}
                <div className="flex items-center justify-center mb-6">
                  <RevealWrapper 
                    animation="rotateIn" 
                    delay={500}
                    className="p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl shadow-lg group-hover:shadow-slate-600/20 transition-all duration-300"
                    triggerOnce={false}
                    threshold={0.25}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </RevealWrapper>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white group-hover:text-slate-200 transition-colors duration-300 mb-4">
                    Ready to Start a Conversation?
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Let's discuss how we can bring your ideas to life
                  </p>
                </div>

                {/* Contact Info & CTA in One Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Contact Details */}
                  <div className="space-y-4">
                    <StaggeredReveal
                      staggerDelay={60}
                      animation="slideUp"
                      baseDelay={600}
                      className="space-y-3"
                      triggerOnce={false}
                      threshold={0.25}
                    >
                      <div className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-slate-500 group-hover/item:text-slate-400 transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-slate-300 group-hover/item:text-slate-200 transition-colors duration-300 text-sm">
                            hartonodeliko@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-slate-500 group-hover/item:text-slate-400 transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-slate-300 group-hover/item:text-slate-200 transition-colors duration-300 text-sm">
                            Jakarta, Indonesia
                          </p>
                        </div>
                      </div>

                      <div className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-slate-500 group-hover/item:text-slate-400 transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-slate-300 group-hover/item:text-slate-200 transition-colors duration-300 text-sm">
                            Available for work
                          </p>
                        </div>
                      </div>
                    </StaggeredReveal>
                  </div>

                  {/* CTA & Social Links */}
                  <div className="text-center md:text-right space-y-6">
                    {/* Main CTA Button */}
                    <RevealWrapper 
                      animation="slideUp" 
                      delay={700}
                      triggerOnce={false}
                      threshold={0.25}
                    >
                      <a
                        href="mailto:hartonodeliko@gmail.com"
                        className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl text-white font-medium hover:from-slate-600 hover:to-slate-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-600/20"
                      >
                        <Mail className="w-4 h-4 group-hover/btn:animate-pulse" />
                        <span>Get In Touch</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </RevealWrapper>

                    {/* Social Links */}
                    <RevealWrapper 
                      animation="slideUp" 
                      delay={800}
                      triggerOnce={false}
                      threshold={0.25}
                    >
                      <div className="flex justify-center md:justify-end gap-3">
                        <a
                          href="https://github.com/Okiled"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social p-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-lg hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
                        >
                          <Github className="w-5 h-5 text-slate-400 group-hover/social:text-slate-300 transition-colors duration-300" />
                        </a>
                        <a
                          href="https://linkedin.com/in/deliko-hartono"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social p-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-lg hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
                        >
                          <Linkedin className="w-5 h-5 text-slate-400 group-hover/social:text-slate-300 transition-colors duration-300" />
                        </a>
                      </div>
                    </RevealWrapper>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-600/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </FloatingCard>
          </RevealWrapper>
        </div>

        {/* Bottom CTA Section */}
        <RevealWrapper 
          animation="fadeIn" 
          delay={900}
          className="text-center mt-20"
          triggerOnce={false}
          threshold={0.3}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-full">
            <span className="text-slate-400">Ready for the next challenge</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Contact;