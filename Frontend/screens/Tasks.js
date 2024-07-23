import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import {
  Title,
  Subheading,
  Button,
  FAB,
  IconButton,
  Checkbox,
  Icon,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { ThemeContext } from "../context/ThemeContext";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  const [completedTasks, setCompletedTasks] = useState([]); // Hold IDs of completed tasks
  const [selectedCategory, setSelectedCategory] = useState("");
  const [checked, setChecked] = useState(false);
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleDeleteTask = async (taskId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks(); // Reload tasks after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.type === selectedCategory)
    : tasks;

  const handleCompleteTask = async (taskId) => {
    try {
      // Update completedTasks array with taskId
      setCompletedTasks([...completedTasks, taskId]);

      // Wait for a few seconds and then delete the task
      setTimeout(() => {
        handleDeleteTask(taskId);
      }, 3000); // 3000 milliseconds (3 seconds) delay
    } catch (error) {
      console.error(error);
    }
  };

  // Function to check if a task is completed
  const isTaskCompleted = (taskId) => completedTasks.includes(taskId);

  const getTaskContainerStyle = (priority) => {
    switch (priority) {
      case "High":
        return [theme.taskContainer, theme.highPriority];
      case "Medium":
        return [theme.taskContainer, theme.mediumPriority];
      case "Low":
        return [theme.taskContainer, theme.lowPriority];
      default:
        return theme.taskContainer;
    }
  };

  const getIconName = (type) => {
    switch (type) {
      case "Family":
        return "account-group";
      case "Lesson":
        return "school";
      case "Job":
        return "briefcase";
      case "Medical":
        return "hospital";
      case "Other":
        return "dots-horizontal";
      default:
        return "clipboard-text";
    }
  };

  return (
    <View style={theme.TasksPage}>
      {isAuthenticated ? (
        <>
          <View style={theme.pickerContainer}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => setSelectedCategory(value)}
              items={[
                { label: "All", value: "null" },
                { label: "Family", value: "Family" },
                { label: "Lesson", value: "Lesson" },
                { label: "Job", value: "Job" },
                { label: "Medical", value: "Medical" },
                { label: "Other", value: "Other" },
              ]}
              placeholder={{ label: "Select a category", value: null }}
              value={selectedCategory}
            />
          </View>
          <ScrollView>
            {filteredTasks
              .sort((a, b) => {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((task) => (
                <View
                  key={task._id}
                  style={getTaskContainerStyle(task.priority)}
                >
                  <View style={theme.taskHeader}>
                    <IconButton
                      icon={getIconName(task.type)}
                      size={20}
                      style={theme.taskIcon}
                    />
                    <Title style={theme.title}>{task.title}</Title>
                    <View style={theme.iconContainer}>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() =>
                          navigation.navigate("ChangeTask", {
                            taskId: task._id,
                          })
                        }
                      />
                      <IconButton
                        icon="delete"
                        size={20}
                        onPress={() => handleDeleteTask(task._id)}
                      />
                    </View>
                  </View>
                  <View style={theme.taskInfo}>
                    <Subheading style={theme.subheading}>
                      {task.description}
                    </Subheading>
                    <Text>Priority: {task.priority}</Text>
                    <Text>Type: {task.type}</Text>
                  </View>
                  <View style={theme.checkContainer}>
                    <Text style={theme.notificationText}>
                      Notifications: {task.reminderFrequency}
                    </Text>
                    <Checkbox
                      status={
                        isTaskCompleted(task._id) ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        handleCompleteTask(task._id);
                      }}
                      uncheckedColor="gray"
                    />
                    {isTaskCompleted(task._id) && (
                      <Text style={theme.completedText}>Completed</Text>
                    )}
                  </View>
                </View>
              ))}
          </ScrollView>
        </>
      ) : (
        <View style={theme.messageContainer}>
          <Title>Please login to see your tasks.</Title>
          <Subheading>
            If you do not have an account, you must become a member.
          </Subheading>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Sign Up")}
            style={theme.button}
          >
            Sign Up
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={theme.authButton}
          >
            Login
          </Button>
        </View>
      )}
      {isAuthenticated && (
        <>
          <FAB
            icon="plus"
            style={theme.fab}
            onPress={() => navigation.navigate("Add Task")}
          />
          <FAB
            icon="account"
            style={theme.fabAccount}
            onPress={() => navigation.navigate("Settings")}
          />
        </>
      )}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 15,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    borderRadius: 15,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
  placeholder: {
    color: "gray",
  },
});

export default Tasks;
