import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme() must be in ThemeProvider");
  }

  return context;
}

export default useTheme;
