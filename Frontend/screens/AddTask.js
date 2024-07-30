import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import {
  TextInput,
  Button,
  Divider,
  Text,
  SegmentedButtons,
} from "react-native-paper";
import axios from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleNotification,
  cancelAllScheduledNotifications,
} from "./NotificationService";
import FilterComponent from "./FilterComponent"; // FilterComponent'i import edin
import { ThemeContext } from "../context/ThemeContext";
import { BackHandler } from "react-native";

const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [type, setType] = useState("");
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);

  const [reminderFrequency, setReminderFrequency] =
    useState("No Notifications");
  const handleSelectCategory = (category) => {
    setType(category);
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

  const handleAddTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "/tasks",
        { title, description, priority, type, reminderFrequency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Bildirim ayarlarını yap
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
    <View style={theme.container}>
      <ScrollView>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={theme.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={theme.input}
          multiline
        />
        <Text style={theme.label}>Priority</Text>
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

        <Text style={theme.label}>Type</Text>

        <FilterComponent
          initialSelectedCategory={type}
          onSelect={handleSelectCategory}
        />

        <Text style={theme.label}>Reminder Frequency</Text>

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

        <Button mode="contained" onPress={handleAddTask} style={theme.button}>
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
