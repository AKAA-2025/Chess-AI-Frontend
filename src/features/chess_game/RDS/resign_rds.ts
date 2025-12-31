import type { ApiResignRequest, ApiResignResponse } from "chess_game/infrastructure/interface";

export class ResignRemoteDataSource {
  private readonly backendUrl: string

  constructor (backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async sendRequest(payload: ApiResignRequest): Promise<ApiResignResponse> {
    const res = await fetch(`${this.backendUrl}/api/chess/resign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }
}