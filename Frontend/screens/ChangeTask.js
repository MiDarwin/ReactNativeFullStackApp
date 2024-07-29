import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  RadioButton,
  IconButton,
  SegmentedButtons,
  TouchableRipple,
} from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleNotification,
  cancelAllScheduledNotifications,
} from "./NotificationService";
import { BackHandler } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import FilterComponent from "./FilterComponent"; // FilterComponent'i import edin

const ChangeTask = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState("");
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);

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
  const taskTypes = [
    { label: "Family", value: "Family", icon: "account-group" },
    { label: "Lesson", value: "Lesson", icon: "school" },
    { label: "Job", value: "Job", icon: "briefcase" },
    { label: "Medical", value: "Medical", icon: "hospital" },
    { label: "Other", value: "Other", icon: "dots-horizontal" },
  ];
  const handleSelectCategory = (category) => {
    setType(category);
  };
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
  return (
    <View style={theme.container}>
      <ScrollView>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={theme.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={theme.input}
        />
        <Text style={theme.label}>Priority</Text>
        <Divider />
        <SegmentedButtons
          value={priority}
          onValueChange={(value) => setPriority(value)}
          buttons={[
            {
              value: "Low",
              label: "Low",
              icon: "arrow-down-bold",
              style: {
                backgroundColor: priority === "Low" ? "#ccffcc" : "gray",
              },
            },
            {
              value: "Medium",
              label: "Medium",
              style: {
                backgroundColor: priority === "Medium" ? "#ffffcc" : "gray",
              },
            },
            {
              value: "High",
              label: "High",
              icon: "arrow-up-bold",
              style: {
                backgroundColor: priority === "High" ? "#ffcccc" : "gray",
              },
            },
          ]}
        />
        <Divider />
        <Text style={theme.label}>Type</Text>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {taskTypes.map((item) => (
            <TouchableRipple
              key={item.value}
              style={{
                backgroundColor: type === item.value ? "#FF8878" : "gray",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 100,
                margin: 10,
                borderRadius: 25,
              }}
              onPress={() => handleSelectCategory(item.value)}
            >
              <>
                <IconButton icon={item.icon} size={20} color="white" />
                <Text style={{ color: "white" }}>{item.label}</Text>
              </>
            </TouchableRipple>
          ))}
        </View>
        <Divider />
        <Text style={theme.label}>Reminder Frequency</Text>
        <Divider />
        <SegmentedButtons
          value={reminderFrequency}
          onValueChange={(value) => setReminderFrequency(value)}
          buttons={[
            {
              value: "No Notifications",
              label: "No Notifications",
              icon: "bell-off-outline",
              style: {
                backgroundColor:
                  reminderFrequency === "No Notifications" ? "#FF8878" : "gray",
              },
            },
            {
              value: "5 minutes",
              label: "5 minutes",
              icon: "clock",
              style: {
                backgroundColor:
                  reminderFrequency === "5 minutes" ? "#FF8878" : "gray",
              },
            },
            {
              value: "30 minutes",
              label: "30 minutes",
              icon: "clock",
              style: {
                backgroundColor:
                  reminderFrequency === "30 minutes" ? "#FF8878" : "gray",
              },
            },
            {
              value: "1 hour",
              label: "1 hour",
              icon: "clock",
              style: {
                backgroundColor:
                  reminderFrequency === "1 hour" ? "#FF8878" : "gray",
              },
            },
          ]}
        />
        <Divider />
        <Button
          mode="contained"
          onPress={handleUpdateTask}
          style={theme.button}
        >
          Update Task
        </Button>
      </ScrollView>
    </View>
  );
};

export default ChangeTask;
