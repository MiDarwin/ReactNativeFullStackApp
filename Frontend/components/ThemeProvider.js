import React from "react";
import { ThemeProvider as PaperThemeProvider } from "react-native-paper";
import { ThemeProvider } from "../context/ThemeContext";

const AppThemeProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <PaperThemeProvider>{children}</PaperThemeProvider>
    </ThemeProvider>
  );
};

export default AppThemeProvider;
