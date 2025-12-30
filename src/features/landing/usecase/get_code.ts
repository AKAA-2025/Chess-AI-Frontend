import type { CodeRepository } from "landing/repository";

export class GetCodeSnippet {
  private repo: CodeRepository;

  constructor(repo: CodeRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getCodeSnippet();
  }
}