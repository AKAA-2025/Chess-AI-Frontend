export interface ApiMoveResponse {
  valid: boolean;
  aiMove?: {
    from: string;
    to: string;
    san: string;
  };
  newChat: string | null;
  gameStatus: {
    isCheckmate: boolean;
    isCheck: boolean;
    isDraw: boolean;
  };
}