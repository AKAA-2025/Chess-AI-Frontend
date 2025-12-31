import type { ChatMessage, GameResult, Move } from "chess_game/domain/model";

export interface ApiHistoryResponse {
  move: Move[];
  chats: ChatMessage[],
  gameResult: GameResult
}