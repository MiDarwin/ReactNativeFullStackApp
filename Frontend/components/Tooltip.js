// components/Tooltip.js
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Tooltip = ({ children, visible }) => {
  if (!visible) return null;
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <View style={theme.tooltipContainer}>
      <View style={theme.tooltipArrow} />
      <View style={theme.tooltipBubble}>
        <Text style={theme.tooltipText}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Tooltip;
