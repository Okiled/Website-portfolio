import React from "react";
import { Zap, ChevronUp } from "lucide-react";

interface FooterProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeSection, scrollToSection }) => {
  return (
    <>
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <p className="text-white/60">
                © 2025 Deliko Hartono. Crafted with passion and innovation.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/40 text-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span>Available for opportunities</span>
              </div>
              <div className="text-white/40 text-sm">
                Made with React + Tailwind CSS
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Scroll to top button */}
      <button
        onClick={() => scrollToSection("home")}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/25 transition-all duration-300 z-40 ${
          activeSection !== "home" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } hover:scale-110 hover:shadow-2xl group`}
        aria-label="Scroll to top"
      >
        <ChevronUp
          className="w-6 h-6 text-white group-hover:animate-shimmer"
        />
        <style>
          {`
          @keyframes shimmer {
            0% { filter: brightness(1); }
            50% { filter: brightness(2) drop-shadow(0 0 6px #a78bfa); }
            100% { filter: brightness(1); }
          }
          .animate-shimmer {
            animation: shimmer 1s infinite;
          }
          `}
        </style>
      </button>
    </>
  );
};

export default Footer;
