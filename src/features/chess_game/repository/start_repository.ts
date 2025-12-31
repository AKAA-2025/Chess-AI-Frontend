import type { ApiStartRequest, ApiStartResponse } from "chess_game/infrastructure/interface";

export interface StartRepository {
  startGame(req: ApiStartRequest): Promise<ApiStartResponse>;
}