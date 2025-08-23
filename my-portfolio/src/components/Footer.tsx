import React from "react";
import { Zap, ChevronUp } from "lucide-react";

interface FooterProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeSection, scrollToSection }) => {
  return (
    <>
      <footer className="py-12 border-t border-[rgb(var(--fg)/0.3)] bg-[rgb(var(--bg))] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--brand)/0.05),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[rgb(var(--brand)/0.2)] rounded-xl shadow-lg">
                  <Zap className="w-5 h-5 text-[rgb(var(--fg))]" />
                </div>
                <div>
                  <p className="text-[rgb(var(--fg))] font-medium">Deliko Hartono</p>
                  <p className="text-[rgb(var(--fg)/0.7)] text-sm">Full Stack Developer</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[rgb(var(--brand))] rounded-full animate-pulse" />
                  <span className="text-[rgb(var(--fg)/0.7)] text-sm">Available for opportunities</span>
                </div>
                <div className="hidden md:block w-px h-4 bg-[rgb(var(--fg)/0.3)]" />
              </div>
            </div>
            <div className="pt-6 border-t border-[rgb(var(--fg)/0.2)]">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[rgb(var(--fg)/0.6)] text-sm">
                  © 2025 Deliko Hartono. Crafted with passion and innovation.
                </p>
                <div className="flex items-center gap-2 text-[rgb(var(--fg)/0.6)] text-sm">
                  <span>Jakarta, Indonesia</span>
                  <div className="w-1 h-1 bg-[rgb(var(--fg)/0.5)] rounded-full" />
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button
        onClick={() => scrollToSection("home")}
        className={`fixed bottom-8 right-8 p-3 bg-[rgb(var(--brand)/0.2)] rounded-xl shadow-lg transition-all duration-300 z-40 border border-[rgb(var(--fg)/0.3)] hover:border-[rgb(var(--fg)/0.6)] ${
          activeSection !== "home" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } hover:scale-110 hover:shadow-xl hover:shadow-[rgb(var(--bg)/0.3)] group`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-[rgb(var(--fg))] group-hover:animate-bounce transition-all duration-300" />
      </button>
    </>
  );
};

export default Footer;
