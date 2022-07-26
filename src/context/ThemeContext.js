import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const CHANGE_COLOR = "change_color";
const CHANGE_MODE = "change_mode";

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, color: action.payload };
    case CHANGE_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    color: "#0d3c55",
    mode: "light",
  });
  const changeColor = (color) => {
    dispatch({ type: CHANGE_COLOR, payload: color });
  };
  const changeMode = (mode) => {
    dispatch({ type: CHANGE_MODE, payload: mode });
  };
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
