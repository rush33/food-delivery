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
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { UserAuth } from "../contexts/AuthContext";


const UserDetails = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { user } = UserAuth();
  const {
    params: {
      email,
      password,
    },
  } = useRoute();

  console.log(email, password)

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
      alert("Please fill in all required fields");
      return;
    }

    await setDoc(doc(db, "user", user.uid), {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        className="flex-1 px-4 pt-4 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text className="text-2xl font-semibold mb-4 text-gray-700">
          A few more details ...
        </Text>

        <ScrollView>
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-700">
              First Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 shadow-sm text-base py-2 px-4 rounded-xl text-gray-700"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-700">
              Last Name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 shadow-sm px-4 py-4 text-gray-700 rounded-xl"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-700">
              Phone Number
            </Text>
            <TextInput
              className="bg-white border border-gray-200 shadow-sm px-4 py-4 rounded-xl text-gray-700"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-700">
              Area, Street name
            </Text>
            <TextInput
              className="bg-white border border-gray-200 shadow-sm px-4 py-4 rounded-xl text-gray-700"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* <View className="flex-row mb-4 space-x-4">
          <View>
            <Text className="text-lg font-semibold mb-2">Lattitude</Text>
            <TextInput
              className="bg-white border border-[#00CCBB] px-4 py-2 rounded-md w-full"
              value={lat}
              onChangeText={setLat}
            />
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">Longitude</Text>
            <TextInput
              className="bg-white border border-[#00CCBB] px-4 py-2 rounded-md"
              value={lng}
              onChangeText={setLng}
            />
          </View>
        </View> */}

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
            <Text className="text-center text-white text-lg font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetails;
