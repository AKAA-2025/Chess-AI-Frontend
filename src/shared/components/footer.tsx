import { Cpu } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-[#6B0D00] to-[#8B1000] rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#6B0D00]">ChessAI</span>
          </div>
          <div className="text-gray-600 text-sm">
            © 2024 AKAA Analytics. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer };