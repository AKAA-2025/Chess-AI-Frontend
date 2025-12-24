import { createContext } from "react";
import type { UseCases } from "shared/model/use_cases";

export const UseCasesContext = createContext<UseCases | null>(null);