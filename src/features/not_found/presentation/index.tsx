import { useState, useEffect } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/shared/components';
import { useNavigate } from 'react-router-dom';
import { Footer } from '@/shared/components';

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax effect for chess pieces
  const parallaxX = (position.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (position.y - window.innerHeight / 2) * 0.02;

  const navigate = useNavigate();

  return (<>
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-red-50 relative overflow-hidden flex flex-col items-center">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-[#6B0D00]/5 to-transparent" />
      
      {/* Floating chess pieces with parallax */}
      <div 
        className="absolute top-20 left-10 text-[#6B0D00]/10 text-9xl font-serif transition-transform duration-300 ease-out"
        style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
      >
        ♔
      </div>
      <div 
        className="absolute top-1/4 right-20 text-[#6B0D00]/10 text-7xl font-serif transition-transform duration-300 ease-out"
        style={{ transform: `translate(${-parallaxX}px, ${-parallaxY}px)` }}
      >
        ♞
      </div>
      <div 
        className="absolute bottom-20 left-1/4 text-[#6B0D00]/10 text-8xl font-serif transition-transform duration-300 ease-out"
        style={{ transform: `translate(${parallaxX * 1.5}px, ${parallaxY * 1.5}px)` }}
      >
        ♜
      </div>
      <div 
        className="absolute bottom-1/3 right-1/4 text-[#6B0D00]/10 text-6xl font-serif transition-transform duration-300 ease-out"
        style={{ transform: `translate(${-parallaxX * 1.2}px, ${-parallaxY * 1.2}px)` }}
      >
        ♛
      </div>

      {/* Main content */}
      <div className={`relative z-10 w-full max-w-7xl px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Navbar />

        {/* 404 Text */}
        <h1 className="mt-26 text-[120px] font-bold mb-4 bg-linear-to-r from-[#6B0D00] to-[#A01000] bg-clip-text text-transparent leading-none">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-3xl font-bold text-gray-900 mb-6">
          Checkmate! Page Not Found
        </h2>
        
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
          Looks like this page has been captured by our AI. The piece you're looking for seems to have moved to a different square.
        </p>

        <div className="text-gray-500 italic mb-8">
          "Every chess master was once a beginner... and every webpage was once found."
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            className="group relative flex items-center gap-2 px-7 py-4 bg-linear-to-r from-[#6B0D00] to-[#8B1000] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Home className="relative z-10 w-5 h-5"/>
            <span className="relative z-10">Back to Home</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#8B1000] to-[#6B0D00] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button
            className="flex items-center gap-2 px-7 py-3.5 border-2 border-[#6B0D00] text-[#6B0D00] rounded-xl font-semibold text-lg hover:bg-[#6B0D00] hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#6B0D00]/5 to-transparent" />
    </div>

    <Footer />
  </>);
};

export default NotFound;