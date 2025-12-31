import { Chess, type Square } from "chess.js";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, GameResult, Move, Timer, UseGameReturn } from "chess_game/domain/model";
import { useTimer } from ".";
import { useUseCases } from "@/shared/hooks";

export function useGame() : UseGameReturn {
  /* ---------- Chess Engine ---------- */
  const chessRef = useRef<Chess>(new Chess());

  /* ---------- Render State ---------- */
  const [fen, setFen] = useState(chessRef.current.fen());
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const [gameStatus, setGameStatus] = useState({
    isCheck: false,
    isCheckmate: false,
    isDraw: false,
    invalidMove: undefined as string | undefined,
  });

  const [gameResult, setGameResult] = useState<GameResult>();

  const [isConnectionError, setIsConnectionError] = useState(false);

  const currentTurn = chessRef.current.turn();

  /* ---------- Timers ---------- */
  const playerTimer: Timer = useTimer({
    initialTime: 600_000,
    autoStart: false,
  });

  const aiTimer: Timer = useTimer({
    initialTime: 600_000,
    autoStart: false,
  });

  /* =======================
     Cleanup Function
  ======================= */

  const cleanup = () => {
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
  }

  /* =======================
     Backend Communication
  ======================= */

  const { getOpponentMove, getHistory, resign, syncGame, startGame } = useUseCases();

  const StartGame = async () => {
    cleanup();
    setIsConnectionError(false);
    
    try {
      const chess = chessRef.current;
      const res = await startGame.execute({ fen: chess.fen(), playerTime: 10 * 60 * 1000 });
      if (res.success) {
        playerTimer.reset(res.timer.player);
        aiTimer.reset(res.timer.ai);
      }
    } catch (error) {
      console.error('Failed to start game:', error);
      setIsConnectionError(true);
    }
  }

  const SyncGame = async () => {
    const chess = chessRef.current;
    const res = await syncGame.execute({ fen: chess.fen() });
    playerTimer.reset(res.timer.player);
    aiTimer.reset(res.timer.ai);
    setGameStatus( s => ({
      ...s,
      isCheckmate: res.gameStatus.isCheckmate,
      isCheck : res.gameStatus.isCheck,
      isDraw : res.gameStatus.isDraw,
    }) );
  }

  const RefreshHistory = async () => {
    const res = await getHistory.execute();
    setMoveHistory(res.move);
    setChatHistory(res.chats);
    setGameResult(res.gameResult);
  }

  const Resign = async () => {
    const res = await resign.execute({ reason: 'resign' });

    setGameResult(res.result);
    setGameStatus(s => ({ ...s, isCheckmate: true }))
  }

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
     Piece Drop Handler
  ======================= */
  const onSquareClick = useCallback(
    async (square: string) => {
      const chess = chessRef.current;

      // Only allow interaction on player's turn
      if (chess.turn() !== "w") return;

      // No square selected yet → try selecting a piece
      if (selectedSquare === null) {
        const piece = chess.get(square as Square);

        // Must click own piece
        if (!piece || piece.color !== "w") return;

        setSelectedSquare(square);
        return;
      }

      // Same square clicked → deselect
      if (selectedSquare === square) {
        setSelectedSquare(null);
        return;
      }

      // Attempt move (reuse existing logic)
      const success = await onPieceDrop(selectedSquare, square);

      // Always clear selection after attempt
      setSelectedSquare(null);

      return success;
    },
    [selectedSquare, onPieceDrop]
  );

  /* =======================
     Game End Handling
  ======================= */

  useEffect(() => {
    if (gameStatus.isCheckmate || gameStatus.isDraw) {
      playerTimer.pause();
      aiTimer.pause();
    }
  }, [gameStatus]);

  /* =======================
     Reset
  ======================= */

  const resetGame = () => {
    Resign();

    StartGame();
  };

  /* =======================
     Public API // Not implemented yet
  ======================= */
  
  return {
    fen,

    onSquareClick,
    onPieceDrop,

    playerTimer,
    aiTimer,

    chatHistory,

    moveHistory,
    gameStatus,
    currentTurn,

    timers: {
      player: playerTimer,
      ai: aiTimer,
    },

    gameResult,

    connectionError: isConnectionError,

    resetGame,
    startGame: StartGame,
    refreshHistory: RefreshHistory,
    resign: Resign,
    syncGame : SyncGame,
  };
}