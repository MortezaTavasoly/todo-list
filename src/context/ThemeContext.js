import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const themeReducer = (state, action) => {
    if (action.type) {
      return { ...state, mode: action.payload };
    }
  };

  const [state, dispatch] = useReducer(themeReducer, {
    mode: "dark",
  });

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
