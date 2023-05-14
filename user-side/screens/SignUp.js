import { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { UserAuth } from "../contexts/AuthContext";
import UserDetails from "./UserDetails";

const SignUp = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const navigation = useNavigation();
  const { createUser } = UserAuth();

  const onSignUp = async () => {
    let errorMessage = "";
    if (value.email === "") {
      errorMessage += "Email cannot be empty.\n";
    }
    if (value.password === "") {
      errorMessage += "Password cannot be empty.\n";
    }
    if (errorMessage !== "") {
      Alert.alert("Error", errorMessage.trim());
      return;
    }
    try {
      await createUser(value.email, value.password);
      navigation.navigate("User Details");
    } catch (error) {
      Alert.alert("Please try again", error.message);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white flex justify-center ">
      <StatusBar style="auto" />
      <View className="mx-4 flex justify-center align-center space-y-6">
        <Text className="text-3xl font-bold text-center text-black">
          Sign Up
        </Text>

        <View className="space-y-6">
          <View className="mt-1 space-y-4">
            <View className="font-main flex-row justify-center align-center rounded-r-2xl rounded-l-2xl px-1 py-1 bg-gray-200 mx-5">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                className="flex-1 p-2 bg-white text-gray-700 rounded-xl"
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View className="flex-row justify-center align-center rounded-r-2xl rounded-l-2xl px-1 py-1 bg-gray-200 mx-5">
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                className="flex-1 p-2 bg-white text-gray-700 rounded-xl"
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={onSignUp}
              className="mx-auto w-10/12 my-3 items-center p-2 rounded-2xl  hover:bg-green-200 active:bg-green-400 duration-150 bg-green-300 border-l-4 border-b-4 border-green-600"
            >
              <Text className="text-center text-gray-700 font-extrabold text-xl">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-center text-gray-700 font-semibold text-base">
          Have an account?{" "}
          <Text
            className="text-blue underline"
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});
