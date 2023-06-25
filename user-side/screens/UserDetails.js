import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Button,
} from "react-native";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { isPointInPolygon } from "geolib";

const UserDetails = () => {
  const serviceableArea = [
    { latitude: 27.45806, longitude: 94.86509 }, //point 3
    { latitude: 27.43221, longitude: 94.87659 }, //point 4
    { latitude: 27.42663, longitude: 94.88422 }, //point 5
    { latitude: 27.42913, longitude: 94.89302 }, //point 6
    { latitude: 27.43654, longitude: 94.91953 }, //point 7
    { latitude: 27.46781, longitude: 94.95493 }, //point 8
    { latitude: 27.50657, longitude: 94.95214 }, //point 9
    { latitude: 27.50187, longitude: 94.93244 }, //point 10
    { latitude: 27.49088, longitude: 94.91515 }, //point 11
    { latitude: 27.46932, longitude: 94.87897 }, //point 12
  ];
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [validLocation, setValidLocation] = useState(null);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { user } = UserAuth();
  // const { signOutUser } = UserAuth();

  useEffect(() => {
    // signOutUser();
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    setLocationPermission(status);
    getLocation();
  };

  const getLocation = async () => {
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
    setValidLocation(
      isPointInPolygon(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        serviceableArea
      )
    );
  };

  const handlePhoneNumberChange = (text) => {
    const formattedPhoneNumber = text.replace(/\D/g, "");
    const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);
    setPhoneNumber(limitedPhoneNumber);
  };

  const onSave = async () => {
    if (!firstName || !lastName || !phoneNumber || !address || !location) {
      Alert.alert("Please fill in all required fields");
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert("Phone number must be at least 10 digits");
      return;
    }

    if (validLocation) {
      console.log("uid in user details:", user.uid);
      await setDoc(doc(db, "user", user.uid), {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      navigation.navigate("Home", {
        userId: user.uid,
      });
    } else {
      Alert.alert(
        "We apologize ☹️",
        "Your location is not serviceable at the moment.",
        [
          {
            text: "ok",
            style: "cancel",
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        className="flex-1 px-4 pt-4 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text className="text-[28px] font-bold mb-4 text-black tracking-wide">
          More details:
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <Text className="text-[21px] font-bold mb-2 text-gray-800">
              First Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-green-400 focus:border-green-400"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-[21px] font-bold mb-2 text-gray-800">
              Last Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-green-400 focus:border-green-400"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-[21px] font-bold mb-2 text-gray-800">
              Phone Number
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-green-400 focus:border-green-400"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-[21px] font-bold mb-2 text-gray-800">
              Street Address
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-green-400 focus:border-green-400"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View className="mt-4 mb-6 rounded-2xl overflow-hidden border border-gray-300">
            {location ? (
              <MapView
                className="w-full h-40"
                provider="google"
                showsUserLocation
                initialRegion={{
                  latitude: location.latitude || 0,
                  longitude: location.longitude || 0,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude || 0,
                    longitude: location.longitude || 0,
                  }}
                />
              </MapView>
            ) : (
              <Button
                title="Get Current Location"
                onPress={getLocationPermission}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              onSave();
            }}
            className="mx-auto w-10/12 my-3 items-center p-2 rounded-2xl  hover:bg-green-200 active:bg-green-400 duration-150 bg-green-300 border-l-4 border-b-4 border-green-600"
          >
            <Text className="text-center text-gray-700 font-extrabold text-xl">
              Sign Up
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetails;
