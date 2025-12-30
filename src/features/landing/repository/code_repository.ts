import type { CodeSnippet } from "landing/domain/model";

export interface CodeRepository {
  getCodeSnippet(): Promise<CodeSnippet>;
}