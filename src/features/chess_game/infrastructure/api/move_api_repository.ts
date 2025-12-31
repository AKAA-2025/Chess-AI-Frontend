import type { ApiMoveResponse } from "chess_game/infrastructure/interface";
import type { ApiMoveRequest } from "chess_game/infrastructure/interface";
import { MoveRemoteDataSource } from "chess_game/RDS/move_rds";
import type { MoveRepository } from "chess_game/repository/move_repository";

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