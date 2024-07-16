import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Title, Subheading, Button, FAB, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AddTask from "./AddTask";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

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
      fetchTasks(); // Görevleri yeniden yükle
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {isAuthenticated ? (
        <ScrollView>
          {tasks
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
                    icon="pencil"
                    size={20}
                    onPress={() =>
                      navigation.navigate("ChangeTask", { taskId: task._id })
                    }
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDeleteTask(task._id)}
                  />
                </View>
              </View>
            ))}
        </ScrollView>
      ) : (
        <View style={styles.messageContainer}>
          <Title>Please login to see your tasks.</Title>
          <Subheading>
            If you do not have an account, you must become a member.
          </Subheading>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("SignUp")}
            style={styles.authButton}
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
    position: "absolute",
    top: 0,
    right: 0,
    padding: 8,
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
});

export default Tasks;
