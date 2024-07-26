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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Filter from "./screens/Filter";
import SplashScreen from "./screens/SplashScreen"; // Yeni eklediğimiz SplashScreen bileşenini içe aktarın

const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Token kontrolü yaparak isAuthenticated durumunu güncelleyin
  React.useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // !!token ile token varsa true, yoksa false yapar
    };

    checkAuthentication();
  }, []);
  return (
    <AppThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="SplashScreen">
          <Drawer.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen name="Tasks" component={Tasks} />
          <Drawer.Screen name="Add Task" component={AddTask} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Filter" component={Filter} />
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
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
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
