import type { CodeRepository } from "landing/repository";
import type { CodeSnippet } from "landing/domain/model";

const _codeSnippet = `  SearchResult Worker::search(const SearchConfig& config) {
      should_stop = false;
      stats.reset();
      search_start_time = std::chrono::steady_clock::now();
      max_time_ms = config.max_time_ms;
      
      SearchResult result;
      
      if (config.use_iterative_deepening) {
          result = iterativeDeepening(config.max_depth, config.max_time_ms);
      } else {
          result.best_move = searchRoot(config.max_depth);
          result.score = alphaBetaRecursive(config.max_depth, -INFINITY_SCORE, 
                                            INFINITY_SCORE, 0);
          result.depth = config.max_depth;
          result.stats = stats;
      }
      
      auto end_time = std::chrono::steady_clock::now();
      result.stats.time_elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(
          end_time - search_start_time);
      
      return result;
  }`;

export class CodeApiRepository implements CodeRepository {
  getCodeSnippet = async (): Promise<CodeSnippet> => {
    return {
      content: _codeSnippet,
    }
  };
}