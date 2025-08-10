import React from "react";
import { Zap, ChevronUp } from "lucide-react";

interface FooterProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeSection, scrollToSection }) => {
  return (
    <>
      {/* Compact Footer */}
      <footer className="py-12 border-t border-slate-700/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Deliko Hartono</p>
                  <p className="text-slate-400 text-sm">Full Stack Developer</p>
                </div>
              </div>

              {/* Status & Tech Stack */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-slate-400 text-sm">Available for opportunities</span>
                </div>
                <div className="hidden md:block w-px h-4 bg-slate-600" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-6 border-t border-slate-700/50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">
                  © 2025 Deliko Hartono. Crafted with passion and innovation.
                </p>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <span>Jakarta, Indonesia</span>
                  <div className="w-1 h-1 bg-slate-500 rounded-full" />
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={() => scrollToSection("home")}
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl shadow-lg transition-all duration-300 z-40 border border-slate-600/30 hover:border-slate-500/50 ${
          activeSection !== "home" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } hover:scale-110 hover:shadow-xl hover:shadow-slate-900/20 group`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-white group-hover:animate-bounce transition-all duration-300" />
      </button>
    </>
  );
};

export default Footer;