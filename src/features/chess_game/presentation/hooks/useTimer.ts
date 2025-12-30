import { useCallback, useEffect, useRef, useState } from "react";

export interface UseTimerOptions {
  initialTime?: number;   // milliseconds
  interval?: number;      // tick interval in ms
  autoStart?: boolean;
  countdown?: boolean;    // true = countdown, false = count up
}

/**
 * Usage
 * const { time, start, pause, reset } = useTimer({
 *   initialTime: 0,
 *   autoStart: false,
 * });
 */
export function useTimer({
  initialTime = 0,
  interval = 1000,
  autoStart = false,
  countdown = true,
}: UseTimerOptions = {}) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);

  const timerRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    setTime((prev) => {
      if (countdown) {
        return prev > 0 ? prev - interval : 0;
      }
      return prev + interval;
    });
  }, [countdown, interval]);

  const start = useCallback(() => {
    if (!timerRef.current) {
      setIsRunning(true);
      timerRef.current = window.setInterval(tick, interval);
    }
  }, [interval, tick]);

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(
    (newTime: number = initialTime) => {
      pause();
      setTime(newTime);
    },
    [initialTime, pause]
  );

  useEffect(() => {
    if (autoStart) start();
    return pause;
  }, [autoStart, start, pause]);

  return {
    time,        // milliseconds (safe to render)
    isRunning,
    start,
    pause,
    reset,
  };
}