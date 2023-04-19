import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { Text, View } from "react-native";
import { AuthContextProvder } from "./contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvder>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </AuthContextProvder>
    </NavigationContainer>
  );
}
