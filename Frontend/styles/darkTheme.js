import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#647a71",
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#647a71",
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
  LoadingOverlay: {
    width: 100,
    height: 100,
    backgroundColor: "#647a71", // Siyah yüklenme efekti
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  TasksPage: {
    flex: 1,
    padding: 16,
    backgroundColor: "#647a71",
    marginTop: 0,
    marginBottom: 0,
  },
  switchContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#a65b51",
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
    marginBottom: 5,
    padding: 0.1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "gray",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  highPriority: {
    backgroundColor: "#96483e",
  },
  mediumPriority: {
    backgroundColor: "#bfb46b",
  },
  lowPriority: {
    backgroundColor: "#afbaa4",
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
  avatar: {
    marginBottom: 16,
    backgroundColor: "#a65b51",
  },
  completedText: {
    color: "green",
    marginLeft: 10,
  },
  fabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "gray",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "grey", // Temaya göre ayarlayabilirsiniz
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 135,
    left: 135,
    bottom: 0,
    backgroundColor: "#7e9c8f",
    marginBottom: 5,
    color: "#fff",
  },
  fabSettings: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#7e9c8f",
    marginBottom: 5,
    color: "#fff",
  },
  fabFilter: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
    marginBottom: 5,
    backgroundColor: "#7e9c8f",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7e9c8f",
  },
  authButton: {
    marginTop: 16,
    backgroundColor: "#96483e",
    buttonColor: "white",
  },

  containerLogin: {
    flex: 1,
    padding: 16,
    backgroundColor: "#a7cdbd",
  },
  toStyle: {
    color: "#96483e", // To için renk
  },
  doStyle: {
    color: "#bfb46b", // Do için renk
  },
  listStyle: {
    color: "#afbaa4", // List için renk
  },
  titleToDoList: {
    marginTop: 30,
    marginBottom: 20,
    color: "#000",
  },
  containerFilter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "grey",
  },
  typeContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 25,
  },
  typeLabel: {
    color: "black",
    fontWeight: "bold",
  },
  applyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#7e9c8f",
    borderRadius: 10,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  typeContainerColorSelected: "#5e8a72",
  typeContainerColorDefault: "#333",
});
