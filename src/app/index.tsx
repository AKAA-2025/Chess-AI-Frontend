// import ChessGamePage from "chess_game/presentation";
import LandingPage from "landing/presentation";
import { GetCodeSnippet } from "landing/usecase";
import { CodeApiRepository } from "landing/infrastructure/api";
import type { UseCases } from "@/shared/model";
import { UseCasesContext } from "shared/ctx";
import ChessGameplay from "chess_game/presentation";
import NotFound from "@/features/not_found/presentation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GetOpponentMove, GetHistory, Resign, StartGame, SyncGame } from "chess_game/usecase";
import { HistoryApiRepository, MoveApiRepository, ResignApiRepository, StartApiRepository, SyncApiRepository } from "chess_game/infrastructure/api";
import { HistoryRemoteDataSource, MoveRemoteDataSource, ResignRemoteDataSource, StartRemoteDataSource, SyncRemoteDataSource } from "@/features/chess_game/RDS";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/chess',
    element: <ChessGameplay />
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const useCases: UseCases = {
    getCodeSnippet: new GetCodeSnippet(new CodeApiRepository()),
    getOpponentMove : new GetOpponentMove(new MoveApiRepository(new MoveRemoteDataSource(BACKEND_URL))),
    getHistory : new GetHistory(new HistoryApiRepository(new HistoryRemoteDataSource(BACKEND_URL))),
    resign : new Resign(new ResignApiRepository(new ResignRemoteDataSource(BACKEND_URL))),
    syncGame : new SyncGame(new SyncApiRepository(new SyncRemoteDataSource(BACKEND_URL))),
    startGame : new StartGame(new StartApiRepository(new StartRemoteDataSource(BACKEND_URL))),
  };

  return (
    <UseCasesContext.Provider value={useCases}>
      <RouterProvider router={routes} />
    </UseCasesContext.Provider>
  );
}

export default App;