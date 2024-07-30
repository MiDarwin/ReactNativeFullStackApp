import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { LoadingProvider } from "./components/LoadingContext"; // LoadingContext'i içe aktarın
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Tasks from "./screens/Tasks";
import AddTask from "./screens/AddTask";
import SignUp from "./screens/SignUp"; // SignUp ekranını ekliyoruz
import ChangeTask from "./screens/ChangeTask";
import AppThemeProvider from "./components/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Filter from "./screens/Filter";
import SplashScreen from "./screens/SplashScreen"; // Yeni eklediğimiz SplashScreen bileşenini içe aktarın
import LoadingScreen from "./screens/LoadingScreen";
import ChangePassword from "./screens/ChangePassword";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // Token kontrolü yaparak isAuthenticated durumunu güncelleyin
  React.useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // !!token ile token varsa true, yoksa false yapar
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  return (
    <AppThemeProvider>
      <LoadingProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="SplashScreen">
            <Drawer.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                drawerItemStyle: { display: "none" },
                headerShown: false,
              }}
            />

            <Drawer.Screen
              name="Tasks"
              component={Tasks}
              options={{
                title: "Tasks",
                headerLeft: () => null,
              }}
            />
            <Drawer.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                title: "Change Password",
                headerLeft: () => null,
              }}
            />
            <Drawer.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{
                title: "LoadingScreen",
                headerLeft: () => null,
              }}
            />
            <Drawer.Screen
              name="Add Task"
              component={AddTask}
              options={{
                title: "Add Task",
                headerLeft: () => null,
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{
                title: "Settings",
                headerLeft: () => null,
              }}
            />
            <Drawer.Screen
              name="Filter"
              component={Filter}
              options={{
                title: "Filter",
                headerLeft: () => null,
              }}
            />
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{
                drawerItemStyle: { display: "none" },
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="Sign Up"
              component={SignUp}
              options={{
                drawerItemStyle: { display: "none" },
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="ChangeTask"
              component={ChangeTask}
              options={{
                drawerItemStyle: { display: "none" },
                headerShown: false,
              }}
            />
          </Drawer.Navigator>
          <LoadingScreen />
        </NavigationContainer>
      </LoadingProvider>
    </AppThemeProvider>
  );
}
