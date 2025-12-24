// import ChessGamePage from "chess_game/presentation";
import LandingPage from "@/features/landing/presentation";
import { GetCodeSnippet } from "@/features/landing/usecase";
import { CodeApiRepository } from "@/features/landing/api";
import type { UseCases } from "@/shared/model";
import { UseCasesContext } from "shared/ctx";

function App() {
  const useCases: UseCases = {
    getCodeSnippet: new GetCodeSnippet(new CodeApiRepository()),
  };

  return (
    <UseCasesContext.Provider value={useCases}>
      {/* <ChessGamePage /> */}
      <LandingPage />
    </UseCasesContext.Provider>
  );
}

export default App;