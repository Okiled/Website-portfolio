import React from 'react';
import FloatingCard from '../components/FloatingCard';
import { skills } from '../data';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring innovative ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skills.map((skill, index) => {
            const color = skill.color || 'cyan';

            return (
              <FloatingCard key={skill.title} delay={index * 100}>
                <div
                  className={`
                    group relative bg-gradient-to-br from-${color}-400/10 to-${color}-600/10
                    backdrop-blur-xl border border-white/10 rounded-3xl p-8
                    hover:border-${color}-400/30 transition-all duration-500
                    transform hover:scale-[1.02] hover:-translate-y-2
                    cursor-pointer overflow-hidden
                  `.replace(/\s+/g, ' ')}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`
                        relative w-20 h-20 rounded-2xl bg-gradient-to-br from-${color}-400/20 to-${color}-600/20
                        border border-${color}-400/30 flex items-center justify-center
                        group-hover:shadow-lg group-hover:shadow-${color}-400/25
                        transition-all duration-500 group-hover:scale-110
                      `.replace(/\s+/g, ' ')}>
                        <skill.icon className={`w-10 h-10 text-${color}-400 group-hover:text-${color}-300 transition-all duration-500`} />
                        <div className={`absolute inset-0 rounded-2xl bg-${color}-400/0 group-hover:bg-${color}-400/10 transition-all duration-500 blur-xl`} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold text-center mb-4 text-${color}-400`}>
                      {skill.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {skill.skills.map(s => (
                        <span key={s} className="px-3 py-1 bg-white/10 rounded text-xs text-white/80">{s}</span>
                      ))}
                    </div>

                    <p className="text-white/70 text-center text-base min-h-[56px]">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </FloatingCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
