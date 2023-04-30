import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "../navigation/AuthStack";
import AppStack from "../navigation/AppStack";
import { UserAuth } from "../contexts/AuthContext";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { user } = UserAuth();

  return !user ? <AuthStack /> : <AppStack />;
};

export default RootNavigator;
