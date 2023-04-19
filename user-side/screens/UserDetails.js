import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
// import MapView, { Marker } from "react-native-maps";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const { user } = UserAuth();

  const handleLocationSelect = ({ coordinate }) => {
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);
  };

  const onSave = async () => {
    await setDoc(doc(db, "user", user.uid), {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <SafeAreaView className="h-full p-4">
      <Text className="text-2xl font-semibold mb-4">
        A few more details ...
      </Text>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">First Name</Text>
        <TextInput
          className="bg-white border border-[#00CCBB] px-4 py-2 rounded-md"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Last Name</Text>
        <TextInput
          className="bg-white border border-[#00CCBB] px-4 py-2 rounded-md"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Phone Number</Text>
        <TextInput
          className="bg-white border border-[#00CCBB] px-4 py-2 rounded-md"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Area, Street name</Text>
        <TextInput
          className="bg-white border border-[#00CCBB] px-4 py-2 rounded-md"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View className="flex-row mb-4 space-x-4">
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
      </View>

      {/* <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Current Location</Text>
        <MapView
          className="h-60 w-full"
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleLocationSelect}
        >
          {latitude && longitude && (
            <Marker coordinate={{ latitude, longitude }} />
          )}
        </MapView>
      </View> */}

      <TouchableOpacity
        onPress={onSave}
        className="rounded-xl bg-[#00CCBB] p-3"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserDetails;
