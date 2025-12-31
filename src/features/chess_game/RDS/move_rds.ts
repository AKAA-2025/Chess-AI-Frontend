import type { ApiMoveRequest, ApiMoveResponse } from "chess_game/infrastructure/interface";

export class MoveRemoteDataSource {
  private readonly backendUrl: string

  constructor (backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async sendMove(payload: ApiMoveRequest): Promise<ApiMoveResponse> {
    const res = await fetch(`${this.backendUrl}/api/chess/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }
}