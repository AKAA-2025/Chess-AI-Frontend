import type { ApiSyncRequest, ApiSyncResponse } from "chess_game/infrastructure/interface";

export interface SyncRepository {
  syncGame(req: ApiSyncRequest): Promise<ApiSyncResponse>;
}