import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Home from "../pages/Home";
import New from "../pages/New";
import Photo from "../pages/Photo";
import Profile from "../pages/Profile";
import { RootStackParamList } from "../types/RootStackParamList";

const AppRoutes = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
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
      <Drawer.Screen name="Photo" component={Photo} />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
