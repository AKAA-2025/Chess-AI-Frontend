import type { GetOpponentMove } from "@/features/chess_game/usecase/get_opponent_move";
import type { GetCodeSnippet } from "@/features/landing/usecase/get_code";

export interface UseCases {
  getCodeSnippet: GetCodeSnippet;
  getOpponentMove : GetOpponentMove;
}