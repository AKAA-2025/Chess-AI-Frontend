import type { ChatMessage, Move, Timer } from ".";

export interface UseGameReturn {
  fen: string;

  onPieceDrop: (from: string, to: string) => Promise<boolean>;

  chatHistory: ChatMessage[];
  latestChat: ChatMessage | null;

  moveHistory: Move[];

  gameStatus: {
    isCheck: boolean;
    isCheckmate: boolean;
    isDraw: boolean;
    invalidMove?: string;
  };

  timers: {
    player: Timer;
    ai: Timer;
  };

  resetGame: () => void;
}