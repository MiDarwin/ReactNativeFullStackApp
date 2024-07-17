import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Title, Subheading, Button, FAB, IconButton } from "react-native-paper";
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
      //console.error(error);
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

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {isAuthenticated ? (
        <>
          <RNPickerSelect
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
          <ScrollView>
            {filteredTasks
              .sort((a, b) => {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((task) => (
                <View key={task._id} style={styles.taskContainer}>
                  <Title>{task.title}</Title>
                  <Subheading>{task.description}</Subheading>
                  <Text>Priority: {task.priority}</Text>
                  <Text>Type: {task.type}</Text>
                  <View style={styles.taskActions}>
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleDeleteTask(task._id)}
                    />
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() =>
                        navigation.navigate("ChangeTask", { taskId: task._id })
                      }
                    />
                    <IconButton
                      icon="check"
                      size={30}
                      style={styles.checkIcon}
                      onPress={() => handleCompleteTask(task._id)}
                    />
                    {isTaskCompleted(task._id) && (
                      <Text style={styles.completedText}>Completed</Text>
                    )}
                  </View>
                </View>
              ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.messageContainer}>
          <Title>Please login to see your tasks.</Title>
          <Subheading>
            If you do not have an account, you must become a member.
          </Subheading>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Sign Up")}
            style={styles.button}
          >
            Sign Up
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={styles.authButton}
          >
            Login
          </Button>
        </View>
      )}
      {isAuthenticated && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate("Add Task")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  taskContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  taskActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 16,
  },
  checkIcon: {
    marginTop: 10,
  },
  completedText: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Tasks;
