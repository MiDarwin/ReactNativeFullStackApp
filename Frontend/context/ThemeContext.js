import React, { createContext, useState } from "react";
import lightTheme from "../styles/lightTheme";
import darkTheme from "../styles/darkTheme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        theme: isDarkTheme ? darkTheme : lightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
