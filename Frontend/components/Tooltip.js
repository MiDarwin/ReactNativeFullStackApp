// components/Tooltip.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tooltip = ({ children, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.tooltipContainer}>
      <View style={styles.tooltipArrow} />
      <View style={styles.tooltipBubble}>
        <Text style={styles.tooltipText}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    alignItems: "center",
    right: 10, // Sağdan 10 birim mesafe
    bottom: 40, // Alttan 10 birim mesafe
  },
  tooltipBubble: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5, // Oku ve baloncuğun arasındaki boşluğu ayarlayın
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#000",
    position: "absolute",
    top: "100%", // Oku baloncuğun altına hizalar
    left: "90%", // Oku ortalar
    marginLeft: -5, // Oku tam ortalamak için
  },
});

export default Tooltip;
