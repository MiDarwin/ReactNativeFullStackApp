import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Tasks from "./screens/Tasks";
import AddTask from "./screens/AddTask";
import SignUp from "./screens/SignUp"; // SignUp ekranını ekliyoruz
import ChangeTask from "./screens/ChangeTask";
import AppThemeProvider from "./components/ThemeProvider";
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AppThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Tasks" component={Tasks} />
          <Drawer.Screen name="Add Task" component={AddTask} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="Sign Up"
            component={SignUp}
            hi
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          {/* SignUp ekranını ekliyoruz */}
          <Drawer.Screen
            name="ChangeTask"
            component={ChangeTask}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppThemeProvider>
  );
}
