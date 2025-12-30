import type { ApiMoveResponse } from "../domain/model";
import type { ApiMoveRequest } from "../domain/model/api_move_request";
import { MoveRemoteDataSource } from "../RDS/move_rds";
import type { MoveRepository } from "../repository/move_repository";

export class MoveApiRepository implements MoveRepository {
  private readonly remote: MoveRemoteDataSource;

  constructor(remote: MoveRemoteDataSource) {
    this.remote = remote;
  }

  async getOpponentMove(req: ApiMoveRequest): Promise<ApiMoveResponse> {
    const res = await this.remote.sendMove(req);
    return res;
  }
}