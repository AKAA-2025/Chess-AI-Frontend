import { useState, useEffect } from 'react';
import { Chessboard, type PieceDropHandlerArgs } from 'react-chessboard';
import { Chess } from 'chess.js';
import { Clock, Flag, MessageSquare, User, Cpu, TrendingDown, Trophy, Target } from 'lucide-react';
import type { Move, ChatMessage, GameResult } from 'chess_game/domain';
import { PerformanceGraph } from './partials';
import { Navbar } from '@/shared/components';
import AIProfile from '@/shared/assets/ai_profile.jpg';
import { Footer } from '@/shared/components';

const ChessGameplay = () => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { message: "Welcome! I'm your AI opponent. Let's have a great game! 🎯", timestamp: Date.now() }
  ]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [playerTime, setPlayerTime] = useState(600); // 10 minutes
  const [aiTime, setAiTime] = useState(600);
  const [timerActive, setTimerActive] = useState(false);

  const [ hasGameStarted, setHasGameStarted ] = useState(false); 

  // Timer effect
  useEffect(() => {
    if (!timerActive || gameOver) return;

    const interval = setInterval(() => {
      if (isPlayerTurn) {
        setPlayerTime(prev => {
          if (prev <= 1) {
            handleTimeout('player');
            return 0;
          }
          return prev - 1;
        });
      } else {
        setAiTime(prev => {
          if (prev <= 1) {
            handleTimeout('ai');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isPlayerTurn, gameOver]);

  const handleTimeout = (player: 'player' | 'ai') => {
    setGameOver(true);
    setTimerActive(false);
    const winner = player === 'player' ? 'ai' : 'player';
    setGameResult({
      winner,
      reason: `${player === 'player' ? 'You' : 'AI'} ran out of time!`,
      playerRating: 1500,
      aiRating: 3200,
      totalMoves: moveHistory.length,
      accuracy: 85
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const makeAMove = (move: { from: string; to: string; promotion?: string }) => {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      
      if (result) {
        setGame(gameCopy);
        setPosition(gameCopy.fen());
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const queueAIMove = (playerMoveSan: string) => {
    (async () => {
      try {
        await fetch("https://api.chess-ai.example.com/make-move", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fen: game.fen(),
            move: playerMoveSan,
            moveHistory,
          }),
        });

        // simulated backend response
        setTimeout(() => {
          handleAIResponse({
            valid: true,
            aiMove: { from: "e7", to: "e5", san: "e5" },
            aiMoveTime: 0.8,
            newChat:
              moveHistory.length > 3
                ? "Interesting move! Let's see where this goes... 🤔"
                : null,
            gameStatus: {
              isCheckmate: false,
              isCheck: game.isCheck(),
              isDraw: false,
            },
          });
        }, 1200);
      } catch (error) {
        console.error("Error communicating with backend:", error);
        setIsPlayerTurn(true);
        setThinking(false);
      }
    })();
  };


  const onDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean => {
    if (!targetSquare) return false;
    if (!isPlayerTurn || gameOver) return false;

    const moveStartTime = Date.now();
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if (move === null) return false;

    if (!timerActive) setTimerActive(true);

    const moveTime = (Date.now() - moveStartTime) / 1000;

    // Update move history
    const moveNum = Math.floor(moveHistory.length / 2) + 1;
    const isWhiteMove = moveHistory.length % 2 === 0;
    
    setMoveHistory(prev => {
      const newHistory = [...prev];
      if (isWhiteMove) {
        newHistory.push({
          moveNumber: moveNum,
          white: move.san,
          whiteTime: moveTime
        });
      } else {
        newHistory[newHistory.length - 1].black = move.san;
        newHistory[newHistory.length - 1].blackTime = moveTime;
      }
      return newHistory;
    });

    // Send move to backend for validation and AI response
    setIsPlayerTurn(false);
    setThinking(true);

    queueAIMove(move.san);

    return true;
  };

  const handleAIResponse = (response: any) => {
    if (!response.valid) {
      alert('Invalid move detected! Please play fair.');
      return;
    }

    // Make AI move
    const aiMove = makeAMove(response.aiMove);
    if (aiMove) {
      const moveNum = Math.floor(moveHistory.length / 2) + 1;
      setMoveHistory(prev => {
        const newHistory = [...prev];
        if (newHistory.length === 0 || newHistory[newHistory.length - 1].black) {
          newHistory.push({
            moveNumber: moveNum,
            white: aiMove.san,
            whiteTime: response.aiMoveTime
          });
        } else {
          newHistory[newHistory.length - 1].black = aiMove.san;
          newHistory[newHistory.length - 1].blackTime = response.aiMoveTime;
        }
        return newHistory;
      });

      // Add new chat message if provided
      if (response.newChat) {
        setChatMessages(prev => [...prev, {
          message: response.newChat,
          timestamp: Date.now()
        }]);
      }

      // Check game status
      if (response.gameStatus.isCheckmate) {
        endGame('ai', 'Checkmate! AI wins!');
      } else if (response.gameStatus.isDraw) {
        endGame('draw', 'Game drawn!');
      } else if (game.isGameOver()) {
        if (game.isCheckmate()) {
          endGame('player', 'Checkmate! You win!');
        } else {
          endGame('draw', 'Game drawn!');
        }
      }
    }

    setThinking(false);
    setIsPlayerTurn(true);
  };

  const endGame = (winner: 'player' | 'ai' | 'draw', reason: string) => {
    setGameOver(true);
    setTimerActive(false);
    setGameResult({
      winner,
      reason,
      playerRating: 1500,
      aiRating: 3200,
      totalMoves: moveHistory.length,
      accuracy: Math.floor(Math.random() * 15) + 85
    });
  };

  const handleResign = () => {
    endGame('ai', 'You resigned');
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setPosition(newGame.fen());
    setMoveHistory([]);
    setChatMessages([
      { message: "Ready for another game? Let's do this! 💪", timestamp: Date.now() }
    ]);
    setIsPlayerTurn(true);
    setGameOver(false);
    setGameResult(null);
    setPlayerTime(600);
    setAiTime(600);
    setTimerActive(false);
  };

  const chessboardOptions = {
    position: position,
    onPieceDrop: onDrop,
    boardWidth: Math.min(500, window.innerWidth - 100),
    customBoardStyle: {
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(107, 13, 0, 0.3)'
    },
    customDarkSquareStyle: { backgroundColor: '#6B0D00' },
    customLightSquareStyle: { backgroundColor: '#F5E6D3' },
    arePiecesDraggable: isPlayerTurn && !gameOver,
  }

  return (
    <div className="relative min-h-screen w-screen bg-linear-to-br from-amber-50 via-white to-red-50 px-4">
      <div className="absolute inset-0 bg-linear-to-br from-[#6B0D00]/5 to-transparent"/>
      <div className="relative w-full flex flex-col items-center gap-8">
        <Navbar />

        { !hasGameStarted && (
          <div className='w-full max-w-260 mt-24 px-12 h-130 flex justify-center'>
            <div className='h-[70%] rounded-3xl border-8 border-red-950'>
              <div
                className='h-full rounded-3xl aspect-square bg-cover bg-center'
                style={{backgroundImage: `url(${AIProfile})`}}
              >
            </div>

            </div>
            <div className='w-full pt-8 pl-16 flex flex-col rounded-2xl'>
                <h1 className="pb-4 text-4xl font-bold text-gray-900">
                  Play Against <span className="text-[#6B0D00]">Chess AI</span>
                </h1>
                <p className="pb-8 text-gray-600 text-lg leading-relaxed">
                  A fast, responsive chess AI designed for serious gameplay. <br />
                  Try the demo and explore intelligent move generation, deep analysis, and smooth play—right in your browser.
                </p>
                <button
                  className='group relative h-16 w-52 text-xl font-semibold rounded-lg bg-linear-to-r from-[#6B0D00] to-[#8B1000] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'
                  onClick={() => setHasGameStarted(true)}
                >
                  <span className='relative z-10'>Play Now</span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#8B1000] to-[#6B0D00] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            </div>
          </div>
        )}

        {/* Main Game Area */}
        { hasGameStarted && (
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
                    <span className="font-mono text-lg font-bold text-gray-900">{formatTime(aiTime)}</span>
                  </div>
                </div>

                {/* Chessboard */}
                <div className="relative">
                  <Chessboard
                    options={chessboardOptions}
                  />
                  {thinking && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="bg-white rounded-xl p-6 shadow-2xl">
                        <div className="flex items-center gap-3">
                          <div className="animate-spin">
                            <Cpu className="w-6 h-6 text-[#6B0D00]" />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
                    <span className="font-mono text-lg font-bold text-[#6B0D00]">{formatTime(playerTime)}</span>
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
                  {chatMessages.map((msg, idx) => (
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
                  {moveHistory.map((move, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="font-mono text-sm text-gray-500 w-8">{move.moveNumber}.</span>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        {move.white && (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-900">{move.white}</span>
                            {move.whiteTime && (
                              <span className="text-xs text-gray-500">({move.whiteTime.toFixed(1)}s)</span>
                            )}
                          </div>
                        )}
                        {move.black && (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-900">{move.black}</span>
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
                    onClick={handleResign}
                    disabled={gameOver}
                    className="h-14 w-full max-w-56 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-br from-[#6B0D00] to-[#8B1000] hover:from-red-900 hover:to-red-800 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <Flag className="w-5 h-5" />
                    Resign
                  </button>
                  <button
                    onClick={handleResign}
                    disabled={gameOver}
                    className="h-14 w-full max-w-56 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-br from-[#6B0D00] to-[#8B1000] hover:from-red-900 hover:to-red-800 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <Flag className="w-5 h-5" />
                    Resign
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Result Popup */}
        {gameOver && gameResult && (
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
                    onClick={() => setGameResult(null)}
                    className="flex-1 px-6 py-4 border-2 border-[#6B0D00] text-[#6B0D00] rounded-xl font-bold hover:bg-[#6B0D00] hover:text-white transition-all duration-300"
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Performance Graph (shown after game) */}
        {gameOver && (
          <PerformanceGraph moveHistory={moveHistory} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ChessGameplay;