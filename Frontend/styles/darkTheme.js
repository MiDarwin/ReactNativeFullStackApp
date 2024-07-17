import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#191919",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#191919",
    color: "#fff",
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    color: "#fff",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#bb86fc",
    color: "#fff",
  },
  title: {
    marginBottom: 30,
    color: "#fff",
    backgroundColor: "#191919",
  },
  text: {
    color: "#fff",
    backgroundColor: "#191919",
  },
  taskContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#333",
    backgroundColor: "#222",
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
    backgroundColor: "#bb86fc",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    marginTop: 16,
    backgroundColor: "#bb86fc",
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: "#bb86fc",
  },
  avatar: {
    marginBottom: 16,
  },
});
