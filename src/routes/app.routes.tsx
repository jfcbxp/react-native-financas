import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import { RootStackParamList } from "../types/RootStackParamList";

const AppRoutes = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
