import { useReducer } from "react";

export const useMultipleState = <T>(initialState: T) => {
  const multipleStateReducer = (state: T, updates: Partial<T>) => {
    return { ...state, ...updates };
  };
  const [state, setState] = useReducer(multipleStateReducer, initialState);
  return [state, setState] as const;
};
