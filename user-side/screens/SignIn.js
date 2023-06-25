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
import { useNavigation } from "@react-navigation/native";
import { UserAuth } from "../contexts/AuthContext";

const SignIn = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });
  const navigation = useNavigation();
  const { signInUser } = UserAuth();
  const { signInWithGoogle } = UserAuth();

  const googleSignIn = () => {
    signInWithGoogle();
  };

  const validateEmail = (email) => {
    // Regular expression to validate email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Minimum 6 characters for password
    return password.length >= 6;
  };

  const onSignIn = async () => {
    let emailError = "";
    let passwordError = "";

    if (value.email === "") {
      emailError = "Email cannot be empty.";
    } else if (!validateEmail(value.email)) {
      emailError = "Invalid email format.";
    }

    if (value.password === "") {
      passwordError = "Password cannot be empty.";
    } else if (!validatePassword(value.password)) {
      passwordError = "Password should be at least 6 characters.";
    }

    setValue({
      ...value,
      emailError,
      passwordError,
    });

    if (emailError || passwordError) {
      Alert.alert("Error", "Please fix the errors.");
      return;
    }

    try {
      await signInUser(value.email, value.password);
    } catch (error) {
      Alert.alert("Please try again", error.message);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white flex justify-center ">
      <StatusBar style="auto" />
      <View className="mx-4 flex justify-center align-center space-y-6">
        <Text className="text-3xl font-bold text-center text-black">
          Sign In
        </Text>

        <View className="space-y-6">
          <View className="mt-1 space-y-4">
            <View className="font-main flex-row justify-center align-center rounded-r-2xl rounded-l-2xl px-1 py-1 bg-gray-200 mx-5">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                className="flex-1 p-2 bg-white text-gray-700 rounded-xl"
                onChangeText={(text) =>
                  setValue({ ...value, email: text, emailError: "" })
                }
              />
            </View>
            {value.emailError !== "" && (
              <Text style={styles.error}>{value.emailError}</Text>
            )}

            <View className="font-main flex-row justify-center align-center rounded-r-2xl rounded-l-2xl px-1 py-1 bg-gray-200 mx-5">
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                className="flex-1 p-2 bg-white text-gray-700 rounded-xl"
                onChangeText={(text) =>
                  setValue({ ...value, password: text, passwordError: "" })
                }
                secureTextEntry={true}
              />
            </View>
            {value.passwordError !== "" && (
              <Text style={styles.error}>{value.passwordError}</Text>
            )}
          </View>

          <View>
            <TouchableOpacity
              onPress={onSignIn}
              className="mx-auto w-10/12 items-center p-2 rounded-2xl  hover:bg-green-200 active:bg-green-400 duration-150 bg-green-300 border-l-4 border-b-4 border-green-600"
            >
              <Text className="text-center text-gray-700 font-extrabold text-xl">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View>
            <TouchableOpacity
              onPress={googleSignIn}
              className="mx-auto w-10/12 items-center p-2 rounded-2xl  hover:bg-yellow-200 active:bg-yellow-400 duration-150 bg-yellow-300 border-l-4 border-b-4 border-yellow-600"
            >
              <Text className="text-center text-gray-700 font-extrabold text-xl">
                Sign In With {""}
                <Icon
                  style={styles.icon}
                  name="google"
                  size={22}
                  color="#ca8a04"
                />
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <Text className="text-center text-gray-700 font-semibold text-base">
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
  error: {
    color: "red",
    marginLeft: 20,
  },
});
