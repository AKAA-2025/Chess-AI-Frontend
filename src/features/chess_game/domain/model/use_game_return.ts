import type { Color } from "chess.js";
import type { ChatMessage, GameResult, Move, Timer } from ".";

export interface UseGameReturn {
  fen: string;

  onSquareClick: (square: string) => Promise<boolean | undefined>;
  onPieceDrop: (from: string, to: string) => Promise<boolean>;

  playerTimer : Timer;
  aiTimer : Timer;

  chatHistory: ChatMessage[];

  moveHistory: Move[];

  gameStatus: {
    isCheck: boolean;
    isCheckmate: boolean;
    isDraw: boolean;
    invalidMove?: string;
  };

  currentTurn: Color;

  gameResult : GameResult | undefined;

  timers: {
    player: Timer;
    ai: Timer;
  };

  connectionError: boolean;

  startGame: () => void;
  resetGame: () => void;
  syncGame: () => void;
  resign: () => void;
  refreshHistory: () => void;
}