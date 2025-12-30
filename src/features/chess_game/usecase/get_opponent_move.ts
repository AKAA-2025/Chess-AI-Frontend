import type { ApiMoveRequest } from "../domain/model/api_move_request";
import type { MoveRepository } from "../repository/move_repository";

export class GetOpponentMove {
  private repo: MoveRepository;

  constructor(repo: MoveRepository) {
    this.repo = repo;
  }

  execute(req: ApiMoveRequest) {
    return this.repo.getOpponentMove(req);
  }
}