import { useContext } from "react";
import { UseCasesContext } from "shared/ctx";

export const useUseCases = () => {
  const ctx = useContext(UseCasesContext);
  if (!ctx) throw new Error("UseCases not provided");
  return ctx;
};