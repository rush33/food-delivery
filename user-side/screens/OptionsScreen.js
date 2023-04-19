import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRightIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { UserAuth } from "../contexts/AuthContext";

const OptionsScreen = () => {
  const navigation = useNavigation();
  const { dbUser, signOutUser } = UserAuth();
  const name = dbUser?.firstName;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 bg-white shadow-xs">
          <Pressable
            onPress={navigation}
            className="absolute top-4 left-4 bg-white p-2 rounded-full"
          >
            <ArrowLeftIcon size={30} color="#00CCBB" />
          </Pressable>

          <View>
            <Text className="text-xl font-bold text-center">Hey {name}</Text>
          </View>
        </View>

        <View className="flex items-center justify-center">
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
            className="px-4 mt-6 bg-white w-11/12 h-16 rounded-2xl flex-row justify-between items-center"
          >
            <Text className=" font-bold text-lg">My Profile</Text>
            <ArrowRightIcon size={20} color="#00CCBB" />
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("Order Details");
            }}
            className="px-4 mt-6 bg-white w-11/12 h-16 rounded-2xl flex-row justify-between items-center"
          >
            <Text className=" font-bold text-lg">My Orders</Text>
            <ArrowRightIcon size={20} color="#00CCBB" />
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={signOutUser}
          className="rounded-2xl bg-[#00CCBB] p-3 mx-4 my-8"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OptionsScreen;
