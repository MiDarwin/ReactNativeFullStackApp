import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Tasks from "./screens/Tasks";
import AddTask from "./screens/AddTask";
import SignUp from "./screens/SignUp"; // SignUp ekranını ekliyoruz

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Tasks" component={Tasks} />
        <Drawer.Screen name="Add Task" component={AddTask} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
