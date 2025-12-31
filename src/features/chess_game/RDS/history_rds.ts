import type { ApiHistoryResponse } from "chess_game/infrastructure/interface";

export class HistoryRemoteDataSource {
  private readonly backendUrl: string

  constructor (backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async sendRequest(): Promise<ApiHistoryResponse> {
    const res = await fetch(`${this.backendUrl}/api/chess/history`, {
      method: "GET",
    });

    return res.json();
  }
}