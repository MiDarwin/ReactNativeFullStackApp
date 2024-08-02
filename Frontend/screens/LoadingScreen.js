// LoadingScreen.js
import React, { useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useLoading } from "../components/LoadingContext";
import { ThemeContext } from "../context/ThemeContext";

const LoadingScreen = () => {
  const { loading } = useLoading();
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Modal transparent={true} visible={loading} animationType="fade">
      <View style={theme.containerLoading}>
        <View style={theme.LoadingOverlay}>
          <ActivityIndicator size="25" color="#FF8878" />
          <Text>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 128, 0, 0.8)", // Yeşil arka plan
  },
  overlay: {
    width: 100,
    height: 100,
    backgroundColor: "black", // Siyah yüklenme efekti
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
});

export default LoadingScreen;
