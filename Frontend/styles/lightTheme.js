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
  TasksPage: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
  },
  pickerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "gray",
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
  },
  taskContainer: {
    marginBottom: 16,
    padding: 0.1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "gray",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  highPriority: {
    backgroundColor: "#D2E0FB",
  },
  mediumPriority: {
    backgroundColor: "#F9F3CC",
  },
  lowPriority: {
    backgroundColor: "#D7E5CA",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 0,
  },
  title: {
    flex: 1,
  },
  taskIcon: {
    marginRight: 5,
  },
  taskInfo: {
    marginLeft: 10,
    marginBottom: 0,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  subheading: {
    marginBottom: 0,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    marginLeft: 5,
  },
  notificationText: {
    flex: 1,
    marginRight: 10,
  },
  completedText: {
    color: "green",
    marginLeft: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#8EACCD",
  },
  fabAccount: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: "#8EACCD",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  authButton: {
    marginTop: 16,
  },
});
