import type { GameResult } from "chess_game/domain/model";

export interface ApiResignResponse {
  result: GameResult
}