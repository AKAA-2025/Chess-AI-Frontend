import { useState, useEffect } from 'react';
import { Brain, Zap, Target } from 'lucide-react';
import { Navbar } from '@/shared/components';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();

  const features = [
    { icon: <Brain className="w-6 h-6" />, title: "Neural Network", desc: "Advanced deep learning models" },
    { icon: <Zap className="w-6 h-6" />, title: "Real-time Analysis", desc: "Instant position evaluation" },
    { icon: <Target className="w-6 h-6" />, title: "Move Prediction", desc: "99.2% accuracy rate" },
  ];

  return (
      <div className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#6B0D00]/5 to-transparent" />

        <div className='w-full flex justify-center'>
          <Navbar />
        </div>

        <div className={`relative max-w-7xl mx-auto px-6 py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center space-y-6 mb-12">
            <div className="inline-block">
              <div className="flex items-center gap-2 bg-[#6B0D00]/10 px-4 py-2 rounded-full text-[#6B0D00] text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                <span>Powered by Advanced Neural Networks</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
              Master Chess with
              <br />
              <span className="bg-linear-to-r from-[#6B0D00] to-[#A01000] bg-clip-text text-transparent">
                AI-Powered Analytics
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience the future of chess analysis with our cutting-edge AI engine. 
              Real-time evaluation, move prediction, and strategic insights at your fingertips.
            </p>
            
            <div className="flex gap-4 justify-center items-center pt-4">
              <button
                className="group relative px-8 py-4 bg-linear-to-r from-[#6B0D00] to-[#8B1000] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/chess')}
              >
                <span className="relative z-10">Challenge the AI</span>
                <div className="absolute inset-0 bg-linear-to-r from-[#8B1000] to-[#6B0D00] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                className="px-8 py-4 border-2 border-[#6B0D00] text-[#6B0D00] rounded-xl font-semibold text-lg hover:bg-[#6B0D00] hover:text-white transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/chess')}
              >
                View Demo
              </button>
            </div>

            <div className="flex gap-8 justify-center pt-8 text-sm">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-600">
                  <div className="text-[#6B0D00]">{feature.icon}</div>
                  <span>{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative chess pieces */}
        <div className="absolute top-20 left-10 text-[#6B0D00]/10 text-9xl font-serif">♔</div>
        <div className="absolute top-40 right-20 text-[#6B0D00]/10 text-7xl font-serif">♞</div>
      </div>
  )
}

export { HeroSection };