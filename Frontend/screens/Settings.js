import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Subheading, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

// First, set the handler that will cause the notification
// to show the alert

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Second, call the method

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
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response.data);
      setUser(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  useEffect(() => {
    fetchUser();
  }, []);

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
      navigation.navigate("Tasks"); // Logout sonrası Tasks ekranına yönlendirme
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <View style={theme.container}>
      <Avatar.Text
        size={64}
        label={getInitials(user.username)}
        style={styles.avatar}
      />
      <Title>{user.username}</Title>
      <Subheading style={theme.input}>{user.email}</Subheading>
      <Button mode="contained" onPress={handleLogout} style={theme.button}>
        Logout
      </Button>
      <Button
        mode="contained"
        onPress={Notifications.scheduleNotificationAsync}
        style={theme.button}
      >
        Bildirim
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    alignItems: "center",
  },
  avatar: {
    marginBottom: 16,
  },
});

export default Settings;
