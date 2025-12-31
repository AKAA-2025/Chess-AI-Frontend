export interface ApiSyncResponse {
  timer : {
    player: number,
    ai : number,
  },
  gameStatus : {
    isCheckmate: boolean,
    isCheck: boolean,
    isDraw: boolean,
  }
}