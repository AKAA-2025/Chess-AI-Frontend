import type { ApiHistoryResponse } from "chess_game/infrastructure/interface";

export interface HistoryRepository {
  getHistory(): Promise<ApiHistoryResponse>;
}