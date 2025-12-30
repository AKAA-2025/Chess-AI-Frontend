import type { ApiMoveResponse } from "../domain/model";

export class MoveRemoteDataSource {
  async sendMove(payload: {
    fen: string;
  }): Promise<ApiMoveResponse> {
    const res = await fetch("/api/chess/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }
}