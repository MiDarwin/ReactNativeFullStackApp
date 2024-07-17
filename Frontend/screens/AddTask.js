import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Divider,
  Text,
  RadioButton,
} from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [type, setType] = useState("Medical");

  const handleAddTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "/tasks",
        { title, description, priority, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        <Text style={styles.label}>Priority</Text>
        <Divider />
        <RadioButton.Group
          onValueChange={(value) => setPriority(value)}
          value={priority}
        >
          <RadioButton.Item label="High" value="High" />
          <RadioButton.Item label="Medium" value="Medium" />
          <RadioButton.Item label="Low" value="Low" />
        </RadioButton.Group>
        <Divider />
        <Text style={styles.label}>Type</Text>
        <Divider />
        <RadioButton.Group
          onValueChange={(value) => setType(value)}
          value={type}
        >
          <RadioButton.Item label="Family" value="Family" />
          <RadioButton.Item label="Lesson" value="Lesson" />
          <RadioButton.Item label="Job" value="Job" />
          <RadioButton.Item label="Medical" value="Medical" />
          <RadioButton.Item label="Other" value="Other" />
        </RadioButton.Group>
        <Divider />
        <Button mode="contained" onPress={handleAddTask} style={styles.button}>
          Add Task
        </Button>
      </ScrollView>
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
  label: {
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default AddTask;
