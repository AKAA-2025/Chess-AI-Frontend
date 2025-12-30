import { Chess } from "chess.js";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, Move, UseGameReturn } from "chess_game/domain/model";
import { useTimer } from ".";
import { useUseCases } from "@/shared/hooks";

export function useGame() : UseGameReturn {
  /* ---------- Chess Engine ---------- */
  const chessRef = useRef<Chess>(new Chess());

  /* ---------- Render State ---------- */
  const [fen, setFen] = useState(chessRef.current.fen());
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const [gameStatus, setGameStatus] = useState({
    isCheck: false,
    isCheckmate: false,
    isDraw: false,
    invalidMove: undefined as string | undefined,
  });

  /* ---------- Timers ---------- */
  const playerTimer = useTimer({
    initialTime: 600_000,
    autoStart: false,
  });

  const aiTimer = useTimer({
    initialTime: 600_000,
    autoStart: false,
  });

  /* =======================
     Backend Communication
  ======================= */

  const { getOpponentMove } = useUseCases();

  /* =======================
     Piece Drop Handler
  ======================= */

  const onPieceDrop = useCallback(
    async (from: string, to: string): Promise<boolean> => {
      const chess = chessRef.current;

      setGameStatus(s => ({ ...s, invalidMove: undefined }));

      const move = chess.move({
        from,
        to,
        promotion: "q",
      });

      if (!move) {
        setGameStatus(s => ({
          ...s,
          invalidMove: "Illegal move",
        }));
        return false;
      }

      /* optimistic update */
      setFen(chess.fen());
      playerTimer.pause();
      aiTimer.start();

      const response = await getOpponentMove.execute({fen: chess.fen()});

      if (!response.valid) {
        chess.undo();
        setFen(chess.fen());
        playerTimer.start();
        aiTimer.pause();

        setGameStatus(s => ({
          ...s,
          invalidMove: "Move rejected by server",
        }));

        return false;
      }

      /* apply AI move */
      if (response.aiMove) {
        chess.move({
          from: response.aiMove.from,
          to: response.aiMove.to,
        });

        setFen(chess.fen());
      }

      /* chat */
      const chat = response.newChat;

      if (chat != null) {
        setChatHistory(c => [
          ...c,
          { message: chat, timestamp: Date.now() },
        ]);
      }

      /* status */
      setGameStatus({
        ...response.gameStatus,
        invalidMove: undefined,
      });

      /* timers */
      aiTimer.pause();
      playerTimer.start();

      /* move history (lightweight) */
      setMoveHistory(m => [
        ...m,
        {
          moveNumber: m.length + 1,
          whiteNotation: move.color === "w" ? move.san : undefined,
          blackNotation: move.color === "b" ? move.san : undefined,
        },
      ]);

      return true;
    },
    [playerTimer, aiTimer]
  );

  /* =======================
     Game Start / Reconnect
  ======================= */

  useEffect(() => {
    fetch("/api/chess/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fen: chessRef.current.fen(),
        playerTime: 600_000,
      }),
    });

    playerTimer.start();
  }, []);

  /* =======================
     Game End Handling
  ======================= */

  useEffect(() => {
    if (gameStatus.isCheckmate || gameStatus.isDraw) {
      playerTimer.pause();
      aiTimer.pause();

      fetch("/api/chess/history", { method: "POST" });
    }
  }, [gameStatus]);

  /* =======================
     Reset
  ======================= */

  const resetGame = () => {
    chessRef.current = new Chess();
    setFen(chessRef.current.fen());
    setMoveHistory([]);
    setChatHistory([]);
    setGameStatus({
      isCheck: false,
      isCheckmate: false,
      isDraw: false,
      invalidMove: undefined,
    });

    playerTimer.reset(600_000);
    aiTimer.reset(600_000);
  };

  /* =======================
     Public API
  ======================= */
  
  return {
    fen,
    onPieceDrop,

    chatHistory,
    latestChat: chatHistory.at(-1) ?? null,

    moveHistory,
    gameStatus,

    timers: {
      player: playerTimer,
      ai: aiTimer,
    },

    resetGame,
  };
}