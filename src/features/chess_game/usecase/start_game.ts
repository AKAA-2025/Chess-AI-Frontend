import type { ApiStartRequest } from "chess_game/infrastructure/interface";
import type { StartRepository } from "chess_game/repository";

export class StartGame {
  private repo: StartRepository;

  constructor(repo: StartRepository) {
    this.repo = repo;
  }

  execute(req: ApiStartRequest) {
    return this.repo.startGame(req);
  }
}