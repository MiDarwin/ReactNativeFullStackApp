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
  BottomNavigation,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { ThemeContext } from "../context/ThemeContext";
import Tooltip from "../components/Tooltip";
const taskTypes = ["Family", "Lesson", "Job", "Medical", "Other"];
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  const [completedTasks, setCompletedTasks] = useState([]); // Hold IDs of completed tasks
  const [selectedCategories, setSelectedCategories] = useState(taskTypes); // Set initial selected categories to all types
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [checkedTaskId, setCheckedTaskId] = useState(null); // Güncellenmiş görev ID'si
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip görünürlüğü
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

  const filteredTasks =
    selectedCategories.length > 0
      ? tasks.filter((task) => selectedCategories.includes(task.type))
      : tasks;

  const handleCompleteTask = async (taskId) => {
    setCompletedTasks((prevCompletedTasks) => {
      if (prevCompletedTasks.includes(taskId)) {
        return prevCompletedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevCompletedTasks, taskId];
      }
    });

    setShowTooltip((prevShowTooltip) => ({
      ...prevShowTooltip,
      [taskId]: true,
    }));

    // Show tooltip for 2 seconds
    setTimeout(() => {
      setShowTooltip((prevShowTooltip) => ({
        ...prevShowTooltip,
        [taskId]: false,
      }));
    }, 2000);
  };

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
  const handleSaveCategories = (updatedCategories) => {
    setSelectedCategories(updatedCategories);
  };
  return (
    <View style={theme.TasksPage}>
      {isAuthenticated ? (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
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
                    <Tooltip
                      visible={tooltipVisible === task._id}
                      position={{ top: 100, left: 500 }} // Konum ayarlarını buradan yapabilirsiniz
                    >
                      Completed!
                    </Tooltip>
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
                    {isTaskCompleted(task._id) && showTooltip[task._id] && (
                      <Tooltip visible={showTooltip[task._id]}>
                        Completed
                      </Tooltip>
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
        <View style={theme.fabContainer}>
          <FAB
            icon="plus"
            style={[theme.fab, { color: "#fff" }]}
            onPress={() => navigation.navigate("Add Task")}
          />
          <FAB
            icon="filter"
            style={theme.fabFilter}
            onPress={() =>
              navigation.navigate("Filter", {
                selectedCategories,
                onSave: handleSaveCategories,
              })
            }
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  filterButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  // Diğer stiller buraya eklenebilir
});
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
