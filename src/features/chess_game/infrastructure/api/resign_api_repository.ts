import type { ApiResignRequest, ApiResignResponse } from "chess_game/infrastructure/interface";
import { ResignRemoteDataSource } from "chess_game/RDS";
import type { ResignRepository } from "chess_game/repository";

export class ResignApiRepository implements ResignRepository {
  private readonly remote: ResignRemoteDataSource;

  constructor(remote: ResignRemoteDataSource) {
    this.remote = remote;
  }

  async resign(req: ApiResignRequest): Promise<ApiResignResponse> {
    const res = await this.remote.sendRequest(req);
    return res;
  }
}