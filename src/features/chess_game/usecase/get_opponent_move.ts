import type { ApiMoveRequest } from "chess_game/infrastructure/interface";
import type { MoveRepository } from "chess_game/repository";

export class GetOpponentMove {
  private repo: MoveRepository;

  constructor(repo: MoveRepository) {
    this.repo = repo;
  }

  execute(req: ApiMoveRequest) {
    return this.repo.getOpponentMove(req);
  }
}