import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Subheading } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api";

const Settings = () => {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <Avatar.Text
        size={64}
        label={getInitials(user.username)}
        style={styles.avatar}
      />
      <Title>{user.username}</Title>
      <Subheading>{user.email}</Subheading>
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
