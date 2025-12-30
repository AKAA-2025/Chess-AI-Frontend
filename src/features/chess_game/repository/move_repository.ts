import type { ApiMoveResponse } from "chess_game/domain/model";
import type { ApiMoveRequest } from "../domain/model/api_move_request";

export interface MoveRepository {
  getOpponentMove(req: ApiMoveRequest): Promise<ApiMoveResponse>;
}