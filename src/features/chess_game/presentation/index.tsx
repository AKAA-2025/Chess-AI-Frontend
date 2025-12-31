import { Chessboard, type PieceDropHandlerArgs, type SquareHandlerArgs } from 'react-chessboard';
import { Clock, Flag, MessageSquare, User } from 'lucide-react';
import { WelcomeScreen, GameResultPopup, PerformanceGraph } from './partials';
import { Navbar } from '@/shared/components';
import AIProfile from '@/shared/assets/ai_profile.jpg';
import { Footer } from '@/shared/components';
import { useGame } from './hooks/useGame';
import { BLACK, WHITE } from 'chess.js';
import { useState } from 'react';
import { formatTime } from './utils';
import ConnectionErrorPopup from './components/popup_error';
import { useNavigate } from 'react-router-dom';

const ChessGameplay = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const game = useGame();
  const navigate = useNavigate();

  const handlePieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean => {
    if (targetSquare != null) {
      game.onPieceDrop(sourceSquare, targetSquare);
    }
    return true;
  };

  const handleSquareClick = ({ square }: SquareHandlerArgs): void => {
    void game.onSquareClick(square); // fire and forget
  };


  const chessboardOptions = {
    position: game.fen,
    onSquareClick: handleSquareClick,
    onPieceDrop: handlePieceDrop,
    boardWidth: Math.min(500, window.innerWidth - 100),
    customBoardStyle: {
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(107, 13, 0, 0.3)'
    },
    customDarkSquareStyle: { backgroundColor: '#6B0D00' },
    customLightSquareStyle: { backgroundColor: '#F5E6D3' },
    arePiecesDraggable: game.currentTurn === WHITE && !game.gameStatus.isCheckmate && !game.gameStatus.isDraw,
  }

  return (
    <div className="relative min-h-screen w-screen bg-linear-to-br from-amber-50 via-white to-red-50 px-4">
      <div className="absolute inset-0 bg-linear-to-br from-[#6B0D00]/5 to-transparent"/>
      <div className="relative w-full flex flex-col items-center gap-8">
        <Navbar />

        { visible ? (
          <WelcomeScreen startGame={game.startGame} setVisible={setVisible} />
          ) : (
          <div className="flex justify-center gap-6 pt-16 pb-32 w-full max-w-6xl">
            {/* Left: Chessboard */}
            <div className="w-full">
              <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                {/* Players Info */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-red-900 bg-center bg-cover"
                      style={{backgroundImage: `url(${AIProfile})`}}
                    />
                    <div>
                      <div className="font-bold text-gray-900">Chess AI</div>
                      <div className="text-sm text-gray-500">ELO: ????</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="font-mono text-lg font-bold text-gray-900">{formatTime(game.aiTimer.time)}</span>
                  </div>
                </div>

                {/* Chessboard */}
                <div className="relative">
                  <Chessboard
                    options={chessboardOptions}
                  />
                </div>

                {game.connectionError && (
                  <ConnectionErrorPopup onRetry={game.startGame} onClose={() => navigate("/")}/>
                )}

                {/* Player Info */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-[#6B0D00] to-[#8B1000] rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">You</div>
                      <div className="text-sm text-gray-500">Fellow chess player</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#6B0D00]/10 px-4 py-2 rounded-lg border-2 border-[#6B0D00]">
                    <Clock className="w-5 h-5 text-[#6B0D00]" />
                    <span className="font-mono text-lg font-bold text-[#6B0D00]">{formatTime(game.playerTimer.time)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Chat & Move History */}
            <div className="w-full max-w-130 space-y-6">
              {/* Chat Box */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-[#6B0D00]" />
                  <h3 className="font-bold text-gray-900">AI Chat</h3>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {game.chatHistory.map((msg, idx) => (
                    <div key={idx} className="bg-linear-to-r from-[#6B0D00]/5 to-transparent p-3 rounded-lg border-l-4 border-[#6B0D00]">
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Move History */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Move History</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {game.moveHistory.map((move, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="font-mono text-sm text-gray-500 w-8">{move.moveNumber}.</span>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        {game.currentTurn == WHITE && (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-900">{move.whiteNotation}</span>
                            {move.whiteTime && (
                              <span className="text-xs text-gray-500">({move.whiteTime.toFixed(1)}s)</span>
                            )}
                          </div>
                        )}
                        {game.currentTurn == BLACK && (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-900">{move.blackNotation}</span>
                            {move.blackTime && (
                              <span className="text-xs text-gray-500">({move.blackTime.toFixed(1)}s)</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resign Button */}
              <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-200">
                <div className='flex justify-center gap-4'>
                  <button
                    onClick={game.resign}
                    className="h-14 w-full max-w-56 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-br from-[#6B0D00] to-[#8B1000] hover:from-red-900 hover:to-red-800 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <Flag className="w-5 h-5" />
                    Resign
                  </button>
                  <button
                    onClick={game.resetGame}
                    className="h-14 w-full max-w-56 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-br from-[#6B0D00] to-[#8B1000] hover:from-red-900 hover:to-red-800 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <Flag className="w-5 h-5" />
                    New Game
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Result Popup */}
        {(game.gameStatus.isCheckmate || game.gameStatus.isDraw) && game.gameResult && (
          <GameResultPopup gameResult={game.gameResult} resetGame={game.resetGame}/>
        )}

        {/* AI Performance Graph (shown after game) */}
        {(game.gameStatus.isCheckmate || game.gameStatus.isDraw) && (
          <PerformanceGraph moveHistory={game.moveHistory} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ChessGameplay;