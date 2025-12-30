import { Chess } from "chess.js";
import type { Move, ChatMessage, GameResult, Timer } from "chess_game/domain";

type resetGameProps = {
  playerTimer : Timer,
  aiTimer : Timer,

  setGame: React.Dispatch<React.SetStateAction<Chess>>,
  setPosition: React.Dispatch<React.SetStateAction<string>>,
  setMoveHistory: React.Dispatch<React.SetStateAction<Move[]>>,
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>,
  setTimerActive: React.Dispatch<React.SetStateAction<boolean>>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setGameResult: React.Dispatch<React.SetStateAction<GameResult | null>>,
}

export const resetGame = ({ setGame, setPosition, setMoveHistory,
                            setChatMessages, setIsPlayerTurn,
                            setTimerActive, setGameOver,
                            playerTimer, aiTimer, setGameResult }: resetGameProps) => {
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
  playerTimer.reset(600);
  aiTimer.reset(600);
  setTimerActive(false);
};