import type { ApiStartRequest, ApiStartResponse } from "chess_game/infrastructure/interface";
import { StartRemoteDataSource } from "chess_game/RDS";
import type { StartRepository } from "chess_game/repository";

export class StartApiRepository implements StartRepository {
  private readonly remote: StartRemoteDataSource;

  constructor(remote: StartRemoteDataSource) {
    this.remote = remote;
  }

  async startGame(req: ApiStartRequest): Promise<ApiStartResponse> {
    const res = await this.remote.sendRequest(req);
    return res;
  }
}