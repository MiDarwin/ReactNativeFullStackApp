import React, { useState, useContext } from "react";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      console.log("Bearer " + token); // Tokeni console.log ile yazdırma
      navigation.navigate("Tasks"); // Örneğin, görevler ekranına yönlendirme
    } catch (error) {
      //console.error(error);
      setErrorSnackbar(true);
    }
  };
  React.useEffect(() => {
    const backAction = () => {
      // İstediğiniz işlemi buraya yazın, örneğin bir ekrana yönlendirme veya uygulamayı kapatma
      navigation.navigate("Tasks"); // Örneğin 'Tasks' ekranına dön
      return true; // Bu, varsayılan geri tuşu davranışını engeller
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={theme.containerLogin}>
      <Text style={theme.titleToDoList} variant="displayLarge">
        <Text style={theme.toStyle}>To</Text>
        <Text style={theme.doStyle}>Do</Text>
        <Text style={theme.listStyle}>List</Text>
      </Text>

      <TextInput
        mode="outlined"
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
      <Button mode="contained" onPress={handleLogin} style={theme.button}>
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Sign Up")}
        style={theme.button}
      >
        Sign Up
      </Button>
      <Snackbar
        visible={errorSnackbar}
        onDismiss={() => setErrorSnackbar(false)}
        action={{
          label: "Close",
          onPress: () => setErrorSnackbar(false),
        }}
      >
        Wrong email or password!
      </Snackbar>
    </View>
  );
};

export default Login;
