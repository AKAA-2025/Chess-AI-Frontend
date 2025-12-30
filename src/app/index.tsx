// import ChessGamePage from "chess_game/presentation";
import LandingPage from "@/features/landing/presentation";
import { GetCodeSnippet } from "@/features/landing/usecase";
import { CodeApiRepository } from "@/features/landing/api";
import type { UseCases } from "@/shared/model";
import { UseCasesContext } from "shared/ctx";
import ChessGameplay from "@/features/chess_game/presentation";
import NotFound from "@/features/not_found/presentation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  const useCases: UseCases = {
    getCodeSnippet: new GetCodeSnippet(new CodeApiRepository()),
  };

  return (
    <UseCasesContext.Provider value={useCases}>
      <RouterProvider router={routes} />
    </UseCasesContext.Provider>
  );
}

export default App;