import { createContext } from 'react';

export const gameContext = createContext({});

export const GameProvider = ({ children, value }) => (
  <gameContext.Provider value={value}>{children}</gameContext.Provider>
);
