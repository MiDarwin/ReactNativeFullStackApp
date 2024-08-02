import React, { useState, useContext } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";
import { BackHandler } from "react-native";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);

  const handleSignUp = async () => {
    try {
      if (!isValidEmail(email)) {
        alert(
          "Please enter a valid email address (@gmail.com or @hotmail.com)"
        );
        return;
      }

      const response = await axios.post("/signup", {
        username,
        email,
        password,
      });

      navigation.navigate("Tasks");
    } catch (error) {
      console.error(error);
    }
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

  const isValidEmail = (email) => {
    return email.endsWith("@gmail.com") || email.endsWith("@hotmail.com");
  };
  const handleUsernameChange = (text) => {
    // İlk harfi büyük yapma
    const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
    setUsername(formattedText);
  };

  return (
    <View style={theme.container}>
      <Text style={theme.titleToDoList} variant="displayLarge">
        <Text style={theme.toStyle}>To</Text>
        <Text style={theme.doStyle}>Do</Text>
        <Text style={theme.listStyle}>List</Text>
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={handleUsernameChange}
        style={theme.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={theme.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={theme.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleSignUp} style={theme.button}>
        Sign Up
      </Button>
    </View>
  );
};

export default SignUp;
