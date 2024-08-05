import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Subheading, Button, Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { scheduleNotification } from "./NotificationService";
import { BackHandler } from "react-native";
import { useLoading } from "../components/LoadingContext";
import ChangePassword from "./ChangePassword";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "Look at that notification",
    body: "I'm so proud of myself!",
  },
  trigger: null,
});
const Settings = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { startLoading, stopLoading } = useLoading();

  const handleSendTestNotification = async () => {
    await scheduleNotification(
      "Test Bildirimi",
      "Bu bir test bildirimidir.",
      "Immediate"
    );
    console.log("Test bildirimi gönderildi");
  };
  React.useEffect(() => {
    const backAction = () => {
      navigation.navigate("Tasks");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUser(response.data);
      } else {
        console.warn("No token found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser({ username: "", email: "" });
      setEmail("");
      setPassword("");
      navigation.navigate("Tasks");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <View style={theme.container}>
      <Avatar.Text
        size={64}
        label={getInitials(user.username)}
        style={theme.avatar}
      />
      <Title>{user.username}</Title>
      <Subheading style={theme.Text}>{user.email}</Subheading>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("ChangePassword")}
        style={theme.button}
      >
        Change Password
      </Button>
      <Button mode="contained" onPress={handleLogout} style={theme.button}>
        Logout
      </Button>
      <Button
        title="Test Bildirimi Gönder"
        mode="contained"
        style={theme.button}
        onPress={handleSendTestNotification}
      >
        Test Notification
      </Button>
      <View style={theme.switchContainer}>
        <Subheading style={theme.Text}>Dark Theme</Subheading>
        <Switch
          color="#96483e"
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
};

export default Settings;
