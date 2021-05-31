import { createContext, useReducer } from "react";
import { reducer, initialState } from "../Reducer/reducer";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
