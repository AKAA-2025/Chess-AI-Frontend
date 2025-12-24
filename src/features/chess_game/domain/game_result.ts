export interface GameResult {
  winner: 'player' | 'ai' | 'draw';
  reason: string;
  playerRating: number;
  aiRating: number;
  totalMoves: number;
  accuracy: number;
};