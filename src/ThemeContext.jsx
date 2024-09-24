// ThemeContext.js
import React, { useState, useContext, createContext } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useThemeUpdate() {
  const context = useContext(ThemeUpdateContext);
  if (context === undefined) {
    throw new Error("useThemeUpdate must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => setDarkTheme((prev) => !prev);

  const themeValue = React.useMemo(() => darkTheme, [darkTheme]);
  const toggleValue = React.useMemo(() => toggleTheme, []);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeUpdateContext.Provider value={toggleValue}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeUpdateContext };
