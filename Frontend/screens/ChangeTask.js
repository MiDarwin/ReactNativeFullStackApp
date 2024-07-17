import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  RadioButton,
} from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeTask = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setType(task.type);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `/tasks/${taskId}`,
        {
          title,
          description,
          priority,
          type,
        },
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
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
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
      <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
        <RadioButton.Item label="Medical" value="Medical" />
        <RadioButton.Item label="Lesson" value="Lesson" />
        <RadioButton.Item label="Other" value="Other" />
      </RadioButton.Group>
      <Divider />
      <Button mode="contained" onPress={handleUpdateTask} style={styles.button}>
        Update Task
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
});

export default ChangeTask;
