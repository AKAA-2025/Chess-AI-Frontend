import type { ApiSyncRequest } from "chess_game/infrastructure/interface";
import type { SyncRepository } from "chess_game/repository";

export class SyncGame {
  private repo: SyncRepository;

  constructor(repo: SyncRepository) {
    this.repo = repo;
  }

  execute(req: ApiSyncRequest) {
    return this.repo.syncGame(req);
  }
}