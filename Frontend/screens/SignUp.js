import React, { useState } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      navigation.navigate("Tasks"); // Örneğin, görevler ekranına yönlendirme
    } catch (error) {
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    return email.endsWith("@gmail.com") || email.endsWith("@hotmail.com");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="displayMedium">
        Sign Up
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
        autoCapitalize="none"
      />
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
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  title: {
    marginBottom: 30,
  },
});

export default SignUp;
