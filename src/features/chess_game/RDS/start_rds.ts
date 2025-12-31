import type { ApiStartRequest, ApiStartResponse } from "chess_game/infrastructure/interface";

export class StartRemoteDataSource {
  private readonly backendUrl: string

  constructor (backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async sendRequest(payload: ApiStartRequest): Promise<ApiStartResponse> {
    const res = await fetch(`${this.backendUrl}/api/chess/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }
}