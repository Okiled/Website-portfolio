import React from 'react';
import { BookOpen, Star } from 'lucide-react';
import FloatingCard from '../components/FloatingCard';

const About: React.FC = () => {
  const interests = [
    { text: 'AI & Machine Learning', color: 'cyan' },
    { text: 'Quantitative Finance', color: 'purple' },
    { text: 'Full-Stack Development', color: 'pink' },
    { text: 'Blockchain Technology', color: 'cyan' },
    { text: 'Data Science', color: 'purple' }
  ];

  return (
    <section id="about" className="py-20 bg-black/20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <FloatingCard>
              <p className="text-lg text-white/80 leading-relaxed">
                I'm an Information Technology student at Binus University with a passion for AI, quantitative finance, and full-stack development. Currently in my 5th semester with a focus on building innovative solutions that bridge technology and finance.
              </p>
            </FloatingCard>
            
            <FloatingCard delay={100}>
              <p className="text-lg text-white/80 leading-relaxed">
                Active in the Web3 ecosystem since 2022, I have extensive experience in blockchain technologies, DeFi protocols, and cryptocurrency trading algorithms. I'm particularly interested in applying AI to financial markets and building decentralized applications.
              </p>
            </FloatingCard>
            
            <div className="flex flex-wrap gap-4">
              {interests.map(({ text, color }, index) => (
                <FloatingCard key={text} delay={index * 50}>
                  <div className={`px-4 py-2 bg-${color}-400/10 border border-${color}-400/20 rounded-lg hover:bg-${color}-400/20 transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                    <span className={`text-${color}-400 font-medium`}>{text}</span>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
          
          <FloatingCard delay={200}>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              
              <div className="space-y-6">
                <div className="group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <h4 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 mb-2">Binus University</h4>
                  <p className="text-white/80 mb-1">Bachelor's in Information Technology</p>
                  <p className="text-white/60 mb-3">Aug 2023 – Expected 2027</p>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white/60">GPA: 3.0/4.0</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-cyan-400/10 rounded-xl">
                    <div className="text-2xl font-bold text-cyan-400">5th</div>
                    <div className="text-xs text-white/60">Current Semester</div>
                  </div>
                  <div className="text-center p-3 bg-purple-400/10 rounded-xl">
                    <div className="text-2xl font-bold text-purple-400">3.0</div>
                    <div className="text-xs text-white/60">Current GPA</div>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default About;