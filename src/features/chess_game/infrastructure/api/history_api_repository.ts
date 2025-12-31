import type { ApiHistoryResponse } from "chess_game/infrastructure/interface";
import { HistoryRemoteDataSource } from "chess_game/RDS";
import type { HistoryRepository } from "chess_game/repository";

export class HistoryApiRepository implements HistoryRepository {
  private readonly remote: HistoryRemoteDataSource;

  constructor(remote: HistoryRemoteDataSource) {
    this.remote = remote;
  }

  async getHistory(): Promise<ApiHistoryResponse> {
    const res = await this.remote.sendRequest();
    return res;
  }
}