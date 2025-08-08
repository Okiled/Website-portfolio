import React from "react";
import FloatingCard from "../components/FloatingCard";
import { Github, Linkedin, Mail, Globe, Zap, ArrowRight } from "lucide-react";
import { skills } from "../data";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-black/20 relative">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Let's Create Something Amazing
        </h2>
        <p className="text-white/60 text-lg mb-16 max-w-2xl mx-auto">
          Ready to discuss your next project? I'm always interested in innovative collaborations and exciting opportunities.
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Main Contact Button */}
          <FloatingCard>
            <div className="flex justify-center mb-12">
              <a
                href="mailto:hartonodeliko@gmail.com"
                className="group flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <Mail size={24} className="text-white group-hover:animate-bounce" />
                <span className="text-white font-semibold text-lg">Get In Touch</span>
                <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </FloatingCard>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: Github, href: "https://github.com/Okiled", label: "GitHub", color: "hover:bg-gray-600" },
              { icon: Linkedin, href: "https://linkedin.com/in/deliko-hartono", label: "LinkedIn", color: "hover:bg-blue-600" }
            ].map(({ icon: Icon, href, label, color }) => (
              <FloatingCard key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 bg-white/10 rounded-full hover:bg-white/20 ${color} transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/10`}
                  aria-label={label}
                >
                  <Icon size={28} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
                </a>
              </FloatingCard>
            ))}
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", value: "hartonodeliko@gmail.com", color: "cyan" },
              { icon: Globe, label: "Location", value: "Jakarta, Indonesia", color: "purple" },
              { icon: Zap, label: "Status", value: "Available for work", color: "pink" }
            ].map(({ icon: Icon, label, value, color }) => (
              <FloatingCard key={label}>
                <div className={`p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-${color}-400/10 hover:border-${color}-400/20 transition-all duration-300 group`}>
                  <div className={`w-12 h-12 bg-${color}-400/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${color}-400/20 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                  </div>
                  <h3 className="text-white font-medium mb-2">{label}</h3>
                  <p className="text-white/60 text-sm">{value}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
