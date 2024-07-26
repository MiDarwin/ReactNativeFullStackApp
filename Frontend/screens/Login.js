import React, { useState } from "react";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(false);

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

  return (
    <View style={styles.containerLogin}>
      <Text style={styles.title} variant="displayMedium">
        Welcome to ToDoList
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Sign Up")}
        style={styles.button}
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

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E55E4D",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#a7cdbd",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#5CC8FF",
  },
  title: {
    marginBottom: 30,
    color: "#fff",
  },
});

export default Login;
