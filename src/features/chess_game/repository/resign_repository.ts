import type { ApiResignRequest, ApiResignResponse } from "chess_game/infrastructure/interface";

export interface ResignRepository {
  resign(req: ApiResignRequest): Promise<ApiResignResponse>;
}