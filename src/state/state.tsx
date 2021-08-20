import { StateAction } from "./action";
import initialState, { State } from "./initialState";
import reducer from "./reducer";

import React, { createContext, Dispatch, useContext, useReducer } from "react";

export const StateContext = createContext<[State, Dispatch<StateAction>]>(null); // eslint-disable-line

export const StateProvider = ({ children }: { children: React.ReactNode }) => { // eslint-disable-line
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext); // eslint-disable-line
