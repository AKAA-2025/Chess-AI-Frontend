import type { CodeRepository } from "../domain/repository";

export class GetCodeSnippet {
  private repo: CodeRepository;

  constructor(repo: CodeRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getCodeSnippet();
  }
}