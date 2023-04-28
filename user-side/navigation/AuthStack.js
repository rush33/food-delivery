import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import UserDetails from "../screens/UserDetails";
import { StatusBar } from "expo-status-bar";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar hidden={false} style="light" />

      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
    </>
  );
}

export default AuthStack