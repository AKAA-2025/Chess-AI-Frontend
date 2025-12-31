import type { ApiResignRequest } from "chess_game/infrastructure/interface";
import type { ResignRepository } from "chess_game/repository";

export class Resign {
  private repo: ResignRepository;

  constructor(repo: ResignRepository) {
    this.repo = repo;
  }

  execute(req: ApiResignRequest) {
    return this.repo.resign(req);
  }
}