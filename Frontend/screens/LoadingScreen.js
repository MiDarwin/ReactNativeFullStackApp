// LoadingScreen.js
import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useLoading } from "../components/LoadingContext";

const LoadingScreen = () => {
  const { loading } = useLoading();

  return (
    <Modal transparent={true} visible={loading} animationType="fade">
      <View style={styles.container}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
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
