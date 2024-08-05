import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#a7cdbd",
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a7cdbd",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  label: {
    marginTop: 2,
    marginBottom: 8,
    color: "#000",
  },
  LoadingOverlay: {
    width: 100,
    height: 100,
    backgroundColor: "#a7cdbd", // Siyah yüklenme efekti
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  TasksPage: {
    flex: 1,
    padding: 16,
    backgroundColor: "#a7cdbd",
    marginTop: 0,
    marginBottom: 0,
  },
  switchContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FF8878",
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
    backgroundColor: "#FF8878",
  },
  mediumPriority: {
    backgroundColor: "#E7DB8E",
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
  avatar: {
    marginBottom: 16,
    backgroundColor: "#FF8878",
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
    backgroundColor: "white", // Temaya göre ayarlayabilirsiniz
  },

  fab: {
    position: "absolute",
    right: width * 0.42,
    bottom: 4,
    backgroundColor: "#a7cdbd",
    color: "#fff",
    alignSelf: "center",
    borderRadius: 30, // Daire formunda olması için
    elevation: 8, // Android'de gölge efekti için
    shadowColor: "#000", // iOS'ta gölge efekti için
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  fabSettings: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#a7cdbd",
    marginBottom: 5,
    color: "#fff",
  },
  fabFilter: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
    marginBottom: 5,
    backgroundColor: "#a7cdbd",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a7cdbd",
  },
  authButton: {
    marginTop: 16,
    backgroundColor: "#FF8878",
    buttonColor: "white",
  },
  containerLogin: {
    flex: 1,
    padding: 16,
    backgroundColor: "#a7cdbd",
  },
  toStyle: {
    color: "#FF8878", // To için renk
  },
  doStyle: {
    color: "#E7DB8E", // Do için renk
  },
  listStyle: {
    color: "#D7E5CA", // List için renk
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
    backgroundColor: "#f5f5f5",
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
    color: "white",
    fontWeight: "bold",
  },
  typeContainerColorSelected: "#a7cdbd",
  typeContainerColorDefault: "gray",
  applyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#a7cdbd",
    borderRadius: 10,
  },
  containerFilterComponent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#a7cdbd",
  },

  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  tooltipContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    alignItems: "center",
    right: 10, // Sağdan 10 birim mesafe
    bottom: 40, // Alttan 10 birim mesafe
  },
  tooltipBubble: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5, // Oku ve baloncuğun arasındaki boşluğu ayarlayın
  },
  tooltipText: {
    color: "#000",
    fontSize: 12,
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#000",
    position: "absolute",
    top: "100%", // Oku baloncuğun altına hizalar
    left: "90%", // Oku ortalar
    marginLeft: -5, // Oku tam ortalamak için
  },
  typeContainerColorSelected: "#FF8878",
  typeContainerColorDefault: "#333",
  notificationColorSelected: "#FF8878",
  notificationColorDefault: "gray",
});
