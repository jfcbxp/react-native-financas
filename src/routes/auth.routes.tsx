import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: "#131313",
          },
          headerTintColor: "#FFF",
          headerBackTitleVisible: false,
          headerTitle: "Voltar",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
