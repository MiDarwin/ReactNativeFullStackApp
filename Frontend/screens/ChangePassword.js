import React, { useState, useContext } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, useTheme, Text } from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoading from "../components/LoadingContext"; // Adjust the path as necessary
import { ThemeContext } from "../context/ThemeContext";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { colors } = useTheme();
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      navigation.navigate("Tasks");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Both fields are required");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      handleLogout();
    } catch (error) {
      console.error("Error changing password: ", error);
      Alert.alert("Error", "Failed to change password");
    } finally {
    }
  };

  return (
    <View style={theme.container}>
      <Text style={theme.titleToDoList} variant="displayLarge">
        <Text style={theme.toStyle}>To</Text>
        <Text style={theme.doStyle}>Do</Text>
        <Text style={theme.listStyle}>List</Text>
      </Text>
      <TextInput
        label="Old Password"
        mode="outlined"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        style={theme.input}
      />
      <TextInput
        label="New Password"
        mode="outlined"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={theme.input}
      />
      <Button
        mode="contained"
        onPress={handleChangePassword}
        style={theme.button}
      >
        Change Password
      </Button>
    </View>
  );
};

export default ChangePassword;
