import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoading from "../components/LoadingContext"; // Adjust the path as necessary

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { colors } = useTheme();

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
    } catch (error) {
      console.error("Error changing password: ", error);
      Alert.alert("Error", "Failed to change password");
    } finally {
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <TextInput
        label="Old Password"
        mode="outlined"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="New Password"
        mode="outlined"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={{ marginBottom: 16 }}
      />
      <Button
        mode="contained"
        onPress={handleChangePassword}
        style={{ marginTop: 16 }}
      >
        Change Password
      </Button>
    </View>
  );
};

export default ChangePassword;
