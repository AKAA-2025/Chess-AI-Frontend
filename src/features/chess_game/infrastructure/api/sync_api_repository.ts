import type { ApiSyncRequest, ApiSyncResponse } from "chess_game/infrastructure/interface";
import { SyncRemoteDataSource } from "chess_game/RDS";
import type { SyncRepository } from "chess_game/repository";

export class SyncApiRepository implements SyncRepository {
  private readonly remote: SyncRemoteDataSource;

  constructor(remote: SyncRemoteDataSource) {
    this.remote = remote;
  }

  async syncGame(req: ApiSyncRequest): Promise<ApiSyncResponse> {
    const res = await this.remote.sendRequest(req);
    return res;
  }
}