import type { GetCodeSnippet } from "@/features/landing/usecase";
import type { GetOpponentMove, GetHistory, Resign, StartGame, SyncGame } from "chess_game/usecase";

export interface UseCases {
  getCodeSnippet: GetCodeSnippet;
  getOpponentMove : GetOpponentMove;
  getHistory : GetHistory,
  syncGame : SyncGame,
  startGame : StartGame,
  resign : Resign,
}