import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";
import { RootStackParamList } from "../types/RootStackParamList";

const AppRoutes = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        drawerStyle: {
          backgroundColor: "#171717",
          width: 240,
        },
        drawerLabelStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#FFF",
        drawerActiveBackgroundColor: "#00b94a",
        drawerInactiveBackgroundColor: "#000",
        drawerInactiveTintColor: "#DDD",
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="New" component={New} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
