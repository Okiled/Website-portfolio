import React from 'react';
import { ArrowRight } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';
import { experiences } from '../data';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Experience Timeline
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />
            
            {experiences.map((exp, index) => (
              <FloatingCard key={exp.title} delay={index * 200}>
                <div className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full border-4 border-slate-900 z-10" />
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group">
                      <div className="flex items-center mb-6">
                        <div className={`p-3 bg-${exp.color}-400/10 rounded-lg group-hover:bg-${exp.color}-400/20 transition-all duration-300 mr-4`}>
                          <exp.icon className={`w-6 h-6 text-${exp.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{exp.title}</h3>
                          <p className={`text-${exp.color}-400`}>{exp.company}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-white/60 text-sm bg-white/5 px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      
                      <ul className="space-y-3">
                        {exp.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start text-white/80 hover:text-white transition-colors duration-300">
                            <ArrowRight className="w-4 h-4 mt-1 mr-3 text-cyan-400 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;