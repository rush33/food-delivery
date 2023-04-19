// import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Auth, DataStore } from "aws-amplify";
// import { User } from "../src/models";
// import { useAuthContext } from "../contexts/AuthContext";
// import { useNavigation } from "@react-navigation/native";

// const ProfileScreen = () => {
//     const [name, setName] = useState("");
//     const [address, setAddress] = useState("");
//     const [lat, setLat] = useState();
//     const [lng, setLng] = useState();
//     const [phone, setPhone] = useState();
    
//     const { setDbUser, sub } = useAuthContext();

//   const onSave = async () => {
//       try {
//         const user = await DataStore.save(new User({
//           name,
//           address,
//           lat: parseFloat(lat),
//           lng: parseFloat(lng),
//           sub,
//           phone,
//         }))
//     } catch (e) {
//       Alert.alert("Error", error.message);
//     }
//   };
//   return (
//     <SafeAreaView>
//       <Text style={styles.title}>Tell us about yourself!</Text>
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         placeholder="Name"
//         style={styles.input}
//       />
//       <TextInput
//         value={address}
//         onChangeText={setAddress}
//         placeholder="Address"
//         style={styles.input}
//       />
//       <TextInput
//         value={phone}
//         onChangeText={setPhone}
//         placeholder="Phone number"
//         style={styles.input}
//         keyboardType="numeric"
//       />
//       <TextInput
//         value={lat}
//         onChangeText={setLat}
//         placeholder="Latitude"
//         style={styles.input}
//         keyboardType="numeric"
//       />
//       <TextInput
//         value={lng}
//         onChangeText={setLng}
//         placeholder="Longitude"
//         style={styles.input}
//         keyboardType="numeric"
//       />
//       <Button onPress={onSave} title="Save" />
//       <Text
//         onPress={() => Auth.signOut()}
//         style={{ textAlign: "center", color: "red", margin: 10 }}
//       >
//         Sign out
//       </Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     marginTop: 60,
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "left",
//     margin: 15,
//   },
//   input: {
//     margin: 12,
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 5,
//   },
// });

// export default ProfileScreen;
