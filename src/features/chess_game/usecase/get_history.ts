import type { HistoryRepository } from "chess_game/repository";

export class GetHistory {
  private repo: HistoryRepository;

  constructor(repo: HistoryRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getHistory();
  }
}