export interface Timer {
  time: number,
  isRunning: boolean,
  start: () => void,
  pause: () => void,
  reset: (newTime?: number) => void,
}