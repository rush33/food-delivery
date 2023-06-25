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
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const dbUser = useSelector(selectUser);
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

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserLocation({
      ...userLocation,
      latitude,
      longitude,
    });
    console.log(userLocation);
  };

  const handlePhoneNumberChange = (text) => {
    const formattedPhoneNumber = text.replace(/\D/g, "");
    const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);
    setPhoneNumber(limitedPhoneNumber);

    if (limitedPhoneNumber.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits.");
    } else {
      setPhoneNumberError("");
    }
  };

  const onSave = async () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !location ||
      phoneNumberError
    ) {
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

    if (userLocation.latitude && userLocation.longitude == null) {
      dataToUpdate.latitude = location.latitude;
      dataToUpdate.longitude = location.longitude;
    } else {
      dataToUpdate.latitude = userLocation.latitude;
      dataToUpdate.longitude = userLocation.longitude;
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
        <TouchableOpacity className="absolute top-4 left-4 bg-white p-2 rounded-full">
          <ArrowLeftIcon size={30} color="#00CCBB" />
        </TouchableOpacity>

        <View>
          <Text className="text-xl font-bold text-center">
            Update your details
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1 px-4 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-left justify-center w-3/6 p-4  mb-4 bg-white  rounded-2xl shadow border-gray-200 mx-auto border">
            <Text className="text-base font-semibold text-gray-700">
              {dbUser.firstName} {dbUser.lastName}
              {"\n"}
              {dbUser.phoneNumber}
              {"\n"}
              {dbUser.address}
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-black">
              First Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-black">Last Name</Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-black">
              Phone Number
            </Text>
            <TextInput
              className="bg-white border border-gray-200 text-base h-12 px-4 rounded-xl text-gray-700  focus:ring focus:ring-[#00CCBB] focus:border-[#00CCBB]"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
            />
            {phoneNumberError ? (
              <Text style={{ color: "red" }}>{phoneNumberError}</Text>
            ) : null}
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold mb-2 text-black">
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
                  draggable={true}
                  onDragStart={(event) => handleMapPress(event)}
                  onDragEnd={(event) => handleMapPress(event)}
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
            className="mx-auto w-10/12 my-8 items-center p-2 rounded-2xl  hover:bg-green-200 active:bg-green-400 duration-150 bg-green-300 border-l-4 border-b-4 border-green-600"
          >
            <Text className="text-center text-gray-700 font-extrabold text-xl">
              Update
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
