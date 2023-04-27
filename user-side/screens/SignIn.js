import { useState } from "react";
import logo from "../assets/logo.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserAuth } from "../contexts/AuthContext";

const SignIn = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const navigation = useNavigation();
  const { signInUser } = UserAuth();

  const onSignIn = async () => {
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
      await signInUser(value.email, value.password);
    } catch (error) {
      Alert.alert("Please try again", error.message);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-[#00c4b3]">
      <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
        <Image
          source={logo}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text className="block  font-title text-2xl font-bold text-center text-white">
          Sign In
        </Text>

        <View className="space-y-6">
          <View className="mt-1 space-y-4">
            <View className="font-main flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100 mx-5">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                className="flex-1 p-2 bg-white text-gray-600"
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View className="flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100 mx-5">
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                className="flex-1 p-2 bg-white text-gray-600"
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={onSignIn}
              className="rounded-2xl bg-[#00CCBB] border-4 border-white p-3 mx-5 mt-4"
            >
              <Text className="text-center text-white text-lg font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-center text-white font-main text-base">
          Don't have an account?{" "}
          <Text
            className="text-blue underline"
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});
