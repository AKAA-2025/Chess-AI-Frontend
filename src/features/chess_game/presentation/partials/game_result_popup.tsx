import type { GameResult } from "chess_game/domain/model";
import { Trophy, TrendingDown, Target } from "lucide-react";
import { useState } from "react";

type GameResultProps = {
  gameResult: GameResult;
  resetGame: () => void;
}

function GameResultPopup( { gameResult, resetGame }: GameResultProps ) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 text-[#6B0D00]/5 text-9xl font-serif">
            {gameResult.winner === 'player' ? '♔' : gameResult.winner === 'ai' ? '♚' : '='}
          </div>
          
          <div className="relative z-10">
            {/* Result Icon */}
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              gameResult.winner === 'player' 
                ? 'bg-linear-to-br from-green-400 to-green-600' 
                : gameResult.winner === 'ai'
                ? 'bg-linear-to-br from-red-400 to-red-600'
                : 'bg-linear-to-br from-gray-400 to-gray-600'
            }`}>
              {gameResult.winner === 'player' ? (
                <Trophy className="w-10 h-10 text-white" />
              ) : gameResult.winner === 'ai' ? (
                <TrendingDown className="w-10 h-10 text-white" />
              ) : (
                <Target className="w-10 h-10 text-white" />
              )}
            </div>

            {/* Result Text */}
            <h2 className={`text-4xl font-bold text-center mb-2 ${
              gameResult.winner === 'player' 
                ? 'text-green-600' 
                : gameResult.winner === 'ai'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}>
              {gameResult.winner === 'player' ? 'Victory!' : gameResult.winner === 'ai' ? 'Defeat' : 'Draw'}
            </h2>
            <p className="text-center text-gray-600 mb-8">{gameResult.reason}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-linear-to-br from-[#6B0D00]/5 to-transparent p-4 rounded-xl text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{gameResult.totalMoves}</div>
                <div className="text-sm text-gray-600">Total Moves</div>
              </div>
              <div className="bg-linear-to-br from-[#6B0D00]/5 to-transparent p-4 rounded-xl text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{gameResult.accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="bg-linear-to-br from-[#6B0D00]/5 to-transparent p-4 rounded-xl text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{gameResult.playerRating}</div>
                <div className="text-sm text-gray-600">Your ELO</div>
              </div>
              <div className="bg-linear-to-br from-[#6B0D00]/5 to-transparent p-4 rounded-xl text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{gameResult.aiRating}</div>
                <div className="text-sm text-gray-600">AI ELO</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 px-6 py-4 bg-linear-to-r from-[#6B0D00] to-[#8B1000] text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Play Again
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="flex-1 px-6 py-4 border-2 border-[#6B0D00] text-[#6B0D00] rounded-xl font-bold hover:bg-[#6B0D00] hover:text-white transition-all duration-300"
              >
                View Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { GameResultPopup };