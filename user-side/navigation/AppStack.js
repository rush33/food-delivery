import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import RestaurantDetails from "../screens/RestaurantDetails";
import BasketScreen from "../screens/BasketScreen";
import UserDetails from "../screens/UserDetails";
import OptionsScreen from "../screens/OptionsScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import PreparingOrderScreen from "../screens/PreparingOrderScreen";
import { UserAuth } from "../contexts/AuthContext";

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const { dbUser } = UserAuth();

  return (
    <Stack.Navigator>
      {!dbUser ? (
        <Stack.Screen
          name="User Details"
          component={UserDetails}
          options={{ headerShown: false }}
        />
      ) : null}

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Options"
        component={OptionsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Restaurant"
        component={RestaurantDetails}
        ptions={{ headerShown: false }}
      />

      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{ presentation: "modal", headerShown: false }}
      />

      <Stack.Screen
        name="Order Details"
        component={OrderDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PreparingOrderScreen"
        component={PreparingOrderScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
