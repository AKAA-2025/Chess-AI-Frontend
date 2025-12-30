import type { Chess } from "chess.js";
import type { ChatMessage, Move, Timer } from ".";

export interface GameState {
  chess: Chess;                 // chess.js instance
  fen: string;

  moves: Move[];
  chatHistory: ChatMessage[];

  status: {
    isCheck: boolean;
    isCheckmate: boolean;
    isDraw: boolean;
    invalidMove?: string;
  };

  timers: {
    player: Timer;
    ai: Timer;
  };
}