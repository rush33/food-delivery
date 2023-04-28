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
  Pressable,
} from "react-native";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const ProfileScreen = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { user } = UserAuth();

  useEffect(() => {
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
  };

  // const handleMapPress = (event) => {
  //   const { latitude, longitude } = event.nativeEvent.coordinate;
  //   setLatitude(latitude);
  //   setLongitude(longitude);
  //   console.log(latitude, longitude);
  // };

  const onSave = async () => {
    if (!firstName || !lastName || !phoneNumber || !address || !location) {
      Alert.alert("Please fill all fields to update details.");
      return;
    }

    const dataToUpdate = {};

    if (firstName) {
      dataToUpdate.firstName = firstName;
    }

    if (lastName) {
      dataToUpdate.lastName = lastName;
    }

    if (phoneNumber) {
      dataToUpdate.phoneNumber = phoneNumber;
    }

    if (address) {
      dataToUpdate.address = address;
    }

    if (location) {
      dataToUpdate.latitude = location.latitude;
      dataToUpdate.longitude = location.longitude;
    }

    await setDoc(doc(db, "user", user.uid), dataToUpdate);
        Alert.alert("Success!", "Your profile has been updated successfully.", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
        ]);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="auto" />

      <View className="p-5 bg-white shadow-xs">
        <Pressable
          onPress={navigation}
          className="absolute top-7 left-3 bg-white  rounded-full"
        >
          <ArrowLeftIcon size={25} color="#00CCBB" />
        </Pressable>

        <View>
          <Text className="text-2xl font-bold ml-7">Update your details</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1 px-4 pt-4 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-gray-700">
              First Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-gray-700">
              Last Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-gray-700">
              Phone Number
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-gray-700">
              Street Address
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View className="mt-4 mb-6 rounded-2xl overflow-hidden border border-gray-300">
            {location ? (
              <MapView
                className="w-full h-40"
                provider="google"
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
            onPress={onSave}
            className="rounded-xl bg-[#00CCBB] p-3"
          >
            <Text className="text-center text-white text-xl font-bold">
              Update
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
