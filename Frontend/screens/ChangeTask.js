import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  RadioButton,
} from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleNotification,
  cancelAllScheduledNotifications,
} from "./NotificationService";

const ChangeTask = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState("");

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
        setReminderFrequency(task.reminderFrequency);
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
        { title, description, priority, type, reminderFrequency },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Eski bildirimleri iptal et
      await cancelAllScheduledNotifications();

      // Yeni bildirimleri planla
      if (reminderFrequency !== "No Notifications") {
        await scheduleNotification(title, description, reminderFrequency);
        console.log("Bildirim eklendi:", title, description, reminderFrequency);
      } else {
        console.log("Bildirim eklenmedi, çünkü hatırlatma sıklığı seçilmedi.");
      }

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
        <Text style={styles.label}>Reminder Frequency</Text>
        <Divider />
        <RadioButton.Group
          onValueChange={(value) => setReminderFrequency(value)}
          value={reminderFrequency}
        >
          <RadioButton.Item label="No Notifications" value="No Notifications" />
          <RadioButton.Item label="30 minutes" value="30 minutes" />
          <RadioButton.Item label="1 hour" value="1 hour" />
          <RadioButton.Item label="2 hours" value="2 hours" />
          <RadioButton.Item label="3 hours" value="3 hours" />
          <RadioButton.Item label="4 hours" value="4 hours" />
          <RadioButton.Item label="5 hours" value="5 hours" />
        </RadioButton.Group>
        <Divider />
        <Button
          mode="contained"
          onPress={handleUpdateTask}
          style={styles.button}
        >
          Update Task
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
  button: {
    marginTop: 16,
  },
});

export default ChangeTask;
