import type { ApiMoveRequest, ApiMoveResponse } from "chess_game/infrastructure/interface";

export interface MoveRepository {
  getOpponentMove(req: ApiMoveRequest): Promise<ApiMoveResponse>;
}