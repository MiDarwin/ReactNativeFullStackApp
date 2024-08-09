// components/Tooltip.js
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Tooltip = ({ children, visible }) => {
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  if (!visible) return null;
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
