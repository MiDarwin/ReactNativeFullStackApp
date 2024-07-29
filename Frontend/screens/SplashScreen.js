// SplashScreen.js
import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const video = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Tasks");
    }, 5000); // 5 saniye sonra Login ekranına geçiş yapar
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require("../assets/Welcome.mp4")}
        useNativeControls={false}
        resizeMode="contain"
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            navigation.navigate("Tasks");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
