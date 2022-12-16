import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import { RootStackParamList } from "../types/RootStackParamList";

const AuthRoutes = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
