import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    color: "#000",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#6200ee",
    color: "#fff",
  },
  title: {
    marginBottom: 30,
    color: "#000",
  },
  text: {
    color: "#000",
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
    backgroundColor: "#6200ee",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    marginTop: 16,
    backgroundColor: "#6200ee",
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: "#6200ee",
  },
  avatar: {
    marginBottom: 16,
  },
});
