import { Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="relative px-6 py-4 flex justify-between items-center w-full max-w-7xl">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 bg-linear-to-br from-[#6B0D00] to-[#8B1000] rounded-lg flex items-center justify-center">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-[#6B0D00]">ChessAI</span>
      </div>
      <div className="flex gap-6 text-sm font-medium text-gray-600">
        <a href="#features" className="hover:text-[#6B0D00] transition-colors">Features</a>
        <a href="#analytics" className="hover:text-[#6B0D00] transition-colors">Analytics</a>
        <a href="#performance" className="hover:text-[#6B0D00] transition-colors">Performance</a>
      </div>
    </nav>
  )
}

export { Navbar };