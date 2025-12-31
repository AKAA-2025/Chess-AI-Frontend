import type { ApiSyncRequest, ApiSyncResponse } from "chess_game/infrastructure/interface";

export class SyncRemoteDataSource {
  private readonly backendUrl: string

  constructor (backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async sendRequest(payload: ApiSyncRequest): Promise<ApiSyncResponse> {
    const res = await fetch(`${this.backendUrl}/api/chess/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }
}